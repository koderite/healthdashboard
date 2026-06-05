import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronLeft } from 'lucide-react';
import drJoseImg from '@/assets/Dr-Jose.png';

const conversations = [
  { name: 'Dr. Jose Simmons', role: 'General Practitioner', preview: 'Patient results are ready for review', time: '2m ago', unread: 2, online: true },
  { name: 'Sarah Johnson', role: 'Patient', preview: 'Thank you doctor, I feel much better today', time: '15m ago', unread: 0, online: false },
  { name: 'Dr. Emily Parker', role: 'Cardiologist', preview: 'Meeting scheduled for Friday at 2pm', time: '1h ago', unread: 1, online: true },
  { name: 'Lab Department', role: 'Central Lab', preview: 'Blood work results for Michael Chen', time: '2h ago', unread: 0, online: true },
  { name: 'Robert Wilson', role: 'Patient', preview: 'Is my prescription ready for pickup?', time: '3h ago', unread: 0, online: false },
  { name: 'Nurse Station 3B', role: 'Inpatient Care', preview: 'Patient Lisa Anderson is stable', time: '5h ago', unread: 0, online: true },
];

const unreadDot = (count: number) => {
  if (count === 0) return null;
  return (
    <span className="w-5 h-5 rounded-full bg-teal-500 text-white text-[10px] font-bold flex items-center justify-center">
      {count}
    </span>
  );
};

export default function Message() {
  const [selectedConv, setSelectedConv] = useState<typeof conversations[0] | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mt-4 xl:mt-8"
    >
      <h1 className="text-title mb-6">Messages</h1>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className={`w-full xl:w-[400px] card-base overflow-hidden ${selectedConv ? 'hidden xl:block' : ''}`}>
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto scrollbar-custom">
            {conversations.map((conv, i) => (
              <div
                key={i}
                onClick={() => setSelectedConv(conv)}
                className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-colors duration-150 ${
                  selectedConv === conv ? 'bg-teal-light' : 'hover:bg-gray-50'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img src={drJoseImg} alt={conv.name} className="w-10 h-10 rounded-full object-cover" />
                  {conv.online && (
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white absolute bottom-0 right-0" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-navy truncate">{conv.name}</p>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {unreadDot(conv.unread)}
                      <span className="text-[11px] text-gray-400">{conv.time}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-0.5">{conv.role}</p>
                  <p className="text-xs text-gray-400 truncate">{conv.preview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`flex-1 card-base p-4 sm:p-6 ${!selectedConv ? 'hidden xl:flex' : 'flex'} items-start justify-center flex-col`}>
          {selectedConv ? (
            <div className="w-full">
              <button
                onClick={() => setSelectedConv(null)}
                className="xl:hidden flex items-center gap-1 text-sm text-gray-500 mb-4 hover:text-navy"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="relative flex-shrink-0">
                  <img src={drJoseImg} alt={selectedConv.name} className="w-12 h-12 rounded-full object-cover" />
                  {selectedConv.online && (
                    <span className="w-3 h-3 rounded-full bg-green-500 border-2 border-white absolute bottom-0 right-0" />
                  )}
                </div>
                <div>
                  <p className="text-base font-semibold text-navy">{selectedConv.name}</p>
                  <p className="text-sm text-gray-500">{selectedConv.role}</p>
                </div>
              </div>
              <div className="text-center py-12">
                <p className="text-sm text-gray-400">Messages will appear here</p>
              </div>
            </div>
          ) : (
            <div className="w-full text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-navy font-semibold mb-1">Select a conversation</p>
              <p className="text-sm text-gray-500">Choose a message to read and reply</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
