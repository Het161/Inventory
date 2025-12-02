'use client'

import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { motion } from 'framer-motion'
import { FileText, TrendingUp } from 'lucide-react'
import { useCurrency } from '../../contexts/CurrencyContext'

interface SalesMemo {
  id: string
  date: string
  customer: string
  amount: number
  status: string
}

export default function SalesMemosPage() {
  const { formatPrice, formatLargeNumber } = useCurrency()
  const [memos] = useState<SalesMemo[]>([
    { id: 'M01234', date: '2024-11-26', customer: 'John Doe', amount: 2600, status: 'Paid' },
    { id: 'M01233', date: '2024-11-25', customer: 'Jane Smith', amount: 1500, status: 'Pending' },
    { id: 'M01232', date: '2024-11-24', customer: 'Bob Johnson', amount: 3200, status: 'Paid' },
  ])

  const totalMemos = 456
  const totalRevenue = 145200
  const growthRate = 22

  return (
    <MainLayout title="Sales Memos" subtitle="Manage sales memos and transactions">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <FileText className="w-10 h-10 text-blue-600 mb-3" />
          <p className="text-sm text-gray-500">Total Memos</p>
          <p className="text-3xl font-bold text-gray-900">{totalMemos}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <TrendingUp className="w-10 h-10 text-green-600 mb-3" />
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900">{formatLargeNumber(totalRevenue, 1)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <TrendingUp className="w-10 h-10 text-purple-600 mb-3" />
          <p className="text-sm text-gray-500">This Month</p>
          <p className="text-3xl font-bold text-gray-900">+{growthRate}%</p>
        </motion.div>
      </div>

      {/* Memos Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Recent Sales Memos</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Memo ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {memos.map((memo, idx) => (
                <motion.tr
                  key={memo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{memo.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{memo.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{memo.customer}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatPrice(memo.amount)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      memo.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {memo.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </MainLayout>
  )
}
