import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'A Breve Online | The Antiques',
  description: 'Questa pagina sarà disponibile a breve.',
}

export default function ComingSoonPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
      <h1 className="text-manifesto text-center mb-6">A Breve Online</h1>
      <p className="text-body text-text-secondary text-center max-w-md mb-8">
        Questa pagina è in fase di sviluppo e sarà disponibile a breve.
      </p>
      <Link href="/" className="btn-pill">
        <ArrowLeft className="w-4 h-4" />
        Torna alla Home
      </Link>
    </div>
  )
}
