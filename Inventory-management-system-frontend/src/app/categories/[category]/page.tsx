'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import MainLayout from '../../../components/layout/MainLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Grid, List, Search, SlidersHorizontal, X, Package, DollarSign, BarChart3 } from 'lucide-react'
import { getProducts } from '../../../lib/api'
import Image from 'next/image'

interface Product {
  id: number
  name: string
  sku: string
  category: string
  stock: number
  min_stock: number
  price: number
  status: string
  image_url?: string
  description?: string
}

export default function CategoryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const categoryName = decodeURIComponent(params.category as string)
  
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchCategoryProducts()
  }, [categoryName])

  const fetchCategoryProducts = async () => {
    try {
      const response = await getProducts()
      const filtered = response.data.filter((p: Product) => 
        p.category.toLowerCase() === categoryName.toLowerCase()
      )
      setProducts(filtered)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product)
    setShowModal(true)
  }

  const getProductImage = (product: Product) => {
    if (product.image_url) return product.image_url
    
    // Use placeholder images based on category/name
    const name = product.name.toLowerCase()
    if (name.includes('laptop')) return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'
    if (name.includes('phone') || name.includes('mobile')) return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
    if (name.includes('mouse')) return 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500'
    if (name.includes('keyboard')) return 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'
    if (name.includes('monitor')) return 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500'
    if (name.includes('cable') || name.includes('usb')) return 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500'
    if (name.includes('headphone')) return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
    if (name.includes('camera')) return 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500'
    
    return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalValue = products.reduce((sum, p) => sum + (p.stock * p.price), 0)

  if (loading) {
    return (
      <MainLayout title={categoryName} subtitle="Loading products...">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading products...</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout title={categoryName} subtitle={`${products.length} products in this category`}>
      {/* Back Button */}
      <button
        onClick={() => router.push('/categories')}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Categories
      </button>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-3xl font-bold text-gray-900">{products.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <p className="text-sm text-gray-500">In Stock</p>
          <p className="text-3xl font-bold text-green-600">
            {products.filter(p => p.stock > p.min_stock).length}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <p className="text-sm text-gray-500">Low Stock</p>
          <p className="text-3xl font-bold text-yellow-600">
            {products.filter(p => p.stock <= p.min_stock && p.stock > 0).length}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <p className="text-sm text-gray-500">Total Value</p>
          <p className="text-3xl font-bold text-gray-900">${(totalValue / 1000).toFixed(1)}K</p>
        </motion.div>
      </div>

      {/* Products Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl border border-gray-200"
      >
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50">
                <SlidersHorizontal className="w-4 h-4" />
                Filter
              </button>

              <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-50'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-50'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="p-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-indigo-600 hover:shadow-xl transition-all group"
                >
                  {/* Product Image */}
                  <div className="aspect-square relative overflow-hidden bg-gray-100">
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                        product.stock === 0 ? 'bg-red-100/90 text-red-700' :
                        product.stock <= product.min_stock ? 'bg-yellow-100/90 text-yellow-700' :
                        'bg-green-100/90 text-green-700'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">{product.sku}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Stock</p>
                        <p className="text-lg font-bold text-gray-900">{product.stock}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="text-lg font-bold text-indigo-600">${product.price}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleViewDetails(product)}
                      className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-600 hover:shadow-lg transition-all"
                >
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.sku}</p>
                  </div>

                  <div className="text-center px-4">
                    <p className="text-xs text-gray-500">Stock</p>
                    <p className="text-lg font-bold text-gray-900">{product.stock}</p>
                  </div>

                  <div className="text-center px-4">
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-lg font-bold text-indigo-600">${product.price}</p>
                  </div>

                  <button
                    onClick={() => handleViewDetails(product)}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    View Details
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found in this category</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Product Details Modal */}
      <AnimatePresence>
        {showModal && selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setShowModal(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                  <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div className="space-y-4">
                      <div className="aspect-square relative rounded-xl overflow-hidden border-2 border-gray-200">
                        <img
                          src={getProductImage(selectedProduct)}
                          alt={selectedProduct.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Thumbnail Gallery */}
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 cursor-pointer hover:border-indigo-600">
                            <img
                              src={getProductImage(selectedProduct)}
                              alt={`${selectedProduct.name} view ${i}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h1>
                        <p className="text-gray-500">SKU: {selectedProduct.sku}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          selectedProduct.stock === 0 ? 'bg-red-100 text-red-700' :
                          selectedProduct.stock <= selectedProduct.min_stock ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {selectedProduct.status}
                        </span>
                        <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                          {selectedProduct.category}
                        </span>
                      </div>

                      <div className="border-t border-b border-gray-200 py-6">
                        <div className="text-4xl font-bold text-indigo-600 mb-2">
                          ${selectedProduct.price}
                        </div>
                        <p className="text-sm text-gray-500">Price per unit</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <Package className="w-5 h-5" />
                            <span className="text-sm font-medium">In Stock</span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">{selectedProduct.stock}</p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <BarChart3 className="w-5 h-5" />
                            <span className="text-sm font-medium">Min Stock</span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">{selectedProduct.min_stock}</p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg col-span-2">
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <DollarSign className="w-5 h-5" />
                            <span className="text-sm font-medium">Total Value</span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">
                            ${(selectedProduct.stock * selectedProduct.price).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                        <p className="text-gray-600">
                          {selectedProduct.description || 'High-quality product with excellent features and durability. Perfect for both professional and personal use.'}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <button className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                          Edit Product
                        </button>
                        <button className="px-6 py-3 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 hover:border-gray-300 transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </MainLayout>
  )
}
