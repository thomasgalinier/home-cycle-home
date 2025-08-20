import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convertit des horaires "H:MM" ou "HH:MM" en { hour, minute }
// Ex: "8:30" -> {hour: 8, minute: 30}
//      "08:05" -> {hour: 8, minute: 5}
//      "9" -> {hour: 9, minute: 0}
export function parseTimeHM(time: string): { hour: number; minute: number } {
  if (!time) throw new Error('time is required')
  const trimmed = time.trim()
  // Supporte "H", "HH", "H:MM", "HH:MM"
  const parts = trimmed.split(':')
  const hourStr = parts[0]
  const minStr = parts[1] ?? '0'

  if (hourStr === '') throw new Error('invalid time')
  // Autoriser 0-23 pour l'heure, 0-59 pour la minute
  const hour = Number(hourStr)
  const minute = Number(minStr)

  if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
    throw new Error('invalid hour')
  }
  if (!Number.isInteger(minute) || minute < 0 || minute > 59) {
    throw new Error('invalid minute')
  }
  return { hour, minute }
}
