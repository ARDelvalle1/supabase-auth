'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@core/lib/supabaseClient'

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUserEmail(user.email)
      }
    }

    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Dashboard privado</h1>
      {userEmail && <p className="mt-2">Bienvenido, {userEmail}</p>}

      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
