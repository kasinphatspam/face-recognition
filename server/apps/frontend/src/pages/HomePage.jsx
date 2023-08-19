import React from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@nextui-org/react";

export default function HomePage() {
  return (
    <>
      <Navigation 
        Active="Customers"
        />

      {/* Background images */}
      <div className="w-full min-h-full bg-gradient-to-br from-white to-blue-300 from-45% to-120%">

      {/* Main content */}
      <div className="flex flex-row">
        <div className="flex flex-col mt-[20vh] ml-[15vw]">

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
        <div className="flex flex-col items-center -mb-16">
          {/* Images */}
          <img src="/Faceillus.svg" className="w-[550px] min-w-[220px] ml-[35vw] -translate-x-1/2 mt-[40vh] -translate-y-3/4" />

        </div>
      </div>
    </div>
    {/* First Sub-Content */}
    <div className="pt-8 bg-[#063970] pl-[1px]">
      {/* ... */}
    </div>
    
    </>
  )
}