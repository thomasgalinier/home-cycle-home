import { logout } from "@/services/api/auth.ts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export function useLogout() {
	const navigate = useNavigate();
	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			navigate({ to: "/auth/Signin" });
		},
		onError: () => {
			toast.error("Une erreur est survenue lors de la déconnexion");
		},
	});
}
