import { parseTimeHM } from "@/lib/utils";
import { bulkEmptyIntervention } from "@/services/api/intervention";
import type { User } from "@/services/type/auth";
import type { dataBulkIntervention } from "@/services/type/intervention";
import { useForm } from "@tanstack/react-form";
import { useMutation, type useQueryClient } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { toast } from "sonner";
export function useCreateEmptyIntervention(
	heureDebut: string,
	heureFin: string,
	defaultTechnicien: User,
	techniciens: User[],
	queryClient: ReturnType<typeof useQueryClient>,
) {
	const mutation = useMutation({
		mutationFn: bulkEmptyIntervention,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["intervention"] })
			toast.success("Intervention créée avec succès");
		},
		onError: () => {
			toast.error("Erreur lors de la création de l'intervention");
		},
	});
	const form = useForm({
		defaultValues: {
			technicien_id: defaultTechnicien?.id || "",
			zone_id: defaultTechnicien?.zone?.id || "",
			date: {
				from: new Date(),
				to: addDays(new Date(), +20),
			},
			heure_debut: heureDebut,
			heure_fin: heureFin,
		},
		onSubmit: (values: { value: dataBulkIntervention }) => {
			const technicien = techniciens.find(
				(technicien: User) => technicien.id === values.value.technicien_id,
			);
			const { hour: heure_debut, minute: minute_debut } = parseTimeHM(
				values.value.heure_debut,
			);
			const { hour: heure_fin, minute: minute_fin } = parseTimeHM(
				values.value.heure_fin,
			);
			mutation.mutate({
				...values.value,
				date_debut: values.value.date.from,
				date_fin: values.value.date.to,
				zone_id: technicien?.zone?.id || "",
				heure_debut,
				heure_fin,
				minute_debut,
				minute_fin,
			});
		},
	});
	return { form };
}
