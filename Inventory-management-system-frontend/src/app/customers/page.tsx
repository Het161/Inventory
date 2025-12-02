// 'use client'

// import { useState, useEffect } from 'react'
// import MainLayout from '../../components/layout/MainLayout'
// import { motion } from 'framer-motion'
// import { Users, DollarSign, ShoppingCart } from 'lucide-react'
// import { getCustomers } from '../../lib/api'
// import { useCurrency } from '../../contexts/CurrencyContext'

// interface Customer {
//   id: number
//   name: string
//   email: string
//   phone: string
//   total_purchases: number
//   status: string
// }

// export default function CustomersPage() {
//   const { formatPrice, formatLargeNumbera} = useCurrency()
//   const [customers, setCustomers] = useState<Customer[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchCustomers()
//   }, [])

//   const fetchCustomers = async () => {
//     try {
//       const response = await getCustomers()
//       setCustomers(response.data)
//     } catch (error) {
//       console.error('Error fetching customers:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const totalRevenue = 16600
//   const avgOrders = 12

//   if (loading) {
//     return (
//       <MainLayout title="Customers" subtitle="Manage customer information and history">
//         <div className="flex items-center justify-center h-64">
//           <div className="text-lg text-gray-600">Loading customers...</div>
//         </div>
//       </MainLayout>
//     )
//   }

//   return (
//     <MainLayout title="Customers" subtitle="Manage customer information and history">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-xl p-6 border border-gray-200"
//         >
//           <Users className="w-10 h-10 text-blue-600 mb-3" />
//           <p className="text-sm text-gray-500">Total Customers</p>
//           <p className="text-3xl font-bold text-gray-900">{customers.length}</p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white rounded-xl p-6 border border-gray-200"
//         >
//           <DollarSign className="w-10 h-10 text-green-600 mb-3" />
//           <p className="text-sm text-gray-500">Total Revenue</p>
//           <p className="text-3xl font-bold text-gray-900">{formatLargeNumber(totalRevenue, 1)}</p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-white rounded-xl p-6 border border-gray-200"
//         >
//           <ShoppingCart className="w-10 h-10 text-purple-600 mb-3" />
//           <p className="text-sm text-gray-500">Avg Orders</p>
//           <p className="text-3xl font-bold text-gray-900">{avgOrders}</p>
//         </motion.div>
//       </div>

//       {/* Customers Table */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3 }}
//         className="bg-white rounded-xl border border-gray-200"
//       >
//         <div className="p-6 border-b border-gray-200">
//           <h2 className="text-lg font-bold text-gray-900">Customer List</h2>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Phone</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Orders</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total Spent</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {customers.map((customer, idx) => (
//                 <motion.tr
//                   key={customer.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.05 }}
//                   className="hover:bg-gray-50"
//                 >
//                   <td className="px-6 py-4 text-sm font-medium text-gray-900">C00{customer.id}</td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
//                         {customer.name.charAt(0)}
//                       </div>
//                       <div>
//                         <div className="text-sm font-medium text-gray-900">{customer.name}</div>
//                         <div className="text-xs text-gray-500">{idx === 0 ? 'Premium' : idx === 1 ? 'Regular' : 'VIP'}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{customer.email}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{customer.phone}</td>
//                   <td className="px-6 py-4 text-sm font-medium text-gray-900">{idx === 0 ? 12 : idx === 1 ? 8 : 15}</td>
//                   <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatPrice(idx === 0 ? 5600 : idx === 1 ? 3200 : 7800)}</td>
//                   <td className="px-6 py-4">
//                     <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
//                       {customer.status}
//                     </span>
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </motion.div>
//     </MainLayout>
//   )
// }
'use client';

import { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Users, DollarSign, ShoppingCart } from 'lucide-react';
import { getCustomers } from '../../lib/api';
import { useCurrency } from '../../contexts/CurrencyContext';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  total_purchases: number;
  status: string;
}

export default function CustomersPage() {
  const { formatPrice, formatLargeNumber } = useCurrency();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();

      // Support both axios-style and fetch-style responses safely
      const raw = (response && (response.data ?? response)) as any;
      const list = Array.isArray(raw) ? raw : Array.isArray(raw?.results) ? raw.results : [];

      setCustomers(list as Customer[]);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers([]); // fail-safe
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = 16600;
  const avgOrders = 12;

  if (loading) {
    return (
      <MainLayout title="Customers" subtitle="Manage customer information and history">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading customers...</div>
        </div>
      </MainLayout>
    );
  }

  const safeCustomers = Array.isArray(customers) ? customers : [];
  const totalCustomers = safeCustomers.length;

  return (
    <MainLayout title="Customers" subtitle="Manage customer information and history">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <Users className="w-10 h-10 text-blue-600 mb-3" />
          <p className="text-sm text-gray-500">Total Customers</p>
          <p className="text-3xl font-bold text-gray-900">{totalCustomers}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <DollarSign className="w-10 h-10 text-green-600 mb-3" />
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900">
            {formatLargeNumber(totalRevenue, 1)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <ShoppingCart className="w-10 h-10 text-purple-600 mb-3" />
          <p className="text-sm text-gray-500">Avg Orders</p>
          <p className="text-3xl font-bold text-gray-900">{avgOrders}</p>
        </motion.div>
      </div>

      {/* Customers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Customer List</h2>
        </div>

        <div className="overflow-x-auto">
          {safeCustomers.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No customers found.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Customer ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Total Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {safeCustomers.map((customer, idx) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      C00{customer.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {customer.name?.charAt(0) ?? '?'}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {customer.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {idx === 0 ? 'Premium' : idx === 1 ? 'Regular' : 'VIP'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {customer.phone}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {idx === 0 ? 12 : idx === 1 ? 8 : 15}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatPrice(idx === 0 ? 5600 : idx === 1 ? 3200 : 7800)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        {customer.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </MainLayout>
  );
}
