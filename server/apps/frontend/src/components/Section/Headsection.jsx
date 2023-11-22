import { staggerContainer, textVariant } from "@/utils/motion"
import { motion } from "framer-motion"

export function HeadText({ title, subtext}) {
  return (
    <div className="w-full min-h-full bg-gradient-to-r bg-zinc-100 dark:bg-neutral-900 from-25% to-[200%] duration-150 ease-in dark:ease-out">
    <div className="flex flex-row max-md:flex-col min-h-[78vh] w-99vw">
      <div className="flex flex-col min-w-[44vw] mt-[19vh] ml-[15vw] pb-24 max-sm:pb-8 max-sm:ml-[9vw]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
        >
          {/* Feature */}
          <motion.div
            className="relative font-outfit font-semibold text-inherit text-[80px] w-[450px] ml-1 max-sm:text-[40px] max-md:w-[90vw] z-10"
            variants={textVariant(0.1)}
          >
            { title }
          </motion.div>

          {/* Secondary Text */}
          <motion.p
            className="text-black/50 dark:text-white text-6 ml-1 mt-6 w-[450px] max-w-[35vw] max-sm:max-w-[80vw] z-10"
            variants={textVariant(0.3)}
          >
            { subtext}  
          </motion.p>
        </motion.div>
      </div>
    </div>
  </div>
  )

}