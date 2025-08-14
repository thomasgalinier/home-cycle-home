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