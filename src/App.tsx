import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  Bell,
  Car,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Gauge,
  HardDriveUpload,
  Home,
  LogIn,
  MessageSquare,
  Package,
  Search,
  Settings,
  Truck,
  UserCircle2,
  Users,
  Wallet,
  Wrench,
  XCircle,
  Zap,
} from 'lucide-react'
import { Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {
  brands,
  categories,
  conflictRows,
  customerProfile,
  dealers,
  importBatches,
  importSteps,
  inventoryHealth,
  orders,
  products,
  riskAlerts,
  type UserRole,
  vehicles,
  warehouses,
} from './lib/mockData'

type Status = 'active' | 'processing' | 'warning' | 'critical' | 'shipped' | 'delivered' | 'cancelled' | 'inactive' | 'pending' | 'completed' | 'failed'

type OrderItem = { id: string; item: string; status: Status; amount: number }
type BookingItem = { id: string; vehicle: string; service: string; date: string; status: Status }
type QuoteItem = { id: string; topic: string; status: Status }

type NavItem = { to: string; label: string; icon: ReactNode }

const statusClasses: Record<Status, string> = {
  active: 'bg-green-500/15 text-green-300 border-green-500/40',
  delivered: 'bg-green-500/15 text-green-300 border-green-500/40',
  completed: 'bg-green-500/15 text-green-300 border-green-500/40',
  processing: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
  warning: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
  pending: 'bg-slate-500/20 text-slate-300 border-slate-400/30',
  inactive: 'bg-slate-500/20 text-slate-300 border-slate-400/30',
  shipped: 'bg-blue-500/15 text-blue-300 border-blue-500/40',
  critical: 'bg-red-500/15 text-red-300 border-red-500/40',
  cancelled: 'bg-red-500/15 text-red-300 border-red-500/40',
  failed: 'bg-red-500/15 text-red-300 border-red-500/40',
}

function formatETB(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ETB', maximumFractionDigits: 0 }).format(value)
}

function StatusBadge({ status }: { status: Status }) {
  return <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${statusClasses[status]}`}>{status}</span>
}

function StatCard({ title, value, note, icon }: { title: string; value: string | number; note?: string; icon: ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-[0_0_30px_rgba(0,0,0,0.25)]">
      <div className="mb-2 flex items-center justify-between text-slate-300">
        <span className="text-xs uppercase tracking-wider">{title}</span>
        {icon}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      {note ? <p className="mt-1 text-xs text-slate-400">{note}</p> : null}
    </div>
  )
}

type Column<T> = { key: string; label: string; render: (row: T) => ReactNode }

function DataTable<T>({
  rows,
  columns,
  rowKey,
  title,
  search,
}: {
  rows: T[]
  columns: Column<T>[]
  rowKey: (row: T, idx: number) => string
  title: string
  search?: string
}) {
  const filteredRows = useMemo(() => {
    if (!search) return rows
    const lower = search.toLowerCase()
    return rows.filter((row) => JSON.stringify(row).toLowerCase().includes(lower))
  }, [rows, search])

  return (
    <section className="rounded-xl border border-white/10 bg-[#0D1117] p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-200">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-3 py-2">{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, idx) => (
              <tr key={rowKey(row, idx)} className="border-t border-white/5 even:bg-white/[0.02]">
                {columns.map((column) => (
                  <td key={column.key} className="px-3 py-2 text-slate-200">{column.render(row)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!filteredRows.length ? <EmptyState title="No results" detail="No rows matched your current filter." /> : null}
    </section>
  )
}

function EmptyState({ title, detail, action }: { title: string; detail: string; action?: ReactNode }) {
  return (
    <div className="mt-4 rounded-lg border border-dashed border-white/15 bg-white/[0.03] p-4 text-center">
      <CircleHelp className="mx-auto mb-2 h-5 w-5 text-slate-400" />
      <p className="font-semibold text-slate-100">{title}</p>
      <p className="text-sm text-slate-400">{detail}</p>
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  )
}

function SkeletonCards() {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={`skeleton-${index}`} className="h-24 animate-pulse rounded-xl border border-white/10 bg-white/5" />
      ))}
    </div>
  )
}

function ErrorAlert({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
      <p className="font-semibold">Data error</p>
      <p>{message}</p>
    </div>
  )
}

function TopBar({ role, setRole }: { role: UserRole; setRole: (role: UserRole) => void }) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-white/10 bg-[#0A0A0F]/95 px-4 backdrop-blur">
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300">
        <Search className="h-4 w-4" />
        Search products, orders, imports
      </div>
      <div className="flex items-center gap-2">
        <select
          value={role}
          onChange={(event) => setRole(event.target.value as UserRole)}
          className="rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-sm text-slate-100"
        >
          <option value="public">Public</option>
          <option value="customer">Customer</option>
          <option value="inventory_manager">Inventory Manager</option>
          <option value="admin">Admin</option>
        </select>
        <Bell className="h-5 w-5 text-slate-300" />
        <UserCircle2 className="h-6 w-6 text-slate-200" />
      </div>
    </header>
  )
}

function SidebarNav({ title, items }: { title: string; items: NavItem[] }) {
  const location = useLocation()
  return (
    <aside className="h-full border-r border-white/10 bg-[#0D1117] p-3">
      <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-400">{title}</p>
      <nav className="space-y-1">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
              location.pathname === item.to ? 'bg-blue-500/20 text-blue-200' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

function DashboardLayout({ role, setRole, children }: { role: UserRole; setRole: (role: UserRole) => void; children: ReactNode }) {
  const customerItems: NavItem[] = [
    { to: '/customer', label: 'Dashboard', icon: <Home className="h-4 w-4" /> },
    { to: '/customer/vehicles', label: 'Vehicles', icon: <Car className="h-4 w-4" /> },
    { to: '/customer/orders', label: 'Orders', icon: <Package className="h-4 w-4" /> },
    { to: '/customer/bookings', label: 'Bookings', icon: <Wrench className="h-4 w-4" /> },
    { to: '/customer/service-history', label: 'Service History', icon: <Gauge className="h-4 w-4" /> },
    { to: '/customer/quotes', label: 'Quotes', icon: <MessageSquare className="h-4 w-4" /> },
    { to: '/customer/payments', label: 'Payments', icon: <Wallet className="h-4 w-4" /> },
    { to: '/customer/wishlist', label: 'Wishlist', icon: <Zap className="h-4 w-4" /> },
    { to: '/customer/messages', label: 'Messages', icon: <MessageSquare className="h-4 w-4" /> },
    { to: '/customer/settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
  ]

  const inventoryItems: NavItem[] = [
    { to: '/inventory-os', label: 'Command Center', icon: <HardDriveUpload className="h-4 w-4" /> },
    { to: '/inventory-os/inventory', label: 'Inventory', icon: <Package className="h-4 w-4" /> },
    { to: '/inventory-os/imports', label: 'Imports', icon: <Truck className="h-4 w-4" /> },
    { to: '/inventory-os/warehouses', label: 'Warehouses', icon: <Home className="h-4 w-4" /> },
    { to: '/inventory-os/dealers', label: 'Dealers', icon: <Users className="h-4 w-4" /> },
    { to: '/inventory-os/reports', label: 'Reports', icon: <Gauge className="h-4 w-4" /> },
    { to: '/admin/bulk-upload', label: 'Bulk Upload', icon: <UploadMark /> },
  ]

  const isCustomer = role === 'customer'
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[240px_1fr]">
        <div className="hidden lg:block">
          <SidebarNav title={isCustomer ? 'Customer Portal' : 'Inventory OS'} items={isCustomer ? customerItems : inventoryItems} />
        </div>
        <div>
          <TopBar role={role} setRole={setRole} />
          <main className="space-y-4 p-4">{children}</main>
        </div>
      </div>
    </div>
  )
}

function UploadMark() {
  return <HardDriveUpload className="h-4 w-4" />
}

function PublicLayout({ children, role, setRole }: { children: ReactNode; role: UserRole; setRole: (role: UserRole) => void }) {
  const links = [
    ['/', 'Home'],
    ['/vehicles', 'Vehicles'],
    ['/parts', 'Parts'],
    ['/electric-mobility', 'Electric'],
    ['/services', 'Services'],
    ['/dealers', 'Dealers'],
    ['/about', 'About'],
    ['/contact', 'Contact'],
  ]
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0A0A0F]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="text-lg font-black tracking-wider text-red-500">3B MOTORS</Link>
          <nav className="flex flex-wrap gap-4 text-sm text-slate-300">
            {links.map(([to, label]) => (
              <Link key={to} to={to} className="hover:text-white">{label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as UserRole)}
              className="rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-xs text-slate-100"
            >
              <option value="public">Public</option>
              <option value="customer">Customer</option>
              <option value="inventory_manager">Inventory Manager</option>
              <option value="admin">Admin</option>
            </select>
            <Link to="/contact" className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold hover:bg-red-500">Contact Us</Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
      <footer className="border-t border-white/10 bg-[#0D1117] px-4 py-6 text-sm text-slate-400">© 2026 3B Motors Ethiopia — Mobility OS</footer>
    </div>
  )
}

function RequireRole({ role, allowed, children }: { role: UserRole; allowed: UserRole[]; children: ReactNode }) {
  if (!allowed.includes(role)) return <Navigate to="/" replace />
  return <>{children}</>
}

function PublicHomePage() {
  const [query, setQuery] = useState('')
  const filteredProducts = useMemo(() => products.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(query.toLowerCase())), [query])

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0F1623] to-[#0A0A0F] p-8">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-300">African Mobility, Enterprise Grade</p>
        <h1 className="mt-2 text-4xl font-black uppercase tracking-wide">Cinematic Mobility Platform for 3B Motors</h1>
        <p className="mt-3 max-w-3xl text-slate-300">Discover vehicles, request quotes, book services, and connect with Ethiopia-wide dealer network from a single operating platform.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="rounded-lg bg-red-600 px-4 py-2 font-semibold">Book a Service</button>
          <button className="rounded-lg border border-white/20 px-4 py-2">Request Quote</button>
          <button className="rounded-lg border border-white/20 px-4 py-2">WhatsApp Support</button>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <article key={category} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200">{category}</article>
        ))}
      </section>

      <section className="rounded-xl border border-white/10 bg-[#0D1117] p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold">Product Discovery</h2>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products"
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-slate-100"
          />
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.slice(0, 6).map((item) => (
            <article key={item.sku} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <p className="text-sm text-slate-300">{item.brand}</p>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-slate-400">{item.category}</p>
              <p className="mt-2 text-red-400">{formatETB(item.price)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-2">
        <article className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="mb-2 text-base font-semibold">Dealer Network</h3>
          <div className="space-y-2">
            {dealers.map((dealer) => (
              <div key={dealer.name} className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0D1117] px-3 py-2">
                <div>
                  <p>{dealer.name}</p>
                  <p className="text-xs text-slate-400">{dealer.region}</p>
                </div>
                <StatusBadge status={dealer.status as Status} />
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="mb-2 text-base font-semibold">Trusted Brands</h3>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <span key={brand} className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-300">{brand}</span>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}

function PublicSimplePage({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-xl border border-white/10 bg-[#0D1117] p-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-slate-300">{body}</p>
    </section>
  )
}

function ContactPage() {
  const [sent, setSent] = useState(false)
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }
  return (
    <section className="rounded-xl border border-white/10 bg-[#0D1117] p-6">
      <h1 className="text-2xl font-bold">Contact 3B Motors</h1>
      <form onSubmit={submit} className="mt-4 grid gap-3 md:grid-cols-2">
        <input required placeholder="Full name" className="rounded-lg border border-white/15 bg-white/5 px-3 py-2" />
        <input required placeholder="Phone" className="rounded-lg border border-white/15 bg-white/5 px-3 py-2" />
        <textarea required placeholder="Message" className="min-h-24 rounded-lg border border-white/15 bg-white/5 px-3 py-2 md:col-span-2" />
        <button type="submit" className="rounded-lg bg-red-600 px-4 py-2 font-semibold md:col-span-2">Send inquiry</button>
      </form>
      {sent ? <p className="mt-3 text-sm text-green-300">Inquiry submitted. Team will contact you shortly.</p> : null}
    </section>
  )
}

function CustomerDashboard() {
  const [ordersState, setOrdersState] = useState<OrderItem[]>(orders as OrderItem[])
  const [feedback, setFeedback] = useState('')

  const markTracked = (id: string) => {
    setFeedback(`Tracking opened for ${id}.`)
  }

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-white/10 bg-[#0F1623] p-4">
        <h1 className="text-2xl font-black">Welcome back, {customerProfile.name}!</h1>
        <p className="text-slate-300">{customerProfile.tier} • {customerProfile.loyaltyPoints} pts • valid till {customerProfile.validTill}</p>
      </section>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Orders" value={12} icon={<Package className="h-4 w-4" />} />
        <StatCard title="Active Bookings" value={2} icon={<Wrench className="h-4 w-4" />} />
        <StatCard title="Vehicles Owned" value={2} icon={<Car className="h-4 w-4" />} />
        <StatCard title="Pending Payments" value={1} icon={<Wallet className="h-4 w-4" />} />
      </div>

      <section className="grid gap-3 lg:grid-cols-2">
        <article className="rounded-xl border border-white/10 bg-[#0D1117] p-4">
          <h3 className="mb-2 text-sm font-semibold text-slate-300">My Vehicles</h3>
          <div className="space-y-2">
            {vehicles.map((vehicle) => (
              <div key={vehicle.plate} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <p className="font-semibold">{vehicle.name}</p>
                <p className="text-xs text-slate-400">{vehicle.color} • {vehicle.plate} • {vehicle.year} • {vehicle.km} km</p>
                {vehicle.primary ? <span className="mt-2 inline-block rounded-full border border-blue-500/40 bg-blue-500/20 px-2 py-0.5 text-xs text-blue-200">Primary</span> : null}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-white/10 bg-[#0D1117] p-4">
          <h3 className="mb-2 text-sm font-semibold text-slate-300">Quick Actions</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {['Book a Service', 'Request a Quote', 'Buy Spare Parts', 'Find a Dealer', 'Download Brochure'].map((action) => (
              <button key={action} onClick={() => setFeedback(`${action} triggered.`)} className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-left text-sm hover:bg-white/10">{action}</button>
            ))}
          </div>
        </article>
      </section>

      <DataTable
        rows={ordersState}
        rowKey={(row) => row.id}
        title="Recent Orders"
        columns={[
          { key: 'id', label: 'Order', render: (row) => row.id },
          { key: 'item', label: 'Item', render: (row) => row.item },
          { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
          { key: 'amount', label: 'Amount', render: (row) => formatETB(row.amount) },
          {
            key: 'action',
            label: 'Action',
            render: (row) => (
              <button
                onClick={() => markTracked(row.id)}
                className="rounded-md border border-blue-500/40 bg-blue-500/20 px-2 py-1 text-xs text-blue-200"
              >
                Track
              </button>
            ),
          },
        ]}
      />

      <section className="grid gap-3 lg:grid-cols-3">
        <article className="rounded-xl border border-white/10 bg-[#0D1117] p-4 lg:col-span-2">
          <h3 className="mb-2 text-sm font-semibold">Delivery Progress</h3>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            {['Confirmed', 'Processing', 'Shipped', 'Delivered'].map((step, index) => (
              <div key={step} className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-1 ${index <= 2 ? 'bg-blue-500/20 text-blue-200' : 'bg-white/10'}`}>{step}</span>
                {index < 3 ? <ChevronRight className="h-3 w-3" /> : null}
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-xl border border-white/10 bg-[#0D1117] p-4">
          <h3 className="text-sm font-semibold">Upcoming Service</h3>
          <p className="mt-1 text-sm text-slate-300">TVS Apache • General Service</p>
          <p className="text-xs text-slate-400">24 May, 10:00 AM • 3B Service Center Bole</p>
          <div className="mt-2 flex gap-2">
            <button onClick={() => setFeedback('Service reschedule initiated.')} className="rounded border border-white/15 px-2 py-1 text-xs">Reschedule</button>
            <button className="rounded border border-white/15 px-2 py-1 text-xs">View Details</button>
          </div>
        </article>
      </section>

      {feedback ? <p className="rounded-lg border border-green-500/40 bg-green-500/10 p-3 text-sm text-green-200">{feedback}</p> : null}
      {ordersState.length === 0 ? <EmptyState title="No orders yet" detail="Your recent orders will appear here." /> : null}
      <button onClick={() => setOrdersState([])} className="rounded border border-white/15 px-3 py-1 text-xs text-slate-300">Demo empty state</button>
    </div>
  )
}

