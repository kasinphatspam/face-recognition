import Navigation from "@/components/Navigation";
import { Button } from "@nextui-org/react";
import { ArrowRight } from "react-feather";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError()
  return (
    <>
      <div className="relative flex flex-col overflow-hidden w-screen h-screen bg-gray-50 dark:bg-stone-900">
        <Navigation Active="Contactus" />
        <div className="flex flex-col grow w-full h-full justify-center items-center">
          <div className="flex flex-row font-extrabold text-[140px] items-center gap-3 bg-gradient-to-br from-rose-400 via-fuchsia-400 to-red-400 from-10% via-30% to-80% bg-clip-text text-transparent">
            Oops..
          </div>
          <div className="font-bold text-black dark:text-white">
            SOMETHING WENT WRONG
          </div>
          <div className=" text-gray-500 dark:text-white/50 text-center w-[90vw] text-sm mt-4">
            The page you are looking for might have been unavailable for a while may check out later
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
