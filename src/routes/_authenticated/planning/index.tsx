import { AdresseComplete } from "@/components/AdresseComplete";
import { DatePicker } from "@/components/DatePicker";
import { DateRangePicker } from "@/components/DateRangePicker";
import { FormContainer } from "@/components/FormContainer";
import SelectUser from "@/components/selectUser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTechnicien } from "@/hooks/comptes/useTechnicien";
import { useCreateEmptyIntervention } from "@/hooks/planning/useCreateEmptyIntervention";
import { useDeleteBulkIntervention } from "@/hooks/planning/useDeleteBulkIntervention";
import { useGetInterventionByTechnicien } from "@/hooks/planning/useGetInterventionByTechnicien";
import { useUpdateIntervention } from "@/hooks/planning/useUpdateIntervention";
import type { User } from "@/services/type/auth";
import type {
	Intervention,
	InterventionUpdate,
} from "@/services/type/intervention";

import frLocale from "@fullcalendar/core/locales/fr";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export const Route = createFileRoute("/_authenticated/planning/")({
	component: PlanningPage,
});
const time = [
	"8:00",
	"8:30",
	"9:00",
	"9:30",
	"10:00",
	"10:30",
	"11:00",
	"11:30",
	"12:00",
	"12:30",
	"13:00",
	"13:30",
	"14:00",
	"14:30",
	"15:00",
	"15:30",
	"16:00",
	"16:30",
	"17:00",
	"17:30",
	"18:00",
];
export default function PlanningPage() {
	const queryClient = useQueryClient();
	const { data: techniciens, isLoading } = useTechnicien();
	const [selectedTechnicienId, setSelectedTechnicienId] = useState("");
	const [openDialogEvent, setOpenDialogEvent] = useState(false);
	const [event, setEvent] = useState<InterventionUpdate | null>(null);

	useEffect(() => {
		if (!isLoading) {
			setSelectedTechnicienId(techniciens[0]?.id);
		}
	}, [isLoading, techniciens]);
	const technicien = !isLoading
		? techniciens.find(
			(technicien: User) => technicien.id === selectedTechnicienId,
		)
		: null;
	const { form } = useCreateEmptyIntervention(
		"8:30",
		"17:30",
		technicien,
		techniciens,
		queryClient,
	);
	const { data: interventions = [] } =
		useGetInterventionByTechnicien(selectedTechnicienId);
	const { form: deleteForm } = useDeleteBulkIntervention(
		queryClient,
		technicien,
	);
	const { form: updateForm } = useUpdateIntervention(event);
	console.log(interventions);

	return (
		<div>
			<div className="flex gap-2">
				<SelectUser
					users={techniciens}
					isLoading={isLoading}
					value={selectedTechnicienId}
					setValue={setSelectedTechnicienId}
				/>
				<Dialog>
					<DialogTrigger>
						<Button>Plannifier les interventions</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogTitle>Plannifier les interventions</DialogTitle>
						<Tabs>
							<TabsList>
								<TabsTrigger value="creation">Création</TabsTrigger>
								<TabsTrigger value="suppression">Suppression</TabsTrigger>
							</TabsList>
							<TabsContent value="creation" className="flex flex-col gap-3">
								<form.Field name="date">
									{(field) => (
										<FormContainer>
											<Label htmlFor="date">
												Choisissez la plage d'interverntion
											</Label>
											<DateRangePicker
												date={field.state.value}
												setDate={field.handleChange}
											/>
										</FormContainer>
									)}
								</form.Field>
								<form.Field name="technicien_id">
									{(field) => (
										<FormContainer>
											<Label htmlFor="technicien_id">
												Choisissez le technicien
											</Label>
											<SelectUser
												users={techniciens}
												isLoading={isLoading}
												value={field.state.value}
												setValue={field.handleChange}
											/>
										</FormContainer>
									)}
								</form.Field>
								<div className="flex gap-5">
									<form.Field name="heure_debut">
										{(field) => (
											<FormContainer>
												<Label htmlFor="heure_debut">Heure de début</Label>
												<Select
													value={field.state.value}
													onValueChange={(value) => field.handleChange(value)}
												>
													<SelectTrigger>
														<SelectValue placeholder="Sélectionnez une heure" />
													</SelectTrigger>
													<SelectContent>
														{time.map((time) => (
															<SelectItem key={time} value={time}>
																{time}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormContainer>
										)}
									</form.Field>
									<form.Field name="heure_fin">
										{(field) => (
											<FormContainer>
												<Label htmlFor="heure_fin">Heure de fin</Label>
												<Select
													value={field.state.value}
													onValueChange={(value) => field.handleChange(value)}
												>
													<SelectTrigger>
														<SelectValue placeholder="Sélectionnez une heure" />
													</SelectTrigger>
													<SelectContent>
														{time.map((time) => (
															<SelectItem key={time} value={time}>
																{time}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormContainer>
										)}
									</form.Field>
								</div>
								<Button onClick={form.handleSubmit}>Plannifier</Button>
							</TabsContent>
							<TabsContent value="suppression" className="flex flex-col gap-3">
								<deleteForm.Field name="date">
									{(field) => (
										<FormContainer>
											<Label htmlFor="date">
												Choisissez la plage d'interverntion
											</Label>
											<DateRangePicker
												date={field.state.value}
												setDate={field.handleChange}
											/>
										</FormContainer>
									)}
								</deleteForm.Field>
								<deleteForm.Field name="technicien_id">
									{(field) => (
										<FormContainer>
											<Label htmlFor="technicien_id">
												Choisissez le technicien
											</Label>
											<SelectUser
												users={techniciens}
												isLoading={isLoading}
												value={field.state.value}
												setValue={field.handleChange}
											/>
										</FormContainer>
									)}
								</deleteForm.Field>
								<Button onClick={deleteForm.handleSubmit} variant="destructive">
									Supprimer
								</Button>
							</TabsContent>
						</Tabs>
					</DialogContent>
				</Dialog>
			</div>
			<FullCalendar
				plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
				initialView="timeGridWeek"
				events={
					interventions.map((intervention: Intervention) => ({
						id: intervention.id.toString(),
						title: "Intervention",
						start: intervention.debut,
						end: intervention.fin,
						color: intervention.client ? "#3e69a0" : "#757575",
						extendedProps: intervention,
					})) || []
				}
				eventClick={(e) => {
					setOpenDialogEvent(true);
					setEvent(e.event.extendedProps as InterventionUpdate);
				}}
				weekends={false}
				locale={frLocale}
				selectable={true}
				allDaySlot={false}
				slotMinTime={"08:00:00"}
				slotMaxTime={"17:59:00"}
				height={"90vh"}
				timeZone="Europe/Paris"
			/>
			<Dialog open={openDialogEvent} onOpenChange={setOpenDialogEvent}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Modifier l'intervention</DialogTitle>
					</DialogHeader>
					<div className="flex justify-between">
						<updateForm.Field name="debut">
							{(field) => (
								<FormContainer>
									<Label htmlFor="debut">Début de l'intervention</Label>
									<DatePicker date={field.state.value} disabled />
								</FormContainer>
							)}
						</updateForm.Field>
						<updateForm.Field name="fin">
							{(field) => (
								<FormContainer>
									<Label htmlFor="fin">Fin de l'intervention</Label>
									<DatePicker date={field.state.value} disabled />
								</FormContainer>
							)}
						</updateForm.Field>
					</div>
					<updateForm.Field name="adresse">
						{(field) => (
							<FormContainer>
								<Label>Adresse</Label>
								<AdresseComplete
									onSelect={(suggestion) => console.log(suggestion)}
									value={field.state.value}
									setValue={field.handleChange}
								/>
							</FormContainer>
						)}
					</updateForm.Field>
					<updateForm.Field name='statut'>
						{(field) => (
							<FormContainer>
								<Label htmlFor="statut">Statut</Label>
								<Select value={field.state.value} onValueChange={field.handleChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Sélectionner un statut" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="UNPLANNED"><Badge variant="outline">Non planifié</Badge></SelectItem>
										<SelectItem value="PLANNED"><Badge>Planifié</Badge></SelectItem>
										<SelectItem value="IN_PROGRESS"><Badge variant='secondary'>En cours</Badge></SelectItem>
										<SelectItem value="COMPLETED"><Badge className="bg-green-500 text-white">Terminé</Badge></SelectItem>
										<SelectItem value="CANCELLED"><Badge className="bg-red-500 text-white">Annulé</Badge></SelectItem>
									</SelectContent>
								</Select>
							</FormContainer>
						)}
					</updateForm.Field>
				</DialogContent>
			</Dialog>
		</div>
	);
}
