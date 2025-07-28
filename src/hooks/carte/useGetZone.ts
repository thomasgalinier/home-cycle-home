import { getZone } from "@/services/api/carte";
import { useQuery } from "@tanstack/react-query";

export function useGetZone(){
    return useQuery({
        queryKey: ["zone"],
        queryFn: getZone
    })
}