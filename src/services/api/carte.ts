import type { ZoneType } from "../type/carte";

const API_URL = import.meta.env.VITE_API_URL;
export async function getZone() {
  const response = await fetch(`${API_URL}/carte`, {
    headers:{
        'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return response.json();
}
export async function createZone(zoneData: Omit<ZoneType, 'id'>) {
  const response = await fetch(`${API_URL}/carte/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(zoneData),
  });
  
  return response.json();
}
export async function deleteZone(zoneId: string) {
  const response = await fetch(`${API_URL}/carte/delete/${zoneId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  
  return response.json();
}
export async function updadteZone(zone: ZoneType) {
  
  const response = await fetch(`${API_URL}/carte/update/${zone.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(zone),
  });
  
  return response.json();
}

export async function assignTechnicianToZone(zoneId: string, technicienId: string) {
  const response = await fetch(`${API_URL}/carte/${zoneId}/assign-technician`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ technicienId }),
  });

  return response.json();
}