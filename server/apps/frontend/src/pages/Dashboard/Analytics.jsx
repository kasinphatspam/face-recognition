import React from "react";
import { AnalyticsNavigation } from "@/components/Navigation";
import { Button, Divider } from "@nextui-org/react";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, User } from "react-feather";
import Vertical from "@/components/Vertical";

export default function Analytics() {
  const date = new Date().toLocaleDateString();
  const { user } = useAuth();
  return (
    <>
      {/* Pages offset setup */}
      <div className="min-h-screen w-screen bg-gray-50 dark:bg-zinc-900">
        <AnalyticsNavigation
          Active="Analytics"
        />
        <div className="flex flex-row">
          <Vertical />

          <div className="flex flex-row mt-12 ml-[80px] mb-6">
            <div className="flex flex-col">
              <p className="text-inherit font-bold text-4xl align-bottom">Dashboard</p>

              {/* Head text display forum */}
              <div className="flex flex-row mt-6 ml-1">
                <p className="text-inherit font-light text-md align-bottom hover:underline">Analytics</p>
                <p className="text-inherit font-light text-md align-bottom ml-2">/</p>
                <p className="text-blue-500 font-medium text-md align-bottom ml-2 hover:underline">Overall</p>
              </div>

              {/* Employee list */}
              <div className="relative flex flex-col w-[70vw] min-h-[300px] -ml-4 mt-8 bg-white dark:bg-zinc-800 shadow-md rounded-lg py-12 px-24">
                <div className="flex flex-row">
                  <p className="font-semibold text-4xl text-inherit ml-2 w-[200px]">Hello, {(user ? user.firstname : "loading...") + " " + user?.lastname}</p>
                  <div className="absolute right-16 flex flex-row rounded-md px-4 py-1 border-1 dark:border-white/70 h-[34px] bg-black/5"><Calendar className="h-5 w-5 mr-3 mt-0.5" /> {date}</div>
                </div>
                <p className="font-light text-black/40 dark:text-white/30 ml-2 mt-0.5 ">good morning, check your daily Analysis record and Activities</p>
                <p className="ml-2 mt-8 font-semibold text-black/40 dark:text-white/30">Today Activity</p>
                <Divider className="text-black/30 mt-1" />
                <div className="flex flex-row mx-auto">
                  <div className="flex flex-col mt-2 mr-[6vw]">
                    <div className="font-semibold text-xl">Today Customer</div>
                    <div className="flex flex-row mt-3 ml-2">
                      <User className="text-green-700 dark:text-green-900 w-6 h-6 p-0.5 rounded-md bg-green-200 dark:bg-green-300/60"/>
                      <p className="ml-2">{}</p>
                    </div>
                  </div>
                  <div className="flex flex-col mt-2 mx-[7vw]">
                    <div className="font-semibold text-xl">Customer Contact</div>
                    <div className="flex flex-row mt-3 ml-2">
                      <User className="text-green-700 dark:text-green-900 w-6 h-6 p-0.5 rounded-md bg-green-200 dark:bg-green-300/60"/>
                      <p className="ml-2">{}</p>
                    </div>
                  </div>
                  <div className="flex flex-col mt-2 ml-[6vw]">
                    <div className="font-semibold text-xl">Today Customer</div>
                    <div className="flex flex-row mt-3 ml-2">
                      <User className="text-green-700 dark:text-green-900 w-6 h-6 p-0.5 rounded-md bg-green-200 dark:bg-green-300/60"/>
                      <p className="ml-2">{}</p>
                    </div>
                  </div>
                  <div className="mx-auto w-full px-12">
                    <div>
                      {/** Text header */}
                    </div>
                    <div>
                      {/** Text descriptor */}
                    </div>
                    <div>
                      {/** Graph selected */}
                    </div>
                    <div>
                      {/** Graph display */}
                    </div>
                    <div>
                      {/** Bottom Text */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}