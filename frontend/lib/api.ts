const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api'

export async function fetchAPI(endpoint: string, options = {}) {
  const url = `${API_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      ...options,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

export async function getHome() {
  const data = await fetchAPI('/home?populate=heroImage')
  return data.data
}

export async function getAbout() {
  const data = await fetchAPI('/about?populate=profilePhoto&populate=blocks')
  console.log('About data:', JSON.stringify(data, null, 2))
  return data.data
}

export async function getApproach() {
  const data = await fetchAPI('/approach')
  return data.data
}

export async function getServices() {
  const data = await fetchAPI('/services?sort=order:asc')
  return data.data
}

export async function getContact() {
  const data = await fetchAPI('/contact')
  return data.data
}

export async function getGlobal() {
  const data = await fetchAPI('/global?populate=defaultSeo')
  return data.data
}

export async function getApproachItems() {
  const data = await fetchAPI('/approach-items?sort=order:asc')
  return data.data
}

export async function getInsuranceProviders() {
  const data = await fetchAPI('/insurance-providers?sort=order:asc')
  return data.data
}

export async function getTerms() {
  const data = await fetchAPI('/terms-of-service')
  return data.data
}

export async function getPrivacy() {
  const data = await fetchAPI('/privacy-policy')
  return data.data
}
