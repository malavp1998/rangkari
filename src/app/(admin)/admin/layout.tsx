export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* AdminSidebar will go here in Phase 2 */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
