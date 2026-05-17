import { createAdminClient } from '@/lib/supabase/server'
import { IndianRupee, Image, ShoppingBag, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface RecentOrder {
  order_number: string
  customer_name: string
  amount_paid: number
  status: string
  created_at: string
}

async function getStats() {
  const supabase = createAdminClient()

  const [
    { count: total },
    { count: available },
    { count: sold },
    { data: recentOrders },
    { data: revenue },
  ] = await Promise.all([
    supabase.from('paintings').select('*', { count: 'exact', head: true }),
    supabase.from('paintings').select('*', { count: 'exact', head: true }).eq('status', 'available'),
    supabase.from('paintings').select('*', { count: 'exact', head: true }).eq('status', 'sold'),
    supabase.from('orders').select('order_number, customer_name, amount_paid, status, created_at')
      .order('created_at', { ascending: false }).limit(5),
    supabase.from('orders').select('amount_paid').eq('status', 'paid'),
  ])

  const revenueRows = (revenue ?? []) as { amount_paid: number }[]
  const totalRevenue = revenueRows.reduce((sum, o) => sum + o.amount_paid, 0)

  return { total: total ?? 0, available: available ?? 0, sold: sold ?? 0, recentOrders: (recentOrders ?? []) as RecentOrder[], totalRevenue }
}

const statusColors: Record<string, string> = {
  paid:      'bg-green-100 text-green-700',
  pending:   'bg-yellow-100 text-yellow-700',
  shipped:   'bg-blue-100 text-blue-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
  packed:    'bg-purple-100 text-purple-700',
}

export default async function AdminDashboardPage() {
  const { total, available, sold, recentOrders, totalRevenue } = await getStats()

  const stats = [
    { label: 'Total Paintings', value: total, icon: Image, color: 'text-indigo-600' },
    { label: 'Available',       value: available, icon: TrendingUp, color: 'text-green-600' },
    { label: 'Sold',            value: sold, icon: ShoppingBag, color: 'text-amber-600' },
    { label: 'Revenue',         value: `₹${(totalRevenue / 100).toLocaleString('en-IN')}`, icon: IndianRupee, color: 'text-emerald-600' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-[#1A1A1A]/50">Welcome back to Rangkari admin.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#1A1A1A]/50">{label}</p>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl border border-black/5 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-black/5 px-6 py-4">
          <h2 className="font-semibold">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-[#1A1A1A]/50 hover:text-[#1A1A1A]">
            View all →
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="px-6 py-8 text-center text-sm text-[#1A1A1A]/40">No orders yet.</p>
        ) : (
          <ul className="divide-y divide-black/5">
            {recentOrders.map((order) => (
              <li key={order.order_number} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-sm font-medium">{order.order_number}</p>
                  <p className="text-xs text-[#1A1A1A]/50">{order.customer_name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">
                    ₹{(order.amount_paid / 100).toLocaleString('en-IN')}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[order.status] ?? 'bg-gray-100 text-gray-700'}`}>
                    {order.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick actions */}
      <div className="flex gap-3">
        <Link
          href="/admin/paintings/new"
          className="rounded-lg bg-[#1A1A1A] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1A1A1A]/80"
        >
          + Upload Painting
        </Link>
        <Link
          href="/admin/paintings"
          className="rounded-lg border border-black/10 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-black/5"
        >
          Manage Paintings
        </Link>
      </div>
    </div>
  )
}
