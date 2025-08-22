import { FormContainer } from "@/components/FormContainer";
import { FormHelperText } from "@/components/FormHelperText";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateClientAccount } from "@/hooks/comptes/useCreateClientAccount";
import { createFileRoute } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/auth/signup")({
	component: RouteComponent,
});

function RouteComponent() {
	const [showPassword, setShowPassword] = useState(false);

	const { form } = useCreateClientAccount();
	return (
		<Card className="w-3/4 mx-auto">
			<CardHeader>Inscrivez vous</CardHeader>
			<CardDescription>
				Créez un compte client pour accéder à toutes les fonctionnalités.
			</CardDescription>
			<CardContent className="flex flex-col gap-6">
				<form.Field
					name="prenom"
					validators={{
						onBlur: ({ value }) =>
							!value.trim() ? "Le prénom est requis." : undefined,
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
								<FormHelperText>{field.state.meta.errors[0]}</FormHelperText>
							)}
						</FormContainer>
					)}
				</form.Field>
				<form.Field
					name="nom"
					validators={{
						onBlur: ({ value }) =>
							!value.trim() ? "Le nom est requis." : undefined,
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
								<FormHelperText>{field.state.meta.errors[0]}</FormHelperText>
							)}
						</FormContainer>
					)}
				</form.Field>
				<form.Field
					name="email"
					validators={{
						onBlur: ({ value }) => {
							if (!value.trim()) return "L'email est requis";
							if (!/\S+@\S+\.\S+/.test(value)) return "Format d'email invalide";
							return undefined;
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
								<FormHelperText>{field.state.meta.errors[0]}</FormHelperText>
							)}
						</FormContainer>
					)}
				</form.Field>
				<form.Field
					name="password"
					validators={{
						onBlur: ({ value }) => {
							if (!value.trim()) return "Le mot de passe est requis";
							if (value.length < 8)
								return "Le mot de passe doit contenir au moins 8 caractères";
							return undefined;
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
				<form.Field
					name="telephone"
					validators={{
						onBlur: ({ value }) => {
							if (!value.trim()) return "Le téléphone est requis";
							if (!/^(\+33|0)[1-9](\d{8})$/.test(value))
								return "Format de téléphone invalide";
							return undefined;
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
								<FormHelperText>{field.state.meta.errors[0]}</FormHelperText>
							)}
						</FormContainer>
					)}
				</form.Field>
			</CardContent>
			<CardFooter>
				<Button className="w-full" onClick={form.handleSubmit}>Créer le compte</Button>
			</CardFooter>
		</Card>
	);
}
