import { deleteZone } from "@/services/api/carte";
import { useMutation, type useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteZone(queryClient: ReturnType<typeof useQueryClient>) {
    return useMutation({
        mutationFn: deleteZone,
        onSuccess:(data) => {
            queryClient.invalidateQueries({ queryKey: ["zone"] });
            data.error
                ? toast.error("Erreur lors de la suppression de la zone")
                : toast.success("Zone supprimée avec succès");
        },
        onError: () => {
            toast.error("Erreur lors de la suppression de la zone");
        },
    })
}