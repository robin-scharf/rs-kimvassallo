import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiImageUrl(imageUrl: string): string {
  // If the URL is already absolute (starts with http/https), use it directly
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl
  }

  // Otherwise, prepend the Strapi base URL
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '') || 'http://localhost:1337'
  return `${strapiUrl}${imageUrl}`
}
