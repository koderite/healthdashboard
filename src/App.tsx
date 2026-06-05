import { Routes, Route, Navigate } from 'react-router';
import { AppShell } from '@/components/layout/AppShell';
import { AppLayout } from '@/components/layout/AppLayout';
import Overview from '@/pages/Overview';
import Schedule from '@/pages/Schedule';
import Message from '@/pages/Message';
import Transactions from '@/pages/Transactions';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Overview />} />
        <Route path="/patients" element={<AppLayout />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/message" element={<Message />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
