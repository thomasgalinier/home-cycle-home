import { updateIntervention } from "@/services/api/intervention";
import type { InterventionUpdate, Statut } from "@/services/type/intervention";
import { useForm } from "@tanstack/react-form";
import { useMutation, type useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateIntervention(intervention: InterventionUpdate, queryClient: ReturnType<typeof useQueryClient>) {
	const mutation = useMutation({
		mutationFn: updateIntervention,
		onSuccess: () => {
			form.reset(); 
			queryClient.invalidateQueries({ queryKey: ["interventions"] });
			toast.success("Intervention mise à jour avec succès");
		},
		onError: () => {
			toast.error("Erreur lors de la mise à jour de l'intervention");
		},
	});

	const form = useForm({
		defaultValues: {
			debut: intervention?.debut || "",
			fin: intervention?.fin || "",
			adresse: intervention?.adresse || "",
			statut: intervention?.statut || "",
			client_id: intervention?.client_id || "",
			technicien_id: intervention?.technicien_id || "",
			detail: intervention?.detail || "",
			forfait_id: intervention?.forfait_intervention?.id_forfait || "",
			zone_id: intervention?.zone_id || "",
		},
		onSubmitInvalid: (errors) => {
			console.log(errors);
		},
		onSubmit: (values) => {
			mutation.mutate({ 
				id: intervention.id, 
				...values.value, 
				statut: values.value.statut as Statut 
			});
			
		},
	});
    return { form }; 
}
