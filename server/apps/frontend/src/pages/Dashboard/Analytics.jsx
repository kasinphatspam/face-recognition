import React from "react";
import { AnalyticsNavigation } from "@/components/Navigation";
import { Button, Divider } from "@nextui-org/react";
import { getAllEmployees, getContacts } from "@/api/get";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Calendar, User, Layers, Key, Edit } from "react-feather";
import Vertical from "@/components/Vertical";
import { formatter } from "@/utils/numbernormalize";
import ActivityCard from "@/components/Card/ActivityCard";

export default function Analytics() {
  const date = new Date().toLocaleDateString();
  const { user, organizeData } = useAuth();

  const { data: contact } = useQuery({
    enabled: !!organizeData,
    queryKey: ["getContacts"],
    queryFn: async () => {
      return getContacts(organizeData.id);
    },
  });

  const { data: members } = useQuery({
    queryKey: ["getEmployees"],
    queryFn: async () => {
      return getAllEmployees(organizeData.id);
    },
  });

  return (
    <>
      {/* Pages offset setup */}
      <div className="min-h-screen w-screen bg-gray-100 dark:bg-zinc-900">
        <AnalyticsNavigation Active="Analytics" />
        <div className="flex flex-row">
          <Vertical />

          <div className="flex flex-row mt-12 ml-[80px] mb-6">
            <div className="flex flex-col">
              <p className="text-inherit font-bold text-4xl align-bottom">
                Overview
              </p>

              {/* Head text display forum */}
              <div className="flex flex-row mt-6 ml-1">
                <p className="text-inherit font-light text-md align-bottom hover:underline">
                  Analytics
                </p>
                <p className="text-inherit font-light text-md align-bottom ml-2">
                  /
                </p>
                <p className="text-blue-500 font-medium text-md align-bottom ml-2 hover:underline">
                  Overall
                </p>
              </div>

              {/* Employee list */}
              <div className="relative flex flex-col w-[70vw] min-h-[300px] -ml-4 mt-8 bg-gray-50 dark:bg-zinc-800 shadow-md rounded-md py-8 px-12">
                <div className="flex flex-row">
                  <div className="absolute right-16 flex flex-row rounded-md px-4 py-1 border-1 dark:border-white/70 h-[34px] bg-black/5">
                    <Calendar className="h-5 w-5 mr-3 mt-0.5" /> {date}
                  </div>
                </div>
                <p className="font-medium text-black/40 dark:text-white/30 ml-2 mt-0.5 ">
                  Daily Update
                </p>
                <div className="grid grid-cols-3 gap-4 mx-auto mt-6 w-[90%]">
                  <div className="flex-1 flex-col bg-white pl-2 pb-4 rounded-md drop-shadow-sm">
                    <div className="flex flex-col mt-6 ml-4 w-12 h-12 rounded-full bg-green-200/70 dark:bg-green-300/60">
                      <User
                        className="text-green-700 dark:text-green-900 w-6 h-6 mx-auto mt-3"
                        strokeWidth={2.5}
                      />
                    </div>
                    <div className="font-semibold text-gray-400 ml-4 mt-4 w-36">
                      <p>New</p>
                      <p>Customer</p>
                    </div>
                    <p className="font-bold text-3xl ml-4 mt-2">
                      {formatter(
                        contact?.filter(
                          (item) =>
                            new Date(item.createdTime).toDateString() ==
                            new Date().toDateString()
                        ).length ?? 0
                      )}
                    </p>
                  </div>
                  <div className="flex grid-cols-1 flex-col bg-white pl-2 pb-4 rounded-md drop-shadow-sm">
                    <div className="flex flex-col mt-6 ml-4 w-12 h-12 rounded-full bg-yellow-200/70 dark:bg-yellow-300/60">
                      <Layers
                        className="text-yellow-700 dark:text-yellow-900 w-6 h-6 mx-auto mt-3"
                        strokeWidth={2.5}
                      />
                    </div>
                    <div className="font-semibold text-gray-400 ml-4 mt-4 w-36">
                      <p>Encoded</p>
                      <p>Customer</p>
                    </div>
                    <p className="font-bold text-3xl ml-4 mt-2">
                      {formatter(
                        contact?.filter((item) => item.encodedId !== null)
                          .length ?? 0
                      )}
                    </p>
                  </div>
                  <div className="flex grid-cols-1 flex-col bg-white pl-2 pb-4 rounded-md drop-shadow-sm">
                    <div className="flex flex-col mt-6 ml-4 w-12 h-12 rounded-full bg-violet-200/70 dark:bg-violet-300/60">
                      <Edit
                        className=" text-violet-700 dark:text-violet-900 w-6 h-6 mx-auto mt-3"
                        strokeWidth={2.5}
                      />
                    </div>
                    <div className="font-semibold text-gray-400 ml-4 mt-4 w-36">
                      <p>Total</p>
                      <p>Request</p>
                    </div>
                    <p className="font-bold text-3xl ml-4 mt-2">
                      {formatter(12)}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-6 grid-flow-row gap-4 mx-auto w-[90%] mt-4">
                  <div className="flex col-span-4 bg-white flex-col pl-2 pb-4 rounded-md">
                    <div className="font-semibold text-gray-700 ml-4 mt-6 w-36">
                      <p>Recent Activity</p>
                    </div>
                    <div className="px-2.5 h-[400px] overflow-y-scroll mt-3">
                      <ActivityCard
                        type="newuser"
                        text={`New user join ${organizeData.name}`}
                        time={new Date("2023-11-20").toDateString()}
                      />
                      <ActivityCard
                        type="newcontact"
                        text={`12 customer is import to ${organizeData.name}`}
                        time={new Date("2023-11-20").toDateString()}
                      />
                      <ActivityCard
                        type="editorganization"
                        text={`someone edit ${organizeData.name} settings`}
                        time={new Date("2023-11-20").toDateString()}
                      />
                    </div>
                  </div>
                  <div className="flex col-span-2 flex-col bg-white pl-2 pb-4 rounded-md drop-shadow-sm">
                    <div className="flex flex-col mt-6 ml-4 w-12 h-12 rounded-full bg-teal-200/70 dark:bg-teal-300/60">
                      <Key
                        className=" text-teal-700 dark:text-teal-900 w-6 h-6 mx-auto mt-3"
                        strokeWidth={2.5}
                      />
                    </div>
                    <div className="flex flex-row">
                      <div className="font-semibold text-gray-400 ml-4 mt-4 w-36">
                        Member
                      </div>
                      <p className="font-bold text-3xl ml-4 mt-2">
                        {formatter(members.length)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
