import { useMutation, type useQueryClient } from "@tanstack/react-query";
import type { User } from "@/services/type/auth.ts";
import { toast } from "sonner";
import { updateUser } from "@/services/api/comptes.ts";
import { useForm } from "@tanstack/react-form";

export function useUpdateUserForm(
	queryClient: ReturnType<typeof useQueryClient>,
	user: User,
) {
	const mutation = useMutation({
		mutationFn: (data: User) => updateUser(data),
		mutationKey: ["user"],
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			data.error
				? toast.error("Erreur lors de la mise à jour de l'utilisateur")
				: toast.success("Utilisateur mis à jour avec succès");
		},
		onError: () => {
			toast.error("Erreur lors de la mise à jour de l'utilisateur");
		},
	});
	const form = useForm({
		defaultValues: {
			nom: user.nom,
			prenom: user.prenom,
			email: user.email,
			role: user.role,
			telephone: user.telephone,
		},
		onSubmit: (values) => {
			mutation.mutate({
				id: user.id,
				createdAt: user.createdAt,
				...values.value,
			});
		},
	});
	return { form };
}
