const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api'

export async function fetchAPI(endpoint: string, options = {}) {
  const url = `${API_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      ...options,
      next: { revalidate: 10 }, // Revalidate every 10 seconds
    })

    if (!response.ok) {
      console.warn(`API call failed: ${response.status} for ${endpoint}`)
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.warn(
      `API Error for ${endpoint}:`,
      error instanceof Error ? error.message : 'Unknown error'
    )
    return null
  }
}

export async function getHome() {
  const data = await fetchAPI('/home?populate=heroImage')
  return data?.data || null
}

export async function getAbout() {
  const data = await fetchAPI('/about?populate=profilePhoto&populate=blocks')
  return data?.data || null
}

export async function getApproach() {
  const data = await fetchAPI('/approach')
  return data?.data || null
}

export async function getServices() {
  const data = await fetchAPI('/services?sort=order:asc')
  return data?.data || []
}

export async function getContact() {
  const data = await fetchAPI('/contact')
  return data?.data || null
}

export async function getGlobal() {
  const data = await fetchAPI('/global?populate=defaultSeo')
  return data?.data || null
}

export async function getApproachItems() {
  const data = await fetchAPI('/approach-items?sort=order:asc')
  return data?.data || []
}

export async function getInsuranceProviders() {
  const data = await fetchAPI('/insurance-providers?sort=order:asc')
  return data?.data || []
}

export async function getTerms() {
  const data = await fetchAPI('/terms-of-service')
  return data?.data || null
}

export async function getPrivacy() {
  const data = await fetchAPI('/privacy-policy')
  return data?.data || null
}
