import { signup } from "@/services/api/auth";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export function useCreateClientAccount() {
	const navigate = useNavigate();
	const mutation = useMutation({
		mutationFn: signup,
		onSuccess: () => {
			navigate({ to: "/" });
		},
        onError: () => {
            toast.error("Erreur lors de la création du compte. Veuillez réessayer.");
        }
	});
    const form = useForm({
        defaultValues: {
            nom: "",
            prenom: "",
            email: "",
            password: "",
            telephone: ""
        },
        onSubmit: (values) => {
            mutation.mutate(values.value);
        }
    });
    return { form };
}
