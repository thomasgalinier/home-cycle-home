import { useMe } from "@/hooks/comptes/useMe";

import { useLogout } from "@/hooks/comptes/useLogout";
import { Link } from "@tanstack/react-router";
import { BikeIcon, LogOutIcon, Shield } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Header() {
	const { data: user } = useMe();
	console.log("user", user);
	const { mutate: mutateLogout } = useLogout();

	return (
		<header className=" flex w-full h-[64px] justify-between px-10 items-center py-5 ">
			<Link to="/" className="font-bold flex flex-row items-center gap-4">
				<BikeIcon className="bg-blue-200 p-2 rounded-xl" size={40} />
				<h2>HomeCycl'Home</h2>
			</Link>

			{user ? (
				<div className="flex flex-row gap-4 items-center">
					<nav>
						<Button variant='ghost' asChild>
							<Link to="/myreservation">
								Mes interventions
							</Link>
						</Button>
					</nav>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Avatar className="cursor-pointer size-7">
							<AvatarImage
								className="rounded-full"
								src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user?.nom}${user?.prenom}`}
							/>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						{user.role === "ADMIN" ||
						user.role === "SUPER_ADMIN" ||
						user.role === "TECHNICIEN" ? (
							<DropdownMenuItem asChild className="cursor-pointer">
								<Link to="/admin">
									<Shield />
									Admin
								</Link>
							</DropdownMenuItem>
						) : null}
						<DropdownMenuItem onClick={() => mutateLogout()}>
							<LogOutIcon />
							Déconnexion
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				</div>
			) : (
				<div className="flex flex-row gap-2">
					<Button asChild>
						<Link to="/auth/Signin">Connexion</Link>
					</Button>
					<Button className="hidden md:block" asChild variant='ghost'><Link to="/auth/signup">Inscription</Link></Button>
				</div>
			)}
		</header>
	);
}
