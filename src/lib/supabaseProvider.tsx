'use client'

import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { supabase } from '@core/lib/supabaseClient'

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  )
}