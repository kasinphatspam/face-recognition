import React from "react";
import { AnalyticsNavigation } from "@/components/Navigation";
import { Button } from "@nextui-org/react";
import Vertical from "@/components/Vertical";

export default function Analytics() {
  return (
    <>
      {/* Pages offset setup */}
      <div className="min-h-screen w-screen bg-gray-50">
        <AnalyticsNavigation
          Active="Analytics"
          />
      <div className="flex flex-row">
        <Vertical/>

        <div className="flex flex-row mt-12 ml-[80px] mb-6">
          <div className="flex flex-col">
            <p className="text-inherit font-bold text-4xl align-bottom">Dashboard</p>

            {/* Head text display forum */}
            <div className="flex flex-row mt-6 ml-1">
              <p className="text-inherit font-light text-md align-bottom hover:underline">Analytics</p>
              <p className="text-inherit font-light text-md align-bottom ml-2">/</p>
              <p className="text-blue-500 font-medium text-md align-bottom ml-2 hover:underline">Employee</p>
            </div>
          
          {/* Employee list */}
          <div className="w-[75vw] min-h-[300px] -ml-4 mt-8 bg-white shadow-md rounded-lg p-6">
            <p className="font-semibold text-2xl text-inherit ml-2">·ㅤEmployee </p>
          </div>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}