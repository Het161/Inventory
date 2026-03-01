
'use client'

import { useState, useEffect, useRef } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { motion } from 'framer-motion'
import { 
  User, Bell, Lock, Settings as SettingsIcon, 
  Camera, Save, X, Check, Edit2,
  Mail, Phone, Building, MapPin, Calendar,
  Key, Shield, Smartphone, Clock
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useLanguage } from '../../contexts/LanguageContext'

type TabType = 'profile' | 'notifications' | 'security' | 'preferences'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile')
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { t } = useLanguage()

  const tabs = [
    { id: 'profile' as TabType, label: t('profile'), icon: User },
    { id: 'notifications' as TabType, label: t('notifications'), icon: Bell },
    { id: 'security' as TabType, label: t('security'), icon: Lock },
    { id: 'preferences' as TabType, label: t('preferences'), icon: SettingsIcon },
  ]

  return (
    <MainLayout title={t('settings')} subtitle={t('manageSettings')}>
      <div className="max-w-6xl mx-auto">
        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/50 rounded-lg p-4 flex items-center justify-between"
          >
            <span className="text-green-800 dark:text-green-300 font-medium">
              ✅ {t('settingsSaved')}
            </span>
            <button onClick={() => setShowSuccess(false)} className="text-green-600 dark:text-green-400 hover:text-green-800">
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-[0_0_30px_rgba(99,102,241,0.3)] overflow-hidden">
          {/* Profile Header */}
          <ProfileHeader />

          {/* Tabs Navigation */}
          <div className="mt-20 px-8 border-b border-gray-200 dark:border-indigo-500/30">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 font-medium rounded-t-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 dark:shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700/50 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'profile' && <ProfileSettings onSave={() => setShowSuccess(true)} />}
            {activeTab === 'notifications' && <NotificationSettings onSave={() => setShowSuccess(true)} />}
            {activeTab === 'security' && <SecuritySettings onSave={() => setShowSuccess(true)} />}
            {activeTab === 'preferences' && <PreferencesSettings onSave={() => setShowSuccess(true)} />}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

// Profile Header Component
function ProfileHeader() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profile, setProfile] = useState({ firstName: 'Het', lastName: 'Patel', role: 'Administrator', avatar: '' })
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile)
        setProfile(prev => ({ ...prev, ...parsed }))
      } catch (e) {}
    }
  }, [])

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB')
      return
    }
    
    setUploading(true)
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      const updatedProfile = { ...profile, avatar: base64String }
      setProfile(updatedProfile)
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile))
      setUploading(false)
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
      <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 dark:shadow-[0_0_40px_rgba(99,102,241,0.5)]">
        <div className="absolute -bottom-16 left-8 flex items-end gap-4">
          <div className="relative group">
            <div className="w-32 h-32 bg-white dark:bg-slate-700 rounded-full p-2 shadow-xl dark:shadow-[0_0_30px_rgba(99,102,241,0.6)] border-4 border-white dark:border-slate-800">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <div className="w-full h-full rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-4xl font-bold text-indigo-600 dark:text-indigo-300">
                  {profile.firstName[0]}{profile.lastName[0]}
                </div>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="absolute bottom-2 right-2 w-10 h-10 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg dark:shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all opacity-0 group-hover:opacity-100"
            >
              {uploading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Camera className="w-5 h-5" />}
            </button>
          </div>
          <div className="mb-4 ml-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-indigo-600 dark:text-indigo-300">{profile.role}</p>
          </div>
        </div>
      </div>
    </>
  )
}

