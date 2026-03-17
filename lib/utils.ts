import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) {
    return `₦${(value / 1000).toLocaleString('en-US').replace(/,/g, '.')}B`;
  }
  if (value >= 1_000_000) {
    return `₦${(value / 1000).toLocaleString('en-US').replace(/,/g, '.')}M`;
  }
  if (value >= 1000) {
    return `₦${(value / 1000).toLocaleString('en-US').replace(/,/g, '.')}k`;
  }
  return `₦${value.toLocaleString('en-US')}`;
}
