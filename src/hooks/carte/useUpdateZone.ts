import { updadteZone } from "@/services/api/carte";
import type { ZoneType } from "@/services/type/carte";
import { useForm } from "@tanstack/react-form";
import { useMutation, type useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";



export function useUpdateZone(queryClient: ReturnType<typeof useQueryClient>, zone: ZoneType, setDrawer: (value: boolean) => void, setSelectedZone: (zone: ZoneType | null) => void) {
    const mutation = useMutation({
        mutationFn:(data: ZoneType) => updadteZone(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["zone"] });
            setSelectedZone(null);
            setDrawer(false);
            window.location.reload();
            data.error
                ? toast.error("Erreur lors de la mise à jour de la zone")
                : toast.success("Zone mise à jour avec succès");
        },
        onError: () => {
            toast.error("Erreur lors de la mise à jour de la zone");
        },
    })
    const form = useForm({
        defaultValues: {
            nom: zone.nom,
            color: zone.color,
            polygone: zone.polygone,
            id_technicien: zone.id_technicien
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