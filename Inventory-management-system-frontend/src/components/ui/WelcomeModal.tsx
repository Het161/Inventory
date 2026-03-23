'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { Package, TrendingUp, Users, ArrowRight, X } from 'lucide-react'

export default function WelcomeModal() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (user) {
      const hasSeen = localStorage.getItem(`has_seen_welcome_${user.id}`)
      if (!hasSeen) {
        setIsOpen(true)
      }
    }
  }, [user])

  const handleClose = () => {
    if (user) {
      localStorage.setItem(`has_seen_welcome_${user.id}`, 'true')
    }
    setIsOpen(false)
  }

  const features = [
    {
      icon: Package,
      title: 'Smart Inventory',
      desc: 'Track products and warehouses easily across locations.'
    },
    {
      icon: TrendingUp,
      title: 'Real-time Analytics',
      desc: 'Monitor stock values and track your sales trends live.'
    },
    {
      icon: Users,
      title: 'Customer Management',
      desc: 'Manage your clients efficiently and record orders.'
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header Graphic */}
            <div className="h-48 bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 relative overflow-hidden flex items-center justify-center">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid-welcome" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="2" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-welcome)" />
                </svg>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative z-10 text-center text-white p-6 mt-4"
              >
                <h2 className="text-3xl font-extrabold mb-3 tracking-tight">Hello {user?.name?.split(' ')[0]} 👋</h2>
                <p className="text-indigo-100 text-sm md:text-base font-medium">Welcome to your new Inventory Management System</p>
              </motion.div>
            </div>

            {/* Close button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all z-20 backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="text-center mb-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Everything you need to grow your business
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
                  We've set up a dedicated environment for you. Let's explore the powerful tools available to streamline your operations and boost your sales.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {features.map((feat, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (idx * 0.1) }}
                    className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-5 text-center border border-gray-100 dark:border-slate-700/50 hover:shadow-lg dark:hover:shadow-indigo-500/10 transition-all hover:-translate-y-1"
                  >
                    <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-indigo-600 dark:text-indigo-400 border border-gray-100 dark:border-slate-700">
                      <feat.icon className="w-7 h-7" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">{feat.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{feat.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 border-t border-gray-100 dark:border-slate-800">
                <button 
                  onClick={handleClose}
                  className="w-full sm:w-auto px-6 py-3.5 font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all order-2 sm:order-1 text-sm"
                >
                  Skip for now
                </button>
                <button 
                  onClick={handleClose}
                  className="w-full flex-1 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all flex items-center justify-center gap-2 group order-1 sm:order-2 text-sm"
                >
                  Let's Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
