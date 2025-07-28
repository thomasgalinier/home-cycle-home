import { DialogContent, DialogHeader } from "@/components/ui/dialog.tsx";
import { DialogTitle } from "@radix-ui/react-dialog";

import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select.tsx";
import type { RoleType, User } from "@/services/type/auth.ts";
import { FormContainer } from "@/components/FormContainer.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useUpdateUserForm } from "@/hooks/comptes/useUpdateUserForm.ts";
import { useQueryClient } from "@tanstack/react-query";

type DialogUpdateUserProps = {
	user: User;
};
export function DialogUpdateUser({ user }: DialogUpdateUserProps) {
	const queryClient = useQueryClient();
	const { form } = useUpdateUserForm(queryClient, user);

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Modifier un utilisateur</DialogTitle>
			</DialogHeader>
			<form.Field name="prenom">
				{(field) => (
					<FormContainer>
						<Label htmlFor="prenom">Prénom</Label>
						<Input
							id="prenom"
							type="text"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</FormContainer>
				)}
			</form.Field>
			<form.Field name="nom">
				{(field) => (
					<FormContainer>
						<Label htmlFor="nom">Nom</Label>
						<Input
							id="nom"
							type="text"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</FormContainer>
				)}
			</form.Field>
			<form.Field name="email">
				{(field) => (
					<FormContainer>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</FormContainer>
				)}
			</form.Field>
			<form.Field name="role">
				{(field) => (
					<FormContainer>
						<Label htmlFor="role">Rôle</Label>
						<Select
							value={field.state.value}
							onValueChange={(value: RoleType) => field.handleChange(value)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Selectionnez un rôle" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="ADMIN">Administrateur</SelectItem>
								<SelectItem value="CLIENT">Utilisateur</SelectItem>
								<SelectItem value="SUPER_ADMIN">
									Super Administrateur
								</SelectItem>
								<SelectItem value="TECHNICIEN">Technicien</SelectItem>
							</SelectContent>
						</Select>
					</FormContainer>
				)}
			</form.Field>
			<form.Field name="telephone">
				{(field) => (
					<FormContainer>
						<Label htmlFor="telephone">Téléphone</Label>
						<Input
							id="telephone"
							type="tel"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</FormContainer>
				)}
			</form.Field>
			<Button type="submit" onClick={form.handleSubmit}>
				Modifier le compte
			</Button>
		</DialogContent>
	);
}
