import Navigation from "@/components/Navigation";
import { Button } from "@nextui-org/react";
import { ArrowRight } from "react-feather";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <div className="relative flex flex-col overflow-hidden w-screen h-screen bg-gray-50 dark:bg-stone-900">
        <Navigation Active="Contactus" />
        <div className="flex flex-col grow w-full h-full justify-center items-center">
          <div className="flex flex-row font-extrabold text-[140px] items-center gap-3 bg-gradient-to-br from-blue-400 via-green-400 to-indigo-400 from-10% via-30% to-80% bg-clip-text text-transparent">
            4
            <div className="flex w-24 h-24 bg-gradient-to-br from-blue-400 via-green-400 to-indigo-400 from-0% via-10% to-[150%] rounded-full items-center">
              <div className="flex w-16 h-16 rounded-full bg-white overflow-hidden mx-auto items-center">
                <img
                  src="/logo_svg_color.svg"
                  className=" w-14 h-14 bg-white object-scale-down mx-auto"
                />
              </div>
            </div>
            4
          </div>
          <div className="font-bold text-black dark:text-white">
            PAGE NOT FOUND
          </div>
          <div className=" text-gray-500 dark:text-white/50 text-center w-[90vw] text-sm mt-4">
            The page you are looking for might have been removed had its name
            changed or its temporarily unavailable.
          </div>
          <Link to="/">
            <Button
              className=" bg-black/70 dark:bg-stone-200/90 text-white dark:text-black mt-8 drop-shadow-lg dark:drop-shadow-none"
              endContent={<ArrowRight className="w-5 h-5" />}
            >
              back to home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
