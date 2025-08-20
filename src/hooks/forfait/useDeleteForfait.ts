import { deleteForfait } from "@/services/api/forfait";
import { useMutation, type useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteForfait = (queryClient: ReturnType<typeof useQueryClient> ) => {
  return useMutation({
    mutationFn: deleteForfait,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forfait"] });
      toast.success("Forfait supprimé avec succès");
    },
    onError: () => {
      toast.error("Erreur lors de la suppression du forfait");
    },
  });
};