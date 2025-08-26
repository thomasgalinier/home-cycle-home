import { FormContainer } from "@/components/FormContainer";
import SelectUser from "@/components/selectUser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMe } from "@/hooks/comptes/useMe";
import { useTechnicien } from "@/hooks/comptes/useTechnicien";
import { useChangeStatutIntervention } from "@/hooks/planning/useChangeStatutIntervention";
import { usePlannedInterventions } from "@/hooks/planning/usePlannedInterventions";
import { cn } from "@/lib/utils";
import { getFirstWeekday } from "@/services/tools";
import type { Intervention } from "@/services/type/intervention";

import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";

import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeftIcon, ArrowRightIcon, MapPinIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const queryClient = useQueryClient();

	const initialDate = getFirstWeekday(new Date());
	const [technicienId, setTechnicienId] = useState("");
	const [date, setDate] = useState(initialDate.toISOString().slice(0, 10));
	const [intervention, setIntervention] = useState<Intervention | null>(null);
	const { data: techniciens, isLoading: isLoadingTechniciens } =
		useTechnicien();
	const { data: user } = useMe();
	const { data: plannedInterventions = [] } = usePlannedInterventions({
		technicien_id: technicienId,
		jour: date,
	});

	const { form: cancelForm } = useChangeStatutIntervention(
		intervention,
		queryClient,
		"CANCELLED",
	);
	const { form: completedForm } = useChangeStatutIntervention(
		intervention,
		queryClient,
		"COMPLETED",
	);
	const mapsUrl = (adresse: string) =>
		`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adresse)}`;
	useEffect(() => {
		if (!isLoadingTechniciens) {
			setTechnicienId(techniciens[0]?.id || "");
		}
	}, [isLoadingTechniciens, techniciens]);
	return (
		<div className="px-10">
			<SelectUser
				className={cn(
					user?.role === "ADMIN" || user?.role === "SUPER_ADMIN"
						? "block"
						: "hidden",
					"flex",
				)}
				users={techniciens}
				isLoading={isLoadingTechniciens}
				value={technicienId}
				setValue={setTechnicienId}
			/>
			<div className="w-full flex justify-between my-4">
				<Button
					variant="outline"
					onClick={() => {
						const prevDate = new Date(date);
						do {
							prevDate.setDate(prevDate.getDate() - 1);
						} while ([0, 6].includes(prevDate.getDay()));
						setDate(prevDate.toISOString().slice(0, 10));
					}}
				>
					<ArrowLeftIcon />
				</Button>
				<span>{date}</span>
				<Button
					variant="outline"
					onClick={() => {
						const nextDate = new Date(date);
						do {
							nextDate.setDate(nextDate.getDate() + 1);
						} while ([0, 6].includes(nextDate.getDay())); // 0 = Sunday, 6 = Saturday
						setDate(nextDate.toISOString().slice(0, 10));
					}}
				>
					<ArrowRightIcon />
				</Button>
			</div>
			<div className="flex flex-col gap-4 ">
				{plannedInterventions.map((intervention: Intervention) => (
					<Card key={intervention.id}>
						<CardHeader className="flex flex-row justify-between items-center">
							<div className="flex flex-row gap-4">
								{intervention.forfait_intervention?.forfait.titre}
								<Badge variant="outline">
									{intervention.forfait_intervention?.forfait.categorie_velo}
								</Badge>
							</div>
							<div className="flex flex-row gap-4 items-center">
								<Badge
									variant={
										intervention.statut === "PLANNED"
											? "secondary"
											: intervention.statut === "CANCELLED"
												? "cancel"
												: intervention.statut === "IN_PROGRESS"
													? "success"
													: "default"
									}
								>
									{intervention.statut}
								</Badge>
								{new Date(intervention.debut).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}{" "}
								-{" "}
								{new Date(intervention.fin).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</div>
						</CardHeader>
						<CardContent className="flex flex-col">
							<p className="text-sm">{intervention.detail}</p>
							<div>
								{intervention.adresse && (
									<div>
										<MapPinIcon className="inline" size={16} />
										<Button
											variant="link"
											className="text-sm cursor-pointer"
											onClick={() =>
												window.open(
													mapsUrl(intervention.adresse as string),
													"_blank",
												)
											}
										>
											{intervention.adresse}
										</Button>
									</div>
								)}
								<div className="flex flex-row gap-4">
									<p>
										{intervention?.client?.nom} - {intervention?.client?.prenom}
									</p>
									<p>{intervention?.client?.telephone}</p>
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex justify-end gap-2">
							<Dialog>
								<DialogTrigger>
									<Button
										variant="outline"
										onClick={() => setIntervention(intervention)}
									>
										Annuler
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogTitle>Annuler l'intervention</DialogTitle>
									<DialogDescription>
										Êtes-vous sûr de vouloir annuler cette intervention ?
									</DialogDescription>
									<cancelForm.Field name="detail">
										{(field) => (
											<FormContainer>
												<Label>Détails</Label>
												<Textarea
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="Veuillez entrer les détails de l'annulation"
												/>
											</FormContainer>
										)}
									</cancelForm.Field>
									<DialogFooter>
										<DialogClose asChild>
											<Button
												variant="outline"
												onClick={() => setIntervention(null)}
											>
												Annuler
											</Button>
										</DialogClose>
										<Button
											variant="destructive"
											onClick={cancelForm.handleSubmit}
										>
											Confirmer
										</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
							<Dialog>
								<DialogTrigger>
									<Button onClick={() => setIntervention(intervention)}>
										Terminé
									</Button>
								</DialogTrigger>
								<DialogContent>
									<completedForm.Field name="detail">
										{(field) => (
											<FormContainer>
												<Label>Détails</Label>
												<Textarea
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="Veuillez entrer les détails de la réalisation"
												/>
											</FormContainer>
										)}
									</completedForm.Field>
									<DialogFooter>
										<DialogClose>
											<Button
												variant="outline"
												onClick={() => setIntervention(null)}
											>
												Annuler
											</Button>
										</DialogClose>
										<Button onClick={completedForm.handleSubmit}>
											Confirmer
										</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
