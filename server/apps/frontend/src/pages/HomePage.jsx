import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { textVariant, staggerContainer } from "@/utils/motion";
import FeaturesCard from "@/components/Card/FeatureCard";
import { TypingText, FooterText } from "@/components/CustomText";
import { footerVariants } from "../utils/motion";
import Pricing from "@/components/Pricing"

export default function HomePage() {
  const [ month, setMonth ] = useState(1);
  const [ selectedMonth, setSelectedMonth] = useState(true);

  const handleMonth = (value, base) => {
    if (value === base) return null
    else { 
      setSelectedMonth(!value) 
      setMonth(1 + 11 * value)
    }
  }

  return (
    <>
      <Navigation
        Active="Customers"
      />

      {/* Background images */}
      <div className="w-full min-h-full bg-gradient-to-r from-[#F1F0E8] to-blue-50 dark:from-zinc-900 dark:to-neutral-800 from-45% to-120% duration-150 ease-in dark:ease-out">

        {/* Main content */}
        <div className="flex flex-row max-sm:flex-col min-h-[78vh] w-99vw">
          <div className="flex flex-col min-w-[44vw] mt-[20vh] ml-[15vw] pb-24 max-sm:pb-8 max-sm:ml-[9vw]">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
            >
              <TypingText title="businesses platform" textStyles="-ml-2" />

              {/* Main Text */}
              <motion.div className="relative font-outfit font-semibold text-inherit text-[80px]"
                variants={textVariant(0.1)}
              >
                Face Identify
              </motion.div>
              <motion.div className="font-semibold font-outfit text-inherit text-[80px] ml-1 -mt-4"
                variants={textVariant(0.2)}
              >
                Application
              </motion.div>

              {/* Secondary Text */}
              <motion.p className="text-gray-400 text-6 -ml-4 mt-10 w-[450px] max-w-[35vw] max-sm:max-w-[70vw]"
                variants={textVariant(0.3)}
              >
                Face recognition Application is computer algorithm method to vertify the identify people using
                their face in photos or real-time capture.
              </motion.p>
            </motion.div>

            {/* Get started Button */}
            <div className="flex flex-row mt-8 -ml-4">
              <Button color="success" href="/signup" radius="full" size="md">
                <p className="text-white font-medium"> Get Started </p>
              </Button>
            </div>
          </div>
          {/* Right Content */}
          <div className="flex flex-col pb-16">
            {/* Images */}
            <img src="/Faceillus.svg" loading="lazy" className="w-[550px] max-sm:w-[350px] min-w-[220px] mx-auto mt-[25vh] max-sm:mt-4" />
          </div>
        </div>
      </div>
      {/* First Sub-Content */}
      <motion.div className=" bg-[#B4B4B3] dark:bg-zinc-950 pl-[1px] pt-24 flex flex-col"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
      >
        <motion.div variants={textVariant(0.1)} className="mx-auto font-bold text-[54px] align-middle text-white/90 mt-16">Features</motion.div>
        <motion.div variants={textVariant(0.5)} className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-[12vw] pb-32">
          <FeaturesCard
            head={"Deep Learning Ai detection"}
            desc={"deep learning is that it can automatically learn features from the data, which means that it doesn't require the features to be hand-engineered"}
          />
          <FeaturesCard
            head={"User friendly"}
            desc={"deep learning is that it can automatically learn features from the data, which means that it doesn't require the features to be hand-engineered"}
          />
          <FeaturesCard
            head={"Web security"}
            desc={"Having site security gives customers peace of mind that their personal and financial information is safe."}
          />
          <FeaturesCard
            head={"Deep Learning Ai detection"}
            desc={"deep learning is that it can automatically learn features from the data, which means that it doesn't require the features to be hand-engineered"}
          />
          <FeaturesCard
            head={"Deep Learning Ai detection"}
            desc={"deep learning is that it can automatically learn features from the data, which means that it doesn't require the features to be hand-engineered"}
          />
          <FeaturesCard
            head={"Deep Learning Ai detection"}
            desc={"deep learning is that it can automatically learn features from the data, which means that it doesn't require the features to be hand-engineered"}
          />
        </motion.div>
      </motion.div>
      <motion.div className="flex flex-col bg-zinc-100 dark:bg-neutral-900 min-h-[800px] pt-24 pb-8 max-sm:pt-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
      >
        <motion.div variants={textVariant(0.1)} className="mx-auto max-sm:ml-1 items-center font-bold text-[16px] text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-teal-400 mt-20 px-12">comprehensive</motion.div>
        <motion.div variants={textVariant(0.3)} className="mx-auto items-center font-bold text-[60px] -mt-3 mb-4 px-12 leading-tight">Device compatibility</motion.div>
        <motion.div variants={textVariant(0.5)} className="mx-auto max-w-[820px] min-h-[80px] font-medium text-black/40 dark:text-white/70 px-12">Our application effortlessly adapts to multiple platforms, providing a native experience on mobile devices and a user-friendly website for desktop users</motion.div>
        <img
          src="/Mockup.svg"
          loading="lazy"
          className="mx-auto my-4 w-[80vw] h-[700px] bg-cover max-sm:h-[400px] max-sm:w-screen"
          alt="device picture"
        />
        <div className="flex mx-auto items-center font-medium text-black/40 dark:text-white/70 px-12 pb-24 text-medium">
          currently support mobile devices on version
          <img src="/google-play.svg" loading="lazy" className="w-5 h-5 px-1" />
          7.0+
          <img src="/apple.svg" loading="lazy" className="w-5 h-5 px-1" />
          ios 14+
        </div>
      </motion.div>
      <motion.div className="flex flex-col bg-zinc-200 dark:bg-zinc-800 min-h-[800px] pt-24 pb-8 max-sm:pt-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
      >
        <motion.div variants={textVariant(0.1)} className="mx-auto max-sm:ml-1 items-center font-bold text-[16px] text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-400 mt-20 px-12">revolutionize</motion.div>
        <motion.div variants={textVariant(0.3)} className="mx-auto items-center font-bold text-[60px] -mt-3 mb-4 px-12 leading-tight">Organization management</motion.div>
        <motion.div variants={textVariant(0.5)} className="mx-auto max-w-[820px] font-medium text-black/40 dark:text-white/70 px-12">The Organization Management system's user-friendly interface makes it a breeze to easily manage tasks and operations.</motion.div>
        <div className="relative">
          <img
            src=""
            loading="lazy"
            className="relative mx-auto my-16 w-[80vw] h-[400px] bg-cover"
            alt="page picture"
          />
        </div>
      </motion.div>
      <motion.div className="flex flex-row max-sm:flex-col bg-zinc-200 dark:bg-zinc-800 min-h-[800px] pt-24 pb-8 max-sm:pt-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
      >
        <div className="flex flex-col ml-[8vw]">
          <motion.div variants={textVariant(0.1)} className="items-center font-bold text-[16px] text-transparent bg-clip-text bg-gradient-to-r from-sky-700 to-sky-300 mt-20 ml-1 px-12">built growth</motion.div>
          <motion.div variants={textVariant(0.2)} className="font-bold text-[60px] w-[550px] -mt-1 mb-4 px-12 leading-tight">Ship your startup farther</motion.div>
          <motion.div variants={textVariant(0.3)} className="mx-auto max-w-[820px] font-medium text-black/40 dark:text-white/70 px-12">With Faceprove, you can ship your startup farther than ever before, unlocking a world of opportunities and possibilities for your business.</motion.div>
        </div>
        <div className="ml-[8vw]">
          <img
            src=""
            loading="lazy"
            className="relative mx-auto my-16 w-[40vw] h-[400px] bg-cover"
            alt="page picture"
          />
        </div>
      </motion.div>
      <motion.div className="flex flex-col bg-zinc-200 dark:bg-zinc-800 min-h-[800px] pt-24 pb-8 max-sm:pt-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
      >
        <motion.div variants={textVariant(0.3)} className="mx-auto items-center font-bold text-[60px] -mt-3 mb-4 px-12 leading-tight">Pricing Plans</motion.div>
        <motion.div variants={textVariant(0.5)} className="mx-auto max-w-[820px] font-medium text-black/40 dark:text-white/70 px-12">flexible pricing plans tailored to meet the unique needs of your organization, ensuring cost-effectiveness and scalability.</motion.div>
        <div className="flex flex-row mx-auto mt-8 ring-2 dark:ring-zinc-600 ring-zinc-300 p-1 rounded-[0.9rem] mb-8">
          <Button className="" variant={selectedMonth ? "solid" : "light"} onClick={() => handleMonth(selectedMonth,true)}>Monthly billing</Button>
          <Button className="ml-2" variant={selectedMonth ? "light" : "solid"} onClick={() => handleMonth(selectedMonth,false)}> Yearly billing </Button>
        </div>
        <div className="grid grid-flow-col gap-8 relative mt-16 mb-32 mx-auto">
          <Pricing 
            session={'Startup'}
            description={'All basic for starting a business'}
            user={'24 users'}    
            snapshot={true}    
            server={'10GB'}
            subscription={199}
            month={month}
          />
          <Pricing 
            session={'Enterprise'}
            description={'addition feature for large enterprise'}
            user={'100 users'}    
            snapshot={false}    
            server={'100GB'}
            subscription={699}
            month={month}
            custom={"ring-2 ring-pink-600"}
          />
        </div>
      </motion.div>
      {/** footer */}
      <motion.div className="pt-12 px-[17vw] grid grid-cols-4 bg-white/90 dark:bg-zinc-900 w-99vw h-[300px]"
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
      >
        {/** 1 */}
        <div>
          <div className="flex flex-row">
            <img src="/logo_svg_color.svg" loading="lazy" className="w-8 h-8 mt-0.5" />
            <p className="font-bold text-xl mt-[1px] ml-2 text-inherit">Face Prove</p>
          </div>
          <div className="mt-24 ml-2 text-black/30 dark:text-white/70 text-md font-semibold">@2024 Faceprove.</div>
        </div>
        {/** 2 */}
        <div>
          <div className="flex flex-col">
            <div className="font-bold text-xl text-inherit">Explore</div>
            <FooterText title="Home" path="/" />
            <FooterText title="Feature" path="/" />
            <FooterText title="Pricing" path="/" />
            <FooterText title="DashBoard Analysis" path="/" />
          </div>
        </div>
        {/** 3 */}
        <div className="flex flex-col">
          <div className="font-bold text-xl text-inherit">Product</div>
          <FooterText title="Snapshot" path="/" />
          <FooterText title="Realtime processing" path="/" />
          <FooterText title="Employee management" path="/" />
        </div>
        {/** 4 */}
        <div className="flex flex-col">
          <div className="font-bold text-xl text-inherit">Resources</div>
          <FooterText title="Support Center" path="/" />
          <FooterText title="Privacy & Terms" path="/" />
          <FooterText title="Licenses" path="/" />
          <FooterText title="About us" path="/" />
        </div>
      </motion.div>
    </>

  )
}