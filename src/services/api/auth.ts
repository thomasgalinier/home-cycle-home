import type { User } from "@/services/type/auth.ts";

const API_URL = import.meta.env.VITE_API_URL;
export async function signin(value: { email: string; password: string }) {
	const response = await fetch(`${API_URL}/auth/signin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(value),
	});
	return await response.json();
}
export async function getMe(): Promise<User> {
	const response = await fetch(`${API_URL}/auth/me`, {
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Failed to fetch user data");
	}
	return await response.json();
}
export async function logout() {
	const response = await fetch(`${API_URL}/auth/logout`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	await response.json();
}

export async function signup(user: { nom: string, prenom: string, email: string, password:string, telephone: string}) {
	const response = await fetch(`${API_URL}/auth/client/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(user),
	});
	return await response.json();
}