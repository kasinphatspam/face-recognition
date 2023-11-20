import { useState } from "react";
import Navigation from "@/components/Navigation";
import {
  Button,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { textVariant, staggerContainer, slideInVariant } from "@/utils/motion";
import FeaturesCard from "@/components/Card/FeatureCard";
import { TypingText, FooterText } from "@/components/CustomText";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Package, Truck, Shield, Heart, TrendingUp, Bell } from "react-feather";
import { footerVariants } from "@/utils/motion";
import Pricing from "@/components/Pricing";
import FooterBar from '@/components/Footersection';


export default function HomePage() {
  const [month, setMonth] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(true);
  const { user } = useAuth();

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
      <div className="w-full min-h-full bg-gradient-to-r from-blue-50/50 to-blue-200/70 dark:from-zinc-900 dark:to-neutral-800 from-25% to-[200%] duration-150 ease-in dark:ease-out">
        {/* Main content */}
        <div className="flex flex-row justify-center max-md:flex-col min-h-[78vh] w-99vw">
          <div className="flex flex-col min-w-[44vw]  mt-[19vh] ml-[15vw] pb-24max-sm:pb-8 max-sm:ml-[9vw]">
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

      {/* Feature 1 */}
      <div className="w-full min-h-full bg-gradient-to-r bg-zinc-100 dark:bg-neutral-900 from-25% to-[200%] duration-150 ease-in dark:ease-out">
        <div className="flex flex-row max-md:flex-col min-h-[78vh] w-99vw">
          <div className="flex flex-col min-w-[44vw] mt-[19vh] ml-[15vw] pb-24max-sm:pb-8 max-sm:ml-[9vw]">
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
                className="text-black/50 dark:text-white text-6 ml-1 mt-6 w-[450px] max-w-[35vw] max-sm:max-w-[80vw] z-10"
                variants={textVariant(0.3)}
              >
                Customer face recognition system for employees to view
                information through face scanning
              </motion.p>

            </motion.div>
          </div>
        </div>
      </div>

      {/** footer */}
      <div className="flex justify-center bg-gradient-to-r from-blue-50/50 to-blue-200/10 dark:from-zinc-900 dark:to-neutral-800">
        <FooterBar className="mt-10" />
      </div>
    </>
  );
}
