import { AdresseComplete } from "@/components/AdresseComplete";
import { ForfaitSelector } from "@/components/Client/ForfaitSelector";
import { InterventionSelector } from "@/components/Client/InterventionSelector";
import { FormContainer } from "@/components/FormContainer";
import { FormHelperText } from "@/components/FormHelperText";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGetForfait } from "@/hooks/forfait/useGetForfait";
import { useBookIntervention } from "@/hooks/planning/useBookIntervention";
import { useFindIntervention } from "@/hooks/planning/useFindIntervention";
import { getFirstWeekday } from "@/services/tools";
import type { ZoneType } from "@/services/type/carte";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_client/reservation")({
	component: RouteComponent,
});

function RouteComponent() {
	const queryClient = useQueryClient();
	const { form } = useBookIntervention(queryClient);

	const initialDate = getFirstWeekday(new Date());
	const [date, setDate] = useState(initialDate.toISOString().slice(0, 10));
	const [zone, setZone] = useState<ZoneType | null>(null);
	const [forfait, setForfait] = useState<string>("");

	const { data: interventions = [] } = useFindIntervention({
		jour: date,
		zone_id: zone?.id,
	});
	const { data: forfaits = [] } = useGetForfait(forfait);



	return (
		<section className="bg-blue-50 h-full w-full">
			<Card className="w-full md:w-3/4 md:px-0 px-3 m-auto mt-6">
				<CardHeader>
					<h1>Réservation d'une intervention</h1>
				</CardHeader>
				<CardContent className="flex flex-col gap-6">
					<form.Field
						name="adresse"
						validators={{
							onChange: ({ value }) => (!value.trim() ? "Adresse requise" : ""),
						}}
					>
						{(field) => (
							<FormContainer>
								<Label>Adresse</Label>
								<AdresseComplete
									onSelect={(suggestion) => console.log(suggestion)}
									onZoneCheck={(zone) => {
										form.setFieldValue("zone_id", zone?.id ?? "");
										form.setFieldValue(
											"technicien_id",
											zone?.technicien_id ?? "",
										);
										setZone(zone ?? null);
									}}
									value={field.state.value}
									setValue={field.handleChange}
								/>
								{field.state.meta.errors.length > 0 && (
									<FormHelperText>{field.state.meta.errors[0]}</FormHelperText>
								)}
							</FormContainer>
						)}
					</form.Field>
					<form.Subscribe
						selector={(s) => ({
							adresse: s.values.adresse as string | undefined,
							zoneId: s.values.zone_id as string | undefined,
							interventionId: s.values.intervention_id as string | undefined,
						})}
					>
						{({ adresse, zoneId, interventionId }) => {
							const adresseOk = !!adresse?.trim();
							const couverte = !!zoneId?.trim();
							if ((!adresseOk || !couverte) && interventionId) {
								form.setFieldValue("intervention_id", "");
							}

							if (!adresseOk) return null;

							if (couverte) {
								return (
									<form.Field
										name="intervention_id"
										validators={{
											onChange: ({ value }) =>
												!value?.trim() ? "Intervention requise" : "",
										}}
									>
										{(field) => (
											<FormContainer>
												<Label>Intervention</Label>
												<InterventionSelector
													date={date}
													setDate={setDate}
													interventions={interventions}
													field={field}
												/>
											</FormContainer>
										)}
									</form.Field>
								);
							}
						}}
					</form.Subscribe>
					<form.Subscribe
						selector={(s) => ({
							adresse: s.values.adresse as string | undefined,
							zoneId: s.values.zone_id as string | undefined,
							interventionId: s.values.intervention_id as string | undefined,
						})}
					>
						{({ adresse, zoneId, interventionId }) => {
							const adresseOk = !!adresse?.trim();
							const couverte = !!zoneId?.trim();
							if ((!adresseOk || !couverte) && interventionId) {
								form.setFieldValue("forfait_id", "");
							}

							if (!adresseOk) return null;

							if (couverte) {
								return (
									<form.Field
										name="forfait_id"
										validators={{
											onChange: ({ value }) =>
												!value?.trim() ? "Forfait requis" : "",
										}}
									>
										{(field) => (
											<FormContainer>
												<Label>Forfait</Label>
												<ForfaitSelector
													forfaits={forfaits}
													titre={forfait}
													setTitre={setForfait}
													field={field}
												/>
											</FormContainer>
										)}
									</form.Field>
								);
							}
						}}
					</form.Subscribe>
					<form.Subscribe
						selector={(s) => ({
							adresse: s.values.adresse as string | undefined,
							zoneId: s.values.zone_id as string | undefined,
						})}
					>
						{({ adresse, zoneId }) => {
							const adresseOk = !!adresse?.trim();
							const couverte = !!zoneId?.trim();

							if (!adresseOk) return null;

							if (couverte) {
								return (
									<form.Field
										name="detail"
									>
										{(field) => (
											<FormContainer>
												<Label>Détails</Label>
												<Textarea
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
												/>
											</FormContainer>
										)}
									</form.Field>
								);
							}
						}}
					</form.Subscribe>
					<CardFooter>
						<Button className="w-full" onClick={() => form.handleSubmit()}>
							Réserver
						</Button>
					</CardFooter>
				</CardContent>
			</Card>
		</section>
	);
}
