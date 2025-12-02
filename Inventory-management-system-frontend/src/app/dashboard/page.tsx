'use client'

import { useState, useEffect } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { motion } from 'framer-motion'
import {
  TrendingUp, TrendingDown, Package, DollarSign, ShoppingCart,
  AlertTriangle, ArrowUpRight, ArrowDownRight, MoreVertical
} from 'lucide-react'
import { useCurrency } from '../../contexts/CurrencyContext'
import Link from 'next/link'

export default function DashboardPage() {
  const { formatPrice } = useCurrency()

  const stats = [
    {
      title: 'Total Revenue',
      value: formatPrice(45231.89),
      change: '+20.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Total Products',
      value: '1,234',
      change: '+12.5%',
      trend: 'up',
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Orders',
      value: '456',
      change: '+8.3%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-purple-500',
    },
    {
      title: 'Low Stock Items',
      value: '23',
      change: '-5.2%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'bg-red-500',
    },
  ]

  const recentOrders = [
    { id: 'ORD-001', customer: 'Amit Patel', amount: formatPrice(2540), status: 'Completed', date: '2 hours ago' },
    { id: 'ORD-002', customer: 'Priya Shah', amount: formatPrice(1890), status: 'Pending', date: '5 hours ago' },
    { id: 'ORD-003', customer: 'Raj Kumar', amount: formatPrice(3200), status: 'Completed', date: '1 day ago' },
    { id: 'ORD-004', customer: 'Neha Gupta', amount: formatPrice(1560), status: 'Processing', date: '1 day ago' },
    { id: 'ORD-005', customer: 'Vikram Singh', amount: formatPrice(4200), status: 'Completed', date: '2 days ago' },
  ]

  const lowStockProducts = [
    { name: 'Laptop Dell XPS 13', stock: 3, sku: 'LAP-001', status: 'Critical' },
    { name: 'iPhone 15 Pro', stock: 5, sku: 'PHN-045', status: 'Low' },
    { name: 'Samsung TV 55"', stock: 7, sku: 'TV-023', status: 'Low' },
    { name: 'Sony Headphones', stock: 2, sku: 'AUD-012', status: 'Critical' },
  ]

  return (
    <MainLayout title="Dashboard" subtitle="Welcome back! Here's what's happening with your inventory today.">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg dark:shadow-[0_0_30px_rgba(99,102,241,0.3)] border border-gray-100 dark:border-indigo-500/30 hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 ${stat.color} bg-opacity-10 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                  {stat.title}
                </h3>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]">
                    {stat.value}
                  </p>
                  <div className={`flex items-center gap-1 text-sm font-semibold ${
                    stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-[0_0_30px_rgba(99,102,241,0.3)] border border-gray-100 dark:border-indigo-500/30"
          >
            <div className="p-6 border-b border-gray-100 dark:border-indigo-500/30 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]">
                  Recent Orders
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Latest transactions from your store</p>
              </div>
              <Link href="/sales">
                <button className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all text-sm font-semibold">
                  View All
                </button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{order.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-gray-300">{order.customer}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{order.amount}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Completed'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                            : order.status === 'Pending'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {order.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Low Stock Alert */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-[0_0_30px_rgba(99,102,241,0.3)] border border-gray-100 dark:border-indigo-500/30"
          >
            <div className="p-6 border-b border-gray-100 dark:border-indigo-500/30">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]">
                Low Stock Alert
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Items running low</p>
            </div>
            <div className="p-6 space-y-4">
              {lowStockProducts.map((product) => (
                <div key={product.sku} className="flex items-start justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-all">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SKU: {product.sku}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        product.status === 'Critical'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                      }`}>
                        {product.status}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {product.stock} units left
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <Link href="/stock">
                <button className="w-full py-3 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white rounded-lg font-semibold text-sm transition-all dark:shadow-[0_0_25px_rgba(99,102,241,0.6)]">
                  Manage Stock
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg dark:shadow-[0_0_30px_rgba(99,102,241,0.3)] border border-gray-100 dark:border-indigo-500/30"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/products">
              <button className="w-full p-4 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg transition-all group">
                <Package className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Add Product</p>
              </button>
            </Link>
            <Link href="/sales">
              <button className="w-full p-4 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-lg transition-all group">
                <ShoppingCart className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">New Order</p>
              </button>
            </Link>
            <Link href="/warehouses">
              <button className="w-full p-4 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-lg transition-all group">
                <Package className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Warehouses</p>
              </button>
            </Link>
            <Link href="/analytics">
              <button className="w-full p-4 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-all group">
                <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Analytics</p>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  )
}
