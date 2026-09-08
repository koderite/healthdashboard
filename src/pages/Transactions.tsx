import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ArrowDown, ArrowUp, ArrowUpDown, Download, Search } from 'lucide-react';

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

type SortKey = 'id' | 'patient' | 'date' | 'amount' | 'method' | 'status';
type SortDir = 'asc' | 'desc';

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'id', label: 'Invoice' },
  { key: 'patient', label: 'Patient' },
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount' },
  { key: 'method', label: 'Method' },
  { key: 'status', label: 'Status' },
];

const parseAmount = (amount: string) => Number(amount.replace(/[^0-9.]/g, '')) || 0;

function exportCsv(rows: typeof transactions) {
  const header = ['Invoice', 'Patient', 'Date', 'Amount', 'Method', 'Status'];
  const lines = rows.map((row) =>
    [row.id, row.patient, row.date, row.amount, row.method, row.status]
      .map((value) => `"${value}"`)
      .join(',')
  );
  const blob = new Blob([[header.join(','), ...lines].join('\n')], {
    type: 'text/csv;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'transactions.csv';
  link.click();
  URL.revokeObjectURL(url);
}

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      transactions.filter(
        (tx) =>
          tx.patient.toLowerCase().includes(normalizedQuery) ||
          tx.id.toLowerCase().includes(normalizedQuery)
      ),
    [normalizedQuery]
  );

  const sorted = useMemo(() => {
    const factor = sortDir === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) =>
      sortKey === 'amount'
        ? factor * (parseAmount(a.amount) - parseAmount(b.amount))
        : factor * a[sortKey].localeCompare(b[sortKey])
    );
  }, [filtered, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((dir) => (dir === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const handleExport = () => {
    exportCsv(sorted);
    toast.success(`Exported ${sorted.length} transaction${sorted.length === 1 ? '' : 's'} to CSV`);
  };

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
            type="button"
            onClick={handleExport}
            className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-navy transition-all duration-150 hover:bg-gray-50 active:scale-[0.98]"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Export
          </button>
        </div>
      </div>

      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                {COLUMNS.map(({ key, label }) => {
                  const isActive = sortKey === key;
                  return (
                    <th
                      key={key}
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                    >
                      <button
                        type="button"
                        onClick={() => toggleSort(key)}
                        aria-label={`Sort by ${label}`}
                        className={`flex items-center gap-1 rounded transition-colors duration-150 hover:text-navy ${isActive ? 'text-navy' : ''}`}
                      >
                        {label}
                        {isActive ? (
                          sortDir === 'asc' ? (
                            <ArrowUp className="h-3 w-3" aria-hidden="true" />
                          ) : (
                            <ArrowDown className="h-3 w-3" aria-hidden="true" />
                          )
                        ) : (
                          <ArrowUpDown className="h-3 w-3 opacity-40" aria-hidden="true" />
                        )}
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sorted.map((tx) => (
                <tr key={tx.id} className="transition-colors duration-150 hover:bg-gray-50">
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
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={COLUMNS.length} className="px-4 py-10 text-center text-sm text-gray-500">
                    No transactions match &ldquo;{searchQuery.trim()}&rdquo;.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
