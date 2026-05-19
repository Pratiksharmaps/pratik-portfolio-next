// components/ui/SEOHead.tsx
import Head from 'next/head'
import Script from 'next/script'
import { siteConfig } from '@/data/portfolio'

interface SEOHeadProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  schema?: object
  noIndex?: boolean
}

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage,
  schema,
  noIndex = false,
}: SEOHeadProps) {
  const fullTitle = title ? `${title} | Pratik Sharma` : `Pratik Sharma — Flutter Developer`
  const desc = description || siteConfig.description
  const url = canonical ? `${siteConfig.url}${canonical}` : siteConfig.url
  const image = ogImage || `${siteConfig.url}/og-image.png`

  return (
    <>
      <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={siteConfig.keywords.join(', ')} />
      <meta name="author" content="Pratik Sharma" />
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Pratik Sharma Portfolio" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      {/* Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#00D4FF" />

      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />

      </Head>

      {/* Structured data */}
      {schema && (
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      {/* Google Analytics */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script 
            strategy="afterInteractive" 
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} 
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });
              `,
            }}
          />
        </>
      )}
    </>
  )
}
