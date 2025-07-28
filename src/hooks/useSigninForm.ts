import { useNavigate } from "@tanstack/react-router";
import { signin } from "@/services/api/auth.ts";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { SigninSchema } from "@/services/schema/auth.ts";

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
		validators: {
			onChange: SigninSchema,
		},
		onSubmit: (values) => {
			mutation.mutate(values.value);
		},
	});
	return { form };
}
