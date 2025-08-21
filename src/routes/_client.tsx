import { Header } from "@/components/Client/Header";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_client")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-screen flex flex-col w-full">
			<Header />
			<Outlet />
		</div>
	);
}
