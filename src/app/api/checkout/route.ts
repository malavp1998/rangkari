import { NextResponse } from 'next/server'

// POST /api/checkout — creates Razorpay order, saves pending order to DB
// Implemented in Phase 4
export async function POST() {
  return NextResponse.json({ error: 'Not implemented yet' }, { status: 501 })
}
