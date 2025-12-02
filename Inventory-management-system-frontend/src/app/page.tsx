'use client'

import { useState, useEffect } from 'react'
import MainLayout from '../components/layout/MainLayout'
import { motion } from 'framer-motion'
import { Package, TrendingUp, Users, ShoppingCart, ArrowUp, ArrowDown } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getProducts, getCustomers } from '../lib/api'
import { useCurrency } from '../contexts/CurrencyContext'

export default function DashboardPage() {
  const { formatPrice, formatLargeNumber } = useCurrency()
  const [products, setProducts] = useState<any[]>([])
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [productsRes, customersRes] = await Promise.all([
        getProducts(),
        getCustomers()
      ])
      setProducts(productsRes.data || [])
      setCustomers(customersRes.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      setProducts([])
      setCustomers([])
    } finally {
      setLoading(false)
    }
  }

  // Safe calculations with fallback to 0
  const totalRevenue = Array.isArray(products) ? products.reduce((sum: number, p: any) => sum + (p.stock * p.price), 0) : 0
  const totalProducts = Array.isArray(products) ? products.length : 0
  const totalCustomers = Array.isArray(customers) ? customers.length : 0
  const totalOrders = 156

  const salesData = [
    { name: 'Jan', sales: 4000, revenue: 2400 },
    { name: 'Feb', sales: 3000, revenue: 1398 },
    { name: 'Mar', sales: 2000, revenue: 9800 },
    { name: 'Apr', sales: 2780, revenue: 3908 },
    { name: 'May', sales: 1890, revenue: 4800 },
    { name: 'Jun', sales: 2390, revenue: 3800 },
  ]

  if (loading) {
    return (
      <MainLayout title="Dashboard" subtitle="Welcome back!">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading dashboard...</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="Dashboard" subtitle="Welcome back, Admin!">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <span className="flex items-center text-green-600 text-sm font-semibold">
              <ArrowUp className="w-4 h-4" />
              12%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Total Products</h3>
          <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="flex items-center text-green-600 text-sm font-semibold">
              <ArrowUp className="w-4 h-4" />
              8%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-900">{formatLargeNumber(totalRevenue)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="flex items-center text-green-600 text-sm font-semibold">
              <ArrowUp className="w-4 h-4" />
              5%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Total Customers</h3>
          <p className="text-3xl font-bold text-gray-900">{totalCustomers}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-orange-600" />
            </div>
            <span className="flex items-center text-red-600 text-sm font-semibold">
              <ArrowDown className="w-4 h-4" />
              3%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </MainLayout>
  )
}
