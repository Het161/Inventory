'use client'

import { useState, useEffect } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { motion } from 'framer-motion'
import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getProducts, getCustomers } from '../../lib/api'
import { useCurrency } from '../../contexts/CurrencyContext'

export default function AnalyticsPage() {
  const { formatPrice, formatLargeNumber } = useCurrency()
  const [products, setProducts] = useState([])
  const [customers, setCustomers] = useState([])
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
      setProducts(productsRes?.data || [])
      setCustomers(customersRes?.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      setProducts([])
      setCustomers([])
    } finally {
      setLoading(false)
    }
  }

  const totalRevenue = 328000
  const totalOrders = 1456
  const activeProducts = (products && Array.isArray(products)) ? products.length : 0
  const totalCustomers = (customers && Array.isArray(customers)) ? customers.length : 0

  const revenueData = [
    { month: 'Jan', revenue: 45000, profit: 25000, expenses: 20000 },
    { month: 'Feb', revenue: 52000, profit: 29000, expenses: 23000 },
    { month: 'Mar', revenue: 48000, profit: 26000, expenses: 22000 },
    { month: 'Apr', revenue: 61000, profit: 35000, expenses: 26000 },
    { month: 'May', revenue: 55000, profit: 31000, expenses: 24000 },
    { month: 'Jun', revenue: 67000, profit: 39000, expenses: 28000 },
  ]

  const categoryData = [
    { name: 'Electronics', value: 45 },
    { name: 'Furniture', value: 25 },
    { name: 'Books', value: 15 },
    { name: 'Clothing', value: 15 },
  ]

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444']

  if (loading) {
    return (
      <MainLayout title="Analytics" subtitle="Business intelligence and insights">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading analytics...</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="Analytics" subtitle="Business intelligence and insights">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-10 h-10 text-green-600" />
            <span className="text-green-600 text-sm font-semibold">+18%</span>
          </div>
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900">{formatLargeNumber(totalRevenue, 1)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <ShoppingCart className="w-10 h-10 text-blue-600" />
            <span className="text-green-600 text-sm font-semibold">+24%</span>
          </div>
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-3xl font-bold text-gray-900">{totalOrders.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <Package className="w-10 h-10 text-purple-600" />
            <span className="text-green-600 text-sm font-semibold">+12%</span>
          </div>
          <p className="text-sm text-gray-500">Active Products</p>
          <p className="text-3xl font-bold text-gray-900">{activeProducts.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <Users className="w-10 h-10 text-orange-600" />
            <span className="text-green-600 text-sm font-semibold">+16%</span>
          </div>
          <p className="text-sm text-gray-500">Total Customers</p>
          <p className="text-3xl font-bold text-gray-900">{totalCustomers.toLocaleString()}</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Profit Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 border border-gray-200 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Revenue & Profit Analysis</h3>
              <p className="text-sm text-gray-500">Monthly performance overview</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
              <Area type="monotone" dataKey="profit" stroke="#10b981" fillOpacity={1} fill="url(#colorProfit)" name="Profit" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Monthly Expenses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">Monthly Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </MainLayout>
  )
}
