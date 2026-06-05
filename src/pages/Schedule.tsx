import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

const appointments = [
  { time: '09:00 AM', patient: 'Jessica Taylor', type: 'Check-up', doctor: 'Dr. Simmons', status: 'Completed' },
  { time: '10:30 AM', patient: 'Michael Chen', type: 'Cardiology', doctor: 'Dr. Simmons', status: 'In Progress' },
  { time: '11:45 AM', patient: 'Sarah Johnson', type: 'Follow-up', doctor: 'Dr. Wilson', status: 'Scheduled' },
  { time: '01:15 PM', patient: 'Robert Wilson', type: 'Lab Results', doctor: 'Dr. Simmons', status: 'Scheduled' },
  { time: '02:30 PM', patient: 'Emily Davis', type: 'Consultation', doctor: 'Dr. Parker', status: 'Scheduled' },
  { time: '04:00 PM', patient: 'Lisa Anderson', type: 'Therapy', doctor: 'Dr. Simmons', status: 'Scheduled' },
];

const statusStyles: Record<string, string> = {
  'Completed': 'bg-green-100 text-green-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  'Scheduled': 'bg-gray-100 text-gray-600',
};

export default function Schedule() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mt-4 xl:mt-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-title">Schedule</h1>
        <button className="nav-btn nav-btn-active">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Today</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 card-base p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-navy">Appointments</h2>
            <span className="text-sm text-gray-400">6 appointments today</span>
          </div>

          <div className="divide-y divide-gray-100">
            {appointments.map((apt, i) => (
              <div key={i} className="flex items-center gap-4 py-3.5 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors duration-150 cursor-pointer">
                <div className="flex items-center gap-2 w-24 flex-shrink-0">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-navy">{apt.time}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy">{apt.patient}</p>
                  <p className="text-xs text-gray-500">{apt.type} - {apt.doctor}</p>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[apt.status] || 'bg-gray-100 text-gray-600'}`}>
                  {apt.status}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <div className="card-base p-5">
          <h2 className="text-lg font-semibold text-navy mb-4">Upcoming</h2>
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">Select a date to view schedule</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
