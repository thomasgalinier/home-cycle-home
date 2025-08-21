import { signin } from "@/services/api/auth.ts";
import { checkAuthenticationRole } from "@/services/checkAuthentication.ts";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export function useSigninForm() {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const mutation = useMutation({
		mutationFn: signin,
		onSuccess: async (data) => {
			if (data?.error) {
				setError(data.message);
				return;
			}
			const role = await checkAuthenticationRole();
			const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN" || role === "TECHNICIEN";
			navigate({ to: isAdmin ? "/admin" : "/" });
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
	return { form, error};
}
