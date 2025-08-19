import { getClients } from "@/services/api/comptes";
import { useQuery } from "@tanstack/react-query";

export function useGetClient() {
    return useQuery({
        queryKey: ['client'],
        queryFn: getClients,
    })
}
