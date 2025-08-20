import { deleteIntervention } from "@/services/api/intervention";
import { useMutation, type useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteIntervention(queryClient: ReturnType<typeof useQueryClient>) {
    return useMutation({
        mutationFn: deleteIntervention,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["interventions"] });
            toast.success("Intervention supprimée avec succès");
        },
        onError: () => {
            toast.error("Erreur lors de la suppression de l'intervention");
        }
    })
}