export interface Faqs {
  id: number
  title: string
  subtitle?: string
  graphic?: StrapiImage
  columns: Faq[]
}
export interface FaqGraphic {
  id: number
  image?: StrapiImage
  alt?: string
}
export interface Faq {
  id: number
  question: string
  answer: string
}
export interface StrapiImage {
  id: number
  url: string
  alternativeText?: string
  width?: number
  height?: number
  formats?: {
    thumbnail?: { url: string }
    small?: { url: string }
    medium?: { url: string }
    large?: { url: string }
  }
}

export interface Header {
  id: number
  documentId: string
  name: string
  credentials?: string
  tagline: string
  location?: string
}

export interface MenuItem {
  id: number
  documentId: string
  label: string
  anchor: string
  order: number
}

export interface Hero {
  id: number
  documentId: string
  title: string
  subtitle?: string
  backgroundImage?: StrapiImage
  backgroundColor?: string
  ctaButtonText?: string
  ctaButtonAnchor?: string
}

export interface About {
  id: number
  documentId: string
  title: string
  subtitle?: string
  profilePhoto?: StrapiImage
  content?: string
}

export interface ServiceColumn {
  id: number
  image?: StrapiImage
  title: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonLink?: string
}

export interface Services {
  id: number
  documentId: string
  title?: string
  subtitle?: string
  columns?: ServiceColumn[]
  offersOnlineAppointments: boolean
}

export interface Contact {
  id: number
  documentId: string
  title: string
  description: string
  email: string
  phone: string
  address: string
}

export interface Global {
  id: number
  documentId: string
  siteName: string
  siteDescription: string
  defaultSeo?: {
    metaTitle: string
    metaDescription: string
  }
}

export interface Footer {
  id: number
  documentId: string
  copyrightText?: string
  privacyLink?: string
  termsLink?: string
}

export interface Terms {
  id: number
  documentId: string
  title: string
  content: string
  lastUpdated?: string
}

export interface Privacy {
  id: number
  documentId: string
  title: string
  content: string
  lastUpdated?: string
}
