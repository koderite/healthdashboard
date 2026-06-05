import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Search, ArrowUpDown } from 'lucide-react';

const transactions = [
  { id: '#INV-2024-001', patient: 'Jessica Taylor', date: 'Jan 15, 2024', amount: '$450.00', method: 'Insurance', status: 'Paid' },
  { id: '#INV-2024-002', patient: 'Michael Chen', date: 'Jan 14, 2024', amount: '$230.00', method: 'Credit Card', status: 'Paid' },
  { id: '#INV-2024-003', patient: 'Sarah Johnson', date: 'Jan 12, 2024', amount: '$890.00', method: 'Insurance', status: 'Pending' },
  { id: '#INV-2024-004', patient: 'Robert Wilson', date: 'Jan 10, 2024', amount: '$175.00', method: 'Cash', status: 'Paid' },
  { id: '#INV-2024-005', patient: 'Emily Davis', date: 'Jan 08, 2024', amount: '$1,200.00', method: 'Insurance', status: 'Overdue' },
  { id: '#INV-2024-006', patient: 'Lisa Anderson', date: 'Jan 05, 2024', amount: '$340.00', method: 'Credit Card', status: 'Paid' },
  { id: '#INV-2024-007', patient: 'David Brown', date: 'Jan 03, 2024', amount: '$675.00', method: 'Insurance', status: 'Pending' },
];

const statusStyles: Record<string, string> = {
  'Paid': 'bg-green-100 text-green-700',
  'Pending': 'bg-yellow-100 text-yellow-700',
  'Overdue': 'bg-red-100 text-red-700',
};

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = transactions.filter(tx =>
    tx.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mt-4 xl:mt-8"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-title">Transactions</h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-48 pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <button
            onClick={() => alert('Export feature coming soon')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-navy border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-150"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <div className="flex items-center gap-1">
                    Invoice <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Patient</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Method</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((tx, i) => (
                <tr
                  key={i}
                  onClick={() => alert(`Invoice ${tx.id} for ${tx.patient} - ${tx.amount}`)}
                  className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                >
                  <td className="px-4 py-3.5 text-sm font-medium text-navy">{tx.id}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-700">{tx.patient}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-500">{tx.date}</td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-navy">{tx.amount}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-500">{tx.method}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[tx.status] || 'bg-gray-100 text-gray-600'}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
