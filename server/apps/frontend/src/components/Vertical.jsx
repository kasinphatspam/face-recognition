import React from "react";
import { Link } from "react-router-dom";
import { Home, Users, Settings, Trello, Info, Share2 } from "react-feather"

export default function Vertical() {
  return (
    <>
      <div className="relative mt-12">
        <div className="sticky top-0 min-h-screen w-[240px] bg-white rounded-md shadow-md mt-[12px] flex flex-col pl-6 pr-6 pt-12">
          <Link to="/analytics">
            <div className="flex flex-row pt-4 pb-4 rounded-lg hover:bg-gray-100 duration-100 px-8">
              <Home className="w-5 h-5 text-gray-700 mt-1" />
              <p className="ml-4 mt-[0.15rem] text-base text-gray-700 font-regular">Dashboard</p>
            </div>
          </Link>
          <div className="ml-6 mt-6 text-sm text-gray-400 font-regular">Management</div>
          <Link to="/employee">
            <div className="flex flex-row pt-4 pb-4 rounded-lg hover:bg-gray-100 duration-100 px-8">
              <Users className="w-5 h-5 text-gray-700 mt-1" />
              <p className="ml-4 mt-[0.15rem] text-base text-gray-700 font-regular">Employee</p>
            </div>
          </Link>
          <Link to="/organize">
            <div className="flex flex-row pt-4 pb-4 rounded-lg hover:bg-gray-100 duration-100 px-8">
              <Info className="w-5 h-5 text-gray-700 mt-1" />
              <p className="ml-4 mt-[0.15rem] text-base text-gray-700 font-regular">Organization</p>
            </div>
          </Link>
          <Link to="/contact">
            <div className="flex flex-row pt-4 pb-4 rounded-lg hover:bg-gray-100 duration-100 px-8">
              <Share2 className="w-5 h-5 text-gray-700 mt-1" />
              <p className="ml-4 mt-[0.15rem] text-base text-gray-700 font-regular">Contact</p>
            </div>
          </Link>
          <div className="ml-6 mt-6 text-sm text-gray-400 font-regular">Administration</div>
          <Link to="/permission">
            <div className="flex flex-row pt-4 pb-4 rounded-lg hover:bg-gray-100 duration-100 px-8">
              <Trello className="w-5 h-5 text-gray-700 mt-1" />
              <p className="ml-4 mt-[0.15rem] text-base text-gray-700 font-regular">Permission</p>
            </div>
          </Link>
          <Link to="/">
            <div className="flex flex-row pt-4 pb-4 rounded-lg hover:bg-gray-100 duration-100 px-8">
              <Settings className="w-5 h-5 text-gray-700 mt-1" />
              <p className="ml-4 mt-[0.15rem] text-base text-gray-700 font-regular">Settings</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}