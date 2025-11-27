import { APP_CONFIG } from "../config"

export function formatCurrency(amount: number): string {
  return `${APP_CONFIG.defaultCurrency}${Math.abs(amount).toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function formatDateShort(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
  })
}
