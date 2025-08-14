import { getForfait } from "@/services/api/forfait";
import { useQuery } from "@tanstack/react-query";

export function useGetForfait() {
    return useQuery({
        queryKey: ["forfait"],
        queryFn: getForfait,
    })
}