export default function sitemap() {
  const baseUrl = "https://www.wine-society.ch";
  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/events`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/competitions`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/partenaires`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/team`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/mentions-legales`, lastModified: new Date(), priority: 0.3 },
    { url: `${baseUrl}/politique-confidentialite`, lastModified: new Date(), priority: 0.3 },
  ];
}