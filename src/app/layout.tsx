import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'The Antiques',
  description: 'Discover unique vintage and antique pieces',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
