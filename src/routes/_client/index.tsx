import { CardService } from "@/components/Client/CardService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";

export const Route = createFileRoute("/_client/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main>
			<section className="flex flex-col lg:flex-row lg:items-stretch gap-24 bg-blue-100 px-24 h-3/4 content-center">
				<div className="lg:w-1/2 flex gap-5 flex-col m-auto py-10 lg:p-0">
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
						<Badge variant="outline" className="flex items-center w-fit gap-2">
							<ClockIcon size={14} />
							Créneaux le jour même
						</Badge>
						<Badge variant="outline" className="flex items-center w-fit gap-2">
							<MapPinIcon size={14} />
							Nous venons à vous
						</Badge>
					</div>
				</div>
				<img
					src="/hero-img2.png"
					alt="Description de l'image"
					className="h-3/4 object-cover lg:w-1/2 rounded-lg m-auto hidden lg:block"
				/>
			</section>
			<section className="px-24 mt-10 h-3/4">
				<div className="flex flex-col gap-2 py-4 ">
					<h2 className="font-bold text-4xl">
						Nos services de réparation à domicile
					</h2>
					<p className="text-slate-700">
						Du simple réglage aux réparations complètes, nos mécaniciens se
						déplacent jusqu’à vous. Découvrez nos prestations rapides,
						transparentes et adaptées à chaque besoin.
					</p>
				</div>
				<div className="flex flex-wrap gap-4  w-full">
					<CardService
						title="Révision générale"
						description="Un révision complète pour assurer la sécurité et la performance de votre vélo."
					/>
					<CardService
						title="Réparation de pneus"
						description="Réparation rapide de vos pneus pour repartir en toute sécurité, où que vous soyez."
					/>
					<CardService
						title="Entretien transmission"
						description="Réglage et optimisation de la chaîne et des vitesses pour un pédalage fluide et sans accroc."
					/>
					<CardService
						title="Révision des freins"
						description="Contrôle et réglage pour un freinage puissant et sécurisé en toutes conditions."
					/>
					<CardService
						title="Entretien roues & rayons"
						description="Réglage et dévoilage pour une roue parfaitement équilibrée et durable."
					/>
					<CardService
						title="Montage & réglages"
						description="Assemblage complet et ajustements précis pour un vélo prêt à rouler dès la première sortie."/>
				</div>
			</section>
		</main>
	);
}
