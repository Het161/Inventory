'use client'

import { useState, useEffect } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { motion } from 'framer-motion'
import { Store, MapPin, Users, Package } from 'lucide-react'
import { useCurrency } from '../../contexts/CurrencyContext'

interface Outlet {
  id: number
  name: string
  location: string
  manager: string
  staff_count: number
  status: string
}

export default function OutletsPage() {
  const { formatPrice, formatLargeNumber } = useCurrency()
  const [outlets, setOutlets] = useState<Outlet[]>([
    { id: 1, name: 'Downtown Flagship Store', location: 'Dhaka, Gulshan-1, Road 12', manager: 'John Smith', staff_count: 8, status: 'Active' },
    { id: 2, name: 'North Branch', location: 'Chittagong, Agrabad Commercial Area', manager: 'Jane Doe', staff_count: 6, status: 'Active' },
    { id: 3, name: 'Mall Kiosk', location: 'Sylhet, Amberkhana Shopping Complex', manager: 'Bob Johnson', staff_count: 4, status: 'Active' },
  ])
  const [loading, setLoading] = useState(false)

  const totalRevenue = 5550000
  const totalStaff = 18

  return (
    <MainLayout title="Outlet Management" subtitle="Manage retail outlets, staff, and product distribution">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <Store className="w-10 h-10 text-blue-600 mb-3" />
          <p className="text-sm text-gray-500">Total Outlets</p>
          <p className="text-3xl font-bold text-gray-900">{outlets.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <Package className="w-10 h-10 text-green-600 mb-3" />
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900">{formatLargeNumber(totalRevenue)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <Users className="w-10 h-10 text-purple-600 mb-3" />
          <p className="text-sm text-gray-500">Total Staff</p>
          <p className="text-3xl font-bold text-gray-900">{totalStaff}</p>
        </motion.div>
      </div>

      {/* Outlets List */}
      <div className="space-y-4">
        {outlets.map((outlet, idx) => (
          <motion.div
            key={outlet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{outlet.name}</h3>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{outlet.location}</span>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                {outlet.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(idx === 0 ? 245000 : idx === 1 ? 185000 : 125000)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Staff</p>
                <p className="text-2xl font-bold text-gray-900">{outlet.staff_count}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Products</p>
                <p className="text-2xl font-bold text-gray-900">{idx === 0 ? 456 : idx === 1 ? 324 : 234}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </MainLayout>
  )
}