function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([
    { id: 'SB-1001', vehicle: 'TVS Apache RTR 160 4V', service: 'General Service', date: '2026-09-20', status: 'processing' },
    { id: 'SB-1002', vehicle: '3B EV Car X1', service: 'Battery Diagnostics', date: '2026-10-11', status: 'pending' },
  ])
  const [message, setMessage] = useState('')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const vehicle = String(formData.get('vehicle') ?? '')
    const service = String(formData.get('service') ?? '')
    const date = String(formData.get('date') ?? '')
    if (!vehicle || !service || !date) return
    const newBooking: BookingItem = { id: `SB-${Date.now()}`, vehicle, service, date, status: 'pending' }
    setBookings((prev) => [newBooking, ...prev])
    setMessage('Service booking submitted.')
    event.currentTarget.reset()
  }

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-white/10 bg-[#0D1117] p-4">
        <h2 className="text-lg font-semibold">Service Booking Form</h2>
        <form onSubmit={submit} className="mt-3 grid gap-2 md:grid-cols-4">
          <input name="vehicle" required placeholder="Vehicle" className="rounded border border-white/15 bg-white/5 px-2 py-1.5" />
          <input name="service" required placeholder="Service type" className="rounded border border-white/15 bg-white/5 px-2 py-1.5" />
          <input name="date" required type="date" className="rounded border border-white/15 bg-white/5 px-2 py-1.5" />
          <button type="submit" className="rounded bg-red-600 px-3 py-1.5">Book</button>
        </form>
        {message ? <p className="mt-2 text-sm text-green-300">{message}</p> : null}
      </section>
      <DataTable
        rows={bookings}
        rowKey={(row) => row.id}
        title="Bookings"
        columns={[
          { key: 'id', label: 'ID', render: (row) => row.id },
          { key: 'vehicle', label: 'Vehicle', render: (row) => row.vehicle },
          { key: 'service', label: 'Service', render: (row) => row.service },
          { key: 'date', label: 'Date', render: (row) => row.date },
          { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
        ]}
      />
    </div>
  )
}

function CustomerQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteItem[]>([{ id: 'QT-301', topic: 'Fleet package', status: 'processing' }])
  const [text, setText] = useState('')
  const addQuote = () => {
    if (!text.trim()) return
    setQuotes((prev) => [{ id: `QT-${Date.now()}`, topic: text.trim(), status: 'pending' }, ...prev])
    setText('')
  }
  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-white/10 bg-[#0D1117] p-4">
        <h2 className="text-lg font-semibold">Quote Request</h2>
        <div className="mt-2 flex gap-2">
          <input value={text} onChange={(event) => setText(event.target.value)} placeholder="Describe your request" className="flex-1 rounded border border-white/15 bg-white/5 px-2 py-1.5" />
          <button onClick={addQuote} className="rounded bg-red-600 px-3 py-1.5">Submit</button>
        </div>
      </div>
      <DataTable
        rows={quotes}
        rowKey={(row) => row.id}
        title="Quote Requests"
        columns={[
          { key: 'id', label: 'ID', render: (row) => row.id },
          { key: 'topic', label: 'Topic', render: (row) => row.topic },
          { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
        ]}
      />
    </section>
  )
}

function InventoryPipeline() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % importSteps.length)
    }, 1300)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="rounded-xl border border-white/10 bg-[#0D1117] p-4">
      <h2 className="mb-3 text-lg font-semibold">Bulk Import Command Center</h2>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5">
        {importSteps.map((step, index) => (
          <div key={step} className={`rounded-lg border p-2 text-xs ${index <= activeStep ? 'border-blue-500/40 bg-blue-500/15 text-blue-200' : 'border-white/10 text-slate-400'}`}>
            {index + 1}. {step}
          </div>
        ))}
      </div>
    </section>
  )
}

