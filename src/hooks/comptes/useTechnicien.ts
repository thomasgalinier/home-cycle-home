import { getTechniciens } from "@/services/api/comptes";
import { useQuery } from "@tanstack/react-query";

export function useTechnicien() {
	return useQuery({
		queryKey: ["techniciens", "user"],
		queryFn: getTechniciens,
	});
}
