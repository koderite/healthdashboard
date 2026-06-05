import { Activity, TrendingUp, Users, Clock, ArrowUp, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Total Patients', value: '2,847', change: '+12.5%', up: true, icon: Users, color: '#E0F3FA' },
  { label: 'Appointments', value: '184', change: '+8.2%', up: true, icon: Clock, color: '#FFE6E9' },
  { label: 'Procedures', value: '52', change: '-3.1%', up: false, icon: Activity, color: '#FFE6F1' },
  { label: 'Satisfaction', value: '94.2%', change: '+2.4%', up: true, icon: TrendingUp, color: '#D8FCF7' },
];

const recentActivity = [
  { time: '09:45 AM', event: 'New patient registration', detail: 'Sarah Johnson added to cardiology' },
  { time: '10:30 AM', event: 'Lab results received', detail: 'Blood work for Michael Chen completed' },
  { time: '11:15 AM', event: 'Appointment rescheduled', detail: 'Emily Davis moved to Friday 2pm' },
  { time: '01:00 PM', event: 'Prescription renewed', detail: 'Robert Wilson - Metformin 500mg' },
  { time: '02:20 PM', event: 'Discharge summary', detail: 'Lisa Anderson discharged from ward 3B' },
];

export default function Overview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mt-4 xl:mt-8"
    >
      <h1 className="text-title mb-6">Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-base p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: stat.color }}
              >
                <stat.icon className="w-6 h-6 text-navy" />
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-navy mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 card-base p-5">
          <h2 className="text-lg font-semibold text-navy mb-4">Recent Activity</h2>
          <div className="divide-y divide-gray-100">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-4 py-3">
                <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy">{item.event}</p>
                  <p className="text-xs text-gray-500">{item.detail}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-base p-5">
          <h2 className="text-lg font-semibold text-navy mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {['New Appointment', 'Register Patient', 'View Reports', 'Manage Staff'].map((action) => (
              <button
                key={action}
                className="w-full text-left px-4 py-3 rounded-xl border border-gray-100 text-sm font-medium text-navy hover:bg-gray-50 transition-colors duration-150"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
