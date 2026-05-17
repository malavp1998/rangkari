'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signIn(
  _prev: { error: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const email    = formData.get('email')    as string
  const password = formData.get('password') as string

  if (email !== process.env.ADMIN_EMAIL) {
    return { error: 'Not authorised.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }

  redirect('/admin')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
