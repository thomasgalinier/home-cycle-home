import { createForfait } from "@/services/api/forfait";
import type { Forfait, TCategorieVelo } from "@/services/type/forfait";
import { useForm } from "@tanstack/react-form";
import { useMutation, type useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateForfait(
	queryClient: ReturnType<typeof useQueryClient>,
) {
	const mutation = useMutation({
		mutationFn: createForfait,
		onSuccess: (data) => {
			form.reset();
			queryClient.invalidateQueries({ queryKey: ["forfait"] });
			data.error
				? toast.error("Erreur lors de la création du forfait")
				: toast.success("Forfait créé avec succès");
		},
	});
	const form = useForm({
		defaultValues: {
			titre: "",
			type: "reparation",
			description: "",
			categorie_velo: "route",
			duree: "01:00",
			prix: "",
		},
	
		onSubmit: (values: {value: Omit<Forfait, "id">}) => {
			mutation.mutate({
				...values.value,
				type: values.value.type as "reparation" | "entretien",
				categorie_velo: values.value.categorie_velo as TCategorieVelo,
			});
		},
	});
	return { form };
}
