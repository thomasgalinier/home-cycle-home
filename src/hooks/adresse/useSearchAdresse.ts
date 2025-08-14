import { searchAdresse } from "@/services/api/adresse";
import type { AdresseSuggestion } from "@/services/type/adresse";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook to search addresses using the French government API.
 * Debounce at caller level for inputs; this hook only handles query state.
 */
export function useSearchAdresse(query: string, options?: {
  limit?: number;
  postcode?: string;
  city?: string;
}) {
  return useQuery<AdresseSuggestion[]>({
    queryKey: ["adresse-search", { q: query, limit: options?.limit, postcode: options?.postcode, city: options?.city }],
    queryFn: () => searchAdresse(query, options),
    enabled: (query?.trim().length ?? 0) >= 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}
