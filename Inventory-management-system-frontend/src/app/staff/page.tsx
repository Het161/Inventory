'use client'

import MainLayout from '../../components/layout/MainLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Briefcase, Award, Search, Plus, X, Save, Mail, Phone, DollarSign, Calendar, User } from 'lucide-react'
import { useState } from 'react'

interface StaffMember {
  id: string
  name: string
  email: string
  phone: string
  role: string
  department: string
  salary: number
  status: 'Active' | 'Inactive' | 'On Leave'
  joinDate: string
  rating?: number
}

export default function StaffManagementPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    { id: 'S001', name: 'John Doe', email: 'john@shanenterprise.com', phone: '+880 1234-567890', role: 'Manager', department: 'Sales', salary: 50000, status: 'Active', joinDate: 'Jan 2023', rating: 4.8 },
    { id: 'S002', name: 'Jane Smith', email: 'jane@shanenterprise.com', phone: '+880 1234-567891', role: 'Supervisor', department: 'Operations', salary: 40000, status: 'Active', joinDate: 'Mar 2023', rating: 4.6 },
    { id: 'S003', name: 'Bob Johnson', email: 'bob@shanenterprise.com', phone: '+880 1234-567892', role: 'Assistant', department: 'Warehouse', salary: 30000, status: 'Active', joinDate: 'Jun 2023', rating: 4.5 },
  ])

  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Assistant',
    department: 'Sales',
    salary: '',
    joinDate: new Date().toISOString().split('T')[0],
    emergencyContact: '',
    address: '',
  })

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault()
    
    const staff: StaffMember = {
      id: `S${(staffMembers.length + 1).toString().padStart(3, '0')}`,
      name: newStaff.name,
      email: newStaff.email,
      phone: newStaff.phone,
      role: newStaff.role,
      department: newStaff.department,
      salary: parseInt(newStaff.salary),
      status: 'Active',
      joinDate: new Date(newStaff.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      rating: 4.5,
    }

    setStaffMembers([...staffMembers, staff])
    setShowAddModal(false)
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      role: 'Assistant',
      department: 'Sales',
      salary: '',
      joinDate: new Date().toISOString().split('T')[0],
      emergencyContact: '',
      address: '',
    })
    alert('✅ Staff member added successfully!')
  }

  const filteredStaff = staffMembers.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const departments = Array.from(new Set(staffMembers.map(s => s.department)))
  const avgRating = (staffMembers.reduce((sum, s) => sum + (s.rating || 0), 0) / staffMembers.length).toFixed(1)

  return (
    <MainLayout title="Staff Management" subtitle="Manage staff members and assignments">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <Users className="w-10 h-10 text-indigo-600 mb-3" />
          <p className="text-sm text-gray-500">Total Staff</p>
          <p className="text-3xl font-bold text-gray-900">{staffMembers.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <Briefcase className="w-10 h-10 text-purple-600 mb-3" />
          <p className="text-sm text-gray-500">Departments</p>
          <p className="text-3xl font-bold text-gray-900">{departments.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <Award className="w-10 h-10 text-yellow-600 mb-3" />
          <p className="text-sm text-gray-500">Avg Rating</p>
          <p className="text-3xl font-bold text-gray-900">{avgRating}</p>
        </motion.div>
      </div>

      {/* Staff Members List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl border border-gray-200"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Staff Members</h2>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Staff
            </motion.button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Staff ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Salary</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStaff.map((staff, idx) => (
                <motion.tr
                  key={staff.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{staff.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {staff.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{staff.name}</div>
                        <div className="text-xs text-gray-500">{staff.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{staff.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{staff.department}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">${staff.salary.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      staff.status === 'Active' ? 'bg-green-100 text-green-700' :
                      staff.status === 'On Leave' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {staff.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">Showing {filteredStaff.length} of {staffMembers.length} staff members</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      </motion.div>

      {/* Add Staff Modal */}
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
                className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Add New Staff Member</h2>
                      <p className="text-sm text-gray-500">Fill in employee details</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleAddStaff} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newStaff.name}
                        onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={newStaff.email}
                        onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="john@shanenterprise.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={newStaff.phone}
                        onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="+880 1234-567890"
                      />
                    </div>

                    {/* Role */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Role *
                      </label>
                      <select
                        required
                        value={newStaff.role}
                        onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Manager">Manager</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Assistant">Assistant</option>
                        <option value="Clerk">Clerk</option>
                        <option value="Accountant">Accountant</option>
                        <option value="Sales Executive">Sales Executive</option>
                        <option value="Warehouse Staff">Warehouse Staff</option>
                      </select>
                    </div>

                    {/* Department */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Department *
                      </label>
                      <select
                        required
                        value={newStaff.department}
                        onChange={(e) => setNewStaff({...newStaff, department: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Sales">Sales</option>
                        <option value="Operations">Operations</option>
                        <option value="Warehouse">Warehouse</option>
                        <option value="Accounting">Accounting</option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Customer Service">Customer Service</option>
                      </select>
                    </div>

                    {/* Salary */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <DollarSign className="w-4 h-4 inline mr-2" />
                        Monthly Salary ($) *
                      </label>
                      <input
                        type="number"
                        required
                        value={newStaff.salary}
                        onChange={(e) => setNewStaff({...newStaff, salary: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="50000"
                      />
                    </div>

                    {/* Join Date */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Join Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={newStaff.joinDate}
                        onChange={(e) => setNewStaff({...newStaff, joinDate: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    {/* Emergency Contact */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Emergency Contact Number
                      </label>
                      <input
                        type="tel"
                        value={newStaff.emergencyContact}
                        onChange={(e) => setNewStaff({...newStaff, emergencyContact: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="+880 1234-567890"
                      />
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Address
                      </label>
                      <textarea
                        value={newStaff.address}
                        onChange={(e) => setNewStaff({...newStaff, address: e.target.value})}
                        rows={2}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter full address..."
                      />
                    </div>
                  </div>

                  {/* Preview Card */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Preview</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                          {newStaff.name ? newStaff.name.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {newStaff.name || 'Staff Name'}
                          </p>
                          <p className="text-sm text-gray-600">{newStaff.role} • {newStaff.department}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {newStaff.email || 'email@example.com'}
                          </p>
                        </div>
                      </div>
                      {newStaff.salary && (
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Monthly Salary</p>
                          <p className="text-lg font-bold text-gray-900">
                            ${parseInt(newStaff.salary).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Modal Footer */}
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
                      Add Staff Member
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
