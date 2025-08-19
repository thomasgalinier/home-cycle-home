import type { User } from "@/services/type/auth.ts";

const API_URL = import.meta.env.VITE_API_URL;
export const deleteUser = async (id: string) => {
	const response = await fetch(`${API_URL}/auth/delete/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	return await response.json();
};

export const getAllUsers = async () => {
	const response = await fetch(`${API_URL}/auth/all`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	return await response.json();
};
export async function updateUser(data: User) {
	const response = await fetch(`${API_URL}/auth/update/${data.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(data),
	});
	return await response.json();
}
export async function createUser(data: Omit<User, "id" | "createdAt">) {
	const response = await fetch(`${API_URL}/auth/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(data),
	});
	return await response.json();
}
export async function getTechniciens() {
	const response = await fetch(`${API_URL}/auth/technicien`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	return await response.json();
}

export async function getClients(){
	const response = await fetch(`${API_URL}/auth/client`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	return await response.json();
}