import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { textVariant, staggerContainer } from "@/utils/motion";
import FooterBar from '@/components/Footersection';
import { HeadText } from "@/components/Section/Headsection";

const FeaturePage = () => {

  return (
    <>
      <Navigation Active="Customers" />

      {/* Background images */}
      <div className="w-full min-h-full bg-gradient-to-r from-blue-50/50 to-blue-200/70 dark:from-zinc-900 dark:to-neutral-800 from-25% to-[200%] duration-150 ease-in dark:ease-out">
        {/* Main content */}
        <div className="flex flex-row justify-center max-md:flex-col min-h-[78vh] w-99vw">
          <div className="flex flex-col min-w-[44vw] mt-[19vh] ml-[15vw] pb-24 max-sm:pb-8 max-sm:ml-[9vw]">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
            >
              {/* <TypingText title="PLATFORM FOR ENTERPRISE" /> */}

              {/* Main Text */}
              <motion.div
                className="relative font-outfit font-semibold text-inherit text-[80px] ml-1 max-sm:text-[40px] max-md:w-[90vw] z-10"
                variants={textVariant(0.1)}
              >
                Feature
              </motion.div>

              {/* Secondary Text */}
              <motion.p
                className="text-black/50 text-center dark:text-white text-6 ml-1 mt-6 w-[450px] max-w-[35vw] max-sm:max-w-[80vw] z-10"
                variants={textVariant(0.3)}
              >
                Customer face recognition system for employees to view
                information through face scanning
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>

      <HeadText title="SnapShot" subtext="Enable seamless customer recognition with a single-shot image capture, empowering your staff to effortlessly identify customers. Elevate the customer experience to new heights as our cutting-edge technology streamlines the recognition process, ensuring efficiency and precision. Experience the next level of customer engagement, where a single snapshot paves the way for unparalleled service and a personalized touch."/>
      <HeadText title="Real-Time" subtext="Experience real-time face recognition with our advanced technology, enabling staff to seamlessly open the camera without the need for manual snapshots. Our program effortlessly auto-recognizes every face that appears in the camera, ensuring instantaneous and accurate identification. Streamline your operations with the convenience of on-the-fly recognition, setting a new standard for efficiency and responsiveness."/>
      <HeadText title="Employee Management" subtext="Enable seamless customer recognition with a single-shot image capture, empowering your staff to effortlessly identify customers. Elevate the customer experience to new heights as our cutting-edge technology streamlines the recognition process, ensuring efficiency and precision. Experience the next level of customer engagement, where a single snapshot paves the way for unparalleled service and a personalized touch."/>
      <HeadText title="Dashboard Analysis" subtext="Harness the power of data with our Dashboard Analysis feature. Effortlessly track and analyze customer behavior and purchase patterns to refine and optimize your company's marketing strategies. Elevate your company's marketing prowess by leveraging real-time insights derived from customer interactions and purchase data."/>
      
      {/** footer */}
      <div className="flex justify-center bg-gradient-to-r from-blue-50/50 to-blue-200/10 dark:from-zinc-900 dark:to-neutral-800">
        <FooterBar className="mt-10" />
      </div>
    </>
  );
}

export default FeaturePage;