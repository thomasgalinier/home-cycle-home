import { createZone } from "@/services/api/carte"
import { useMutation, type useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export function useCreateZone(queryClient: ReturnType<typeof useQueryClient>) {
    return useMutation({
        mutationFn: createZone,
        onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["zone"] });
            data.error
                ? toast.error("Erreur lors de la création de la zone")
                : toast.success("Zone créée avec succès");
        },
    })
}