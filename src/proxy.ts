import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protège la console /admin par un mot de passe (HTTP Basic Auth).
// Les identifiants sont lus dans les variables d'environnement :
//   ADMIN_USER      (optionnel, défaut "admin")
//   ADMIN_PASSWORD  (obligatoire)
// À définir localement dans .env.local et sur Vercel (Project → Settings → Environment Variables).
// Le mot de passe n'apparaît jamais dans le code envoyé au navigateur.

export function proxy(request: NextRequest) {
  const expectedUser = process.env.ADMIN_USER || "admin";
  const expectedPass = process.env.ADMIN_PASSWORD;

  // Si aucun mot de passe n'est configuré, on bloque par sécurité.
  if (!expectedPass) {
    return new NextResponse("Console désactivée : ADMIN_PASSWORD non configuré.", {
      status: 503,
    });
  }

  const header = request.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const [user, pass] = atob(header.slice(6)).split(":");
      if (user === expectedUser && pass === expectedPass) {
        return NextResponse.next();
      }
    } catch {
      // en-tête mal formé → on redemande l'authentification
    }
  }

  return new NextResponse("Authentification requise", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Wine Society Admin", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