// Profile Settings Component
function ProfileSettings({ onSave }: { onSave: () => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const { t } = useLanguage()
  const [profile, setProfile] = useState({
    firstName: 'Het', lastName: 'Patel', email: 'het@example.com',
    phone: '+91 98765 43210', company: 'OM Marketing Solutions',
    location: 'Gandhinagar, Gujarat', bio: 'Backend Developer & Inventory Management Specialist'
  })

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      try {
        setProfile(prev => ({ ...prev, ...JSON.parse(savedProfile) }))
      } catch (e) {}
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile))
    setIsEditing(false)
    onSave()
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
              {t('personalInfo')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{t('updatePersonalDetails')}</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-indigo-500/40 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors dark:text-white"
          >
            {isEditing ? <><X className="w-4 h-4" /> {t('cancel')}</> : <><Edit2 className="w-4 h-4" /> {t('editProfile')}</>}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('firstName')}</label>
            <input
              type="text" value={profile.firstName}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white bg-white dark:bg-slate-700 disabled:bg-gray-50 disabled:text-gray-700 dark:disabled:bg-slate-800 dark:disabled:text-gray-300 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('lastName')}</label>
            <input
              type="text" value={profile.lastName}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white bg-white dark:bg-slate-700 disabled:bg-gray-50 disabled:text-gray-700 dark:disabled:bg-slate-800 dark:disabled:text-gray-300 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" /> {t('emailAddress')}
          </label>
          <input
            type="email" value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white bg-white dark:bg-slate-700 disabled:bg-gray-50 disabled:text-gray-700 dark:disabled:bg-slate-800 dark:disabled:text-gray-300 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4" /> {t('phoneNumber')}
          </label>
          <input
            type="tel" value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white bg-white dark:bg-slate-700 disabled:bg-gray-50 disabled:text-gray-700 dark:disabled:bg-slate-800 dark:disabled:text-gray-300 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <Building className="w-4 h-4" /> {t('company')}
          </label>
          <input
            type="text" value={profile.company}
            onChange={(e) => setProfile({ ...profile, company: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white bg-white dark:bg-slate-700 disabled:bg-gray-50 disabled:text-gray-700 dark:disabled:bg-slate-800 dark:disabled:text-gray-300 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> {t('location')}
          </label>
          <input
            type="text" value={profile.location}
            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white bg-white dark:bg-slate-700 disabled:bg-gray-50 disabled:text-gray-700 dark:disabled:bg-slate-800 dark:disabled:text-gray-300 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('bio')}</label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            disabled={!isEditing} rows={4}
            className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white bg-white dark:bg-slate-700 disabled:bg-gray-50 disabled:text-gray-700 dark:disabled:bg-slate-800 dark:disabled:text-gray-300 transition-all"
          />
        </div>

        {isEditing && (
          <button
            onClick={handleSave}
            className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg font-semibold transition-all dark:shadow-[0_0_25px_rgba(99,102,241,0.6)] flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" /> {t('saveChanges')}
          </button>
        )}
      </div>
    </motion.div>
  )
}

// Notification Settings Component
function NotificationSettings({ onSave }: { onSave: () => void }) {
  const [notifications, setNotifications] = useState({
    emailNotifications: true, pushNotifications: true, smsNotifications: false,
    orderUpdates: true, stockAlerts: true, systemUpdates: false
  })

  useEffect(() => {
    const saved = localStorage.getItem('notificationSettings')
    if (saved) setNotifications(JSON.parse(saved))
  }, [])

  const handleSave = () => {
    localStorage.setItem('notificationSettings', JSON.stringify(notifications))
    onSave()
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] mb-2">
          Notification Preferences
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Choose how you want to be notified</p>

        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg dark:border dark:border-indigo-500/30">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive {key.includes('email') ? 'email' : key.includes('push') ? 'push' : 'SMS'} notifications
                </p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, [key]: !value })}
                className={`relative w-14 h-7 rounded-full transition-all ${
                  value ? 'bg-indigo-600 dark:bg-indigo-500 dark:shadow-[0_0_15px_rgba(99,102,241,0.6)]' : 'bg-gray-300 dark:bg-slate-600'
                }`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${value ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="mt-6 w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg font-semibold transition-all dark:shadow-[0_0_25px_rgba(99,102,241,0.6)] flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" /> Save Preferences
        </button>
      </div>
    </motion.div>
  )
}

