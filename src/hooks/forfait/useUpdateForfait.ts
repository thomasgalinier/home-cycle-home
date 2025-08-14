import { updateForfait } from "@/services/api/forfait";
import type { Forfait } from "@/services/type/forfait";
import { useForm } from "@tanstack/react-form";
import { useMutation, type useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateForfait = (forfait: Forfait, queryClient: ReturnType<typeof useQueryClient>) => {
    const mutation = useMutation({
        mutationFn: updateForfait,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["forfait"]});
            toast.success("Forfait mis à jour avec succès");
        },
        onError: () => {
            toast.error("Erreur lors de la mise à jour du forfait");
        }
    });
    const form = useForm({
        defaultValues: {
            titre: forfait.titre,
            type: forfait.type,
            description: forfait.description,
            categorie_velo: forfait.categorie_velo,
            duree: forfait.duree,
            prix: forfait.prix
        },
        onSubmit: (values: {value: Forfait}) => {
            
            mutation.mutate({
                id: forfait.id,
                //@ts-ignore
                forfait: values.value,
            });
        }
    })
    return { form };
}