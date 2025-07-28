import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
	component: AuthLayout,
});

function AuthLayout() {
	return (
		<div className="flex items-center w-full justify-center h-screen">
			<Outlet />
		</div>
	);
}
