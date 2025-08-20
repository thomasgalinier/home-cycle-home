import { getInterventionByTechnicien } from "@/services/api/intervention"
import { useQuery } from "@tanstack/react-query"

export  const useGetInterventionByTechnicien = (technicienId: string) => {
    return  useQuery({
        queryKey: ['interventions', technicienId],
        queryFn: () => getInterventionByTechnicien(technicienId),
        enabled: !!technicienId, // Only run the query if technicienId is not empty
    })
    
}