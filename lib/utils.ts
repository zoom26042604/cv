// Utility pour merger les classes Tailwind
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formater les bytes en taille lisible
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

// Formater un nombre en pourcentage
export function formatPercent(value: number): string {
  return `${Math.round(value * 100) / 100}%`
}

// Formater une durée en uptime lisible
export function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  
  const parts = []
  if (days > 0) parts.push(`${days}d`)
  if (hours > 0) parts.push(`${hours}h`)
  if (minutes > 0) parts.push(`${minutes}m`)
  
  return parts.join(' ') || '< 1m'
}

// Parser les stats CPU
export function parseCpuPercent(cpuStats: string): number {
  // Format: "12.34%"
  return parseFloat(cpuStats.replace('%', '')) || 0
}

// Parser les stats mémoire
export function parseMemoryStats(memStats: string): { used: number; total: number } {
  // Format: "1.5GiB / 4GiB"
  const match = memStats.match(/([0-9.]+)([A-Za-z]+)\s*\/\s*([0-9.]+)([A-Za-z]+)/)
  if (!match) return { used: 0, total: 0 }
  
  const used = parseFloat(match[1])
  const usedUnit = match[2]
  const total = parseFloat(match[3])
  const totalUnit = match[4]
  
  const multiplier: Record<string, number> = {
    'B': 1,
    'KiB': 1024,
    'MiB': 1024 * 1024,
    'GiB': 1024 * 1024 * 1024,
    'TiB': 1024 * 1024 * 1024 * 1024,
  }
  
  return {
    used: used * (multiplier[usedUnit] || 1),
    total: total * (multiplier[totalUnit] || 1),
  }
}
