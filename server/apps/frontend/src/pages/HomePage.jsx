import { useState } from "react";
import Navigation from "@/components/Navigation";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react"
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { textVariant, staggerContainer } from "@/utils/motion";
import FeaturesCard from "@/components/Card/FeatureCard";
import { TypingText, FooterText } from "@/components/CustomText";
import { useAuth } from "@/contexts/AuthContext";
import { footerVariants } from "../utils/motion";
import Pricing from "@/components/Pricing"



export default function HomePage() {
  const [ month, setMonth ] = useState(1);
  const [ selectedMonth, setSelectedMonth] = useState(true);
  const { user } = useAuth();

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
      <div className="w-full min-h-full bg-gradient-to-r from-gray-50 to-blue-50 dark:from-zinc-900 dark:to-neutral-800 from-45% to-120% duration-150 ease-in dark:ease-out">

        {/* Main content */}
        <div className="flex flex-row max-sm:flex-col min-h-[78vh] w-99vw">
          <div className="flex flex-col min-w-[44vw] mt-[20vh] ml-[15vw] pb-24 max-sm:pb-8 max-sm:ml-[9vw]">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
            >
              {/* <TypingText title="PLATFORM FOR ENTERPRISE" /> */}

              {/* Main Text */}
              <motion.div className="relative font-outfit font-semibold text-inherit text-[80px] ml-1 max-sm:text-[60px]"
                variants={textVariant(0.1)}
              >
                Facial recognition
              </motion.div>
              <motion.div className="font-semibold font-outfit text-inherit text-[80px] max-sm:text-[60px] ml-1 -mt-4"
                variants={textVariant(0.2)}
              >
                Improve services and
              </motion.div>

              <motion.div className="font-semibold font-outfit text-inherit text-[80px] max-sm:text-[60px] ml-1 -mt-4"
                variants={textVariant(0.2)}
              >
                Create an impression
              </motion.div>

              {/* Secondary Text */}
              <motion.p className="text-black/50 dark:text-white text-6 ml-1 mt-6 w-[450px] max-w-[35vw] max-sm:max-w-[80vw]"
                variants={textVariant(0.3)}
              >
                Customer face recognition system for employees to view information through face scanning
              </motion.p>

              {/* Get Started Button */}
              <motion.button
                variants={textVariant(0.4)}
                >
                <Button className="font-bold mt-6 bg-gradient-to-tr from-green-500 to-green-500 text-white shadow-lg">
                  Get started
                </Button>
              </motion.button>

            </motion.div>
          </div>
          {/* Right Content */}
          <motion.div
            className="flex flex-col items-center -mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}>
              <motion.img src="/app-mockup.webp" className="absolute bottom-24 right-0 w-[1400px] mb-32" variants={textVariant(0.3)}/>
          </motion.div>
        </div>
      </div>

      {/* First Sub-Content */}
      <motion.div
        id="featuresSection" // Add this line
        className="grid grid-cols-1 bg-gradient-to-r from-white to-white dark:from-zinc-800 dark:to-zinc-800 duration-150 ease-in dark:ease-out"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
      >

        <motion.div variants={textVariant(0.1)} className="items-center mx-auto font-bold text-[54px] align-middle text-black/90 dark:text-white mt-16">Features</motion.div>
        <motion.div variants={textVariant(0.5)} className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 align-middle px-[16vw] pb-32">
          <FeaturesCard
            head={"Machine Learning"}
            desc={"Recognize customer faces with high-efficiency and easy use for employee. \nSupports mobile applications and desktop websites."}
          />
          <FeaturesCard
            head={"Easy to import"}
            desc={"Import customer data into the application by importing Excel or CSV files. We have an automatic customer face recording system."}
          />
          <FeaturesCard
            head={"Web security"}
            desc={"Having site security gives customers peace of mind that their personal and financial information is safe."}
          />
          <FeaturesCard
            head={"Enterprise Management"}
            desc={"Employee and customer information can be viewed from anywhere. There is a feature to control access to authorization information."}
          />
          <FeaturesCard
            head={"Liveness Detection"}
            desc={"Machine learning for detecting fake faces and settings based on your opinion of whether you want to use them or not."}
          />
          <FeaturesCard
            head={"Notification"}
            desc={"Announce news or messages to the employees you want in 1 click. Easy, fast, and able to target or target groups."}
          />
        </motion.div>
      </motion.div>
      <motion.div className="flex flex-col bg-zinc-100 dark:bg-neutral-900 min-h-[800px] pt-24 pb-8 max-sm:pt-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
      >
        <motion.div variants={textVariant(0.1)} className="mx-auto max-sm:ml-1 items-center font-bold text-[16px] text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-teal-400 mt-20 px-12">Comprehensive</motion.div>
        <motion.div variants={textVariant(0.3)} className="mx-auto items-center font-bold text-[60px] -mt-3 mb-4 px-12 leading-tight">Supported Devices</motion.div>
        <motion.div variants={textVariant(0.5)} className="mx-auto max-w-[820px] min-h-[40px] font-medium text-black/40 dark:text-white/70 px-12">Our application effortlessly adapts to multiple platforms, providing a native experience on mobile </motion.div> 
        <motion.div variants={textVariant(0.5)} className="mx-auto max-w-[820px] min-h-[40px] font-medium text-black/40 dark:text-white/70 px-12">devices and a user-friendly website for desktop users </motion.div>
        
        <div className="flex flex-col">
          
          <motion.div variants={textVariant(0.5)}  className="flex flex-col">
            <div className="flex flex-row w-[800px] mx-auto items-center mb-6 mt-10 gap-4">
              <img
                src="/apple-store-download.webp"
                loading="lazy"
                className="mx-auto my-4 h-[100px] bg-cover max-sm:h-[400px] max-sm:w-screen"
                alt="device picture"
              />
              <img
                src="/google-play-download.webp"
                loading="lazy"
                className="mx-auto my-4 h-[100px]  bg-cover max-sm:h-[400px] max-sm:w-screen"
                alt="device picture"
              />
            </div>

          </motion.div>
          
        </div>
        <div className="flex mx-auto items-center font-medium text-black/40 dark:text-white/70 px-12 max-sm:px-0 pb-24 text-medium">
          currently support mobile devices on
          <img src="/google-play.svg" loading="lazy" className="w-5 h-5 px-1" />
          7.0+
          <img src="/apple.svg" loading="lazy" className="w-5 h-5 px-1" />
          ios 14+
        </div>

        <motion.img variants={textVariant(0.5)}
            src="/Mockup.svg"
            loading="lazy"
            className="mx-auto my-4 w-[80vw] h-[700px] bg-cover max-sm:h-[400px] max-sm:w-screen"
            alt="device picture"
          />
      </motion.div>
      <motion.div className="flex flex-col bg-white dark:bg-zinc-800 min-h-[800px] pt-24 pb-8 max-sm:pt-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
      >
        <motion.div variants={textVariant(0.1)} className="mx-auto max-sm:ml-1 items-center font-bold text-[16px] text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-400 mt-20 px-12">Revolutionize</motion.div>
        <motion.div variants={textVariant(0.3)} className="mx-auto items-center font-bold text-[60px] -mt-3 mb-4 px-12 leading-tight">Enterprise Management</motion.div>
        <motion.div variants={textVariant(0.5)} className="mx-auto max-w-[820px] min-h-[40px] font-medium text-black/40 dark:text-white/70 px-12">The Organization Management system's user-friendly interface makes it a breeze to easily manage</motion.div>
        <motion.div variants={textVariant(0.5)} className="mx-auto max-w-[820px] min-h-[40px] font-medium text-black/40 dark:text-white/70 px-12">tasks, operations and employee. we have features to annoucne news or message direclty groups of</motion.div>
        <motion.div variants={textVariant(0.5)} className="mx-auto max-w-[820px] min-h-[40px] font-medium text-black/40 dark:text-white/70 px-12">target or target in one click</motion.div>
        <motion.div variants={textVariant(0.7)} className="relative">
          <img
            src="/working.svg"
            loading="lazy"
            className="relative mx-auto my-16 w-[80vw] h-[400px] bg-cover"
            alt="page picture"
          />
        </motion.div>
      </motion.div>
      <motion.div className="flex flex-row max-sm:flex-col bg-zinc-200 dark:bg-zinc-800 min-h-[800px] pt-24 pb-8 max-sm:pt-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
      >
        <div className="flex flex-col ml-[8vw]">
          <motion.div variants={textVariant(0.1)} className="items-center font-bold text-[16px] text-transparent bg-clip-text bg-gradient-to-r from-sky-700 to-sky-300 mt-20 ml-1 px-12">built growth</motion.div>
          <motion.div variants={textVariant(0.2)} className="font-bold text-[60px] w-[550px] -mt-1 mb-4 max-sm:px-12 max-sm:w-[90%] px-12 leading-tight">Ship your startup farther</motion.div>
          <motion.div variants={textVariant(0.3)} className="mx-auto max-w-[820px] max-sm:px-6 max-sm:w-[95%] font-medium text-black/40 dark:text-white/70 px-12">With Faceprove, you can ship your startup farther than ever before, unlocking a world of opportunities and possibilities for your business.</motion.div>
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
        id="subscriptionSection"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
      >
        <motion.div variants={textVariant(0.3)} className="mx-auto items-center font-bold text-[60px] -mt-3 mb-4 px-12 leading-tight">Pricing Plans</motion.div>
        <motion.div variants={textVariant(0.5)} className="mx-auto max-w-[820px] font-medium text-black/40 dark:text-white/70 px-12">flexible pricing plans tailored to meet the unique needs of your organization, ensuring cost-effectiveness and scalability.</motion.div>
        <div className="flex flex-row mx-auto mt-8 ring-2 dark:ring-zinc-600 ring-zinc-300 p-1 rounded-[0.9rem] mb-8">
          <Button className="" variant={selectedMonth ? "solid" : "light"} onClick={() => handleMonth(selectedMonth, true)}>Monthly billing</Button>
          <Button className="ml-2" variant={selectedMonth ? "light" : "solid"} onClick={() => handleMonth(selectedMonth, false)}> Yearly billing </Button>
        </div>
        
        <div className="grid grid-flow-col max-sm:grid-flow-row max-sm:mt-4 gap-8 relative mt-8 mb-12 mx-auto">
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

        <div className="items-center mx-auto mt-4"> {/* Adjust the mt-4 value to your preference */}
          <Link to="/subscription">
            <Button color="default" radius="full" size="md" className="mb-32">
              <p className="text-white font-medium"> Learn More </p>
            </Button>
          </Link>
        </div>
      </motion.div>

      {/** footer */}
      <motion.div className="pt-12 sm:px-[17vw] grid grid-cols-4 max-sm:grid-cols-1 max-sm:gap-y-unit-md max-sm:justify-items-center bg-white/90 dark:bg-zinc-900 w-99vw h-[300px] max-sm:h-auto max-sm:pb-12"
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
      >
        {/** 1 */}
        <div>
          <div className="flex flex-row max-sm:w-[200px]">
            <img src="/logo_svg_color.svg" loading="lazy" className="w-8 h-8 mt-0.5" />
            <p className="font-bold text-xl mt-[1px] ml-2 text-inherit">Face Prove</p>
          </div>
          <div className="mt-24 max-sm:mt-4 ml-2 text-black/30 dark:text-white/70 text-md font-semibold">@2024 Faceprove.</div>
        </div>
        {/** 2 */}
        <div>
          <div className="flex flex-col max-sm:w-[200px] max-sm:pt-8">
            <div className="font-bold text-xl text-inherit">Explore</div>
            <FooterText title="Home" path="/" />
            <FooterText title="Feature" path="/" />
            <FooterText title="Pricing" path="/" />
            <FooterText title="DashBoard Analysis" path="/" />
          </div>
        </div>
        {/** 3 */}
        <div className="flex flex-col max-sm:w-[200px]">
          <div className="font-bold text-xl text-inherit">Product</div>
          <FooterText title="Snapshot" path="/" />
          <FooterText title="Realtime processing" path="/" />
          <FooterText title="Employee management" path="/" />
        </div>
        {/** 4 */}
        <div className="flex flex-col max-sm:w-[200px]">
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