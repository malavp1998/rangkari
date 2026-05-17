'use client'

import { useActionState } from 'react'
import { Palette } from 'lucide-react'
import { signIn } from '@/lib/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(signIn, null)

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1A1A1A]">
      <div className="w-full max-w-sm space-y-8 px-4">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
            <Palette className="h-6 w-6 text-amber-400" />
          </div>
          <h1 className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold">
            Rangkari Admin
          </h1>
          <p className="text-sm text-white/50">Sign in to manage your gallery</p>
        </div>

        {/* Form */}
        <form action={action} className="space-y-4">
          {state?.error && (
            <p className="rounded-md bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {state.error}
            </p>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-white/70">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="border-white/20 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-amber-400"
              placeholder="admin@example.com"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-white/70">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="border-white/20 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-amber-400"
              placeholder="••••••••"
            />
          </div>
          <Button
            type="submit"
            disabled={pending}
            className="w-full bg-amber-400 text-[#1A1A1A] hover:bg-amber-300"
          >
            {pending ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  )
}
