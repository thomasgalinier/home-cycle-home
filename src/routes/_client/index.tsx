import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";

export const Route = createFileRoute("/_client/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="px-24">
			<section className="flex flex-col lg:flex-row lg:items-stretch gap-24">
				<div className="lg:w-1/2 flex gap-5 flex-col">
					<h1 className="font-bold text-5xl">
						Votre vélo réparé <br /> sans bouger de chez vous
					</h1>
					<p className="text-xl text-secondary">
						Un mécanicien vient directement à votre domicile ou sur votre lieu
						de travail. Réservez en ligne, gagnez du temps et reprenez la route
						en toute sérénité.
					</p>
					<div>
						<Button>
							<CalendarIcon />
							Réservez maintenant
						</Button>
					</div>
					<div className="flex gap-2">
						<Badge variant='outline' className="flex items-center w-fit gap-2"><ClockIcon size={14}/>Créneaux le jour même</Badge>
						<Badge variant='outline' className="flex items-center w-fit gap-2"><MapPinIcon size={14}/>Nous venons à vous</Badge>
					</div>
				</div>
				<div className="hidden lg:block lg:w-1/2 rounded-lg shadow-md overflow-hidden">
					<img
						src="/hero-img2.png"
						alt="Description de l'image"
						className="h-[400px] w-full object-cover"
					/>
				</div>
			</section>
		</main>
	);
}
