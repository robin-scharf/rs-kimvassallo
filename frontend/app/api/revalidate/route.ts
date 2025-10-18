import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Verify the secret token to prevent unauthorized revalidation
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { model, path } = body

    console.log('Revalidation triggered:', { model, path })

    // Revalidate specific paths based on the content type
    if (path) {
      revalidatePath(path)
      console.log(`Revalidated path: ${path}`)
    } else {
      // Revalidate home page for most content types
      revalidatePath('/', 'layout')

      // Revalidate specific pages based on model
      switch (model) {
        case 'home':
        case 'global':
        case 'about':
        case 'approach':
        case 'approach-item':
        case 'service':
        case 'contact':
        case 'insurance-provider':
          revalidatePath('/')
          break
        case 'privacy-policy':
          revalidatePath('/privacy-policy')
          break
        case 'terms-of-service':
          revalidatePath('/terms-of-service')
          break
        default:
          // Revalidate all pages if model is unknown
          revalidatePath('/', 'layout')
      }

      console.log(`Revalidated content type: ${model}`)
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: `Successfully revalidated ${path || model}`,
    })
  } catch (err) {
    console.error('Error revalidating:', err)
    return NextResponse.json(
      {
        message: 'Error revalidating',
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
