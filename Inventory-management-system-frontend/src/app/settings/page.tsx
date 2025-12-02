// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { 
//   User, Bell, Lock, Settings as SettingsIcon, 
//   Mail, Phone, MapPin, Building, Calendar,
//   Shield, Key, Smartphone, Clock, AlertTriangle,
//   Save, Camera, Edit2, Check, X
// } from 'lucide-react';
// import { useTheme } from '../../contexts/ThemeContext';

// export default function SettingsPage() {
//   const [activeTab, setActiveTab] = useState('profile');

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-transparent p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]">
//             Settings
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300">Manage your account settings and preferences</p>
//         </div>


//         <div className="grid grid-cols-12 gap-6">
//           {/* Sidebar */}
//           <div className="col-span-3">
//             <div className="bg-white rounded-lg shadow-sm p-2">
//               <nav className="space-y-1">
//                 <button
//                   onClick={() => setActiveTab('profile')}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
//                     activeTab === 'profile'
//                       ? 'bg-indigo-50 text-indigo-600'
//                       : 'text-gray-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   <User className="w-5 h-5" />
//                   <span className="font-medium">Profile</span>
//                 </button>

//                 <button
//                   onClick={() => setActiveTab('notifications')}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
//                     activeTab === 'notifications'
//                       ? 'bg-indigo-50 text-indigo-600'
//                       : 'text-gray-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   <Bell className="w-5 h-5" />
//                   <span className="font-medium">Notifications</span>
//                 </button>

//                 <button
//                   onClick={() => setActiveTab('security')}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
//                     activeTab === 'security'
//                       ? 'bg-indigo-50 text-indigo-600'
//                       : 'text-gray-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   <Lock className="w-5 h-5" />
//                   <span className="font-medium">Security</span>
//                 </button>

//                 <button
//                   onClick={() => setActiveTab('preferences')}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
//                     activeTab === 'preferences'
//                       ? 'bg-indigo-600 text-white'
//                       : 'text-gray-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   <SettingsIcon className="w-5 h-5" />
//                   <span className="font-medium">Preferences</span>
//                 </button>
//               </nav>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="col-span-9">
//             {activeTab === 'profile' && <ProfileSettings />}
//             {activeTab === 'notifications' && <NotificationSettings />}
//             {activeTab === 'security' && <SecuritySettings />}
//             {activeTab === 'preferences' && <PreferencesSettings />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Profile Settings Component
// function ProfileSettings() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const [profile, setProfile] = useState({
//     firstName: 'Het',
//     lastName: 'Patel',
//     email: 'hetpatelsk@gmail.com',
//     phone: '+91 9825247312',
//     role: 'Administrator',
//     company: 'WEB YOUR VYAVSAY',
//     location: 'Ahmedabad, Gujarat',
//     bio: 'Backend Developer passionate about building scalable systems',
//     joinedDate: '2024-01-15',
//     avatar: '',
//   });

//   // Load from localStorage on mount
//   useEffect(() => {
//     const savedProfile = localStorage.getItem('userProfile');
//     if (savedProfile) {
//       try {
//         const parsed = JSON.parse(savedProfile);
//         setProfile(prev => ({ ...prev, ...parsed }));
//       } catch (e) {
//         console.error('Failed to parse saved profile:', e);
//       }
//     }
//   }, []);

//   const handleSave = () => {
//     localStorage.setItem('userProfile', JSON.stringify(profile));
//     setSaved(true);
//     setIsEditing(false);
//     setTimeout(() => setSaved(false), 3000);
//   };

//   const handleChange = (field: string, value: string) => {
//     setProfile(prev => ({ ...prev, [field]: value }));
//   };

//   // Handle photo upload
//   const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//       alert('Please upload an image file (JPG, PNG, GIF, etc.)');
//       return;
//     }

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       alert('Image size should be less than 5MB');
//       return;
//     }

//     setUploading(true);