function ConflictResolutionPanel() {
  return (
    <DataTable
      rows={conflictRows}
      rowKey={(row) => `${row.issue}-${row.target}`}
      title="Conflict Resolution Panel"
      columns={[
        { key: 'issue', label: 'Issue', render: (row) => row.issue },
        { key: 'target', label: 'Target', render: (row) => row.target },
        { key: 'action', label: 'Action', render: (row) => row.action },
      ]}
    />
  )
}

function EventConsole() {
  const events = [
    { timestamp: '10:31:22', severity: 'info', operator: 'Meron T.', message: 'Schema v3 detected from upload' },
    { timestamp: '10:31:35', severity: 'warning', operator: 'System', message: '11 rows missing model mapping' },
    { timestamp: '10:32:04', severity: 'critical', operator: 'System', message: 'Price anomaly detected on 2 rows' },
  ]
  return (
    <section className="rounded-xl border border-white/10 bg-[#0D1117] p-4">
      <h3 className="mb-2 text-sm font-semibold">Event Console</h3>
      <div className="space-y-2 text-xs">
        {events.map((event) => (
          <div key={`${event.timestamp}-${event.message}`} className="rounded border border-white/10 bg-white/[0.03] p-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{event.timestamp}</span>
              <StatusBadge status={event.severity === 'critical' ? 'critical' : event.severity === 'warning' ? 'warning' : 'active'} />
            </div>
            <p className="text-slate-200">{event.message}</p>
            <p className="text-slate-500">{event.operator}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function SystemHealthPanel() {
  const systems: Array<{ name: string; status: Status }> = [
    { name: 'CSV Parser', status: 'active' },
    { name: 'Validation Engine', status: 'active' },
    { name: 'DB', status: 'active' },
    { name: 'Queue', status: 'processing' },
    { name: 'Warehouse Sync', status: 'warning' },
    { name: 'Audit Logging', status: 'active' },
    { name: 'Rollback', status: 'active' },
  ]

  return (
    <section className="rounded-xl border border-white/10 bg-[#0D1117] p-4">
      <h3 className="mb-2 text-sm font-semibold">System Health</h3>
      <div className="space-y-2">
        {systems.map((system) => (
          <div key={system.name} className="flex items-center justify-between rounded border border-white/10 bg-white/[0.03] px-2 py-1.5">
            <span className="text-sm text-slate-200">{system.name}</span>
            <StatusBadge status={system.status} />
          </div>
        ))}
      </div>
    </section>
  )
}

function InventoryCommandCenterPage() {
  const [search, setSearch] = useState('')
  return (
    <div className="space-y-4">
      <InventoryPipeline />

      <section className="grid gap-3 xl:grid-cols-3">
        <div className="space-y-3 xl:col-span-2">
          <section className="rounded-xl border border-white/10 bg-[#0D1117] p-4">
            <h3 className="mb-3 text-sm font-semibold">Import Controls</h3>
            <div className="grid gap-2 md:grid-cols-3">
              <input type="file" className="rounded border border-white/15 bg-white/5 px-2 py-1.5 text-xs" />
              <select className="rounded border border-white/15 bg-white/5 px-2 py-1.5 text-xs"><option>Merge mode</option></select>
              <select className="rounded border border-white/15 bg-white/5 px-2 py-1.5 text-xs"><option>Schema v3</option></select>
              <select className="rounded border border-white/15 bg-white/5 px-2 py-1.5 text-xs"><option>Main Warehouse</option></select>
              <input placeholder="Supplier" className="rounded border border-white/15 bg-white/5 px-2 py-1.5 text-xs" />
              <button className="rounded bg-blue-600 px-3 py-1.5 text-xs font-semibold">Validate & Continue</button>
            </div>
          </section>
          <div className="rounded-xl border border-white/10 bg-[#0D1117] p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Validation Preview Table</h3>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Filter by SKU or product"
                className="rounded border border-white/15 bg-white/5 px-2 py-1 text-xs"
              />
            </div>
            <DataTable
              rows={products}
              search={search}
              rowKey={(row) => row.sku}
              title="Import Validation"
              columns={[
                { key: 'sku', label: 'SKU', render: (row) => row.sku },
                { key: 'name', label: 'Product', render: (row) => row.name },
                { key: 'brand', label: 'Brand', render: (row) => row.brand },
                { key: 'category', label: 'Category', render: (row) => row.category },
                { key: 'warehouse', label: 'Warehouse', render: (row) => row.warehouse },
                { key: 'stock', label: 'Stock', render: (row) => row.stock },
                { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status as Status} /> },
              ]}
            />
          </div>
        </div>
        <div className="space-y-3">
          <section className="rounded-xl border border-white/10 bg-[#0D1117] p-4">
            <h3 className="mb-2 text-sm font-semibold">Live Import Health</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <StatCard title="Total" value={inventoryHealth.total} icon={<Package className="h-4 w-4" />} />
              <StatCard title="Valid" value={inventoryHealth.valid} icon={<CheckCircle2 className="h-4 w-4" />} />
              <StatCard title="Warning" value={inventoryHealth.warning} icon={<AlertTriangle className="h-4 w-4" />} />
              <StatCard title="Critical" value={inventoryHealth.critical} icon={<XCircle className="h-4 w-4" />} />
            </div>
            <p className="mt-2 text-xs text-slate-400">Rate: {inventoryHealth.rate} • ETA: {inventoryHealth.eta} • Queue: {inventoryHealth.queue}</p>
          </section>

          <section className="rounded-xl border border-white/10 bg-[#0D1117] p-4">
            <h3 className="mb-2 text-sm font-semibold">Operational Risk Alerts</h3>
            <ul className="space-y-1 text-xs text-slate-300">
              {riskAlerts.map((alert) => <li key={alert} className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-1">{alert}</li>)}
            </ul>
          </section>
          <SystemHealthPanel />
        </div>
      </section>

      <div className="grid gap-3 xl:grid-cols-2">
        <ConflictResolutionPanel />
        <EventConsole />
      </div>
    </div>
  )
}

function InventoryListPage() {
  const [filter, setFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const rows = useMemo(
    () => products.filter((row) => (statusFilter === 'all' ? true : row.status === statusFilter) && JSON.stringify(row).toLowerCase().includes(filter.toLowerCase())),
    [filter, statusFilter],
  )

  return (
    <div className="space-y-3">
      <section className="rounded-xl border border-white/10 bg-[#0D1117] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="Search brand/category/warehouse" className="rounded border border-white/15 bg-white/5 px-2 py-1.5 text-sm" />
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded border border-white/15 bg-white/5 px-2 py-1.5 text-sm">
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="warning">Warning</option>
            <option value="processing">Processing</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </section>
      <DataTable
        rows={rows}
        rowKey={(row) => row.sku}
        title="Inventory Table"
        columns={[
          { key: 'sku', label: 'SKU', render: (row) => row.sku },
          { key: 'name', label: 'Product', render: (row) => row.name },
          { key: 'brand', label: 'Brand', render: (row) => row.brand },
          { key: 'category', label: 'Category', render: (row) => row.category },
          { key: 'warehouse', label: 'Warehouse', render: (row) => row.warehouse },
          { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status as Status} /> },
          { key: 'actions', label: 'Actions', render: () => <button className="rounded border border-white/20 px-2 py-1 text-xs">View</button> },
        ]}
      />
    </div>
  )
}

function ImportsPage() {
  return (
    <DataTable
      rows={importBatches}
      rowKey={(row) => row.id}
      title="Import Batches"
      columns={[
        { key: 'id', label: 'Batch', render: (row) => row.id },
        { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status as Status} /> },
        { key: 'progress', label: 'Progress', render: (row) => `${row.progress}%` },
        { key: 'rows', label: 'Rows', render: (row) => row.rows },
        { key: 'uploadedBy', label: 'Uploaded By', render: (row) => row.uploadedBy },
      ]}
    />
  )
}

function WarehousesPage() {
  return (
    <section className="grid gap-3 md:grid-cols-3">
      {warehouses.map((warehouse) => (
        <article key={warehouse.name} className="rounded-xl border border-white/10 bg-[#0D1117] p-4">
          <h3 className="font-semibold">{warehouse.name}</h3>
          <p className="text-sm text-slate-400">Capacity: {warehouse.capacity}%</p>
          <div className="mt-2 h-2 rounded bg-white/10">
            <div className={`h-2 rounded ${warehouse.capacity > 90 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${warehouse.capacity}%` }} />
          </div>
          <div className="mt-2"><StatusBadge status={warehouse.status as Status} /></div>
        </article>
      ))}
    </section>
  )
}

function DealerManagementPage() {
  return (
    <DataTable
      rows={dealers}
      rowKey={(row) => row.name}
      title="Dealer Management"
      columns={[
        { key: 'name', label: 'Dealer', render: (row) => row.name },
        { key: 'region', label: 'Region', render: (row) => row.region },
        { key: 'contact', label: 'Contact', render: (row) => row.contact },
        { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status as Status} /> },
      ]}
    />
  )
}

function ReportsPage() {
  return (
    <section className="grid gap-3 md:grid-cols-3">
      <StatCard title="Inventory Utilization" value="86%" icon={<Gauge className="h-4 w-4" />} note="Across all warehouses" />
      <StatCard title="Import Success" value="81.6%" icon={<CheckCircle2 className="h-4 w-4" />} note="Last 7 days" />
      <StatCard title="Risk Alerts" value={5} icon={<AlertTriangle className="h-4 w-4" />} note="Requires review" />
    </section>
  )
}

function BulkUploadPage() {
  const steps = ['Upload CSV', 'Validate', 'Confirm', 'Processing', 'Complete']
  const [step, setStep] = useState(0)
  const [job, setJob] = useState('JOB-3B-93011')

  useEffect(() => {
    if (step >= steps.length - 1) return
    const timer = window.setTimeout(() => setStep((prev) => prev + 1), 1600)
    return () => window.clearTimeout(timer)
  }, [step, steps.length])

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-white/10 bg-[#0D1117] p-4">
        <h1 className="text-xl font-semibold">Bulk Product Upload</h1>
        <div className="mt-3 grid gap-2 md:grid-cols-5">
          {steps.map((item, index) => (
            <div key={item} className={`rounded border px-2 py-1 text-xs ${index <= step ? 'border-blue-500/50 bg-blue-500/15 text-blue-200' : 'border-white/10 text-slate-400'}`}>
              {item}
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-300">
          <input type="file" className="rounded border border-white/15 bg-white/5 px-2 py-1" />
          <span>Schema: v3</span>
          <span>Job ID: {job}</span>
          <button onClick={() => setStep(0)} className="rounded border border-white/15 px-2 py-1">Restart</button>
          <button onClick={() => setJob(`JOB-3B-${Math.floor(Math.random() * 90000 + 10000)}`)} className="rounded border border-white/15 px-2 py-1">New Job ID</button>
        </div>
      </section>
      <section className="grid gap-3 md:grid-cols-3">
        <StatCard title="Processed" value="8,420" icon={<Package className="h-4 w-4" />} />
        <StatCard title="Imported" value="7,920" icon={<CheckCircle2 className="h-4 w-4" />} />
        <StatCard title="Failed" value="500" icon={<XCircle className="h-4 w-4" />} />
      </section>
      <EventConsole />
    </div>
  )
}

function CustomerSimpleDataPage({ title, icon }: { title: string; icon: ReactNode }) {
  const [showLoading, setShowLoading] = useState(false)
  const [error, setError] = useState('')
  return (
    <section className="space-y-3 rounded-xl border border-white/10 bg-[#0D1117] p-4">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <p className="text-sm text-slate-300">This workspace is configured with role-protected routing and enterprise dark styling.</p>
      <div className="flex gap-2">
        <button onClick={() => setShowLoading((prev) => !prev)} className="rounded border border-white/15 px-2 py-1 text-xs">Toggle loading</button>
        <button onClick={() => setError(error ? '' : 'Simulated fetch error. Retry action required.')} className="rounded border border-white/15 px-2 py-1 text-xs">Toggle error</button>
      </div>
      {showLoading ? <SkeletonCards /> : null}
      {error ? <ErrorAlert message={error} /> : null}
      {!showLoading && !error ? <EmptyState title="Guided empty state" detail="No records yet. Use the primary action to add data." action={<button className="rounded bg-blue-600 px-3 py-1 text-xs">Create record</button>} /> : null}
    </section>
  )
}

function LoginHint() {
  const navigate = useNavigate()
  return (
    <section className="rounded-xl border border-white/10 bg-[#0D1117] p-4 text-sm text-slate-300">
      <p className="mb-2">You can switch roles from header selectors to access customer and inventory workspaces.</p>
      <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 rounded bg-blue-600 px-3 py-1.5 text-white"><LogIn className="h-4 w-4" /> Go Home</button>
    </section>
  )
}

function CustomerShell({ role, setRole }: { role: UserRole; setRole: (role: UserRole) => void }) {
  return (
    <RequireRole role={role} allowed={['customer']}>
      <DashboardLayout role={role} setRole={setRole}>
        <Outlet />
      </DashboardLayout>
    </RequireRole>
  )
}

function InventoryShell({ role, setRole }: { role: UserRole; setRole: (role: UserRole) => void }) {
  return (
    <RequireRole role={role} allowed={['inventory_manager', 'admin']}>
      <DashboardLayout role={role} setRole={setRole}>
        <Outlet />
      </DashboardLayout>
    </RequireRole>
  )
}

function AdminShell({ role, setRole }: { role: UserRole; setRole: (role: UserRole) => void }) {
  return (
    <RequireRole role={role} allowed={['inventory_manager', 'admin']}>
      <DashboardLayout role={role} setRole={setRole}>
        <Outlet />
      </DashboardLayout>
    </RequireRole>
  )
}

function App() {
  const [role, setRole] = useState<UserRole>('public')

  return (
    <Routes>
      <Route path="/" element={<PublicLayout role={role} setRole={setRole}><PublicHomePage /></PublicLayout>} />
      <Route path="/vehicles" element={<PublicLayout role={role} setRole={setRole}><PublicSimplePage title="Vehicle Catalog" body="Explore motorcycles, EV motorcycles, electric cars, and three wheelers with brand-level filtering." /></PublicLayout>} />
      <Route path="/parts" element={<PublicLayout role={role} setRole={setRole}><PublicSimplePage title="Spare Parts" body="Shop tyres, batteries, controllers, and genuine brand parts with quote and service CTAs." /></PublicLayout>} />
      <Route path="/electric-mobility" element={<PublicLayout role={role} setRole={setRole}><PublicSimplePage title="Electric Mobility" body="Discover EV lineup, battery programs, charging readiness, and fleet electrification advisory." /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout role={role} setRole={setRole}><PublicSimplePage title="Services" body="Book maintenance, preventive checks, and emergency support from certified 3B service centers." /></PublicLayout>} />
      <Route path="/dealers" element={<PublicLayout role={role} setRole={setRole}><DealerManagementPage /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout role={role} setRole={setRole}><PublicSimplePage title="About 3B Motors" body="3B Motors delivers enterprise-grade mobility solutions across Ethiopia with integrated operations." /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout role={role} setRole={setRole}><ContactPage /></PublicLayout>} />

      <Route path="/customer" element={<CustomerShell role={role} setRole={setRole} />}>
        <Route index element={<CustomerDashboard />} />
        <Route path="vehicles" element={<CustomerSimpleDataPage title="My Vehicles" icon={<Car className="h-5 w-5 text-blue-300" />} />} />
        <Route path="orders" element={<CustomerSimpleDataPage title="Orders" icon={<Package className="h-5 w-5 text-blue-300" />} />} />
        <Route path="bookings" element={<CustomerBookingsPage />} />
        <Route path="service-history" element={<CustomerSimpleDataPage title="Service History" icon={<Wrench className="h-5 w-5 text-blue-300" />} />} />
        <Route path="quotes" element={<CustomerQuotesPage />} />
        <Route path="payments" element={<CustomerSimpleDataPage title="Payments" icon={<Wallet className="h-5 w-5 text-blue-300" />} />} />
        <Route path="wishlist" element={<CustomerSimpleDataPage title="Wishlist" icon={<Zap className="h-5 w-5 text-blue-300" />} />} />
        <Route path="messages" element={<CustomerSimpleDataPage title="Messages" icon={<MessageSquare className="h-5 w-5 text-blue-300" />} />} />
        <Route path="settings" element={<CustomerSimpleDataPage title="Account Settings" icon={<Settings className="h-5 w-5 text-blue-300" />} />} />
        <Route path="*" element={<LoginHint />} />
      </Route>

      <Route path="/inventory-os" element={<InventoryShell role={role} setRole={setRole} />}>
        <Route index element={<InventoryCommandCenterPage />} />
        <Route path="inventory" element={<InventoryListPage />} />
        <Route path="imports" element={<ImportsPage />} />
        <Route path="warehouses" element={<WarehousesPage />} />
        <Route path="dealers" element={<DealerManagementPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="*" element={<LoginHint />} />
      </Route>

      <Route path="/admin" element={<AdminShell role={role} setRole={setRole} />}>
        <Route path="bulk-upload" element={<BulkUploadPage />} />
        <Route path="*" element={<LoginHint />} />
      </Route>

      <Route path="*" element={<PublicLayout role={role} setRole={setRole}><PublicSimplePage title="Not Found" body="The page you requested does not exist." /></PublicLayout>} />
    </Routes>
  )
}

export default App
