'use client'

import { useState, useEffect } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { motion } from 'framer-motion'
import { Package, TrendingUp, AlertCircle, ChevronRight } from 'lucide-react'
import { getCategories } from '../../lib/api'
import { useRouter } from 'next/navigation'

interface Category {
  id: number
  name: string
  product_count: number
  total_stock: number
  low_stock_items: number
}

export default function CategoriesPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await getCategories()
      setCategories(response?.data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategories([])
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/categories/${encodeURIComponent(categoryName)}`)
  }

  // Calculate totals - FIXED with null checks
  const totalProducts = (categories && Array.isArray(categories)) 
    ? categories.reduce((sum, c) => sum + (c.product_count || 0), 0)
    : 0
  
  const totalStock = (categories && Array.isArray(categories))
    ? categories.reduce((sum, c) => sum + (c.total_stock || 0), 0)
    : 0
  
  const totalLowStock = (categories && Array.isArray(categories))
    ? categories.reduce((sum, c) => sum + (c.low_stock_items || 0), 0)
    : 0

  if (loading) {
    return (
      <MainLayout title="Categories" subtitle="Loading...">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading categories...</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="Product Categories" subtitle={`Manage your ${categories?.length || 0} product categories`}>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-indigo-600" />
            <h3 className="text-sm font-semibold text-gray-500">Total Products</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <h3 className="text-sm font-semibold text-gray-500">Total Stock</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalStock}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-8 h-8 text-yellow-600" />
            <h3 className="text-sm font-semibold text-gray-500">Low Stock Items</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalLowStock}</p>
        </motion.div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories && categories.length > 0 ? (
          categories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => handleCategoryClick(category.name)}
              className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-600 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                  <Package className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {category.name}
              </h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Products</span>
                  <span className="font-semibold text-gray-900">{category.product_count || 0}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Total Stock</span>
                  <span className="font-semibold text-gray-900">{category.total_stock || 0}</span>
                </div>
                {category.low_stock_items > 0 && (
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                    <span className="text-yellow-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Low Stock
                    </span>
                    <span className="font-semibold text-yellow-600">{category.low_stock_items}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No categories found</p>
            <p className="text-gray-400 text-sm mt-2">Start by adding products to create categories</p>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
