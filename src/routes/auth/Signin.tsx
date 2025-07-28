import { createFileRoute } from "@tanstack/react-router";

import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
} from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useSigninForm } from "@/hooks/useSigninForm.ts";
import { FormContainer } from "@/components/FormContainer.tsx";

export const Route = createFileRoute("/auth/Signin")({
	component: Signin,
});

function Signin() {
	const { form } = useSigninForm();
	return (
		<Card className="w-full max-w-sm p-2">
			<CardHeader>Connectez vous</CardHeader>
			<CardDescription>
				Entrez votre email ci-dessous pour vous connecter à votre compte
			</CardDescription>
			<form.Field name="email">
				{(field) => (
					<FormContainer>
						<Label htmlFor="email">E-mail</Label>
						<Input
							id="email"
							type="email"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</FormContainer>
				)}
			</form.Field>
			<form.Field name="password">
				{(field) => (
					<FormContainer>
						<Label htmlFor="password">Mot de passe</Label>
						<Input
							id="password"
							type="password"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</FormContainer>
				)}
			</form.Field>
			<CardFooter>
				<Button onClick={form.handleSubmit} className="w-full">
					Connexion
				</Button>
			</CardFooter>
		</Card>
	);
}
