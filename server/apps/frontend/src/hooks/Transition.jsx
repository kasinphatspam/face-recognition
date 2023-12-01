import { motion } from "framer-motion"

export function Transition(Component) {
  return () => (
    <>
      <Component />
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
      exit={{ scaleY: 0 }}
      transition={{ duration: 2, ease: [0.07, 0.8, 0.21, 1] }}
      />
    </>
  )
}

export function InTransition(Component) {
  return () => (
    <>
      <Component />
      <motion.div
      className=" fixed top-0 left-0 w-full h-screen origin-top z-20 bg-white dark:bg-neutral-800"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  )
}