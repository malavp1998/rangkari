import { NextResponse } from 'next/server'

// POST /api/webhook/razorpay — Razorpay payment webhook
// Verifies signature, marks order paid, sends confirmation email
// Implemented in Phase 4
export async function POST() {
  return NextResponse.json({ error: 'Not implemented yet' }, { status: 501 })
}
