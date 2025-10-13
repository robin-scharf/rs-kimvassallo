import { getTerms } from '@/lib/api';
import { Terms } from '@/types/strapi';
import RichText from '@/components/RichText';
import Link from 'next/link';

export default async function TermsPage() {
  let terms: Terms | null = null;

  try {
    terms = await getTerms();
  } catch (error) {
    console.error('Failed to fetch terms of service:', error);
  }

  return (
    <div className="min-h-screen bg-[#f5f1ed]">
      {/* Header */}
      <header className="bg-[#f5f1ed] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Link href="/" className="text-teal-700 hover:text-teal-800 text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {!terms ? (
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'var(--font-lora), Lora, serif' }}>
              Terms of Service
            </h1>
            <p className="text-gray-600">Content not available. Please check back later.</p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'var(--font-lora), Lora, serif' }}>
              {terms.title}
            </h1>
            {terms.lastUpdated && (
              <p className="text-sm text-gray-600 mb-8">
                Last Updated: {new Date(terms.lastUpdated).toLocaleDateString()}
              </p>
            )}
            <div className="prose prose-lg max-w-none">
              <RichText content={terms.content} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
