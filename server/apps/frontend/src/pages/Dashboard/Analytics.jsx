import React from "react";
import { AnalyticsNavigation } from "@/components/Navigation";
import { Button } from "@nextui-org/react";
import { Calendar } from "react-feather";
import Vertical from "@/components/Vertical";

export default function Analytics() {
  const date = new Date().toLocaleDateString();
  const user = 'John Doe';
  return (
    <>
      {/* Pages offset setup */}
      <div className="min-h-screen w-screen bg-gray-50 dark:bg-zinc-900">
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
          <div className="w-[75vw] min-h-[300px] -ml-4 mt-8 bg-white dark:bg-zinc-800 shadow-md rounded-lg py-12 px-24">
            <div className="flex flex-row">
              <p className="font-semibold text-4xl text-inherit ml-2">Hello, {user}</p>
              <div className="flex flex-row ml-[50vw] rounded-md px-4 py-1 border-1 dark:border-white/70 h-[34px] bg-black/5"><Calendar className="h-5 w-5 mr-3 mt-0.5"/> {date}</div>
            </div>
            <p className="text-black/40 dark:text-white/30 ml-2 mt-0.5 ">good morning, check your daily Analysis record and Activities</p>
            <p className="ml-2 mt-8 font-bold text-black/40 dark:text-white/30">Today Activity</p>
          </div>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}