// Security Settings Component
function SecuritySettings({ onSave }: { onSave: () => void }) {
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' })
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      alert('Passwords do not match!')
      return
    }
    setShowPasswordChange(false)
    setPasswords({ current: '', new: '', confirm: '' })
    onSave()
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] flex items-center gap-2">
              <Key className="w-5 h-5" /> Change Password
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Update your password to keep your account secure</p>
          </div>
          <button
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="px-4 py-2 border border-gray-300 dark:border-indigo-500/40 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors dark:text-white text-sm font-medium"
          >
            {showPasswordChange ? 'Cancel' : 'Change Password'}
          </button>
        </div>

        {showPasswordChange && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
              <input
                type="password" value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                placeholder="Enter current password"
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">New Password</label>
              <input
                type="password" value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                placeholder="Enter new password"
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
              <input
                type="password" value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                placeholder="Confirm new password"
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white transition-all"
              />
            </div>
            <button
              onClick={handlePasswordChange}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg font-semibold transition-all dark:shadow-[0_0_25px_rgba(99,102,241,0.6)] flex items-center gap-2"
            >
              <Save className="w-5 h-5" /> Update Password
            </button>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-indigo-500/30 pt-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5" /> Two-Factor Authentication
        </h3>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg dark:border dark:border-indigo-500/30">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Enable 2FA</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Require authentication code when signing in</p>
          </div>
          <button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`relative w-14 h-7 rounded-full transition-all ${
              twoFactorEnabled ? 'bg-indigo-600 dark:bg-indigo-500 dark:shadow-[0_0_15px_rgba(99,102,241,0.6)]' : 'bg-gray-300 dark:bg-slate-600'
            }`}
          >
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${twoFactorEnabled ? 'right-1' : 'left-1'}`} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// Preferences Settings Component with Dark Mode Toggle
function PreferencesSettings({ onSave }: { onSave: () => void }) {
  const { theme, setTheme } = useTheme()
  const { language: currentLang, setLanguage, t } = useLanguage()
  const [preferences, setPreferences] = useState({
    timezone: 'Asia/Kolkata (IST)', dateFormat: 'DD/MM/YYYY'
  })

  useEffect(() => {
    const saved = localStorage.getItem('userPreferences')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setPreferences(prev => ({ ...prev, timezone: parsed.timezone || prev.timezone, dateFormat: parsed.dateFormat || prev.dateFormat }))
      } catch (e) {}
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('userPreferences', JSON.stringify({ ...preferences, language: currentLang, theme }))
    onSave()
  }

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as any)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] mb-2">
          {t('appPreferences')}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{t('customizeExperience')}</p>

        {/* DARK MODE TOGGLE */}
        <div className="p-6 bg-gray-50 dark:bg-slate-700 rounded-lg dark:border dark:border-indigo-500/30 mb-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">🌓 {t('theme')}</label>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setTheme('light')}
              className={`px-4 py-3 border-2 rounded-lg transition-all ${
                theme === 'light'
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="text-2xl mb-1">☀️</div>
              <div className="text-sm font-medium dark:text-white">{t('light')}</div>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-4 py-3 border-2 rounded-lg transition-all ${
                theme === 'dark'
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="text-2xl mb-1">🌙</div>
              <div className="text-sm font-medium dark:text-white">{t('dark')}</div>
            </button>
            <button
              onClick={() => setTheme('auto')}
              className={`px-4 py-3 border-2 rounded-lg transition-all ${
                theme === 'auto'
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="text-2xl mb-1">⚡</div>
              <div className="text-sm font-medium dark:text-white">{t('auto')}</div>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg dark:border dark:border-indigo-500/30">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('language')}</h4>
            <select 
              value={currentLang}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-600 dark:text-white text-gray-900"
            >
              <option value="English">English</option>
              <option value="Hindi">हिन्दी (Hindi)</option>
              <option value="Gujarati">ગુજરાતી (Gujarati)</option>
            </select>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg dark:border dark:border-indigo-500/30">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('timeZone')}</h4>
            <select 
              value={preferences.timezone}
              onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-600 dark:text-white text-gray-900"
            >
              <option>Asia/Kolkata (IST)</option>
              <option>America/New_York (EST)</option>
              <option>Europe/London (GMT)</option>
            </select>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg dark:border dark:border-indigo-500/30">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('dateFormat')}</h4>
            <select 
              value={preferences.dateFormat}
              onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-600 dark:text-white text-gray-900"
            >
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg font-semibold transition-all dark:shadow-[0_0_25px_rgba(99,102,241,0.6)] flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" /> {t('savePreferences')}
        </button>
      </div>
    </motion.div>
  )
}

