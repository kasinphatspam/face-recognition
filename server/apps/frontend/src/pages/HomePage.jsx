import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  textVariant,
  staggerContainer,
  slideInVariant,
  imageVariants,
} from "@/utils/motion";
import FeaturesCard from "@/components/Card/FeatureCard";
import { TypingText } from "@/components/CustomText";
import {
  ArrowRight,
  Package,
  Truck,
  Shield,
  Heart,
  TrendingUp,
  Bell,
} from "react-feather";
import Pricing from "@/components/Pricing";
import FooterBar from "@/components/Footersection";
import { Transition } from "@/hooks/Transition";

const HomePage = () => {
  const [month, setMonth] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(true);

  const handleMonth = (value, base) => {
    if (value === base) return null;
    else {
      setSelectedMonth(!value);
      setMonth(1 + 11 * value);
    }
  };

  return (
    <>
      <Navigation Active="Customers" />

      {/* Background images */}
      <div
        className="relative w-screen min-h-screen overflow-x-hidden bg-gradient-to-r 
      from-blue-50/50 to-blue-200/70 dark:from-zinc-900 dark:to-[#2a395a] from-15% 
      to-[170%] duration-150 ease-in dark:ease-out"
      >
        {/* Main content */}
        <div className="flex flex-row max-md:flex-col min-h-[78vh] w-99vw">
          <div className="relative flex flex-col min-w-[44vw] mt-[19vh] ml-[15vw] mb-16 pb-24max-sm:pb-8 max-sm:ml-[9vw]">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              className="z-10"
            >
              {/* <TypingText title="PLATFORM FOR ENTERPRISE" /> */}

              {/* Main Text */}
              <motion.div
                className="relative font-outfit font-semibold text-inherit 
                text-[60px] ml-1 max-sm:text-[30px] max-md:w-[90vw] max-sm:mt-24"
                variants={textVariant(0.1)}
              >
                Facial recognition,
              </motion.div>
              <motion.div
                className="font-semibold font-outfit text-inherit text-[60px]
                 max-sm:text-[30px] max-md:w-[80vw] ml-1 -mt-3"
                variants={textVariant(0.2)}
              >
                Improve services and
              </motion.div>

              <motion.div
                className="font-semibold font-outfit text-inherit text-[60px] 
                max-sm:text-[30px] max-md:w-[80vw] ml-1 -mt-3"
                variants={textVariant(0.2)}
              >
                Create an impression
              </motion.div>

              {/* Secondary Text */}
              <motion.p
                className="text-black/50 dark:text-white/70 text-md ml-1 mt-6
                 w-[450px] max-w-[35vw] max-sm:max-w-[80vw] z-10"
                variants={textVariant(0.3)}
              >
                Customer face recognition system for employees to view
                information through face scanning
              </motion.p>

              {/* Get Started Button */}
              <div className="mb-16">
                <Link>
                  <Button
                    variants={textVariant(0.3)}
                    className="font-semibold mt-6 bg-[#132043] text-white shadow-lg z-10"
                    size="sm"
                    radius="full"
                    endContent={<ArrowRight className="w-4 h-4 mt-0.5" />}
                  >
                    Get started
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          {/* Right Content */}
          <div>
            <motion.img
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              src="mockup.webp"
              className="absolute left-[55vw] -top-12 mb-32 h-[90vh] w-[calc(90vh*1.1295)] 
              overflow-hidden -z-5 max-md:-top-10 max-md:w-[90vw] max-md:h-[calc(90vw*0.885)] max-md:left-4"
              variants={slideInVariant("left", "tween", 0.1, 1)}
            />
          </div>
        </div>

        {/* First Sub-Content */}
        <motion.div
          id="featuresSection"
          className="grid grid-cols-1 dark:bg-gradient-to-r bg-white dark:from-zinc-800 dark:to-zinc-800 duration-150 ease-in dark:ease-out"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
        >
          <motion.div
            variants={textVariant(0.1)}
            className="items-center mx-auto font-bold text-[54px] align-middle text-black/90 dark:text-white mt-16"
          >
            Features
          </motion.div>
          <motion.div
            variants={textVariant(0.25)}
            className="mx-auto max-w-[820px] font-medium text-black/40 dark:text-white/70 px-12 mb-12"
          >
            There are several features using this service application click
            learn more to see all features.
          </motion.div>
          <motion.div
            variants={textVariant(0.35)}
            className="mt-8 sm:grid max-sm:flex max-sm:flex-col sm:grid-cols-2 md:grid-cols-3 gap-5 align-middle px-[16vw] pb-32"
          >
            <FeaturesCard
              delay={0.4}
              head="Machine Learning"
              desc="Recognize customer faces with high-efficiency and easy use for employee. 
            Supports mobile applications and desktop websites."
              icon={<Package className="text-cyan-500 mt-0.5" />}
            />
            <FeaturesCard
              delay={0.425}
              head="Easy to import"
              desc="Import customer data into the application by importing Excel or CSV files.
             We have an automatic customer face recording system."
              icon={<Truck className="text-cyan-500 mt-0.5" />}
            />
            <FeaturesCard
              delay={0.45}
              head="Web security"
              desc="Having site security gives customers peace of mind that their personal 
            and financial information is safe."
              icon={<Shield className="text-cyan-500 mt-0.5" />}
            />
            <FeaturesCard
              delay={0.475}
              head="Enterprise Management"
              desc="Employee and customer information can be viewed from anywhere. 
            There is a feature to control access to authorization information."
              icon={<TrendingUp className="text-cyan-500 mt-0.5" />}
            />
            <FeaturesCard
              delay={0.5}
              head="Liveness Detection"
              desc="Machine learning for detecting fake faces and settings based on
             your opinion of whether you want to use them or not."
              icon={<Heart className="text-cyan-500 mt-0.5" />}
            />
            <FeaturesCard
              delay={0.525}
              head="Notification"
              desc="Announce news or messages to the employees you want in 1 click.
             Easy, fast, and able to target or target groups."
              icon={<Bell className="text-cyan-500 mt-0.5" />}
            />
            <div className="flex justify-center col-start-2 mt-20">
              <Link to="/featurepage">
                <Button
                  color="white"
                  radius="full"
                  size="sm"
                  className="outline-2 outline-offset-2 outline-cyan-500"
                >
                  <p className="text-cyan-500 font-medium text-[16px]">
                    {" "}
                    Learn More{" "}
                  </p>
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className="flex flex-col bg-gradient-to-tr from-green-50/10 to-green-900/20 to-120% dark:bg-neutral-900 min-h-[800px] pt-24 pb-8 max-sm:pt-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
        >
          <TypingText
            textStyles="mx-auto max-sm:ml-1 max-sm:mb-2 items-center font-bold text-[16px] 
          text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-teal-300 px-12"
            title="Comprehensive"
          />
          <motion.div
            variants={textVariant(0.3)}
            className="mx-auto items-center font-bold text-[60px] max-sm:text-[40px] -mt-3 mb-4 px-12 leading-tight"
          >
            Supported Devices
          </motion.div>
          <motion.div
            variants={textVariant(0.5)}
            className="mx-auto max-w-[820px] min-h-[40px] font-medium text-black/40 dark:text-white/70 px-12"
          >
            Our application effortlessly adapts to multiple platforms, providing
            a native experience on mobile devices and a user-friendly website
            for desktop users
          </motion.div>

          <motion.div className="flex flex-col">
            <motion.img
              variants={imageVariants}
              src="/Mockup.svg"
              loading="lazy"
              className="mx-auto my-4 max-w-[80vw] h-[700px] bg-cover max-sm:h-[400px] max-sm:max-w-screen"
              alt="device picture"
            />
            <div className="flex flex-col w-full">
              <div className="flex flex-row w-2/3 mb-8 mt-12 gap-4 justify-around mx-auto">
                <img
                  src="/apple-store-download.webp"
                  loading="lazy"
                  className="h-[60px] bg-cover max-sm:h-[40px] max-sm:max-w-1/2"
                  alt="device picture"
                />
                <img
                  src="/google-play-download.webp"
                  loading="lazy"
                  className="h-[60px] bg-cover max-sm:h-[40px] max-sm:max-w-1/2"
                  alt="device picture"
                />
              </div>
            </div>
          </motion.div>
          <div
            className="flex max-sm:flex-col mx-auto items-center font-medium
         text-black/40 dark:text-white/70 px-12 max-sm:px-6 max-sm:h-12 pb-24 text-medium"
          >
            currently support mobile devices on
            <div className="flex flex-row">
              <img
                src="/google-play.svg"
                loading="lazy"
                className="w-5 h-5 px-1"
              />
              7.0+
              <img src="/apple.svg" loading="lazy" className="w-5 h-5 px-1" />
              ios 14+
            </div>
          </div>
        </motion.div>
        <motion.div
          className="flex flex-col bg-white dark:bg-zinc-800 min-h-[800px] pt-24 pb-8 max-sm:pt-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
        >
          <TypingText
            textStyles="mx-auto max-sm:ml-1 items-center font-bold text-[16px] 
          text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-400 mt-20 px-12"
            title="Revolutionize"
          />
          <motion.div
            variants={textVariant(0.2)}
            className="mx-auto items-center font-bold text-[60px] max-sm:text-[40px] -mt-3 mb-4 px-12 leading-tight"
          >
            Enterprise Management
          </motion.div>
          <motion.div
            variants={textVariant(0.5)}
            className="mx-auto max-w-[820px] min-h-[40px] font-medium text-black/40 dark:text-white/70 px-12"
          >
            The Organization Management system's user-friendly interface makes
            it a breeze to easily manage tasks, operations and employee. we have
            features to annoucne news or message direclty groups of target or
            target in one click
          </motion.div>
          <div className="relative">
            <img
              src="/working.svg"
              loading="lazy"
              className="relative mx-auto my-16 w-[80vw] h-[400px] bg-cover"
              alt="page picture"
            />
          </div>
        </motion.div>
        <motion.div
          className="relative flex flex-row max-sm:flex-col bg-gradient-to-br from-blue-100/10 to-blue-900/20
        dark:bg-zinc-800 min-h-[800px] pt-24 pb-8 max-sm:pt-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
        >
          <div className="flex flex-col ml-[8vw]">
            <TypingText
              textStyles="items-center font-bold text-[16px] text-transparent
             bg-clip-text bg-gradient-to-r from-sky-700 to-sky-300 mt-20 ml-1 px-12"
              title="built growth"
            />
            <motion.div
              variants={textVariant(0.1)}
              className="font-bold text-[60px] w-[550px] max-sm:text-[40px]
             -mt-1 mb-4 max-sm:px-12 max-sm:w-[90%] px-12 leading-tight"
            >
              Ship your startup farther
            </motion.div>
            <motion.div
              variants={textVariant(0.3)}
              className="mx-auto max-w-[820px] max-sm:px-6 max-sm:w-[95%] font-medium
             text-black/40 dark:text-white/70 px-12"
            >
              With Faceprove, you can ship your startup farther than ever
              before, unlocking a world of opportunities and possibilities for
              your business.
            </motion.div>
          </div>
          <div className="ml-[8vw]">
            <img
              src="/OrgPage.webp"
              loading="lazy"
              className="mx-auto my-16 max-w-[1000px] h-[550px] bg-cover drop-shadow-2xl"
              alt="page picture"
            />
          </div>
        </motion.div>
        <motion.div
          className="flex flex-col bg-zinc-100/10 dark:bg-zinc-800 min-h-[800px] pt-24 pb-8 max-sm:pt-8"
          id="subscriptionSection"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
        >
          <motion.div
            variants={textVariant(0.1)}
            className="mx-auto items-center font-bold text-[60px] max-sm:text-[40px] -mt-3 mb-4 px-12 leading-tight"
          >
            Pricing Plans
          </motion.div>
          <motion.div
            variants={textVariant(0.25)}
            className="mx-auto max-w-[820px] font-medium text-black/40 dark:text-white/70 px-12"
          >
            flexible pricing plans tailored to meet the unique needs of your
            organization, ensuring cost-effectiveness and scalability.
          </motion.div>
          <div className="flex flex-row mx-auto mt-8 ring-2 dark:ring-zinc-600 ring-zinc-300 p-1 rounded-[0.9rem] mb-8">
            <Button
              className=""
              variant={selectedMonth ? "solid" : "light"}
              onClick={() => handleMonth(selectedMonth, true)}
            >
              Monthly billing
            </Button>
            <Button
              className="ml-2"
              variant={selectedMonth ? "light" : "solid"}
              onClick={() => handleMonth(selectedMonth, false)}
            >
               Yearly billing 
            </Button>
          </div>

          <div className="grid grid-flow-col max-sm:grid-flow-row max-sm:mt-4 gap-8 relative mt-8 mb-12 mx-auto">
            <Pricing
              session={"Startup"}
              description={"All basic for starting a business"}
              user={"24 users"}
              snapshot={true}
              server={"10GB"}
              subscription={199}
              month={month}
            />
            <Pricing
              session={"Enterprise"}
              description={"addition feature for large enterprise"}
              user={"100 users"}
              snapshot={false}
              server={"100GB"}
              subscription={699}
              month={month}
              Popular
            />
          </div>

          <div className="items-center mx-auto mt-4">
            {" "}
            {/* Adjust the mt-4 value to your preference */}
            <Link to="/subscription">
              <Button
                variant="bordered"
                radius="full"
                size="sm"
                className=" border-black/50 dark:border-white/60 mb-32"
              >
                <p className="text-black/50 dark:text-white/60 font-medium text-[14px]">
                  {" "}
                  Learn More{" "}
                </p>
              </Button>
            </Link>
          </div>
        </motion.div>

        {/** footer */}
        <div
          className="flex justify-center bg-gradient-to-r from-blue-50/50
       to-blue-200/10 dark:from-zinc-900 dark:to-neutral-800"
        >
          <FooterBar className="mt-10" />
        </div>
      </div>
    </>
  );
};

export default Transition(HomePage);
