import { updateIntervention } from "@/services/api/intervention";
import type { InterventionUpdate } from "@/services/type/intervention";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateIntervention(intervention: InterventionUpdate | null) {
	const mutation = useMutation({
		mutationFn: updateIntervention,
		onSuccess: () => {
			toast.success("Intervention mise à jour avec succès");
		},
		onError: () => {
			toast.error("Erreur lors de la mise à jour de l'intervention");
		},
	});

	const form = useForm({
		defaultValues: {
			debut: intervention?.debut || null,
			fin: intervention?.fin || null,
			adresse: intervention?.adresse || "",
			statut: intervention?.statut || "",
			client_id: intervention?.client_id || "",
			technicien_id: intervention?.technicien_id || "",
			detail: intervention?.detail || "",
			forfait_id: intervention?.forfait_id || "",
		},
		onSubmit: (values) => {
			mutation.mutate({ id: intervention.id, ...values.value });
		},
	});
    return { form }; 
}
