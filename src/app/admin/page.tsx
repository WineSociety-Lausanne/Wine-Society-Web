"use client";

import { useMemo, useState } from "react";
import eventsData from "@/data/events.json";
import type { WineEvent } from "@/lib/events";

const REGIONS = [
  "bordeaux",
  "bourgogne",
  "rhone",
  "champagne",
  "provence",
  "alsace",
  "suisse",
  "autre",
];

const EMPTY: WineEvent = {
  slug: "",
  date: "",
  region: "autre",
  titleFr: "",
  titleEn: "",
  descFr: "",
  descEn: "",
};

function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, "et")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function startOfToday(): number {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime();
}

function eventTime(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y || 1970, (m || 1) - 1, d || 1).getTime();
}

/** Nettoie un événement pour la sortie JSON (retire les champs vides). */
function clean(e: WineEvent): WineEvent {
  const out: WineEvent = {
    slug: e.slug.trim(),
    date: e.date.trim(),
    region: e.region,
    titleFr: e.titleFr.trim(),
    titleEn: e.titleEn.trim(),
    descFr: e.descFr.trim(),
    descEn: e.descEn.trim(),
  };
  const opt = (k: keyof WineEvent, v: unknown) => {
    if (v !== undefined && v !== null && v !== "") (out as Record<string, unknown>)[k] = v;
  };
  opt("longDescFr", e.longDescFr?.trim());
  opt("longDescEn", e.longDescEn?.trim());
  opt("time", e.time?.trim());
  opt("location", e.location?.trim());
  if (typeof e.spots === "number" && !Number.isNaN(e.spots)) out.spots = e.spots;
  if (e.formUrl && e.formUrl.trim()) out.formUrl = e.formUrl.trim();
  opt("instagram", e.instagram?.trim());
  if (e.noEmbed) out.noEmbed = true;
  if (typeof e.photoCount === "number" && e.photoCount > 0) out.photoCount = e.photoCount;
  if (e.hideDate) out.hideDate = true;
  return out;
}

