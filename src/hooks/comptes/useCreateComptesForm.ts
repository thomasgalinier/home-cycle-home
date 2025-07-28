import { useForm } from "@tanstack/react-form";
import { useMutation, type useQueryClient } from "@tanstack/react-query";
import type { RoleType, User } from "@/services/type/auth.ts";
import { createUser } from "@/services/api/comptes.ts";
import { toast } from "sonner";

export function useCreateComptesForm(
	queryClient: ReturnType<typeof useQueryClient>,
) {
	const mutation = useMutation({
		mutationFn: (data: Omit<User, "id" | "createdAt">) => createUser(data),
		mutationKey: ["user"],
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			data.error
				? toast.error("Erreur lors de la création de l'utilisateur")
				: toast.success("Utilisateur créé avec succès");
		},
		onError: () => {
			toast.error(`Erreur lors de la création de l'utilisateur`);
		},
	});
	const form = useForm({
		defaultValues: {
			nom: "",
			prenom: "",
			email: "",
			telephone: "",
			password: "",
			role: "CLIENT",
		},
		validators: {
			onSubmit: ({ value }) => {
				const errors: Record<string, string> = {};

				if (!value.nom.trim()) {
					errors.nom = "Le nom est requis";
				}

				if (!value.prenom.trim()) {
					errors.prenom = "Le prénom est requis";
				}

				if (!value.email.trim()) {
					errors.email = "L'email est requis";
				} else if (!/\S+@\S+\.\S+/.test(value.email)) {
					errors.email = "Format d'email invalide";
				}

				if (!value.password.trim()) {
					errors.password = "Le mot de passe est requis";
				} else if (value.password.length < 8) {
					errors.password =
						"Le mot de passe doit contenir au moins 8 caractères";
				}

				if (!value.telephone.trim()) {
					errors.telephone = "Le téléphone est requis";
				} else if (!/^(\+33|0)[1-9](\d{8})$/.test(value.telephone)) {
					errors.telephone = "Format de téléphone invalide";
				}

				return Object.keys(errors).length > 0 ? errors : undefined;
			},
		},
		onSubmit: async (data) => {
			mutation.mutate({ ...data.value, role: data.value.role as RoleType });
		},
	});
	return { form };
}
