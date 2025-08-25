import { getForfait } from "@/services/api/forfait";
import { useQuery } from "@tanstack/react-query";

export function useGetForfait(titre?: string) {
    return useQuery({
        queryKey: ["forfait", titre],
        queryFn:() => getForfait(titre),
    })
}