import { Link } from "@tanstack/react-router";
import { BikeIcon } from "lucide-react";
import { Button } from "../ui/button";

export function Header() {
	return (
		<header className=" flex w-full h-[64px] justify-between px-3 items-center mb-16">
			<Link to="/" className="font-bold flex flex-row items-center gap-4">
				<BikeIcon className="bg-blue-200 p-2 rounded-xl" size={40} />
				<h2>HomeCycl'Home</h2>
			</Link>
			<div className="flex flex-row gap-2">
				<Button className="hidden md:block" variant="ghost">Connexion</Button>
				<Button>Inscription</Button>
			</div>
		</header>
	);
}
