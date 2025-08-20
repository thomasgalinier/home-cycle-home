import { assignTechnicianToZone, updadteZone } from "@/services/api/carte";
import type { ZoneType } from "@/services/type/carte";
import { useForm } from "@tanstack/react-form";
import { useMutation, type useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateZone(
	queryClient: ReturnType<typeof useQueryClient>,
	zone: ZoneType,
	setDrawer: (value: boolean) => void,
	setSelectedZone: (zone: ZoneType | null) => void,
) {
	const mutation = useMutation({
		mutationFn: async (data: ZoneType) => {
			const { technicien_id, ...zoneField  } = data;
			await updadteZone({ ...zoneField });
			if (technicien_id) {
				await assignTechnicianToZone(zone.id, technicien_id);
			}
		},
		onSuccess: () => {
			window.location.reload();
			queryClient.invalidateQueries({ queryKey: ["zone"] });
			setSelectedZone(null);
			setDrawer(false);

			toast.success("Zone mise à jour avec succès");
		},
		onError: () => {
			toast.error("Erreur lors de la mise à jour de la zone");
		},
	});
    console.log(zone);
    
	const form = useForm({
		defaultValues: {
			nom: zone.nom,
			color: zone.color,
			polygone: zone.polygone,
			technicien_id: zone.technicien_id,
		},
		onSubmit: (values) => {
			mutation.mutate({
				id: zone.id,
				...values.value,
			});
		},
	});
	return { form };
}
