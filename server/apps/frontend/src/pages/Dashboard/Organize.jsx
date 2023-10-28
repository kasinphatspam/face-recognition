import React from "react"
import { AnalyticsNavigation } from "@/components/Navigation"
import { Popover, PopoverTrigger, PopoverContent, Button, Divider, Card } from "@nextui-org/react";
import Vertical from "@/components/Vertical"
import { CornerLeftDown, UserPlus } from "react-feather"
import OrganizeCard from "@/components/Card/OrganizeCard"
import { useAuth } from "@/contexts/AuthContext";

export default function OrganizationService() {
  const { organize } = useAuth()
  const Request = [
    {
      name: 'John Doe',
      Organize: 'Example',
    }
  ]

  const handleAction = (user, action) => {
    if (action === 'approve') console.log('approve :' + user)
    else if (action === 'decline') console.log('decline :' + user)
  }
  return (
    <>
      {/* Pages offset setup */}
      <div className="relative min-h-screen w-screen bg-gray-50 dark:bg-zinc-900">
        <AnalyticsNavigation
          Active="Permission"
        />
        <div className="flex flex-row relative">
          <Vertical />

          <div className="flex flex-row mt-12 ml-[80px] mb-6">
            <div className="flex flex-col">
              <p className="text-inherit font-bold text-4xl align-bottom">Dashboard</p>

              {/* Head text display forum */}
              <div className="flex flex-row mt-6 ml-1">
                <p className="text-inherit font-light text-md align-bottom hover:underline">Analytics</p>
                <p className="text-inherit font-light text-md align-bottom ml-2">/</p>
                <p className="text-blue-500 font-medium text-md align-bottom ml-2 hover:underline">Organization</p>
              </div>

              {/* Organize list */}
              <div className="w-[75vw] min-h-[300px] -ml-4 mt-8 bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
                <div className="relative flex flex-row">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <CornerLeftDown className="h-6 w-6 mt-3 mr-1 ml-2" />
                      <p className="font-semibold text-2xl text-inherit ml-2">Organization group</p>
                    </div>
                    <p className="font-light text-sm text-black/40 dark:text-gray-400 ml-12">There are list of organization group</p>
                  </div>
                  <div className="absolute right-4 top-4">
                    <Popover placement="left-start">
                      <PopoverTrigger>
                        <UserPlus />
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="relative p-4 pt-6">
                          <div className="font-semibold text-lg w-[420px] max-h-[600px] overflow-auto mb-4">Request to join</div>
                          {Request.map((item, index) => (
                            <div className="w-[450px] h-[64px] bg-white/90 dark:bg-zinc-950/50 pt-3 pl-4 rounded-md drop-shadow-md dark:drop-shadow-none" key={index}>
                              <div className="flex flex-row">
                                <div className="flex flex-col">
                                  <div className="font-medium">{item.name}</div>
                                  <div className="flex flex-row w-[240px]">
                                    <div>request to join</div>
                                    <div className="font-medium ml-1">{item.Organize}</div>
                                  </div>
                                </div>
                                <div className="ml-6 mt-[4px] flex flex-row w-[130px]">
                                  <Button onclick={() => (handleAction(item.name, 'approve'))} className="ml-2 text-white" size="sm" radius="lg" color="success" variant="shadow">Approve</Button>
                                  <Button onclick={() => (handleAction(item.name, 'decline'))} className="ml-3" size="sm" radius="lg" color="danger">Decline</Button>
                                </div>
                              </div>
                            </div>
                          ))
                          }
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 gap-y-7 mt-8 ml-8">
                    { (organize == null || organize?.length == 0) ? <div className="mx-auto mt-12 dark:text-zinc-100">There is no participate organization.</div> : <></> }
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