import type { AdresseSearchResponse, AdresseSuggestion } from "@/services/type/adresse";

// Government address API base
const GOV_ADRESSE_URL = "https://api-adresse.data.gouv.fr/search/";

export async function searchAdresse(query: string, options?: {
  limit?: number;
  postcode?: string; // optional filter by postal code
  city?: string; // optional city name
}) : Promise<AdresseSuggestion[]> {
  if (!query || query.trim().length < 3) return [];

  const params = new URLSearchParams();
  params.set("q", query.trim());
  params.set("limit", String(options?.limit ?? 5));
  if (options?.postcode) params.set("postcode", options.postcode);
  if (options?.city) params.set("city", options.city);

  const url = `${GOV_ADRESSE_URL}?${params.toString()}`;
  const res = await fetch(url, {
    headers: { "Accept": "application/json" },
  });

  if (!res.ok) {
    // Return empty list on errors to keep the UI resilient
    return [];
  }

  const data = (await res.json()) as AdresseSearchResponse;
  return (data.features ?? []).map((f) => ({
    id: f.properties.id,
    label: f.properties.label,
    longitude: f.geometry.coordinates[0],
    latitude: f.geometry.coordinates[1],
    city: f.properties.city,
    postcode: f.properties.postcode,
    street: f.properties.street,
    housenumber: f.properties.housenumber,
  }));
}
