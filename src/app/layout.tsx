import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SupabaseProvider } from '@core/lib/supabaseProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Animal ONG',
  description: 'Adopción y donación para animales',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
