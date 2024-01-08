import { useEffect, useState, useRef } from "react";
import { ArrowLeft, Eye, EyeOff } from "react-feather";
import { Button, Input, Link as Nextlink } from "@nextui-org/react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { messageCode } from "@/utils/errMessage";
import Switchthemebutton from "@/components/Button/SwitchTheme";
import { config } from "@/utils/toastConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TwoFA() {
  const { useLogin, fetchUser, user } = useAuth();
  const loginToast = useRef(null);
  const navigate = useNavigate();
  {
    /* variable for keeping register */
  }
  const [code, setCode] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
      const id = toast.loading("Please wait ..", { containerId: "main" });
      loginToast.current = id;
      try {
        await useLogin.mutateAsync({ email, password });
        await fetchUser();
      } catch (err) {
        toast.update(
          id,
          config(
            `${messageCode(err.response?.data?.message ?? err.message)}`,
            "error"
          )
        );
        useLogin.reset();
      }
  };

  useEffect(() => {
    if (user != undefined && loginToast.current != null) {
      toast.update(
        loginToast.current,
        config(`welcome, ${user.email}`, "success")
      );
      loginToast.current = null;
      navigate('/')
    }
  }, [user]);

  {
    /* Password visibility */
  }
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      {/* Page offset */}
      <div className="pt-8 px-8 max-md:pl-6 bg-gray-5 dark:bg-zinc-800/80 w-screen min-h-screen">
        {/* Button menu */}
        <div className="flex flex-row">
          <Link to="/" className="w-[28px] h-[28px]">
            <ArrowLeft />
          </Link>
          <div className="ml-4">
            <Switchthemebutton />
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center mt-[20px] mx-auto bg-white dark:bg-zinc-700/50 rounded-md max-w-[600px] drop-shadow-md">
          {/* Head content */}
          <div className="mt-8 max-md:px-20 min-w-[450px] max-w-[500px]">
            {/* Text */}
            <p className="text-inherit font-bold text-[30px] text-blue-600]">
              {" "}
              Almost there{" "}
            </p>
            <p className="text-inherit font-light text-[12px] text-gray-500">
              {" "}
              please Verify email before continue on process.{" "}
            </p>
          </div>
          <img
            src="/Login.svg"
            className="px-auto -mt-12 w-[270px] h-[270px] mb-4 pointer-events-none"
          />

          {/* input Email & Password*/}
          <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4 px-20 max-sm:px-8 -mt-8">
            <Input
              autoFocus
              autoCorrect="@gmail.com"
              isRequired
              isClearable
              type="text"
              label="Code"
              variant="bordered"
              onChange={(e) => setCode(e.target.value)}
            />
            <Nextlink
              herf=""
              underline="always"
              className="flex justify-end mr-4 -mt-2"
            >
              {" "}
              <p className="text-[12px]"> forgot password? </p>{" "}
            </Nextlink>
          </div>

          {/* Sumbit button */}
          <div className="mt-4 mb-4">
            <Button
              disabled={loginToast.current !== null}
              color={useLogin.status === "pending" ? "default" : "primary"}
              variant="shadow"
              onClick={(e) => handleSubmit(e)}
              className="w-[120px]"
            >
              {" "}
              Login{" "}
            </Button>
          </div>

          {/* sign up */}
          <div className="flex flex-row w-[420px] mb-8 max-sm:pl-[15%]">
            <p className="text-sm font-medium"> Don't have an account?</p>
            <Nextlink className="text-sm ml-1 font-medium" href="/signup">
              {" "}
              sign up{" "}
            </Nextlink>
          </div>
        </div>
      </div>
    </>
  );
}
