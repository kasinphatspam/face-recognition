import React from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@nextui-org/react";
import FeaturesCard from "../components/Card/FeatureCard";

export default function HomePage() {

  return (
    <>
      <Navigation 
        Active="Customers"
        />

      {/* Background images */}
      <div className="w-full min-h-full bg-gradient-to-r from-[#F1F0E8] to-blue-50 dark:from-zinc-900 dark:to-neutral-800 from-45% to-120% duration-150 ease-in dark:ease-out">

      {/* Main content */}
      <div className="flex flex-row max-sm:flex-col">
        <div className="flex flex-col mt-20 ml-[15vw] pb-24 max-sm:pb-8">

          {/* Main Text */}
          <p className="font-semibold text-inherit text-[64px]"> Face Identify </p>
          <p className="font-semibold text-inherit text-[64px] ml-1 -mt-2"> Application </p>

          {/* Secondary Text */}
          <p className="font-light text-gray-400 text-6 -ml-4 mt-10 w-[450px] max-w-[35vw] max-sm:max-w-[70vw]">
            Face recognition Application is computer algorithm method to vertify the identify people using
            their face in photos or real-time capture.
          </p>

          {/* Get started Button */}
          <div className="mt-8 -ml-4">
            <Button color="success" href="#" radius="full" size="md">
              <p className="text-white"> Get Started </p>
            </Button>
          </div>
        </div>
        {/* Right Content */}
        <div className="flex flex-col pb-16">
          {/* Images */}
          <img src="/Faceillus.svg" className="w-[550px] max-sm:w-[350px] min-w-[220px] mx-auto mt-20 max-sm:mt-4" />
        </div>
      </div>
    </div>
    {/* First Sub-Content */}
    <div className=" bg-[#B4B4B3] dark:bg-zinc-950 pl-[1px] pt-24 flex flex-col">
      <div className=" mx-auto font-bold text-[54px] align-middle text-white/90 mt-16">Features</div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-[12vw] pb-32">
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
      </div>
    </div>
    <div className="flex flex-col bg-zinc-100 dark:bg-neutral-900 min-h-[800px] pt-24 pb-8 max-sm:pt-8">
        <div className="mx-auto items-center font-bold text-[16px] text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-teal-400 mt-20 px-12">comprehensive</div>
        <div className="mx-auto items-center font-bold text-[60px] -mt-3 mb-4 px-12">Device compatibility</div>
        <div className="mx-auto max-w-[820px] min-h-[80px] font-medium text-black/40 dark:text-white/70 px-12">Our application effortlessly adapts to multiple platforms, providing a native experience on mobile devices and a user-friendly website for desktop users</div>
        <img 
          src=""
          className="mx-auto my-16 w-[80vw] h-[400px]"
          alt="device picture"
          />
    </div>
    <div className="flex flex-col bg-zinc-200 dark:bg-zinc-800 min-h-[800px] pt-24 pb-8 max-sm:pt-8">
        <div className="mx-auto items-center font-bold text-[16px] text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-400 mt-20 px-12">revolutionize</div>
        <div className="mx-auto items-center font-bold text-[60px] -mt-3 mb-4 px-12">Organization management</div>
        <div className="mx-auto max-w-[820px] font-medium text-black/40 dark:text-white/70 px-12">The Organization Management system's user-friendly interface makes it a breeze to easily manage tasks and operations.</div>
        <img 
          src=""
          className="mx-auto my-16 w-[80vw] h-[400px]"
          alt="page picture"
          />
    </div>
    </>
  )
}