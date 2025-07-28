import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getAllUsers } from "@/services/api/comptes.ts";
import type {User} from "@/services/type/auth.ts";

export function useAllUser(): UseQueryResult<User, Error> {
	return useQuery({
		queryKey: ["users"],
		queryFn: getAllUsers,
	});
}
