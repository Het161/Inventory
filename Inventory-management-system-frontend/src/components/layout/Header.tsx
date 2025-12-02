'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Settings, Search, LogOut, User, Shield, ChevronDown } from 'lucide-react'
import { useCurrency } from '../../contexts/CurrencyContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const router = useRouter()
  const { currency, setCurrency } = useCurrency()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [profile, setProfile] = useState({ name: 'Admin', role: 'Administrator', avatar: '' })
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Low Stock Alert', message: 'Poco X6 Pro is running low on stock', time: '5 mins ago', unread: true },
    { id: 2, title: 'New Order', message: 'Order #12345 has been placed', time: '1 hour ago', unread: true },
    { id: 3, title: 'Stock Updated', message: 'Samsung Galaxy S24 stock updated', time: '3 hours ago', unread: false },
  ])

  const notificationRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })))
  }

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('userProfile')
      localStorage.removeItem('userToken')
      router.push('/login')
    }
  }

  const unreadCount = notifications.filter(n => n.unread).length

  // Helper function to get user initials
  const getUserInitials = () => {
    if (profile?.firstName && profile?.lastName) {
      return profile.firstName.charAt(0).toUpperCase() + profile.lastName.charAt(0).toUpperCase()
    }
    if (profile?.name) {
      const nameParts = profile.name.split(' ')
      if (nameParts.length >= 2) {
        return nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase()
      }
      return profile.name.charAt(0).toUpperCase()
    }
    if (profile?.email) {
      return profile.email.charAt(0).toUpperCase()
    }
    return 'A'
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-lg">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Currency Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  currency === 'USD' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                $ USD
              </button>
              <button
                onClick={() => setCurrency('INR')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  currency === 'INR' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                ₹ INR
              </button>
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications)
                  setShowProfile(false)
                }}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="font-bold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                              notification.unread ? 'bg-indigo-50' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 mt-2 rounded-full ${notification.unread ? 'bg-indigo-600' : 'bg-gray-300'}`} />
                              <div className="flex-1">
                                <h4 className="text-sm font-semibold text-gray-900">{notification.title}</h4>
                                <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-gray-500">
                          <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                          <p>No notifications</p>
                        </div>
                      )}
                    </div>
                    <div className="p-3 border-t border-gray-200 text-center">
                      <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings */}
            <button
              onClick={() => router.push('/settings')}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-6 h-6" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => {
                  setShowProfile(!showProfile)
                  setShowNotifications(false)
                }}
                className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
              >
                {/* Profile Avatar */}
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600 overflow-hidden">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    getUserInitials()
                  )}
                </div>

                <div className="text-left hidden md:block">
                  <div className="text-sm font-semibold text-gray-900">{profile.name}</div>
                  <div className="text-xs text-gray-500">{profile.role}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
              </button>

              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold overflow-hidden">
                          {profile.avatar ? (
                            <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            getUserInitials()
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{profile.name}</div>
                          <div className="text-xs text-gray-500">{profile.role}</div>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <button
                        onClick={() => {
                          router.push('/settings')
                          setShowProfile(false)
                        }}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">My Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          router.push('/settings')
                          setShowProfile(false)
                        }}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Settings</span>
                      </button>

                      <button
                        onClick={() => {
                          router.push('/settings')
                          setShowProfile(false)
                        }}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                      >
                        <Shield className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Privacy & Security</span>
                      </button>
                    </div>

                    <div className="border-t border-gray-200">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-red-50 transition-colors text-red-600"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
