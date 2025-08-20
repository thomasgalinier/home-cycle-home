import { deleteBulkIntervention } from "@/services/api/intervention";
import type { User } from "@/services/type/auth";
import { useForm } from "@tanstack/react-form";
import { useMutation, type useQueryClient } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { toast } from "sonner";

export function useDeleteBulkIntervention(
	queryClient: ReturnType<typeof useQueryClient>,
	defaultTechnicien: User,
) {
	const mutation = useMutation({
		mutationFn: deleteBulkIntervention,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["interventions"] });
			toast.success("Interventions supprimées avec succès");
		},
		onError: () => {
			toast.error("Erreur lors de la suppression des interventions");
		},
	});
	const form = useForm({
		defaultValues: {
			technicien_id: defaultTechnicien?.id || "",
			date: {
				from: new Date(),
				to: addDays(new Date(), +20),
			},
		},
		onSubmit: (values: {
			value: { technicien_id: string; date: { from: Date; to: Date } };
		}) => {
			mutation.mutate({
				technicien_id: values.value.technicien_id,
				date_debut: values.value.date.from,
				date_fin: values.value.date.to,
			});
		},
	});
	return { form };
}
