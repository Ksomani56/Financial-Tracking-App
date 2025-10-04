import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useSettings } from '@/lib/settings-context'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrencyINR(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
}

export function useCurrencyFormatter() {
  const { settings } = useSettings()
  const locale = settings.currency === 'INR' ? 'en-IN' : 'en-US'
  const currency = settings.currency || 'INR'
  return (amount: number, maximumFractionDigits: number = 0) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits }).format(amount)
}
