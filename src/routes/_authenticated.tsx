import { AppSidebar } from "@/components/AppSidebar.tsx";
import Header from "@/components/Header.tsx";
import { SidebarInset } from "@/components/ui/sidebar.tsx";
import { useMe } from "@/hooks/comptes/useMe.ts";
import { checkAuthentication } from "@/services/checkAuthentication.ts";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: async ({ location }) => {
		const isAuthenticated = await checkAuthentication();
		console.log("Authenticated:", isAuthenticated);
		if (!isAuthenticated) {
			throw redirect({
				to: "/auth/Signin",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	const { data: user } = useMe();
	return (
		<>
			<AppSidebar user={user} />
			<SidebarInset>
				<main className="h-full px-2">
					<Header />
					<Outlet />
				</main>
			</SidebarInset>
		</>
	);
}
