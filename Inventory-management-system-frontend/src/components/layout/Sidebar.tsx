'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Search, 
  Package, 
  Warehouse, 
  Store, 
  BarChart3, 
  Layers,
  FileText,
  TrendingUp,
  Bot,
  Users,
  UserCog,
  Settings,
  HelpCircle,
} from 'lucide-react'
import { getProducts, getWarehouses, getOutlets, getSales, getCustomers, getStaff } from '../../lib/api'

interface MenuItem {
  title: string
  icon: any
  href: string
  badge?: number
}

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [counts, setCounts] = useState({
    products: 0,
    warehouses: 0,
    outlets: 0,
    sales: 0,
    customers: 0,
    staff: 0,
  })

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [products, warehouses, outlets, sales, customers, staff] = await Promise.all([
          getProducts().catch(() => []),
          getWarehouses().catch(() => []),
          getOutlets().catch(() => []),
          getSales().catch(() => []),
          getCustomers().catch(() => []),
          getStaff().catch(() => []),
        ])
        setCounts({
          products: Array.isArray(products) ? products.length : 0,
          warehouses: Array.isArray(warehouses) ? warehouses.length : 0,
          outlets: Array.isArray(outlets) ? outlets.length : 0,
          sales: Array.isArray(sales) ? sales.length : 0,
          customers: Array.isArray(customers) ? customers.length : 0,
          staff: Array.isArray(staff) ? staff.length : 0,
        })
      } catch (error) {
        console.error('Error fetching counts:', error)
      }
    }
    fetchCounts()
  }, [])

  const menuItems: { [key: string]: MenuItem[] } = {
    overview: [
      { title: 'Dashboard', icon: LayoutDashboard, href: '/' },
      { title: 'Global Search', icon: Search, href: '/search' },
    ],
    inventory: [
      { title: 'Products', icon: Package, href: '/products', badge: counts.products || undefined },
      { title: 'Warehouses', icon: Warehouse, href: '/warehouses', badge: counts.warehouses || undefined },
      { title: 'Outlets', icon: Store, href: '/outlets', badge: counts.outlets || undefined },
      { title: 'Stock Management', icon: BarChart3, href: '/stock' },
      { title: 'Categories', icon: Layers, href: '/categories' },
    ],
    sales: [
      { title: 'Sales Memos', icon: FileText, href: '/sales', badge: counts.sales || undefined },
      { title: 'Analytics', icon: TrendingUp, href: '/analytics' },
      { title: 'AI Agents', icon: Bot, href: '/ai-agents' },
    ],
    people: [
      { title: 'Customers', icon: Users, href: '/customers', badge: counts.customers || undefined },
      { title: 'Staff Management', icon: UserCog, href: '/staff', badge: counts.staff || undefined },
    ],
    system: [
      { title: 'Settings', icon: Settings, href: '/settings' },
      { title: 'Help & Support', icon: HelpCircle, href: '/help' },
    ],
  }

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
  }

  const handleNavigation = (href: string) => {
    router.push(href, { scroll: false })
  }

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-indigo-500/30 flex flex-col h-screen sticky top-0 overflow-hidden">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-indigo-500/30 flex-shrink-0">
        <button 
          onClick={() => handleNavigation('/')}
          className="flex items-center gap-3 w-full text-left"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center dark:shadow-[0_0_20px_rgba(99,102,241,0.6)]">
            <span className="text-white font-bold text-sm">OM</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
              OM MARKETING
            </h1>
            <h2 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 dark:drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]">
              SOLUTIONS
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Inventory Management System
            </p>
          </div>
        </button>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto py-6 px-4">
        {Object.entries(menuItems).map(([section, items]) => (
          <div key={section} className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-3 px-3">
              {section.replace('_', ' & ')}
            </h3>
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.title}>
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                      isActive(item.href)
                        ? 'bg-indigo-600 text-white shadow-md dark:shadow-[0_0_20px_rgba(99,102,241,0.6)]'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 dark:hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        isActive(item.href)
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 dark:bg-indigo-500/30 text-gray-700 dark:text-white dark:shadow-[0_0_10px_rgba(99,102,241,0.4)]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Support Card - Fixed at bottom */}
      <div className="p-4 flex-shrink-0">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm dark:shadow-indigo-500/20 p-4 dark:border-2 dark:border-indigo-500/40 hover:dark:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
            Need Help?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 dark:drop-shadow-[0_0_10px_rgba(209,213,219,0.5)] mt-1">
            Contact support team
          </p>
          <button 
            onClick={() => handleNavigation('/help')}
            className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 dark:shadow-[0_0_25px_rgba(99,102,241,0.6)] dark:hover:shadow-[0_0_35px_rgba(99,102,241,0.8)] transition-all font-medium"
          >
            Get Support
          </button>
        </div>
      </div>
    </aside>
  )
}
