import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { requireAuth, UnauthorizedError } from '@/lib/auth-utils'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  try {
    await requireAuth()
  } catch (e) {
    if (e instanceof UnauthorizedError) redirect('/admin/login')
    throw e
  }
  return (
    <div className="flex min-h-screen" style={{ background: 'var(--surface)' }}>
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-8 pt-20 lg:pt-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}
