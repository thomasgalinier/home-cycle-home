import type { Forfait } from "../type/forfait";

const API_URL = import.meta.env.VITE_API_URL;
export async function getForfait(titre?: string) {
	const params = new URLSearchParams(titre ? { titre } : {}).toString();
	const response = await fetch(`${API_URL}/forfait?${params}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	return await response.json();
}
export async function createForfait(data: Omit<Forfait, "id">) {
	const response = await fetch(`${API_URL}/forfait/create`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(data),
	});
	return await response.json();
}
export async function deleteForfait(id: string) {
	const response = await fetch(`${API_URL}/forfait/delete/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	return await response.json();
}
export async function updateForfait(data: Forfait) {
	const response = await fetch(`${API_URL}/forfait/update/${data.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(data),
	});
	return await response.json();
}
