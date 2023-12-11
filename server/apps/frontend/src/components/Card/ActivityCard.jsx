import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Database, Edit2, Plus } from "react-feather";
export default function ActivityCard({ type, text, time }) {
  return (
    <>
      <Card
        isBlurred
        shadow="none"
        className="shadow-md w-full h-[88px] overflow-hidden my-2 py-2.5 border-small
             border-[#f1f1f1] dark:border-[#f1f1f135] bg-white text-black
             dark:bg-transparent/10 dark:filter dark:text-white"
      >
        <CardBody>
          <div className="flex flex-row h-[40px]">
            <div className="w-1/6">
              {type === "newuser" ? (
                <div>
                  <div className="flex flex-col w-[40px] h-[40px] rounded-xl bg-lime-200/70 dark:bg-lime-300/60">
                    <Plus
                      className=" text-lime-700 dark:text-lime-900 w-6 h-6 mx-auto mt-2"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
              ) : type === "newcontact" ? (
                <div>
                  <div className="flex flex-col w-[40px] h-[40px] rounded-xl bg-indigo-200/70 dark:bg-indigo-300/60">
                    <Database
                      className=" text-indigo-700 dark:text-indigo-900 w-6 h-6 mx-auto mt-2"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
              ) : type === "editorganization" ? (
                <div>
                  <div className="flex flex-col w-[40px] h-[40px] rounded-xl bg-orange-200/70 dark:bg-orange-300/60">
                    <Edit2
                      className=" text-orange-700 dark:text-orange-900 w-6 h-6 mx-auto mt-2"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="w-5/6">
                  <div className="flex flex-col w-full">
                    <div className="w-[90%] truncate font-medium">{text}</div>
                    <div className="w-[90%] truncate text-tiny text-gray-400">{time}</div>
                  </div>
                </div>
            </div>
        </CardBody>

      </Card>
    </>
  );
}