export default function AdminPage() {
  const [list, setList] = useState<WineEvent[]>(() =>
    (eventsData as WineEvent[]).map((e) => ({ ...e }))
  );
  const [form, setForm] = useState<WineEvent>({ ...EMPTY });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof WineEvent>(k: K, v: WineEvent[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const status = useMemo(() => {
    if (!form.date) return null;
    return eventTime(form.date) >= startOfToday() ? "upcoming" : "past";
  }, [form.date]);

  const jsonOutput = useMemo(() => {
    const cleaned = list.map(clean);
    // Tri : à venir d'abord (par date croissante), puis passés (par date décroissante)
    const today = startOfToday();
    const upcoming = cleaned
      .filter((e) => eventTime(e.date) >= today)
      .sort((a, b) => eventTime(a.date) - eventTime(b.date));
    const past = cleaned
      .filter((e) => eventTime(e.date) < today)
      .sort((a, b) => eventTime(b.date) - eventTime(a.date));
    return JSON.stringify([...upcoming, ...past], null, 2) + "\n";
  }, [list]);

  const [publishing, setPublishing] = useState(false);
  const [publishMsg, setPublishMsg] = useState<{ ok: boolean; text: string; url?: string } | null>(
    null
  );

  async function publishGithub() {
    if (!confirm("Publier sur GitHub ?\nCela crée un commit et déclenche un redéploiement du site.")) {
      return;
    }
    setPublishing(true);
    setPublishMsg(null);
    try {
      const res = await fetch("/admin/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonOutput,
      });
      const data = await res.json();
      if (res.ok) {
        setPublishMsg({
          ok: true,
          text: `Publié : ${data.count} événements. Le site se redéploie (~1 min).`,
          url: data.commitUrl ?? undefined,
        });
      } else {
        setPublishMsg({
          ok: false,
          text: (data.error || "Échec de la publication.") + (data.details ? ` — ${data.details}` : ""),
        });
      }
    } catch {
      setPublishMsg({ ok: false, text: "Erreur réseau : impossible de joindre le serveur." });
    } finally {
      setPublishing(false);
    }
  }

  function resetForm() {
    setForm({ ...EMPTY });
    setEditIndex(null);
  }

  function saveForm() {
    const e = { ...form, slug: form.slug.trim() || slugify(form.titleFr) };
    if (!e.titleFr || !e.date) {
      alert("Titre (FR) et date sont obligatoires.");
      return;
    }
    setList((prev) => {
      const next = [...prev];
      if (editIndex !== null) next[editIndex] = e;
      else next.unshift(e);
      return next;
    });
    resetForm();
  }

  function editEvent(i: number) {
    setForm({ ...EMPTY, ...list[i] });
    setEditIndex(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function removeEvent(i: number) {
    if (!confirm(`Supprimer « ${list[i].titleFr} » ?`)) return;
    setList((prev) => prev.filter((_, j) => j !== i));
    if (editIndex === i) resetForm();
  }

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(jsonOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Copie impossible — sélectionne le texte manuellement.");
    }
  }

  function downloadJson() {
    const blob = new Blob([jsonOutput], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "events.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  const today = startOfToday();
  const upcomingCount = list.filter((e) => e.date && eventTime(e.date) >= today).length;

  const inputCls =
    "w-full bg-white border border-neutral-300 rounded px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-neutral-500";
  const labelCls = "block text-xs font-medium text-neutral-500 uppercase tracking-wide mb-1";

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold">Console — Événements</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Ajoute ou modifie un événement, puis copie le JSON mis à jour dans{" "}
            <code className="bg-neutral-200 px-1 rounded">src/data/events.json</code>. Le passage
            « à venir » → « passé » se fait automatiquement selon la date.
          </p>
        </header>

        {/* Formulaire */}
        <section className="bg-white border border-neutral-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold">
              {editIndex !== null ? "Modifier l'événement" : "Nouvel événement"}
            </h2>
            {status && (
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  status === "upcoming"
                    ? "bg-green-100 text-green-800"
                    : "bg-neutral-200 text-neutral-600"
                }`}
              >
                {status === "upcoming" ? "À venir" : "Passé"}
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Titre FR *</label>
              <input
                className={inputCls}
                value={form.titleFr}
                onChange={(e) => {
                  const v = e.target.value;
                  set("titleFr", v);
                  if (editIndex === null && (!form.slug || form.slug === slugify(form.titleFr)))
                    set("slug", slugify(v));
                }}
              />
            </div>
            <div>
              <label className={labelCls}>Titre EN</label>
              <input className={inputCls} value={form.titleEn} onChange={(e) => set("titleEn", e.target.value)} />
            </div>

            <div>
              <label className={labelCls}>Slug (URL)</label>
              <input className={inputCls} value={form.slug} onChange={(e) => set("slug", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Date *</label>
                <input
                  type="date"
                  className={inputCls}
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Région</label>
                <select className={inputCls} value={form.region} onChange={(e) => set("region", e.target.value)}>
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelCls}>Description courte FR</label>
              <textarea
                className={inputCls}
                rows={2}
                value={form.descFr}
                onChange={(e) => set("descFr", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Description courte EN</label>
              <textarea
                className={inputCls}
                rows={2}
                value={form.descEn}
                onChange={(e) => set("descEn", e.target.value)}
              />
            </div>

            <div>
              <label className={labelCls}>Description longue FR (page détail)</label>
              <textarea
                className={inputCls}
                rows={3}
                value={form.longDescFr ?? ""}
                onChange={(e) => set("longDescFr", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Description longue EN (page détail)</label>
              <textarea
                className={inputCls}
                rows={3}
                value={form.longDescEn ?? ""}
                onChange={(e) => set("longDescEn", e.target.value)}
              />
            </div>
          </div>

          <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide mt-6 mb-3">
            À venir — infos pratiques
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className={labelCls}>Heure</label>
              <input className={inputCls} placeholder="19:00" value={form.time ?? ""} onChange={(e) => set("time", e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className={labelCls}>Lieu</label>
              <input className={inputCls} value={form.location ?? ""} onChange={(e) => set("location", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Places</label>
              <input
                type="number"
                className={inputCls}
                value={form.spots ?? ""}
                onChange={(e) => set("spots", e.target.value === "" ? undefined : Number(e.target.value))}
              />
            </div>
            <div className="md:col-span-4">
              <label className={labelCls}>{"URL formulaire d'inscription (Google Form embed)"}</label>
              <input className={inputCls} value={form.formUrl ?? ""} onChange={(e) => set("formUrl", e.target.value)} />
            </div>
          </div>

          <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide mt-6 mb-3">
            {"Passé — après l'événement"}
          </p>
          <div className="grid md:grid-cols-2 gap-4 items-end">
            <div>
              <label className={labelCls}>Lien Instagram (post)</label>
              <input className={inputCls} value={form.instagram ?? ""} onChange={(e) => set("instagram", e.target.value)} />
            </div>
            <div className="flex gap-6 pb-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={!!form.noEmbed} onChange={(e) => set("noEmbed", e.target.checked)} />
                {"Pas d'embed (bouton lien)"}
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={!!form.hideDate} onChange={(e) => set("hideDate", e.target.checked)} />
                Masquer la date
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={saveForm}
              className="bg-neutral-900 text-white text-sm px-5 py-2.5 rounded hover:bg-neutral-700 transition-colors"
            >
              {editIndex !== null ? "Enregistrer les modifications" : "Ajouter l'événement"}
            </button>
            {editIndex !== null && (
              <button onClick={resetForm} className="text-sm px-5 py-2.5 rounded border border-neutral-300 hover:bg-neutral-50">
                Annuler
              </button>
            )}
          </div>
        </section>

        {/* Liste */}
        <section className="mb-8">
          <h2 className="font-semibold mb-3">
            Événements ({list.length}) · {upcomingCount} à venir
          </h2>
          <div className="space-y-2">
            {list.map((e, i) => {
              const isUpcoming = e.date && eventTime(e.date) >= today;
              return (
                <div
                  key={`${e.slug}-${i}`}
                  className="flex items-center gap-4 bg-white border border-neutral-200 rounded px-4 py-3"
                >
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
                      isUpcoming ? "bg-green-100 text-green-800" : "bg-neutral-200 text-neutral-500"
                    }`}
                  >
                    {isUpcoming ? "À venir" : "Passé"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{e.titleFr || "(sans titre)"}</p>
                    <p className="text-xs text-neutral-400">
                      {e.date} · {e.region}
                    </p>
                  </div>
                  <button onClick={() => editEvent(i)} className="text-xs text-neutral-600 hover:text-neutral-900 px-2">
                    Modifier
                  </button>
                  <button onClick={() => removeEvent(i)} className="text-xs text-red-600 hover:text-red-800 px-2">
                    Supprimer
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Sortie JSON */}
        <section className="bg-white border border-neutral-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
            <h2 className="font-semibold">Publier</h2>
            <div className="flex gap-2">
              <button
                onClick={publishGithub}
                disabled={publishing}
                className="bg-green-700 text-white text-sm px-4 py-2 rounded hover:bg-green-800 transition-colors disabled:opacity-50"
              >
                {publishing ? "Publication…" : "Publier sur GitHub"}
              </button>
              <button
                onClick={copyJson}
                className="text-sm px-4 py-2 rounded border border-neutral-300 hover:bg-neutral-50"
              >
                {copied ? "Copié !" : "Copier"}
              </button>
              <button onClick={downloadJson} className="text-sm px-4 py-2 rounded border border-neutral-300 hover:bg-neutral-50">
                Télécharger
              </button>
            </div>
          </div>

          {publishMsg && (
            <div
              className={`text-sm rounded px-3 py-2 mb-3 ${
                publishMsg.ok ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {publishMsg.text}
              {publishMsg.url && (
                <>
                  {" "}
                  <a href={publishMsg.url} target="_blank" rel="noopener noreferrer" className="underline">
                    Voir le commit
                  </a>
                </>
              )}
            </div>
          )}

          <p className="text-xs text-neutral-500 mb-3">
            <strong>Publier sur GitHub</strong> enregistre directement le fichier et redéploie le site — rien
            d&apos;autre à faire. Les boutons Copier / Télécharger restent disponibles comme solution de secours
            (à coller dans <code className="bg-neutral-200 px-1 rounded">src/data/events.json</code>).
          </p>
          <textarea
            readOnly
            value={jsonOutput}
            className="w-full h-72 font-mono text-xs bg-neutral-50 border border-neutral-200 rounded p-3 text-neutral-800"
          />
        </section>
      </div>
    </div>
  );
}
