'use client'

import { useState, useEffect } from 'react'
import MainLayout from '../components/layout/MainLayout'
import { motion } from 'framer-motion'
import { Package, TrendingUp, Users, ShoppingCart, ArrowUp, ArrowDown } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getProducts, getCustomers, getSales } from '../lib/api'
import { useCurrency } from '../contexts/CurrencyContext'
import { useLanguage } from '../contexts/LanguageContext'

export default function DashboardPage() {
  const { formatPrice, formatLargeNumber } = useCurrency()
  const { t } = useLanguage()
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

  // Real calculations
  const totalRevenue = Array.isArray(products) ? products.reduce((sum: number, p: any) => sum + (p.stock * p.price), 0) : 0
  const totalProducts = Array.isArray(products) ? products.length : 0
  const totalCustomers = Array.isArray(customers) ? customers.length : 0
  const totalOrders = Array.isArray(sales) ? sales.length : 0

  // Build real chart data from products grouped by category
  const categoryMap: Record<string, { sales: number; revenue: number }> = {}
  if (Array.isArray(products)) {
    products.forEach((p: any) => {
      const cat = p.category || 'Other'
      if (!categoryMap[cat]) categoryMap[cat] = { sales: 0, revenue: 0 }
      categoryMap[cat].sales += p.stock
      categoryMap[cat].revenue += p.stock * p.price
    })
  }
  const salesData = Object.entries(categoryMap).map(([name, data]) => ({
    name,
    sales: data.sales,
    revenue: Math.round(data.revenue),
  }))

  if (loading) {
    return (
      <MainLayout title={t('dashboard')} subtitle={t('welcomeBack')}>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading dashboard...</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout title={t('dashboard')} subtitle={t('welcomeBack')}>
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
              {totalProducts}
            </span>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">{t('totalProducts')}</h3>
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
              {t('stockValue')}
            </span>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">{t('totalRevenue')}</h3>
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
              {totalCustomers}
            </span>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">{t('totalCustomers')}</h3>
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
            <span className={`flex items-center text-sm font-semibold ${totalOrders > 0 ? 'text-green-600' : 'text-gray-400'}`}>
              {totalOrders > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              {totalOrders}
            </span>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">{t('totalOrders')}</h3>
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
          <h3 className="text-lg font-bold text-gray-900 mb-4">{t('stockByCategory')}</h3>
          {salesData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#6366f1" name={t('stockUnits')} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No product data yet
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">{t('stockValueByCategory')}</h3>
          {salesData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#10b981" name={t('stockValue')} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No product data yet
            </div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  )
}
