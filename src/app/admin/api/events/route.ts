import { NextResponse } from "next/server";

// Enregistre events.json directement dans le repo GitHub via l'API Contents.
// Cette route vit sous /admin/* : elle est donc protégée par le même mot de passe
// (voir src/proxy.ts) et le navigateur envoie automatiquement les identifiants.
//
// Variables d'environnement requises :
//   GITHUB_TOKEN   Personal Access Token (fine-grained) avec accès "Contents: Read and write"
//                  sur le repo. C'est le seul indispensable.
// Optionnelles (des valeurs par défaut sont fournies) :
//   GITHUB_OWNER   défaut "WineSociety-Lausanne"
//   GITHUB_REPO    défaut "Wine-Society-Web"
//   GITHUB_BRANCH  défaut "main"
//   GITHUB_PATH    défaut "src/data/events.json"

export const dynamic = "force-dynamic";

const OWNER = process.env.GITHUB_OWNER || "WineSociety-Lausanne";
const REPO = process.env.GITHUB_REPO || "Wine-Society-Web";
const BRANCH = process.env.GITHUB_BRANCH || "main";
const PATH = process.env.GITHUB_PATH || "src/data/events.json";

const API = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`;

function ghHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

export async function POST(request: Request) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN non configuré sur le serveur." },
      { status: 503 }
    );
  }

  // 1. Récupère et valide le corps
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps JSON invalide." }, { status: 400 });
  }

  const events = (body as { events?: unknown })?.events ?? body;
  if (!Array.isArray(events)) {
    return NextResponse.json(
      { error: "Le contenu doit être un tableau d'événements." },
      { status: 400 }
    );
  }
  for (const e of events as Array<Record<string, unknown>>) {
    if (!e || typeof e.slug !== "string" || typeof e.date !== "string" || typeof e.titleFr !== "string") {
      return NextResponse.json(
        { error: "Chaque événement doit avoir au minimum slug, date et titleFr." },
        { status: 400 }
      );
    }
  }

  const content = JSON.stringify(events, null, 2) + "\n";
  const contentBase64 = Buffer.from(content, "utf8").toString("base64");

  // 2. Récupère le SHA actuel du fichier (nécessaire pour une mise à jour)
  let sha: string | undefined;
  try {
    const getRes = await fetch(`${API}?ref=${encodeURIComponent(BRANCH)}`, {
      headers: ghHeaders(token),
      cache: "no-store",
    });
    if (getRes.ok) {
      const data = (await getRes.json()) as { sha?: string };
      sha = data.sha;
    } else if (getRes.status !== 404) {
      const txt = await getRes.text();
      return NextResponse.json(
        { error: `Lecture du fichier impossible (${getRes.status}).`, details: txt.slice(0, 300) },
        { status: 502 }
      );
    }
    // 404 = le fichier n'existe pas encore, on le crée (sha reste undefined)
  } catch (err) {
    return NextResponse.json(
      { error: "Connexion à GitHub impossible.", details: String(err) },
      { status: 502 }
    );
  }

  // 3. Commit (crée ou met à jour)
  const putRes = await fetch(API, {
    method: "PUT",
    headers: ghHeaders(token),
    body: JSON.stringify({
      message: `chore(events): mise à jour via la console admin`,
      content: contentBase64,
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!putRes.ok) {
    const txt = await putRes.text();
    return NextResponse.json(
      { error: `Commit refusé par GitHub (${putRes.status}).`, details: txt.slice(0, 300) },
      { status: 502 }
    );
  }

  const result = (await putRes.json()) as { commit?: { html_url?: string } };
  return NextResponse.json({
    ok: true,
    count: events.length,
    commitUrl: result.commit?.html_url ?? null,
  });
}
