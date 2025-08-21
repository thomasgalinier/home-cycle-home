import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { BikeIcon } from "lucide-react";

export const Route = createFileRoute("/auth")({
	component: AuthLayout,
});

function AuthLayout() {
	return (
		<div className="flex flex-col items-center w-full h-screen">
			<header className=" flex w-full h-[64px] justify-between px-3 items-center mb-16">
				<Link to="/" className="font-bold flex flex-row items-center gap-4">
					<BikeIcon className="bg-blue-200 p-2 rounded-xl" size={40} />
					<h2>HomeCycl'Home</h2>
				</Link>
			</header>
			<Outlet />
		</div>
	);
}
