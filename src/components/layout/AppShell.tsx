import { motion } from 'framer-motion';
import { Outlet } from 'react-router';
import { TopNavigation } from './TopNavigation';

export function AppShell() {
  return (
    <div className="min-h-screen">
      <TopNavigation />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut', delay: 0.08 }}
        className="mx-auto w-full max-w-[1564px] px-4 pb-6 sm:px-6"
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
