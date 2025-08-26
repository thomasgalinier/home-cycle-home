import { findPlannedInterventions } from "@/services/api/intervention";
import { useQuery } from "@tanstack/react-query";

export const usePlannedInterventions = (query: { zone_id?: string; jour?: string; technicien_id?: string }) => {
    return useQuery({
        queryKey: ['plannedInterventions', query],
        queryFn: () => findPlannedInterventions(query)
    })
};
