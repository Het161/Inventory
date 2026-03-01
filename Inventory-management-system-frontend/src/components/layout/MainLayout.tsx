'use client'

import { ReactNode, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Package, Warehouse, Store, BarChart3, FileText,
  TrendingUp, Search, Bell, Settings, ChevronDown, LogOut, User,
  HelpCircle, Users, UserCog, Layers
} from 'lucide-react'
import { useCurrency } from '../../contexts/CurrencyContext'
import { useLanguage } from '../../contexts/LanguageContext'
import FloatingParticles from '../3d-effects/FloatingParticles'
import GradientMesh from '../3d-effects/GradientMesh'

interface MainLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
}

export default function MainLayout({ children, title, subtitle }: MainLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { currency, setCurrency } = useCurrency()
  const { t } = useLanguage()
  
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const sections = [
    {
      label: t('overview'),
      items: [
        { icon: LayoutDashboard, label: t('dashboard'), path: '/' },
        { icon: Package, label: t('products'), path: '/products' },
      ],
    },
    {
      label: t('inventory'),
      items: [
        { icon: Warehouse, label: t('warehouses'), path: '/warehouses' },
        { icon: Store, label: t('outlets'), path: '/outlets' },
        { icon: BarChart3, label: t('stockManagement'), path: '/stock' },
        { icon: Layers, label: t('categories'), path: '/categories' },
      ],
    },
    {
      label: t('sales'),
      items: [
        { icon: FileText, label: t('salesMemos'), path: '/sales' },
        { icon: TrendingUp, label: t('analytics'), path: '/analytics' },
      ],
    },
    {
      label: t('people'),
      items: [
        { icon: Users, label: t('customers'), path: '/customers' },
        { icon: UserCog, label: t('staffManagement'), path: '/staff' },
      ],
    },
    {
      label: t('system'),
      items: [
        { icon: Settings, label: t('settings'), path: '/settings' },
        { icon: HelpCircle, label: t('helpSupport'), path: '/help' },
      ],
    },
  ]

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/' || pathname === '/dashboard'
    return pathname?.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-transparent">
      {/* Background Effects */}
      <FloatingParticles />
      <GradientMesh />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-indigo-500/30 overflow-y-auto z-30 dark:shadow-[0_0_30px_rgba(99,102,241,0.3)]">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-indigo-500/30">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg dark:shadow-[0_0_20px_rgba(99,102,241,0.6)] group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-sm">OM</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                OM MARKETING
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-300">SOLUTIONS</p>
            </div>
          </Link>
        </div>

        {/* Search */}
        <div className="p-4">
          <Link href="/search">
            <div className="relative cursor-pointer">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder={t('globalSearch')}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-indigo-500/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white dark:placeholder-gray-400 cursor-pointer"
                readOnly
              />
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {sections.map((section) => (
            <div key={section.label}>
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-4 mb-3">
                {section.label}
              </div>
              {section.items.map((item) => {
                const Icon = item.icon
                const active = isActive(item.path)
                return (
                  <Link key={item.path} href={item.path}>
                    <div
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                        active
                          ? 'bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 dark:shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Help Section */}
        <div className="p-4 border-t border-gray-200 dark:border-indigo-500/30 mt-auto">
          <div className="bg-indigo-50 dark:bg-slate-700 rounded-lg p-4 dark:border dark:border-indigo-500/30">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] mb-1">
              Need Help?
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">Contact support team</p>
            <Link href="/help">
              <button className="w-full px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all dark:shadow-[0_0_20px_rgba(99,102,241,0.6)]">
                Get Support
              </button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64 relative z-40">
        {/* Header */}
        <header className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-indigo-500/30 px-8 py-4 dark:shadow-[0_0_30px_rgba(99,102,241,0.3)]" style={{ zIndex: 9999 }}>
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-gray-600 dark:text-gray-300 mt-1">{subtitle}</p>
              )}
            </div>

            <div className="flex items-center gap-3 relative" style={{ zIndex: 10000 }}>
              {/* Currency Switcher */}
              <div className="flex items-center bg-gray-50 dark:bg-slate-700 rounded-lg p-1 dark:border dark:border-indigo-500/30">
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-all no-glow ${
                    currency === 'USD'
                      ? 'bg-white dark:bg-slate-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  $ USD
                </button>
                <button
                  onClick={() => setCurrency('INR')}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-all no-glow ${
                    currency === 'INR'
                      ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  ₹ INR
                </button>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications)
                    setShowProfileMenu(false)
                  }}
                  className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-all no-glow"
                >
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    2
                  </span>
                </button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-indigo-500/30"
                      style={{ zIndex: 10001 }}
                    >
                      <div className="p-4 border-b border-gray-200 dark:border-indigo-500/30">
                        <h3 className="font-bold text-gray-900 dark:text-white">Notifications (2)</h3>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300">Low Stock Alert - Product XYZ</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">5 min ago</p>
                      </div>
                      <div className="p-3 border-t border-gray-200 dark:border-indigo-500/30 text-center">
                        <Link href="/notifications">
                          <button 
                            onClick={() => setShowNotifications(false)}
                            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline no-glow"
                          >
                            View All
                          </button>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Settings */}
              <Link href="/settings">
                <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-all no-glow">
                  <Settings className="w-6 h-6" />
                </button>
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu)
                    setShowNotifications(false)
                  }}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-all no-glow"
                >
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                    HP
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{t('administrator')}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-indigo-500/30"
                      style={{ zIndex: 10001 }}
                    >
                      <div className="p-4 border-b border-gray-200 dark:border-indigo-500/30">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Het Patel</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">het@example.com</p>
                      </div>
                      <div className="p-2">
                        <Link href="/profile">
                          <button
                            onClick={() => setShowProfileMenu(false)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg text-left no-glow"
                          >
                            <User className="w-4 h-4" />
                            <span className="text-sm">My Profile</span>
                          </button>
                        </Link>
                        <Link href="/settings">
                          <button
                            onClick={() => setShowProfileMenu(false)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg text-left no-glow"
                          >
                            <Settings className="w-4 h-4" />
                            <span className="text-sm">{t('settings')}</span>
                          </button>
                        </Link>
                        <Link href="/help">
                          <button
                            onClick={() => setShowProfileMenu(false)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg text-left no-glow"
                          >
                            <HelpCircle className="w-4 h-4" />
                            <span className="text-sm">Help</span>
                          </button>
                        </Link>
                      </div>
                      <div className="p-2 border-t border-gray-200 dark:border-indigo-500/30">
                        <button
                          onClick={() => {
                            setShowProfileMenu(false)
                            if (confirm('Logout?')) {
                              localStorage.clear()
                              router.push('/')
                            }
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-left no-glow"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm font-semibold">Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8 relative" style={{ zIndex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  )
}