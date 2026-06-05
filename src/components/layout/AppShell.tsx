import { motion } from "framer-motion";
import { Outlet } from "react-router";
import { TopNavigation } from "./TopNavigation";

export function AppShell() {
  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <TopNavigation />
      </motion.div>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
        className="px-4 sm:px-6 pb-6"
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
