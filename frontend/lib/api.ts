export async function getService(slug: string) {
  const data = await fetchAPI(
    `/service?filters[slug][$eq]=${slug}&populate=image`
  )
  return data?.data?.[0] || null
}
const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api'

export async function fetchAPI(endpoint: string, options = {}) {
  const url = `${API_URL}${endpoint}`

  console.log(`[API] Fetching: ${url}`)

  try {
    const response = await fetch(url, {
      ...options,
      // Use short revalidation (1 second) as fallback + on-demand revalidation
      // This ensures fresh data while allowing webhook-based instant updates
      next: { revalidate: 1 },
    })

    console.log(`[API] Response status for ${endpoint}: ${response.status}`)

    if (!response.ok) {
      console.error(
        `[API] Failed: ${response.status} ${response.statusText} for ${endpoint}`
      )
      const errorText = await response.text()
      console.error(`[API] Error body:`, errorText)
      return null
    }

    const data = await response.json()
    console.log(`[API] Success for ${endpoint}:`, data)
    return data
  } catch (error) {
    console.error(
      `[API] Error for ${endpoint}:`,
      error instanceof Error ? error.message : 'Unknown error',
      error
    )
    return null
  }
}

export async function getHeader() {
  const data = await fetchAPI('/header')
  return data?.data || null
}

export async function getMenuItems() {
  const data = await fetchAPI('/menu-items?sort=order:asc')
  return data?.data || []
}

export async function getHero() {
  const data = await fetchAPI('/hero?populate=backgroundImage')
  return data?.data || null
}

export async function getAbout() {
  const data = await fetchAPI('/about?populate=*')
  return data?.data || null
}

export async function getServices() {
  const data = await fetchAPI('/service?populate[columns][populate]=image')
  return data?.data || null
}

export async function getContact() {
  const data = await fetchAPI('/contact')
  return data?.data || null
}

export async function getGlobal() {
  const data = await fetchAPI('/global?populate=defaultSeo')
  return data?.data || null
}

export async function getFooter() {
  const data = await fetchAPI('/footer')
  return data?.data || null
}


export async function getTerms() {
  const data = await fetchAPI('/terms-of-service')
  return data?.data || null
}

export async function getPrivacy() {
  const data = await fetchAPI('/privacy-policy')
  return data?.data || null
}
