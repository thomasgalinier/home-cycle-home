import { AppSidebar } from "@/components/AppSidebar.tsx";
import Header from "@/components/Header.tsx";
import { Button } from "@/components/ui/button";
import { SidebarInset } from "@/components/ui/sidebar.tsx";
import { useMe } from "@/hooks/comptes/useMe.ts";
import { checkAuthenticationRole } from "@/services/checkAuthentication.ts";
import { Link, Outlet, createFileRoute, notFound, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: async ({ location }) => {
		const userRole = await checkAuthenticationRole();
		if (!userRole) {
			throw redirect({
				to: "/",
				search: {
					redirect: location.href,
				},
			});
		}
		if (userRole === "CLIENT") {
			throw notFound();
		}
	},
	component: AuthenticatedLayout,
	notFoundComponent: () => (
		<div className="min-h-[70vh] flex items-center justify-center px-6 w-full">
			<div className="text-center max-w-xl">
				<div className="text-6xl font-extrabold tracking-tight text-gray-900">404</div>
				<p className="mt-3 text-lg text-gray-600">Page introuvable</p>
				<p className="mt-1 text-sm text-gray-500">La page que vous cherchez n'existe pas ou a été déplacée.</p>
				<div className="mt-6 flex items-center justify-center gap-3">
					<Button variant="outline" asChild>
						<Link to="/">Accueil</Link>
					</Button>
					<Button asChild>
						<Link to="/auth/Signin">Se connecter</Link>
					</Button>
				</div>
			</div>
		</div>
	),
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
