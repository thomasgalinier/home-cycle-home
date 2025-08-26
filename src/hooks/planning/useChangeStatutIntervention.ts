import { updateIntervention } from "@/services/api/intervention";
import type { Intervention, Statut } from "@/services/type/intervention";
import { useForm } from "@tanstack/react-form";
import { type QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useChangeStatutIntervention(intervention: Intervention | null, queryClient: QueryClient, status: Statut) {
	const mutation = useMutation({
        mutationFn: updateIntervention,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["plannedInterventions"] });
            data.error ? toast.error(data.error) : toast.success("Intervention annulée");
        },
        onError: () => {
            toast.error("Une erreur est survenue");
        }
    })
    const form = useForm({
        defaultValues: {
            id: intervention?.id || "",
            status: intervention?.statut,
            detail: intervention?.detail || ""
        },
        onSubmit: ({value}) => {
            mutation.mutate({
                id: value.id,
                statut: status,
                detail: value.detail
            });
        }
    })
    return { form }
}
