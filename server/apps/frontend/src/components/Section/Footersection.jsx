import { motion } from 'framer-motion';
import { footerVariants } from '@/utils/motion';
import { FooterText } from '@/components/CustomText';

export const FooterBar = () => {

  return (
    <motion.div
      className="pt-12 sm:px-[17vw] grid grid-cols-4 max-sm:grid-cols-1 gap-10 max-sm:gap-y-unit-md max-sm:justify-items-center  w-99vw h-[250px] max-sm:h-auto max-sm:pb-12"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
    >
      {/** 1 */}
      <div>
        <div className="flex flex-row max-sm:w-[200px]">
          <img src="/logo_svg_color.svg" loading="lazy" className="w-8 h-8 mt-0.5" alt="Face Prove Logo" />
          <p className="font-bold text-xl mt-[1px] ml-2 text-inherit">Face Prove</p>
        </div>
        <div className="mt-24 max-sm:mt-4 ml-2 text-black/30 dark:text-white/70 text-md font-semibold">
          @2024 Faceprove.
        </div>
      </div>
      {/** 2 */}
      <div>
        <div className="flex flex-col max-sm:w-[200px] max-sm:pt-8">
          <div className="font-bold text-xl text-inherit">Explore</div>
          <FooterText title="Home" path="/" />
          <FooterText title="Feature" path="/featurepage" />
          <FooterText title="Subscriptions" path="/subscription" />
        </div>
      </div>
      {/** 3 */}
      <div className="flex flex-col max-sm:w-[200px]">
        <div className="font-bold text-xl text-inherit">Product</div>
        <FooterText title="Snapshot" path="/" />
        <FooterText title="Realtime processing" path="/" />
        <FooterText title="Employee management" path="/" />
        <FooterText title="DashBoard Analysis" path="/" />

      </div>
      {/** 4 */}
      <div className="flex flex-col max-sm:w-[200px]">
        <div className="font-bold text-xl text-inherit">Resources</div>
        <FooterText title="Support Center" path="/contactus" />
        <FooterText title="Privacy & Terms" path="/" />
        <FooterText title="Licenses" path="/" />
        <FooterText title="About us" path="/" />
      </div>
    </motion.div>
  );
};