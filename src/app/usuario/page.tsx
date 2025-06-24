'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@core/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function UsuarioPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkRol = async () => {
      const { data } = await supabase.auth.getSession()
      const token = data?.session?.access_token

      if (!token) return router.push('/')

      const res = await fetch('http://localhost:3002/auth/supabase/sync', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
      })

      const usuario = await res.json()
      if (usuario.rol !== 'USUARIO') {
        return router.push('/')
      }

      setLoading(false)
    }

    checkRol()
  }, [router])

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return <p>Cargando...</p>

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600">Dashboard de Usuario</h1>
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
      >
        Cerrar sesión
      </button>
    </main>
  )
}