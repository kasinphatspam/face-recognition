import { Avatar, Link } from "@nextui-org/react";
import React from "react";
import { AnalyticsNavigation } from "@/components/Navigation";

export default function Profile() {

  {/* User Example */ }
  const user = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'JohnDoe@exmaple.com',

  }
  return (
    <>
      {/* Pages setup */}
      <div className="min-h-screen w-screen bg-gray-50">
        <AnalyticsNavigation/>
          <div className="flex flex-row mt-16 ml-32 mb-6">
            {/* Head Text */}
            <p className=" text-inherit font-semibold text-4xl align-bottom"> My Profile </p>
            <Link className=" text-blue-500 mt-2 ml-6 align-bottom" underline="always">edit</Link>
          </div>
        <div className="min-h-screen w-[90vw] shadow-md ml-[5vw] bg-white rounded-lg pt-1">
          {/* User Detail */}
          <div className="flex flex-row ml-36 mt-10">
            <Avatar
              isBordered
              radius="full"
              className="w-24 h-24 text-xl drop-shadow-md"
              color="primary"
              />
            <div className="flex flex-col ml-8 mt-2">
              <p className="font-medium text-2xl">{user.firstname + "  " + user.lastname}</p>
              <p className="text-blue-500">{user.email}</p>
            </div>
          </div>
        </div>


      </div>
    </>
  )
}