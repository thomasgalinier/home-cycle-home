import { FormContainer } from "@/components/FormContainer.tsx";
import { FormHelperText } from "@/components/FormHelperText";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select.tsx";
import { useCreateComptesForm } from "@/hooks/comptes/useCreateComptesForm.ts";
import type { RoleType } from "@/services/type/auth.ts";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/comptes/create")({
	component: RouteComponent,
});
function RouteComponent() {
	const queryClient = useQueryClient();
	const { form } = useCreateComptesForm(queryClient);
	const [showPassword, setShowPassword] = useState(false);

	return (
        <Card className="w-3/4 mx-auto">
            <CardHeader>Création d&apos;un compte admin</CardHeader>
            <CardContent className="flex flex-col gap-6">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<div className="flex flex-col gap-6">
						<form.Field
							name="prenom"
							validators={{
								onChange: ({ value }) =>
									!value.trim() ? "Le prénom est requis" : undefined,
							}}
						>
							{(field) => (
								<FormContainer>
									<Label>Prénom</Label>
									<Input
										id="prenom"
										type="text"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
									/>
									{field.state.meta.errors.length > 0 && (
										<FormHelperText>
											{field.state.meta.errors[0]}
										</FormHelperText>
									)}
								</FormContainer>
							)}
						</form.Field>

						<form.Field
							name="nom"
							validators={{
								onChange: ({ value }) =>
									!value.trim() ? "Le nom est requis" : undefined,
							}}
						>
							{(field) => (
								<FormContainer>
									<Label>Nom</Label>
									<Input
										id="nom"
										type="text"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
									/>
									{field.state.meta.errors.length > 0 && (
										<FormHelperText>
											{field.state.meta.errors[0]}
										</FormHelperText>
									)}
								</FormContainer>
							)}
						</form.Field>

						<form.Field
							name="email"
							validators={{
								onChange: ({ value }) => {
									if (!value.trim()) return "L'email est requis";
									if (!/\S+@\S+\.\S+/.test(value))
										return "Format d'email invalide";
									return undefined
								},
							}}
						>
							{(field) => (
								<FormContainer>
									<Label>Email</Label>
									<Input
										id="email"
										type="email"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
									/>
									{field.state.meta.errors.length > 0 && (
										<span className="text-red-500 text-sm">
											{field.state.meta.errors[0]}
										</span>
									)}
								</FormContainer>
							)}
						</form.Field>

						<form.Field
							name="password"
							validators={{
								onChange: ({ value }) => {
									if (!value.trim()) return "Le mot de passe est requis";
									if (value.length < 8)
										return "Le mot de passe doit contenir au moins 8 caractères";
									return undefined
								},
							}}
						>
							{(field) => (
								<FormContainer>
									<Label>Mot de passe</Label>
									<div className="relative">
										<Input
											id="password"
											type={showPassword ? "text" : "password"}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
											className="pr-10"
										/>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
												<EyeOff className="h-4 w-4" />
											) : (
												<Eye className="h-4 w-4" />
											)}
										</Button>
									</div>
									{field.state.meta.errors.length > 0 && (
										<span className="text-red-500 text-sm">
											{field.state.meta.errors[0]}
										</span>
									)}
								</FormContainer>
							)}
						</form.Field>

						<form.Field name="role">
							{(field) => (
								<FormContainer>
									<Label htmlFor="role">Rôle</Label>
									<Select
										value={field.state.value}
										onValueChange={(value: RoleType) =>
											field.handleChange(value)
										}
									>
										<SelectTrigger className="w-full">
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

						<form.Field
							name="telephone"
							validators={{
								onChange: ({ value }) => {
									if (!value.trim()) return "Le téléphone est requis";
									if (!/^(\+33|0)[1-9](\d{8})$/.test(value))
										return "Format de téléphone invalide";
									return undefined
								},
							}}
						>
							{(field) => (
								<FormContainer>
									<Label>Téléphone</Label>
									<Input
										id="telephone"
										type="tel"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
									/>
									{field.state.meta.errors.length > 0 && (
										<FormHelperText>
											{field.state.meta.errors[0]}
										</FormHelperText>
									)}
								</FormContainer>
							)}
						</form.Field>

						<Button type="submit" onClick={form.handleSubmit}>
							Créer le compte
						</Button>
					</div>
				</form>
			</CardContent>
        </Card>
    )
}
