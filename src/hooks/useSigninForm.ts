import { signin } from "@/services/api/auth.ts";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export function useSigninForm() {
	const navigate = useNavigate();
	const mutation = useMutation({
		mutationFn: signin,
		onSuccess: () => {
			navigate({ to: "/" });
		},
	});
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: (values) => {
			mutation.mutate(values.value);
		},
	});
	return { form };
}
