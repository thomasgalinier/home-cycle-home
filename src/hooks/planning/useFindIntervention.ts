import { findUnplannedInterventions } from "@/services/api/intervention";
import { useQuery } from "@tanstack/react-query";

export function useFindIntervention(query: { zone_id?: string; jour?: string }) {
    return useQuery({
        queryKey: ['findIntervention', 'interventions', query],
        queryFn: () => findUnplannedInterventions(query),
    })
}
