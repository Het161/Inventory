'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Package, BarChart3, Users, Warehouse, FileText, 
  ArrowRight, X, ChevronRight, ChevronLeft, Sparkles,
  ShoppingCart, TrendingUp, Shield
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

interface OnboardingProps {
  onComplete: () => void
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const { user } = useAuth()
  const totalPages = 2

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true')
    onComplete()
  }

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    } else {
      handleSkip()
    }
  }

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950" />
      
      {/* Ambient light effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[80px]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-10 flex items-center gap-2 px-4 py-2 text-white/50 hover:text-white/80 text-sm font-medium transition-colors rounded-lg hover:bg-white/5"
      >
        Skip <X className="w-4 h-4" />
      </button>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-4">
        <AnimatePresence mode="wait">
          {currentPage === 0 && (
            <motion.div
              key="page-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="text-center"
            >
              {/* Logo */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="flex justify-center mb-8"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/30 border border-indigo-400/20">
                  <span className="text-white font-bold text-2xl">OM</span>
                </div>
              </motion.div>

              {/* Welcome Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-400 text-sm font-semibold tracking-wider uppercase">Welcome aboard</span>
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  Hello, <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{user?.name || 'there'}!</span>
                </h1>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12">
                  Welcome to <strong className="text-white">OM Marketing Solutions</strong> — your all-in-one inventory management system.
                  Let us give you a quick tour of what you can do.
                </p>
              </motion.div>

              {/* Feature highlights - quick overview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12"
              >
                {[
                  { icon: Package, label: 'Manage Inventory', desc: 'Products, stock & categories', color: 'from-blue-500 to-cyan-500' },
                  { icon: TrendingUp, label: 'Track Sales', desc: 'Revenue, analytics & memos', color: 'from-emerald-500 to-green-500' },
                  { icon: Users, label: 'Handle People', desc: 'Customers, staff & contacts', color: 'from-purple-500 to-pink-500' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.07] transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 mx-auto shadow-lg`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-base mb-1">{item.label}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {currentPage === 1 && (
            <motion.div
              key="page-1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  Everything You Need
                </h2>
                <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                  Here&apos;s how to get the most out of your inventory system
                </p>
              </motion.div>

              {/* Feature details - 2x3 grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12"
              >
                {[
                  { icon: Package, title: 'Products & Stock', desc: 'Add products, set prices, and track stock levels across all locations in real-time.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                  { icon: Warehouse, title: 'Warehouses & Outlets', desc: 'Manage multiple warehouses and outlets. Transfer stock between locations easily.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                  { icon: FileText, title: 'Sales Memos', desc: 'Create professional invoices, track payments, and manage your sales pipeline.', color: 'text-amber-400', bg: 'bg-amber-500/10' },
                  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'See charts, trends, and insights about your business performance at a glance.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
                  { icon: Users, title: 'Customer & Staff', desc: 'Keep track of customer details and manage your staff roles and assignments.', color: 'text-pink-400', bg: 'bg-pink-500/10' },
                  { icon: Shield, title: 'Secure & Private', desc: 'Your data is protected with encrypted authentication and role-based access.', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 text-left hover:bg-white/[0.06] transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg ${feature.bg} flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">{feature.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between max-w-3xl mx-auto"
        >
          {/* Back button */}
          <div>
            {currentPage > 0 ? (
              <button
                onClick={handlePrev}
                className="flex items-center gap-2 px-5 py-2.5 text-gray-400 hover:text-white text-sm font-medium transition-colors rounded-lg hover:bg-white/5"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}
          </div>

          {/* Page dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === currentPage
                    ? 'w-8 h-2.5 bg-indigo-500'
                    : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* Next / Get Started button */}
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all"
          >
            {currentPage === totalPages - 1 ? (
              <>
                Get Started
                <Sparkles className="w-4 h-4" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
