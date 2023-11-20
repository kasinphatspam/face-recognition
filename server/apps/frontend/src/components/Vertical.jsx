import React from "react";
import { Link } from "react-router-dom";
import { Home, User, Settings, Trello, Info, Share2 } from "react-feather";
import Switchthemebutton from "./Button/SwitchTheme";

export default function Vertical({ role }) {
  let Role = role ? "Guest" : role;
  return (
    <>
      <div className="relative mt-12 ml-4">
        <div className="sticky top-[88px] min-h-[calc(100vh-6rem)] w-[240px] bg-white dark:bg-zinc-800 rounded-md shadow-md mt-[12px] flex flex-col pl-6 pr-6 pt-12">
          <Link to="/dashboard">
            <div className="flex flex-row pt-4 pb-4 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-600 duration-100 px-8">
              <Home className="w-5 h-5 text-gray-700 dark:text-white mt-1" />
              <p className="ml-4 mt-[0.15rem] text-base text-gray-700 dark:text-white font-regular">
                Dashboard
              </p>
            </div>
          </Link>
          <Link to="/recognition">
            <div className="flex flex-row pt-4 pb-4 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-600 duration-100 px-8">
              <User className="w-5 h-5 text-gray-700 dark:text-white mt-1" />
              <p className="ml-4 mt-[0.15rem] text-base text-gray-700 dark:text-white font-regular">
                Recognition
              </p>
            </div>
          </Link>
          <section>
            <div className="ml-6 mt-6 text-sm text-gray-400 dark:text-gray-300 font-regular">
              Management
            </div>
            <Link to="/organize">
              <div className="flex flex-row pt-4 pb-4 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-600 duration-100 px-8">
                <Info className="w-5 h-5 text-gray-700 dark:text-white mt-1" />
                <p className="ml-4 mt-[0.15rem] text-base text-gray-700 dark:text-white font-regular">
                  Organization
                </p>
              </div>
            </Link>
            <Link to="/contact">
              <div className="flex flex-row pt-4 pb-4 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-600 duration-100 px-8">
                <Share2 className="w-5 h-5 text-gray-700 dark:text-white mt-1" />
                <p className="ml-4 mt-[0.15rem] text-base text-gray-700 dark:text-white font-regular">
                  Customer
                </p>
              </div>
            </Link>
          </section>
          <section className={Role == "Admin" ? "" : "hidden"}>
            <div className="ml-6 mt-6 text-sm text-gray-400 font-regular">
              Administration
            </div>
            <Link to="/permission">
              <div className="flex flex-row pt-4 pb-4 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-600 duration-100 px-8">
                <Trello className="w-5 h-5 text-gray-700 dark:text-white mt-1" />
                <p className="ml-4 mt-[0.15rem] text-base text-gray-700 dark:text-white font-regular">
                  Permission
                </p>
              </div>
            </Link>
          </section>
          <Link to="/setting">
            <div className="flex flex-row pt-4 pb-4 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-600 duration-100 px-8">
              <Settings className="w-5 h-5 text-gray-700 dark:text-white mt-1" />
              <p className="ml-4 mt-[0.15rem] text-base text-gray-700 dark:text-white font-regular">
                Settings
              </p>
            </div>
          </Link>
          <div className="mt-[21vh] flex mx-auto">
            <div className="dark:text-white/80 text-black/40 text-md mt-0.5">
              theme
            </div>
            <Switchthemebutton className="ml-4" />
          </div>
        </div>
      </div>
    </>
  );
}