//     // Convert to base64
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64String = reader.result as string;
//       const updatedProfile = { ...profile, avatar: base64String };
//       setProfile(updatedProfile);
//       localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
//       setUploading(false);
//       setSaved(true);
//       setTimeout(() => setSaved(false), 3000);
//     };
//     reader.onerror = () => {
//       setUploading(false);
//       alert('Failed to upload image. Please try again.');
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleCameraClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleRemovePhoto = () => {
//     if (confirm('Are you sure you want to remove your profile photo?')) {
//       const updatedProfile = { ...profile, avatar: '' };
//       setProfile(updatedProfile);
//       localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
//       setSaved(true);
//       setTimeout(() => setSaved(false), 3000);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Hidden file input */}
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="image/*"
//         onChange={handlePhotoUpload}
//         className="hidden"
//       />

//       {/* Profile Header Card */}
//       <div className="bg-white rounded-lg shadow-sm">
//         <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-lg"></div>
//         <div className="px-6 pb-6">
//           <div className="flex items-end -mt-16 mb-4">
//             <div className="relative">
//               <div className="w-32 h-32 rounded-full bg-white p-2 shadow-lg">
//                 {profile.avatar ? (
//                   <img
//                     src={profile.avatar}
//                     alt="Profile"
//                     className="w-full h-full rounded-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center text-4xl font-bold text-indigo-600">
//                     {profile.firstName[0]}{profile.lastName[0]}
//                   </div>
//                 )}
//               </div>
              
//               {/* Camera Button */}
//               <button
//                 onClick={handleCameraClick}
//                 disabled={uploading}
//                 className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
//                 title="Upload profile photo"
//               >
//                 {uploading ? (
//                   <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
//                 ) : (
//                   <Camera className="w-4 h-4 text-gray-600" />
//                 )}
//               </button>
//             </div>
            
//             <div className="ml-6 flex-1">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     {profile.firstName} {profile.lastName}
//                   </h2>
//                   <p className="text-gray-600">{profile.role}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {profile.avatar && (
//                     <button
//                       onClick={handleRemovePhoto}
//                       className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
//                     >
//                       <X className="w-4 h-4" />
//                       Remove Photo
//                     </button>
//                   )}
//                   <button
//                     onClick={() => setIsEditing(!isEditing)}
//                     className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     {isEditing ? (
//                       <>
//                         <X className="w-4 h-4" />
//                         Cancel
//                       </>
//                     ) : (
//                       <>
//                         <Edit2 className="w-4 h-4" />
//                         Edit Profile
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {saved && (
//             <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
//               <Check className="w-5 h-5" />
//               <span className="font-medium">Profile updated successfully!</span>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Personal Information */}
//       <div className="bg-white rounded-lg shadow-sm">
//         <div className="p-6 border-b border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
//           <p className="text-sm text-gray-600 mt-1">Update your personal details</p>
//         </div>
//         <div className="p-6 space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 value={profile.firstName}
//                 onChange={(e) => handleChange('firstName', e.target.value)}
//                 disabled={!isEditing}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 value={profile.lastName}
//                 onChange={(e) => handleChange('lastName', e.target.value)}
//                 disabled={!isEditing}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <Mail className="w-4 h-4 inline mr-2" />
//               Email Address
//             </label>
//             <input
//               type="email"
//               value={profile.email}
//               onChange={(e) => handleChange('email', e.target.value)}
//               disabled={!isEditing}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <Phone className="w-4 h-4 inline mr-2" />
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               value={profile.phone}
//               onChange={(e) => handleChange('phone', e.target.value)}
//               disabled={!isEditing}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <Building className="w-4 h-4 inline mr-2" />
//               Company
//             </label>
//             <input
//               type="text"
//               value={profile.company}
//               onChange={(e) => handleChange('company', e.target.value)}
//               disabled={!isEditing}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <MapPin className="w-4 h-4 inline mr-2" />
//               Location
//             </label>
//             <input
//               type="text"
//               value={profile.location}
//               onChange={(e) => handleChange('location', e.target.value)}
//               disabled={!isEditing}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Bio
//             </label>
//             <textarea
//               value={profile.bio}
//               onChange={(e) => handleChange('bio', e.target.value)}
//               disabled={!isEditing}
//               rows={3}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 resize-none"
//             />
//           </div>

//           <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <Calendar className="w-4 h-4" />
//               <span>Member since {new Date(profile.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
//             </div>
//             {isEditing && (
//               <button
//                 onClick={handleSave}
//                 className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
//               >
//                 <Save className="w-4 h-4" />
//                 Save Changes
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Notification Settings Component
// function NotificationSettings() {
//   const [saved, setSaved] = useState(false);
//   const [notifications, setNotifications] = useState({
//     emailOrderUpdates: true,
//     emailInventoryAlerts: true,
//     emailLowStock: true,
//     emailWeeklyReport: false,
//     emailMonthlyReport: true,
//     emailSecurityAlerts: true,
//     pushOrderUpdates: true,
//     pushInventoryAlerts: false,
//     pushLowStock: true,
//     pushSystemUpdates: false,
//     inAppOrderUpdates: true,
//     inAppInventoryAlerts: true,
//     inAppComments: true,
//     inAppMentions: true,
//     smsOrderUpdates: false,
//     smsCriticalAlerts: true,
//   });

//   useEffect(() => {
//     const saved = localStorage.getItem('notificationSettings');
//     if (saved) {
//       setNotifications(JSON.parse(saved));
//     }
//   }, []);

//   const handleToggle = (key: string) => {
//     setNotifications(prev => ({
//       ...prev,
//       [key]: !prev[key as keyof typeof prev]
//     }));
//   };

//   const handleSave = () => {
//     localStorage.setItem('notificationSettings', JSON.stringify(notifications));
//     setSaved(true);
//     setTimeout(() => setSaved(false), 3000);
//   };

//   const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
//     <button
//       onClick={onToggle}
//       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//         enabled ? 'bg-indigo-600' : 'bg-gray-200'
//       }`}
//     >
//       <span
//         className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//           enabled ? 'translate-x-6' : 'translate-x-1'
//         }`}
//       />
//     </button>
//   );

//   return (
//     <div className="space-y-6">
//       {saved && (
//         <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
//           <Check className="w-5 h-5" />
//           <span className="font-medium">Notification preferences saved successfully!</span>
//         </div>
//       )}

//       {/* Email Notifications */}
//       <div className="bg-white rounded-lg shadow-sm">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center gap-3">
//             <Mail className="w-6 h-6 text-indigo-600" />
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900">Email Notifications</h3>
//               <p className="text-sm text-gray-600">Receive notifications via email</p>
//             </div>
//           </div>
//         </div>
//         <div className="p-6 space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="font-medium text-gray-900">Order Updates</div>
//               <div className="text-sm text-gray-600">Get notified about order status changes</div>
//             </div>
//             <Toggle enabled={notifications.emailOrderUpdates} onToggle={() => handleToggle('emailOrderUpdates')} />
//           </div>

//           <div className="flex items-center justify-between">
//             <div>
//               <div className="font-medium text-gray-900">Inventory Alerts</div>
//               <div className="text-sm text-gray-600">Receive alerts about inventory changes</div>
//             </div>
//             <Toggle enabled={notifications.emailInventoryAlerts} onToggle={() => handleToggle('emailInventoryAlerts')} />
//           </div>

//           <div className="flex items-center justify-between">
//             <div>
//               <div className="font-medium text-gray-900">Low Stock Warnings</div>
//               <div className="text-sm text-gray-600">Alert when products are running low</div>
//             </div>
//             <Toggle enabled={notifications.emailLowStock} onToggle={() => handleToggle('emailLowStock')} />
//           </div>

//           <div className="flex items-center justify-between">
//             <div>
//               <div className="font-medium text-gray-900">Weekly Reports</div>
//               <div className="text-sm text-gray-600">Summary of weekly activity</div>
//             </div>
//             <Toggle enabled={notifications.emailWeeklyReport} onToggle={() => handleToggle('emailWeeklyReport')} />
//           </div>

//           <div className="flex items-center justify-between">
//             <div>
//               <div className="font-medium text-gray-900">Monthly Reports</div>
//               <div className="text-sm text-gray-600">Comprehensive monthly analytics</div>
//             </div>
//             <Toggle enabled={notifications.emailMonthlyReport} onToggle={() => handleToggle('emailMonthlyReport')} />
//           </div>

//           <div className="flex items-center justify-between">
//             <div>
//               <div className="font-medium text-gray-900">Security Alerts</div>
//               <div className="text-sm text-gray-600">Important security notifications</div>
//             </div>
//             <Toggle enabled={notifications.emailSecurityAlerts} onToggle={() => handleToggle('emailSecurityAlerts')} />
//           </div>
//         </div>
//       </div>

//       {/* Push Notifications */}
//       <div className="bg-white rounded-lg shadow-sm">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center gap-3">
//             <Bell className="w-6 h-6 text-indigo-600" />
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900">Push Notifications</h3>
//               <p className="text-sm text-gray-600">Browser push notifications</p>
//             </div>
//           </div>
//         </div>
//         <div className="p-6 space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="font-medium text-gray-900">Order Updates</div>
//               <div className="text-sm text-gray-600">Real-time order notifications</div>
//             </div>
//             <Toggle enabled={notifications.pushOrderUpdates} onToggle={() => handleToggle('pushOrderUpdates')} />
//           </div>

//           <div className="flex items-center justify-between">
//             <div>
//               <div className="font-medium text-gray-900">Inventory Alerts</div>
//               <div className="text-sm text-gray-600">Instant inventory notifications</div>
//             </div>
//             <Toggle enabled={notifications.pushInventoryAlerts} onToggle={() => handleToggle('pushInventoryAlerts')} />
//           </div>

//           <div className="flex items-center justify-between">
//             <div>
//               <div className="font-medium text-gray-900">Low Stock</div>
//               <div className="text-sm text-gray-600">Critical stock level alerts</div>
//             </div>
//             <Toggle enabled={notifications.pushLowStock} onToggle={() => handleToggle('pushLowStock')} />
//           </div>

//           <div className="flex items-center justify-between">
//             <div>
//               <div className="font-medium text-gray-900">System Updates</div>
//               <div className="text-sm text-gray-600">Platform maintenance and updates</div>
//             </div>
//             <Toggle enabled={notifications.pushSystemUpdates} onToggle={() => handleToggle('pushSystemUpdates')} />
//           </div>
//         </div>
//       </div>

//       {/* In-App Notifications */}
//       <div className="bg-white rounded-lg shadow-sm">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center gap-3">
//             <AlertTriangle className="w-6 h-6 text-indigo-600" />
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900">In-App Notifications</h3>
//               <p className="text-sm text-gray-600">Notifications within the application</p>
//             </div>
//           </div>
//         </div>
//         <div className="p-6 space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="font-medium text-gray-900">Order Updates</div>
//               <div className="text-sm text-gray-600">Show order notifications in app</div>
//             </div>
//             <Toggle enabled={notifications.inAppOrderUpdates} onToggle={() => handleToggle('inAppOrderUpdates')} />
//           </div>

//           <div className="flex items-center justify-between">
//             <div>
//               <div className="font-medium text-gray-900">Inventory Alerts</div>
//               <div className="text-sm text-gray-600">Display inventory notifications</div>
//             </div>
//             <Toggle enabled={notifications.inAppInventoryAlerts} onToggle={() => handleToggle('inAppInventoryAlerts')} />
//           </div>

//           <div className="flex items-center justify-between">
//             <div>
//               <div className="font-medium text-gray-900">Comments</div>
//               <div className="text-sm text-gray-600">Notify when someone comments</div>
//             </div>
//             <Toggle enabled={notifications.inAppComments} onToggle={() => handleToggle('inAppComments')} />
//           </div>

//           <div className="flex items-center justify-between">
//             <div>
//               <div className="font-medium text-gray-900">Mentions</div>
//               <div className="text-sm text-gray-600">Notify when you're mentioned</div>
//             </div>
//             <Toggle enabled={notifications.inAppMentions} onToggle={() => handleToggle('inAppMentions')} />
//           </div>
//         </div>
//       </div>

//       {/* SMS Notifications */}
//       <div className="bg-white rounded-lg shadow-sm">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center gap-3">
//             <Smartphone className="w-6 h-6 text-indigo-600" />
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900">SMS Notifications</h3>
//               <p className="text-sm text-gray-600">Text message notifications</p>
//             </div>
//           </div>
//         </div>
//         <div className="p-6 space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="font-medium text-gray-900">Order Updates</div>
//               <div className="text-sm text-gray-600">SMS for important order updates</div>
//             </div>
//             <Toggle enabled={notifications.smsOrderUpdates} onToggle={() => handleToggle('smsOrderUpdates')} />
//           </div>

//           <div className="flex items-center justify-between">
//             <div>
//               <div className="font-medium text-gray-900">Critical Alerts</div>
//               <div className="text-sm text-gray-600">SMS for urgent notifications only</div>
//             </div>
//             <Toggle enabled={notifications.smsCriticalAlerts} onToggle={() => handleToggle('smsCriticalAlerts')} />
//           </div>
//         </div>
//       </div>

//       {/* Save Button */}
//       <div className="flex justify-end">
//         <button
//           onClick={handleSave}
//           className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
//         >
//           <Save className="w-5 h-5" />
//           Save Notification Preferences
//         </button>
//       </div>
//     </div>
//   );
// }

// // Security Settings Component
// function SecuritySettings() {
//   const [showPasswordChange, setShowPasswordChange] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const [passwords, setPasswords] = useState({
//     current: '',
//     new: '',
//     confirm: ''
//   });
//   const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
//   const [sessions, setSessions] = useState([
//     { id: 1, device: 'Chrome on MacBook Pro', location: 'Gandhinagar, India', lastActive: '2 minutes ago', current: true },
//     { id: 2, device: 'Safari on iPhone 14', location: 'Gandhinagar, India', lastActive: '1 hour ago', current: false },
//     { id: 3, device: 'Firefox on Windows', location: 'Mumbai, India', lastActive: '2 days ago', current: false },
//   ]);

//   const handlePasswordChange = () => {
//     if (passwords.new !== passwords.confirm) {
//       alert('Passwords do not match!');
//       return;
//     }
//     setSaved(true);
//     setShowPasswordChange(false);
//     setPasswords({ current: '', new: '', confirm: '' });
//     setTimeout(() => setSaved(false), 3000);
//   };

//   const handleLogoutSession = (sessionId: number) => {
//     setSessions(prev => prev.filter(s => s.id !== sessionId));
//   };

//   return (
//     <div className="space-y-6">
//       {saved && (
//         <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
//           <Check className="w-5 h-5" />
//           <span className="font-medium">Security settings updated successfully!</span>
//         </div>
//       )}

//       {/* Password */}
//       <div className="bg-white rounded-lg shadow-sm">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <Key className="w-6 h-6 text-indigo-600" />
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900">Password</h3>
//                 <p className="text-sm text-gray-600">Change your password regularly to keep your account secure</p>
//               </div>
//             </div>
//             <button
//               onClick={() => setShowPasswordChange(!showPasswordChange)}
//               className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
//             >
//               {showPasswordChange ? 'Cancel' : 'Change Password'}
//             </button>
//           </div>
//         </div>

//         {showPasswordChange && (
//           <div className="p-6 space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Current Password
//               </label>
//               <input
//                 type="password"
//                 value={passwords.current}
//                 onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 placeholder="Enter current password"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 New Password
//               </label>
//               <input
//                 type="password"
//                 value={passwords.new}
//                 onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 placeholder="Enter new password"
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 Must be at least 8 characters with uppercase, lowercase, and numbers
//               </p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Confirm New Password
//               </label>
//               <input
//                 type="password"
//                 value={passwords.confirm}
//                 onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 placeholder="Confirm new password"
//               />
//             </div>

//             <div className="flex justify-end pt-4">
//               <button
//                 onClick={handlePasswordChange}
//                 className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
//               >
//                 Update Password
//               </button>
//             </div>
//           </div>
//         )}

//         {!showPasswordChange && (
//           <div className="p-6">
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <Clock className="w-4 h-4" />
//               <span>Last changed 45 days ago</span>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Two-Factor Authentication */}
//       <div className="bg-white rounded-lg shadow-sm">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center gap-3">
//             <Shield className="w-6 h-6 text-indigo-600" />
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
//               <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
//             </div>
//           </div>
//         </div>
//         <div className="p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="font-medium text-gray-900">Enable 2FA</div>
//               <div className="text-sm text-gray-600">Require a code from your phone in addition to your password</div>
//             </div>
//             <button
//               onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
//               className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                 twoFactorEnabled ? 'bg-indigo-600' : 'bg-gray-200'
//               }`}
//             >
//               <span
//                 className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                   twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
//                 }`}
//               />
//             </button>
//           </div>

//           {twoFactorEnabled && (
//             <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
//               <div className="text-sm text-indigo-900 font-medium mb-2">Setup Instructions:</div>
//               <ol className="text-sm text-indigo-800 space-y-1 list-decimal list-inside">
//                 <li>Download Google Authenticator or Authy app</li>
//                 <li>Scan the QR code or enter the setup key</li>
//                 <li>Enter the 6-digit code to verify</li>
//               </ol>
//               <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors">
//                 Setup 2FA Now
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Active Sessions */}
//       <div className="bg-white rounded-lg shadow-sm">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center gap-3">
//             <Smartphone className="w-6 h-6 text-indigo-600" />
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900">Active Sessions</h3>
//               <p className="text-sm text-gray-600">Manage devices where you're currently logged in</p>
//             </div>
//           </div>
//         </div>
//         <div className="divide-y divide-gray-200">
//           {sessions.map((session) => (
//             <div key={session.id} className="p-6 flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
//                   <Smartphone className="w-6 h-6 text-indigo-600" />
//                 </div>
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <span className="font-medium text-gray-900">{session.device}</span>
//                     {session.current && (
//                       <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
//                         Current
//                       </span>
//                     )}
//                   </div>
//                   <div className="text-sm text-gray-600">{session.location}</div>
//                   <div className="text-xs text-gray-500">Last active: {session.lastActive}</div>
//                 </div>
//               </div>
//               {!session.current && (
//                 <button
//                   onClick={() => handleLogoutSession(session.id)}
//                   className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
//                 >
//                   Logout
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Login History */}
//       <div className="bg-white rounded-lg shadow-sm">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center gap-3">
//             <Clock className="w-6 h-6 text-indigo-600" />
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900">Login History</h3>
//               <p className="text-sm text-gray-600">Recent login activity on your account</p>
//             </div>
//           </div>
//         </div>
//         <div className="p-6">
//           <div className="space-y-3">
//             {[
//               { date: 'Today, 8:42 PM', device: 'Chrome on MacBook Pro', location: 'Gandhinagar, India', success: true },
//               { date: 'Today, 3:15 PM', device: 'Safari on iPhone 14', location: 'Gandhinagar, India', success: true },
//               { date: 'Nov 26, 10:30 AM', device: 'Firefox on Windows', location: 'Mumbai, India', success: true },
//               { date: 'Nov 25, 11:20 PM', device: 'Unknown Device', location: 'Delhi, India', success: false },
//             ].map((login, index) => (
//               <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                 <div className="flex items-center gap-3">
//                   <div className={`w-2 h-2 rounded-full ${login.success ? 'bg-green-500' : 'bg-red-500'}`}></div>
//                   <div>
//                     <div className="text-sm font-medium text-gray-900">{login.device}</div>
//                     <div className="text-xs text-gray-600">{login.location} • {login.date}</div>
//                   </div>
//                 </div>
//                 {!login.success && (
//                   <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
//                     Failed
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Preferences Settings Component
// // Preferences Settings Component
// function PreferencesSettings() {
//   const { theme, setTheme, displayDensity, setDisplayDensity } = useTheme();
//   const [saved, setSaved] = useState(false);
//   const [preferences, setPreferences] = useState({
//     currency: 'USD',
//     language: 'en',
//     dateFormat: 'MM/DD/YYYY',
//     weekStart: 'monday',
//   });

//   useEffect(() => {
//     const savedPrefs = localStorage.getItem('userPreferences');
//     if (savedPrefs) {
//       try {
//         const prefs = JSON.parse(savedPrefs);
//         setPreferences({
//           currency: prefs.currency || 'USD',
//           language: prefs.language || 'en',
//           dateFormat: prefs.dateFormat || 'MM/DD/YYYY',
//           weekStart: prefs.weekStart || 'monday',
//         });
//       } catch (e) {
//         console.error('Failed to parse preferences:', e);
//       }
//     }
//   }, []);

//   const handleSave = () => {
//     const savedPrefs = localStorage.getItem('userPreferences');
//     const existingPrefs = savedPrefs ? JSON.parse(savedPrefs) : {};
//     localStorage.setItem('userPreferences', JSON.stringify({
//       ...existingPrefs,
//       ...preferences,
//       theme,
//       displayDensity
//     }));
//     setSaved(true);
//     setTimeout(() => setSaved(false), 3000);
//   };

//   const handleChange = (key: string, value: any) => {
//     setPreferences(prev => ({
//       ...prev,
//       [key]: value
//     }));
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
//       <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//         <h2 className="text-xl font-semibold text-gray-900 dark:text-white">App Preferences</h2>
//         <p className="text-gray-600 dark:text-gray-400 mt-1">Customize your application experience</p>
//       </div>

//       <div className="p-6 space-y-6">
//         {saved && (
//           <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2 text-green-700 dark:text-green-400">
//             <Check className="w-5 h-5" />
//             <span className="font-medium">Preferences saved successfully!</span>
//           </div>
//         )}

//         {/* Theme */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Theme
//           </label>
//           <div className="flex gap-4">
//             <button
//               onClick={() => setTheme('light')}
//               className={`flex-1 px-4 py-3 border-2 rounded-lg transition-all ${
//                 theme === 'light'
//                   ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
//                   : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
//               }`}
//             >
//               <div className="text-sm font-medium text-gray-900 dark:text-white">☀️ Light</div>
//             </button>
//             <button
//               onClick={() => setTheme('dark')}
//               className={`flex-1 px-4 py-3 border-2 rounded-lg transition-all ${
//                 theme === 'dark'
//                   ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
//                   : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
//               }`}
//             >
//               <div className="text-sm font-medium text-gray-900 dark:text-white">🌙 Dark</div>
//             </button>
//             <button
//               onClick={() => setTheme('auto')}
//               className={`flex-1 px-4 py-3 border-2 rounded-lg transition-all ${
//                 theme === 'auto'
//                   ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
//                   : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
//               }`}
//             >
//               <div className="text-sm font-medium text-gray-900 dark:text-white">⚡ Auto</div>
//             </button>
//           </div>
//         </div>

//         {/* Currency */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Default Currency
//           </label>
//           <select
//             value={preferences.currency}
//             onChange={(e) => handleChange('currency', e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//           >
//             <option value="USD">USD - US Dollar ($)</option>
//             <option value="INR">INR - Indian Rupee (₹)</option>
//             <option value="EUR">EUR - Euro (€)</option>
//             <option value="GBP">GBP - British Pound (£)</option>
//             <option value="JPY">JPY - Japanese Yen (¥)</option>
//           </select>
//         </div>

//         {/* Language */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Language
//           </label>
//           <select
//             value={preferences.language}
//             onChange={(e) => handleChange('language', e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//           >
//             <option value="en">English</option>
//             <option value="hi">हिन्दी (Hindi)</option>
//             <option value="gu">ગુજરાતી (Gujarati)</option>
//             <option value="es">Español (Spanish)</option>
//           </select>
//         </div>

//         {/* Date Format */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Date Format
//           </label>
//           <select
//             value={preferences.dateFormat}
//             onChange={(e) => handleChange('dateFormat', e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//           >
//             <option value="MM/DD/YYYY">MM/DD/YYYY (12/25/2025)</option>
//             <option value="DD/MM/YYYY">DD/MM/YYYY (25/12/2025)</option>
//             <option value="YYYY-MM-DD">YYYY-MM-DD (2025-12-25)</option>
//             <option value="DD MMM YYYY">DD MMM YYYY (25 Dec 2025)</option>
//           </select>
//         </div>

//         {/* Display Density */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Display Density
//           </label>
//           <div className="flex gap-4">
//             {(['compact', 'comfortable', 'spacious'] as const).map((density) => (
//               <button
//                 key={density}
//                 onClick={() => setDisplayDensity(density)}
//                 className={`flex-1 px-4 py-3 border-2 rounded-lg transition-all capitalize ${
//                   displayDensity === density
//                     ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
//                     : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
//                 }`}
//               >
//                 <span className="text-gray-900 dark:text-white">{density}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Week Start */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Week Starts On
//           </label>
//           <select
//             value={preferences.weekStart}
//             onChange={(e) => handleChange('weekStart', e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//           >
//             <option value="sunday">Sunday</option>
//             <option value="monday">Monday</option>
//           </select>
//         </div>
//       </div>

//       {/* Save Button */}
//       <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
//         <div className="flex justify-end">
//           <button
//             onClick={handleSave}
//             className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }















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

type TabType = 'profile' | 'notifications' | 'security' | 'preferences'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile')
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const tabs = [
    { id: 'profile' as TabType, label: 'Profile', icon: User },
    { id: 'notifications' as TabType, label: 'Notifications', icon: Bell },
    { id: 'security' as TabType, label: 'Security', icon: Lock },
    { id: 'preferences' as TabType, label: 'Preferences', icon: SettingsIcon },
  ]

  return (
    <MainLayout title="Settings" subtitle="Manage your account settings and preferences">
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
              ✅ Settings saved successfully!
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
            <h2 className="text-2xl font-bold text-white dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-indigo-100 dark:text-indigo-200">{profile.role}</p>
          </div>
        </div>
      </div>
    </>
  )
}

