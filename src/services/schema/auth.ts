import * as z from "zod";

export const SigninSchema = z.object({
    email: z.string().email({message: "Email invalide"}),
    password: z.string().min(2, {message: "Le mot de passe doit contenir au moins 6 caractères"}),
})