'use client'

import { useState, useEffect } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { motion } from 'framer-motion'
import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getProducts, getCustomers, getSales } from '../../lib/api'
import { useCurrency } from '../../contexts/CurrencyContext'

export default function AnalyticsPage() {
  const { formatPrice, formatLargeNumber } = useCurrency()
  const [products, setProducts] = useState<any[]>([])
  const [customers, setCustomers] = useState<any[]>([])
  const [sales, setSales] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [productsRes, customersRes, salesRes] = await Promise.all([
        getProducts(),
        getCustomers(),
        getSales(),
      ])
      setProducts(Array.isArray(productsRes) ? productsRes : (productsRes?.data || []))
      setCustomers(Array.isArray(customersRes) ? customersRes : (customersRes?.data || []))
      setSales(Array.isArray(salesRes) ? salesRes : (salesRes?.data || []))
    } catch (error) {
      console.error('Error fetching data:', error)
      setProducts([])
      setCustomers([])
      setSales([])
    } finally {
      setLoading(false)
    }
  }

  // Real computed values
  const totalRevenue = Array.isArray(sales) ? sales.reduce((sum: number, s: any) => sum + (s.amount || 0), 0) : 0
  const totalOrders = Array.isArray(sales) ? sales.length : 0
  const activeProducts = Array.isArray(products) ? products.length : 0
  const totalCustomers = Array.isArray(customers) ? customers.length : 0
  const stockValue = Array.isArray(products) ? products.reduce((sum: number, p: any) => sum + (p.stock * p.price), 0) : 0

  // Real category data from products
  const categoryMap: Record<string, number> = {}
  if (Array.isArray(products)) {
    products.forEach((p: any) => {
      const cat = p.category || 'Other'
      categoryMap[cat] = (categoryMap[cat] || 0) + p.stock
    })
  }
  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }))
  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899']

  // Real sales data grouped by status
  const statusMap: Record<string, { count: number; amount: number }> = {}
  if (Array.isArray(sales)) {
    sales.forEach((s: any) => {
      const status = s.status || 'Unknown'
      if (!statusMap[status]) statusMap[status] = { count: 0, amount: 0 }
      statusMap[status].count += 1
      statusMap[status].amount += s.amount || 0
    })
  }
  const salesBreakdown = Object.entries(statusMap).map(([name, data]) => ({
    name,
    count: data.count,
    amount: Math.round(data.amount),
  }))

  // Stock analysis per category
  const stockAnalysis = Object.entries(categoryMap).map(([cat, stock]) => {
    const catProducts = products.filter((p: any) => p.category === cat)
    const value = catProducts.reduce((sum: number, p: any) => sum + (p.stock * p.price), 0)
    return { name: cat, stock, value: Math.round(value) }
  })

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
            <span className="text-green-600 text-sm font-semibold">{totalOrders} orders</span>
          </div>
          <p className="text-sm text-gray-500">Total Sales Revenue</p>
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
            <span className="text-blue-600 text-sm font-semibold">Stock Value</span>
          </div>
          <p className="text-sm text-gray-500">Inventory Value</p>
          <p className="text-3xl font-bold text-gray-900">{formatLargeNumber(stockValue, 1)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <Package className="w-10 h-10 text-purple-600" />
            <span className="text-green-600 text-sm font-semibold">Active</span>
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
            <span className="text-green-600 text-sm font-semibold">Total</span>
          </div>
          <p className="text-sm text-gray-500">Total Customers</p>
          <p className="text-3xl font-bold text-gray-900">{totalCustomers.toLocaleString()}</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Value by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 border border-gray-200 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Stock Analysis by Category</h3>
              <p className="text-sm text-gray-500">Units and value per category</p>
            </div>
          </div>
          {stockAnalysis.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={stockAnalysis}>
                <defs>
                  <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="stock" stroke="#6366f1" fillOpacity={1} fill="url(#colorStock)" name="Stock Units" />
                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" name="Stock Value" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">No product data yet</div>
          )}
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">Stock by Category</h3>
          {categoryData.length > 0 ? (
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
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">No product data yet</div>
          )}
        </motion.div>

        {/* Sales Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">Sales by Status</h3>
          {salesBreakdown.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#6366f1" name="Amount" />
                <Bar dataKey="count" fill="#10b981" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">No sales data yet</div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  )
}
