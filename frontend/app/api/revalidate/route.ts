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
        case 'header':
        case 'menu-item':
        case 'hero':
        case 'about':
        case 'service':
        case 'contact':
        case 'footer':
        case 'global':
          revalidatePath('/')
          break
        case 'privacy':
          revalidatePath('/privacy')
          break
        case 'terms':
          revalidatePath('/terms')
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
