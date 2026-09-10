import eventsData from "@/data/events.json";

export type WineEvent = {
  /** Identifiant unique dans l'URL /events/[slug] */
  slug: string;
  /** Date ISO "YYYY-MM-DD". Sert à ranger automatiquement l'événement en "à venir" ou "passé". */
  date: string;
  /** Région pour le filtre (bordeaux, bourgogne, rhone, champagne, provence, alsace, suisse, autre) */
  region: string;

  titleFr: string;
  titleEn: string;
  /** Description courte — cartes & liste des passés */
  descFr: string;
  descEn: string;

  /** Description longue optionnelle — page de détail */
  longDescFr?: string;
  longDescEn?: string;

  /** Champs "à venir / détail" */
  time?: string;
  location?: string;
  spots?: number;
  formUrl?: string | null;

  /** Champs "passés" */
  instagram?: string;
  noEmbed?: boolean;
  photoCount?: number;

  /** Ne pas afficher la date sur le site (ex: anciens événements sans date réelle) */
  hideDate?: boolean;
};

const events = eventsData as WineEvent[];

/** Début du jour courant, pour comparer les dates sans l'heure. */
function startOfToday(): number {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
}

function eventTime(e: WineEvent): number {
  // Parse en date locale (évite les décalages UTC) : "YYYY-MM-DD"
  const [y, m, d] = e.date.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1).getTime();
}

/** Tous les événements, sans distinction. */
export function getAllEvents(): WineEvent[] {
  return events;
}

/** Événements à venir (date >= aujourd'hui), du plus proche au plus lointain. */
export function getUpcomingEvents(): WineEvent[] {
  const today = startOfToday();
  return events
    .filter((e) => eventTime(e) >= today)
    .sort((a, b) => eventTime(a) - eventTime(b));
}

/** Événements passés (date < aujourd'hui), du plus récent au plus ancien. */
export function getPastEvents(): WineEvent[] {
  const today = startOfToday();
  return events
    .filter((e) => eventTime(e) < today)
    .sort((a, b) => eventTime(b) - eventTime(a));
}

/** Retrouve un événement par son slug. */
export function getEventBySlug(slug: string): WineEvent | undefined {
  return events.find((e) => e.slug === slug);
}

/** Vrai si l'événement est déjà passé. */
export function isPast(e: WineEvent): boolean {
  return eventTime(e) < startOfToday();
}
