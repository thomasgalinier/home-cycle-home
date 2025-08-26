import { listClientInterventions } from "@/services/api/intervention";
import { useQuery } from "@tanstack/react-query";
import { useMe } from "../comptes/useMe";

export function useClientIntervention(page?: number, limit?: number) {
    const {data: user} = useMe();
    return useQuery({
        queryKey: ['clientIntervention', {page, limit}],
        queryFn: () => {
            if (!user?.id) throw new Error("User ID is required");
            return listClientInterventions({id: user.id, page, limit});
        }
    })
}