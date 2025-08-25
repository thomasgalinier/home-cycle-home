import { updateIntervention } from "@/services/api/intervention";
import { useForm } from "@tanstack/react-form";
import { useMutation, type useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useMe } from "../comptes/useMe";

export function useBookIntervention(queryClient: ReturnType<typeof useQueryClient>) {
	const {data: user} = useMe();
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
			adresse: "",
            intervention_id: "",
            detail: "",
            forfait_id:"", 
            zone_id: "",
            technicien_id: ""
		},
        onSubmit: ({value}) => {
			console.log(value)
			mutation.mutate({id:value.intervention_id,statut: 'PLANNED',client_id:user?.id ||'', ...value});
		}
	});

	return { form, mutation};
}
