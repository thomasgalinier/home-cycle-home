import type { InterventionUpdate, dataBulkInterventionToBack } from "../type/intervention";

const API_URL = import.meta.env.VITE_API_URL;
export const bulkEmptyIntervention = async (data: dataBulkInterventionToBack) => {
    const response = await fetch(`${API_URL}/intervention/bulk-empty`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    })
    return await response.json()
}
export async function getInterventionByTechnicien (technicienId: string) {
    const response = await fetch(`${API_URL}/intervention/technicien/${technicienId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
    return await response.json()
}
export const deleteBulkIntervention = async ({technicien_id, date_debut, date_fin}: {technicien_id: string, date_debut: Date, date_fin: Date}) => {
    const response = await fetch(`${API_URL}/intervention/technicien/${technicien_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({date_debut: date_debut, date_fin: date_fin }),
    })
    return await response.json()
}

export const updateIntervention = async (intervention: InterventionUpdate) => {
    console.log(intervention);
    
    const response = await fetch(`${API_URL}/intervention/${intervention.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(intervention),
    })
    return await response.json()
}

export function deleteIntervention(id: string) {
    return fetch(`${API_URL}/intervention/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
}
export async function findUnplannedInterventions(query: { zone_id?: string; jour?: string }) {
    const params = new URLSearchParams(query).toString();
    const response = await fetch(`${API_URL}/intervention/unplanned?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    return await response.json();
}

export async function findPlannedInterventions(query: { zone_id?: string; jour?: string; technicien_id?: string }) {
    const params = new URLSearchParams(query).toString();
    const response = await fetch(`${API_URL}/intervention/planned?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    return await response.json();
}
export async function listClientInterventions(query:{id:string, page?:number, limit?:number}) {
    const { id, page, limit } = query;
    const params = new URLSearchParams({
        ...(page !== undefined ? { page: String(page) } : {}),
        ...(limit !== undefined ? { limit: String(limit) } : {}),
    }).toString();
    const response = await fetch(`${API_URL}/intervention/client/${id}?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    return await response.json();
}