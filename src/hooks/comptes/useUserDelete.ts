import { useMutation, type useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/services/api/comptes.ts";
import { toast } from "sonner";

export function useUserDelete(queryClient: ReturnType<typeof useQueryClient>) {
	return useMutation({
		mutationFn: (id: string) => deleteUser(id),
		mutationKey: ["delete"],
		onSuccess: (data) => {
			data.error
				? toast.error("Erreur lors de la suppression de l'utilisateur")
				: toast.success("Utilisateur supprimé avec succès");
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
		onError: () => {
			toast.error(
				"Une erreur est survenue lors de la suppression de l'utilisateur",
			);
		},
	});
}
