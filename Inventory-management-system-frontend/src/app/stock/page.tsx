'use client'

import { useState, useEffect } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, Plus, X, Save, Trash2, Package } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getProducts, getStockMovements, createStockMovement, deleteStockMovement, createProduct, getCategories } from '../../lib/api'

interface Transaction {
  id: number
  date: string
  product: string
  type: 'Stock In' | 'Stock Out'
  quantity: number
  reference: string
  user: string
}

interface Product {
  id: number
  name: string
  stock: number
}

export default function StockManagementPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showNewProductForm, setShowNewProductForm] = useState(false)
  const [creatingProduct, setCreatingProduct] = useState(false)
  const [newTransaction, setNewTransaction] = useState({
    product: '',
    type: 'Stock In' as 'Stock In' | 'Stock Out',
    quantity: 0,
    reference: '',
    user: 'Admin',
  })
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: '',
    stock: 0,
    min_stock: 0,
    price: 0,
    status: 'In Stock',
    description: '',
  })

  useEffect(() => {
    fetchProducts()
    fetchTransactions()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await getProducts()
      setProducts(Array.isArray(response) ? response : (response?.data || []))
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const data = await getCategories()
      const cats = Array.isArray(data) ? data.map((c: any) => c.name) : []
      setCategories(cats)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleCreateProduct = async () => {
    if (!newProduct.name || !newProduct.sku || !newProduct.category) return
    setCreatingProduct(true)
    try {
      await createProduct(newProduct)
      await fetchProducts()
      setNewTransaction({ ...newTransaction, product: newProduct.name })
      setShowNewProductForm(false)
      setNewProduct({ name: '', sku: '', category: '', stock: 0, min_stock: 0, price: 0, status: 'In Stock', description: '' })
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Failed to create product. SKU might already exist.')
    } finally {
      setCreatingProduct(false)
    }
  }

  const fetchTransactions = async () => {
    try {
      const data = await getStockMovements()
      setTransactions(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching transactions:', error)
    }
  }

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createStockMovement({
        date: new Date().toISOString().split('T')[0],
        product: newTransaction.product,
        type: newTransaction.type,
        quantity: newTransaction.quantity,
        reference: newTransaction.reference,
        user: newTransaction.user,
      })
      setShowAddModal(false)
      setNewTransaction({ product: '', type: 'Stock In', quantity: 0, reference: '', user: 'Admin' })
      fetchTransactions()
    } catch (error) {
      console.error('Error adding transaction:', error)
    }
  }

  const handleDeleteTransaction = async (id: number) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return
    try {
      await deleteStockMovement(id)
      fetchTransactions()
    } catch (error) {
      console.error('Error deleting transaction:', error)
    }
  }

  // Chart data - derived from real transactions
  const movementMap: Record<string, { stockIn: number; stockOut: number }> = {}
  if (Array.isArray(transactions)) {
    transactions.forEach((t: any) => {
      const date = t.date || 'Unknown'
      if (!movementMap[date]) movementMap[date] = { stockIn: 0, stockOut: 0 }
      if (t.type === 'Stock In' || t.type === 'in') {
        movementMap[date].stockIn += t.quantity || 0
      } else {
        movementMap[date].stockOut += t.quantity || 0
      }
    })
  }
  const chartData = Object.entries(movementMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-8)
    .map(([name, data]) => ({ name, ...data }))

  // Product Stock Levels - FIXED with null check
  const stockLevels = (products && Array.isArray(products)) 
    ? products.slice(0, 6).map(p => ({
        name: p.name.substring(0, 15),
        stock: p.stock,
      }))
    : []

  if (loading) {
    return (
      <MainLayout title="Stock Management" subtitle="Loading...">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading stock data...</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="Stock Management" subtitle="Track stock movements and manage inventory levels">
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Stock Movement Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Stock Movement Trend</h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="stockIn" stroke="#10b981" strokeWidth={2} name="Stock In" />
                <Line type="monotone" dataKey="stockOut" stroke="#ef4444" strokeWidth={2} name="Stock Out" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-gray-500 bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
              No stock movements recorded yet
            </div>
          )}
        </motion.div>

        {/* Product Stock Levels Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Current Stock Levels</h3>
          {stockLevels.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stockLevels}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stock" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No product data available
            </div>
          )}
        </motion.div>
      </div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
              <p className="text-sm text-gray-500 mt-1">Showing {transactions.length} transactions</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction, idx) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{transaction.product}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      transaction.type === 'Stock In' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {transaction.type === 'Stock In' ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {transaction.type === 'Stock In' ? '+' : '-'}{transaction.quantity}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.reference}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.user}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteTransaction(transaction.id)}
                      className="text-red-600 hover:text-red-900 font-medium inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Transaction Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setShowAddModal(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Add Stock Transaction</h2>
                    <p className="text-sm text-gray-500">Record a stock movement</p>
                  </div>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleAddTransaction} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Product *</label>
                      <div className="flex gap-2">
                        <select
                          required
                          value={newTransaction.product}
                          onChange={(e) => setNewTransaction({...newTransaction, product: e.target.value})}
                          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="">Select a product</option>
                          {products && products.map(p => (
                            <option key={p.id} value={p.name}>{p.name}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => setShowNewProductForm(!showNewProductForm)}
                          className={`px-3 py-2.5 rounded-lg flex items-center justify-center transition-all duration-200 ${
                            showNewProductForm
                              ? 'bg-red-100 text-red-600 hover:bg-red-200'
                              : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                          }`}
                          title={showNewProductForm ? 'Cancel' : 'Add new product'}
                        >
                          {showNewProductForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        </button>
                      </div>

                      {/* Inline New Product Form */}
                      <AnimatePresence>
                        {showNewProductForm && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 p-4 bg-indigo-50 border border-indigo-200 rounded-xl space-y-3">
                              <div className="flex items-center gap-2 mb-1">
                                <Package className="w-4 h-4 text-indigo-600" />
                                <span className="text-sm font-bold text-indigo-700">Quick Add Product</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Product Name *</label>
                                  <input
                                    type="text"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                    placeholder="e.g., Wireless Headphones"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">SKU *</label>
                                  <input
                                    type="text"
                                    value={newProduct.sku}
                                    onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                    placeholder="e.g., WH-001"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Category *</label>
                                  <div className="relative">
                                    <input
                                      type="text"
                                      list="category-suggestions"
                                      value={newProduct.category}
                                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                      placeholder="Type or select category"
                                    />
                                    <datalist id="category-suggestions">
                                      {categories.map((cat, i) => (
                                        <option key={i} value={cat} />
                                      ))}
                                    </datalist>
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Price *</label>
                                  <input
                                    type="number"
                                    step="0.01"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value) || 0})}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                    placeholder="0.00"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Initial Stock</label>
                                  <input
                                    type="number"
                                    value={newProduct.stock}
                                    onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                    placeholder="0"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Min Stock Level</label>
                                  <input
                                    type="number"
                                    value={newProduct.min_stock}
                                    onChange={(e) => setNewProduct({...newProduct, min_stock: parseInt(e.target.value) || 0})}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                    placeholder="0"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                                <input
                                  type="text"
                                  value={newProduct.description}
                                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                  placeholder="Optional description"
                                />
                              </div>
                              <div className="flex justify-end gap-2 pt-1">
                                <button
                                  type="button"
                                  onClick={() => setShowNewProductForm(false)}
                                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={handleCreateProduct}
                                  disabled={creatingProduct || !newProduct.name || !newProduct.sku || !newProduct.category}
                                  className="px-4 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {creatingProduct ? (
                                    <>
                                      <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                      </svg>
                                      Creating...
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="w-3.5 h-3.5" />
                                      Add Product
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Transaction Type *</label>
                      <select
                        required
                        value={newTransaction.type}
                        onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value as 'Stock In' | 'Stock Out'})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Stock In">Stock In</option>
                        <option value="Stock Out">Stock Out</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity *</label>
                      <input
                        type="number"
                        required
                        value={newTransaction.quantity}
                        onChange={(e) => setNewTransaction({...newTransaction, quantity: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter quantity"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Reference Number *</label>
                      <input
                        type="text"
                        required
                        value={newTransaction.reference}
                        onChange={(e) => setNewTransaction({...newTransaction, reference: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., PO-2024-001"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 px-6 py-3 border border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Add Transaction
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </MainLayout>
  )
}
