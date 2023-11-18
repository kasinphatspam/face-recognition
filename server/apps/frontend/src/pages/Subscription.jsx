import { useState, React } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { textVariant, staggerContainer } from "@/utils/motion";
import { Button } from "@nextui-org/react";
import Pricing from "@/components/Pricing";

const Subscription = () => {
  const subscriptionImage =
    "https://i.pinimg.com/564x/c4/84/50/c48450f31eec871227b0c45b69d58a07.jpg";
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
      <Navigation Active="Contactus" />
      <div className="w-full min-h-full bg-gradient-to-r from-[#F1F0E8] to-blue-50 dark:from-zinc-900 dark:to-neutral-800 from-45% to-120% duration-150 ease-in dark:ease-out">
        <h1 className="text-6xl font-bold mb-16 pt-10 flex justify-center">
          Subscription
        </h1>
        <motion.div
          className="flex justify-center mx-auto max-w-[1000px] mb-20"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="flex flex-row gap-10"
            variants={staggerContainer}
          >
            <motion.div variants={textVariant(0.3)} className="max-w-[500px]">
              <h2 className="text-2xl font-semibold mb-4">Why Face-Prove?</h2>
              <p>
                Step into a world of seamless connections with Face-Prove, your
                key to unlocking personalized customer experiences. No more
                forms or queries; just a quick snapshot, and our innovative
                face recognition technology reveals valuable insights about your
                customers. From retail to hospitality, Face-Prove transforms the
                customer journey, allowing businesses to effortlessly tailor
                their approach. Join us in revolutionizing customer engagement.
                Face-Prove isn't just about recognizing faces; it's about
                understanding and enhancing every individual's experience.
              </p>
            </motion.div>
            <motion.img
              src={subscriptionImage}
              alt="Subscription"
              className="max-w-[300px] h-auto rounded-full border-neutral-950"
              variants={textVariant(0.5)}
            />
          </motion.div>
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
      </div>
    </>
  );
};

export default Subscription;
