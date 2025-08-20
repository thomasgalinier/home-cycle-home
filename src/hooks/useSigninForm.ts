import { signin } from "@/services/api/auth.ts";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export function useSigninForm() {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const mutation = useMutation({
		mutationFn: signin,
		onSuccess: (data) => {
			navigate({ to: "/" });
			if(data.error){
				setError(data.message);
			}
			
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
