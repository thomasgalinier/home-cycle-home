import { FormContainer } from "@/components/FormContainer";
import { FormHelperText } from "@/components/FormHelperText";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateForfait } from "@/hooks/forfait/useCreateForfait";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { EuroIcon } from "lucide-react";

export const Route = createFileRoute("/_authenticated/forfait/create")({
	component: RouteComponent,
});

function RouteComponent() {
	const queryClient = useQueryClient();
	const { form } = useCreateForfait(queryClient);
	return (
		<Card className="w-3/4 mx-auto">
			<CardHeader>Créer un forfait</CardHeader>
			<CardContent className="flex flex-col gap-6">
				<form.Field
					name="titre"
					validators={{
						onBlur: ({ value }) =>
							!value.trim() ? "Le titre est requis" : undefined,
					}}
				>
					{(field) => (
						<FormContainer>
							<Label htmlFor="titre">Titre</Label>
							<Input
								id="titre"
								placeholder="Entrez le titre du forfait"
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								onBlur={field.handleBlur}
							/>
							{field.state.meta.errors.length > 0 && (
								<FormHelperText>{field.state.meta.errors[0]}</FormHelperText>
							)}
						</FormContainer>
					)}
				</form.Field>
				<form.Field
					name="description"
					validators={{
						onBlur: ({ value }) =>
							!value.trim() ? "La description est requise" : undefined,
					}}
				>
					{(field) => (
						<FormContainer>
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								placeholder="Entrez la description du forfait"
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								onBlur={field.handleBlur}
							/>
							{field.state.meta.errors.length > 0 && (
								<FormHelperText>{field.state.meta.errors[0]}</FormHelperText>
							)}
						</FormContainer>
					)}
				</form.Field>
				<form.Field name="type">
					{(field) => (
						<FormContainer>
							<Label htmlFor="type">Type</Label>
							<Select
								value={field.state.value}
								onValueChange={(value) => field.handleChange(value)}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Sélectionnez le type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="reparation">Réparation</SelectItem>
									<SelectItem value="entretien">Entretien</SelectItem>
								</SelectContent>
							</Select>
						</FormContainer>
					)}
				</form.Field>
				<form.Field name="categorie_velo">
					{(field) => (
						<FormContainer>
							<Label htmlFor="categorie_velo">Catégorie de vélo</Label>
							<Select
								value={field.state.value}
								onValueChange={(value) => field.handleChange(value)}
							>
								<SelectTrigger className="w-full" onBlur={field.handleBlur}>
									<SelectValue placeholder="Sélectionnez la catégorie de vélo" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="route">Route</SelectItem>
									<SelectItem value="vtt">VTT</SelectItem>
									<SelectItem value="ville">Ville</SelectItem>
									<SelectItem value="electrique">Électrique</SelectItem>
									<SelectItem value="autre">Autre</SelectItem>
								</SelectContent>
							</Select>
							{field.state.meta.errors.length > 0 && (
								<FormHelperText>{field.state.meta.errors[0]}</FormHelperText>
							)}
						</FormContainer>
					)}
				</form.Field>
				<form.Field name="duree">
					{(field) => (
						<FormContainer>
							<Label htmlFor="duree">Durée</Label>
							<Input
								id="duree"
								type="time"
								placeholder="Entrez la durée du forfait"
								value={field.state.value}
								// onChange={(e) => console.log(e.target.value)}
								onBlur={field.handleBlur}
							/>
							{field.state.meta.errors.length > 0 && (
								<FormHelperText>{field.state.meta.errors[0]}</FormHelperText>
							)}
						</FormContainer>
					)}
				</form.Field>
				<form.Field
					name="prix"
					validators={{
						onBlur: ({ value }) =>
							!value.trim() ? "Le prix est requis" : undefined,
					}}
				>
					{(field) => (
						<FormContainer>
							<Label htmlFor="prix">Prix</Label>
							<div className="flex gap-2 items-center">
								<Input
									id="prix"
									placeholder="Entrez le prix du forfait"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
								/>
								<EuroIcon />
							</div>
							{field.state.meta.errors.length > 0 && (
								<FormHelperText>{field.state.meta.errors[0]}</FormHelperText>
							)}
						</FormContainer>
					)}
				</form.Field>
				<Button onClick={form.handleSubmit}>Créer le forfait</Button>
			</CardContent>
		</Card>
	);
}
