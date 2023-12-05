import { motion, AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

export default function Animate() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" key={location.pathname}>
      <motion.div
        className=" absolute top-0 left-0 w-full h-screen origin-top z-20 bg-white dark:bg-neutral-900"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 2, ease: [0.07, 0.8, 0.21, 1] }}
      />
      <motion.div
        className=" absolute top-0 left-0 w-full h-screen origin-bottom z-20 bg-white dark:bg-neutral-900"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 2, ease: [0.07, 0.8, 0.21, 1] }}
      />
      <Outlet />
    </AnimatePresence>
  );
}
