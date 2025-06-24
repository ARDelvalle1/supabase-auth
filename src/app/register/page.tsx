'use client'

import { useState } from 'react'
import { supabase } from '@core/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const email = (form.email as any).value
    const password = (form.password as any).value

    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Esto es útil si tenés activada verificación por email
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      // Si no usás verificación por email, podés redirigir directamente
      router.push('/dashboard')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl mb-4">Registro</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input type="email" name="email" placeholder="Correo" required className="p-2 border rounded" />
        <input type="password" name="password" placeholder="Contraseña" required className="p-2 border rounded" />
        <button type="submit" className="bg-green-600 text-white py-2 rounded">
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  )
}
