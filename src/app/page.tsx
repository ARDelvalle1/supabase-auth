'use client'

import { useEffect } from 'react'
import { supabase } from '@core/lib/supabaseClient'

export default function HomePage() {
  useEffect(() => {
    const syncUsuario = async () => {
      const { data } = await supabase.auth.getSession()
      const token = data?.session?.access_token

      if (!token) return

      try {
        const res = await fetch('http://localhost:3002/auth/supabase/sync', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const usuario = await res.json()
        console.log('Usuario sincronizado:', usuario)

        if (usuario.rol === 'ADMIN') {
          window.location.href = '/admin'
        } else {
          window.location.href = '/usuario'
        }
      } catch (err) {
        console.error('Error al sincronizar:', err)
      }
    }

    syncUsuario()
  }, [])

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) console.error('Error al iniciar sesión:', error)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Login con Supabase</h1>
      <button
        onClick={loginWithGoogle}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Iniciar sesión con Google
      </button>
    </main>
  )
}