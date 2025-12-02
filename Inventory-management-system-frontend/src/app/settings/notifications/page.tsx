'use client'

import MainLayout from '../../../components/layout/MainLayout'
import { motion } from 'framer-motion'
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react'
import { useState } from 'react'

export default function NotificationPreferencesPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    stockAlerts: true,
    orderUpdates: true,
    paymentAlerts: true,
    systemAlerts: true,
    weeklyReports: true,
    monthlyReports: false,
  })

  const toggleSetting = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  return (
    <MainLayout title="Notification Preferences" subtitle="Configure how you receive notifications">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-8"
        >
          {/* Notification Channels */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Notification Channels</h3>
            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Email Notifications', icon: Mail, desc: 'Receive notifications via email' },
                { key: 'pushNotifications', label: 'Push Notifications', icon: Bell, desc: 'Browser push notifications' },
                { key: 'smsNotifications', label: 'SMS Notifications', icon: Smartphone, desc: 'Receive SMS alerts' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings[item.key as keyof typeof settings] as boolean}
                      onChange={() => toggleSetting(item.key)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Types */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Alert Types</h3>
            <div className="space-y-3">
              {[
                { key: 'stockAlerts', label: 'Stock Alerts', desc: 'Low stock and out of stock notifications' },
                { key: 'orderUpdates', label: 'Order Updates', desc: 'New orders and order status changes' },
                { key: 'paymentAlerts', label: 'Payment Alerts', desc: 'Payment received and pending payments' },
                { key: 'systemAlerts', label: 'System Alerts', desc: 'System updates and maintenance notices' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings[item.key as keyof typeof settings] as boolean}
                      onChange={() => toggleSetting(item.key)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Reports */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Reports</h3>
            <div className="space-y-3">
              {[
                { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Receive weekly performance summary' },
                { key: 'monthlyReports', label: 'Monthly Reports', desc: 'Receive monthly analytics report' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings[item.key as keyof typeof settings] as boolean}
                      onChange={() => toggleSetting(item.key)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              Save Preferences
            </button>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  )
}