// Profile Settings Component
function ProfileSettings({ onSave }: { onSave: () => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    firstName: 'Het', lastName: 'Patel', email: 'het@example.com',
    phone: '+91 98765 43210', company: 'WEB YOUR VYAVSAY',
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
              Personal Information
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Update your personal details</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-indigo-500/40 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors dark:text-white"
          >
            {isEditing ? <><X className="w-4 h-4" /> Cancel</> : <><Edit2 className="w-4 h-4" /> Edit Profile</>}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">First Name</label>
            <input
              type="text" value={profile.firstName}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white disabled:opacity-50 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
            <input
              type="text" value={profile.lastName}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white disabled:opacity-50 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" /> Email Address
          </label>
          <input
            type="email" value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white disabled:opacity-50 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4" /> Phone Number
          </label>
          <input
            type="tel" value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white disabled:opacity-50 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <Building className="w-4 h-4" /> Company
          </label>
          <input
            type="text" value={profile.company}
            onChange={(e) => setProfile({ ...profile, company: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white disabled:opacity-50 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Location
          </label>
          <input
            type="text" value={profile.location}
            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white disabled:opacity-50 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            disabled={!isEditing} rows={4}
            className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white disabled:opacity-50 transition-all"
          />
        </div>

        {isEditing && (
          <button
            onClick={handleSave}
            className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg font-semibold transition-all dark:shadow-[0_0_25px_rgba(99,102,241,0.6)] flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" /> Save Changes
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
  const [preferences, setPreferences] = useState({
    language: 'English', timezone: 'Asia/Kolkata (IST)', dateFormat: 'DD/MM/YYYY'
  })

  useEffect(() => {
    const saved = localStorage.getItem('userPreferences')
    if (saved) {
      try {
        setPreferences(JSON.parse(saved))
      } catch (e) {}
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('userPreferences', JSON.stringify({ ...preferences, theme }))
    onSave()
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] mb-2">
          App Preferences
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Customize your app experience</p>

        {/* DARK MODE TOGGLE */}
        <div className="p-6 bg-gray-50 dark:bg-slate-700 rounded-lg dark:border dark:border-indigo-500/30 mb-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">🌓 Theme</label>
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
              <div className="text-sm font-medium dark:text-white">Light</div>
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
              <div className="text-sm font-medium dark:text-white">Dark</div>
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
              <div className="text-sm font-medium dark:text-white">Auto</div>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg dark:border dark:border-indigo-500/30">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Language</h4>
            <select 
              value={preferences.language}
              onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-600 dark:text-white"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Gujarati</option>
            </select>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg dark:border dark:border-indigo-500/30">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Time Zone</h4>
            <select 
              value={preferences.timezone}
              onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-600 dark:text-white"
            >
              <option>Asia/Kolkata (IST)</option>
              <option>America/New_York (EST)</option>
              <option>Europe/London (GMT)</option>
            </select>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg dark:border dark:border-indigo-500/30">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Date Format</h4>
            <select 
              value={preferences.dateFormat}
              onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-600 dark:text-white"
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
          <Save className="w-5 h-5" /> Save Preferences
        </button>
      </div>
    </motion.div>
  )
}
