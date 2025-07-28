import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/api/auth.ts";

export function useMe() {
	return useQuery({
		queryKey: ["me"],
		queryFn: getMe,
	});
}
