'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@core/lib/supabaseClient'

export default function HomePage() {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      const userEmail = data?.user?.email ?? null
      setEmail(userEmail)
    }

    getUser()
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-100 to-green-200 text-gray-800 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">🐾 Bienvenido a AnimalONG</h1>
        <p className="mb-4 text-lg">
          Esta es la página principal de tu sesión activa. Desde aquí podrás acceder a todas las funciones como publicar casos de adopción, gestionar tu perfil o donar.
        </p>
        {email ? (
          <p className="text-green-700 font-semibold">Sesión iniciada como: {email}</p>
        ) : (
          <p className="text-gray-500">Cargando información del usuario...</p>
        )}
      </div>
    </main>
  )
}
