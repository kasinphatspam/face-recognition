import { motion } from "framer-motion";

export function AnimateListItem({ children }) {
  return (
    <motion.li
      className="relative"
      initial={{
        height: 0,
        opacity: 0,
      }}
      animate={{
        height: "auto",
        opacity: 1,
        transition: {
          type: "spring",
          bounce: 0.2,
          opacity: { delay: 0.1 },
        }
      }}
    >
      {children}
    </motion.li>
  );
}
