'use client'

import { useState, useEffect } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, TrendingUp, Plus, X, Save, Edit2, Trash2 } from 'lucide-react'
import { useCurrency } from '../../contexts/CurrencyContext'
import { getSales, createSale, updateSale, deleteSale } from '../../lib/api'

interface SalesMemo {
  id: number
  memo_id: string
  date: string
  customer: string
  amount: number
  status: string
}

export default function SalesMemosPage() {
  const { formatPrice, formatLargeNumber } = useCurrency()
  const [memos, setMemos] = useState<SalesMemo[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingMemo, setEditingMemo] = useState<SalesMemo | null>(null)
  const [formData, setFormData] = useState({
    memo_id: '', date: new Date().toISOString().split('T')[0], customer: '', amount: 0, status: 'Pending'
  })

  useEffect(() => {
    fetchMemos()
  }, [])

  const fetchMemos = async () => {
    try {
      const data = await getSales()
      setMemos(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching sales:', error)
      setMemos([])
    } finally {
      setLoading(false)
    }
  }

  const generateMemoId = () => {
    const nextNum = memos.length + 1
    return `M${String(nextNum).padStart(5, '0')}`
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createSale(formData)
      setShowAddModal(false)
      setFormData({ memo_id: '', date: new Date().toISOString().split('T')[0], customer: '', amount: 0, status: 'Pending' })
      fetchMemos()
    } catch (error) {
      console.error('Error creating sale:', error)
    }
  }

  const handleEdit = (memo: SalesMemo) => {
    setEditingMemo(memo)
    setFormData({
      memo_id: memo.memo_id,
      date: memo.date,
      customer: memo.customer,
      amount: memo.amount,
      status: memo.status
    })
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingMemo) return
    try {
      await updateSale(editingMemo.id, formData)
      setEditingMemo(null)
      setFormData({ memo_id: '', date: new Date().toISOString().split('T')[0], customer: '', amount: 0, status: 'Pending' })
      fetchMemos()
    } catch (error) {
      console.error('Error updating sale:', error)
    }
  }

  const handleDelete = async (memo: SalesMemo) => {
    if (!confirm(`Delete sales memo "${memo.memo_id}"?`)) return
    try {
      await deleteSale(memo.id)
      fetchMemos()
    } catch (error) {
      console.error('Error deleting sale:', error)
    }
  }

  const totalRevenue = memos.reduce((sum, m) => sum + m.amount, 0)
  const paidMemos = memos.filter(m => m.status === 'Paid').length

  if (loading) {
    return (
      <MainLayout title="Sales Memos" subtitle="Loading...">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading sales data...</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="Sales Memos" subtitle="Manage sales memos and transactions">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <FileText className="w-10 h-10 text-blue-600 mb-3" />
          <p className="text-sm text-gray-500">Total Memos</p>
          <p className="text-3xl font-bold text-gray-900">{memos.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <TrendingUp className="w-10 h-10 text-green-600 mb-3" />
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900">{formatPrice(totalRevenue)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <TrendingUp className="w-10 h-10 text-purple-600 mb-3" />
          <p className="text-sm text-gray-500">Paid</p>
          <p className="text-3xl font-bold text-gray-900">{paidMemos}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <button
            onClick={() => {
              setFormData({ ...formData, memo_id: generateMemoId() })
              setShowAddModal(true)
            }}
            className="w-full flex items-center gap-3 text-left"
          >
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-indigo-600">New Sales Memo</p>
              <p className="text-xs text-gray-500">Create a new transaction</p>
            </div>
          </button>
        </motion.div>
      </div>

      {/* Memos Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Sales Memos</h2>
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
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {memos.length > 0 ? memos.map((memo, idx) => (
                <motion.tr
                  key={memo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{memo.memo_id}</td>
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
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(memo)}
                        className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(memo)}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No sales memos yet</p>
                    <p className="text-sm text-gray-400 mt-1">Create your first sales memo to get started</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(showAddModal || editingMemo) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingMemo ? 'Edit Sales Memo' : 'New Sales Memo'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingMemo(null)
                    setFormData({ memo_id: '', date: new Date().toISOString().split('T')[0], customer: '', amount: 0, status: 'Pending' })
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={editingMemo ? handleUpdate : handleAdd}
                className="p-6 space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Memo ID *</label>
                    <input
                      type="text"
                      required
                      value={formData.memo_id}
                      onChange={(e) => setFormData({ ...formData, memo_id: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="e.g. M00001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer *</label>
                  <input
                    type="text"
                    required
                    value={formData.customer}
                    onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Customer name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option>Pending</option>
                      <option>Paid</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false)
                      setEditingMemo(null)
                      setFormData({ memo_id: '', date: new Date().toISOString().split('T')[0], customer: '', amount: 0, status: 'Pending' })
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {editingMemo ? 'Update Memo' : 'Create Memo'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  )
}
