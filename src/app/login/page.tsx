'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@core/lib/supabaseClient'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const email = (form.email as any).value
    const password = (form.password as any).value

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  const handleOAuth = async (provider: 'google' | 'facebook' | 'azure') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })
    if (error) alert(error.message)
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-md shadow-md">
      <h1 className="text-2xl mb-4">Iniciar sesión</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input type="email" name="email" placeholder="Correo" required className="p-2 border rounded" />
        <input type="password" name="password" placeholder="Contraseña" required className="p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          {loading ? 'Cargando...' : 'Ingresar'}
        </button>
      </form>

      <hr className="my-6" />

      <div className="flex flex-col gap-2">
        <button onClick={() => handleOAuth('google')} className="bg-red-500 text-white py-2 rounded">Google</button>
        <button onClick={() => handleOAuth('facebook')} className="bg-blue-700 text-white py-2 rounded">Facebook</button>
        <button onClick={() => handleOAuth('azure')} className="bg-gray-700 text-white py-2 rounded">Outlook</button>
      </div>
    </div>
  )
}
