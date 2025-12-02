'use client'

import MainLayout from '../../components/layout/MainLayout'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Calendar, Award } from 'lucide-react'

export default function ProfilePage() {
  return (
    <MainLayout title="My Profile" subtitle="View and manage your profile information">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          {/* Cover & Avatar */}
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <div className="absolute -bottom-12 left-8">
              <div className="w-24 h-24 bg-white rounded-full p-2">
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-16 p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Admin User</h2>
                <p className="text-gray-500">Administrator</p>
              </div>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Mail, label: 'Email', value: 'admin@shanenterprise.com' },
                { icon: Phone, label: 'Phone', value: '+880 1234-567890' },
                { icon: MapPin, label: 'Location', value: 'Dhaka, Bangladesh' },
                { icon: Calendar, label: 'Joined', value: 'January 2024' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="font-medium text-gray-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { label: 'Orders', value: '145' },
                { label: 'Products', value: '1,234' },
                { label: 'Revenue', value: '$45K' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  )
}
