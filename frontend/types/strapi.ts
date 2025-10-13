export interface Home {
  id: number
  documentId: string
  name: string
  credentials: string
  tagline: string
  description: string
  heroImage?: {
    url: string
    alternativeText: string
  }
}

export interface About {
  id: number
  documentId: string
  title: string
  profilePhoto?: {
    url: string
    alternativeText: string
  }
  blocks: Block[]
}

export interface Approach {
  id: number
  documentId: string
  title: string
  content: string
}

export interface Service {
  id: number
  documentId: string
  title: string
  description: string
  order: number
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
  location: string
  offersOnlineAppointments: boolean
  acceptsInsurance: boolean
  footerText?: string
  footerDisclaimer?: string
  noSurprisesActLink?: string
  therapyFee?: string
  defaultSeo?: {
    metaTitle: string
    metaDescription: string
  }
}

export interface ApproachItem {
  id: number
  documentId: string
  name: string
  order: number
}

export interface InsuranceProvider {
  id: number
  documentId: string
  name: string
  order: number
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

export interface Block {
  id: number
  __component: string
  body?: string
  file?: {
    url: string
    alternativeText: string
  }
  title?: string
}
