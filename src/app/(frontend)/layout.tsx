import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LoadingBar } from '@/components/layout/LoadingBar'
import { getMenuCategories } from '@/lib/payload'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { menuCategories, allProducts } = await getMenuCategories()

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <Suspense fallback={null}>
          <LoadingBar />
        </Suspense>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-text-primary focus:text-bg-primary focus:rounded-md"
        >
          Skip to main content
        </a>
        <Header categories={menuCategories} allProducts={allProducts} />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer categories={menuCategories.map(c => ({ slug: c.slug, name: c.name }))} />
      </body>
    </html>
  )
}
