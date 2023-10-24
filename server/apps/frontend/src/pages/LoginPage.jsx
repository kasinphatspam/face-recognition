import { useState, useEffect } from "react";
import { ArrowLeft, Eye, EyeOff } from "react-feather";
import { Button, Input, Link as Nextlink } from "@nextui-org/react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { message } from "@/utils/errMessage";
import Switchthemebutton from "../components/Button/SwitchTheme";

export default function Loginpage() {

  const { useLogin } = useAuth()
  const navigate = useNavigate();
  {/* variable for keeping register */ }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (/\S+@\S+\.\S+/.test(email)) {
      try {
        await useLogin.mutateAsync({ email, password })
        await Swal.fire({
          icon: 'success',
          title: 'Login successful!',
          text: `Welcome back, ${email}`,
        })
        navigate('/dashboard');
      }
      catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Login failed!',
          text: `${message(err.response.data.statusCode)}`,
        });
        useLogin.reset()
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login failed!',
        text: 'Please check your email and password and try again.',
      });
      return;
    }
  }
  const ForgetPassword = async (event) => {
    event.preventDefault();
    {/* ... */ }
  }

  {/* Password visibility */ }
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      {/* Page offset */}
      <div className="pt-8 pl-10 max-md:pl-6 bg-gray-5 dark:bg-zinc-800/80 w-screen min-h-screen">
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
            <p className="text-inherit font-bold text-[30px] text-blue-600]"> Login </p>
            <p className="text-inherit font-light text-[12px] text-gray-500"> Please login or sign up before using our website. </p>
          </div>
          <img src="/Login.svg" className="px-auto -mt-12 w-[270px] h-[270px] mb-4 pointer-events-none" />

          {/* input Email & Password*/}
          <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4 px-20 max-sm:px-8 -mt-8">
            <Input
              isRequired
              isClearable
              type="email"
              label="Email"
              variant="bordered"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              isRequired
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <EyeOff className="w-5 h-5 max-sm:w-4 max-sm:h-4 text-default-400 pointer-events-none" />
                  ) : (
                    <Eye className="w-5 h-5 max-sm:w-4 max-sm:h-4 text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              label="Password"
              variant="bordered"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Nextlink herf="" underline="always" className="flex justify-end mr-4 -mt-2"> <p className="text-[12px]"> forgot password? </p> </Nextlink>
          </div>

          {/* Sumbit button */}
          <div className="mt-4 mb-4">
            <Button disabled={useLogin.status === "pending"} color={useLogin.status === "pending" ? "default" :"primary"} variant="shadow" onClick={(e) => handleSubmit(e)} className="w-[120px]"> Login </Button>
          </div>

          {/* sign up */}
          <div className="flex flex-row w-[420px] mb-8">
            <p className="text-sm font-medium"> Don't have an account?</p>
            <Nextlink className="text-sm ml-1 font-medium" href="/signup"> sign up </Nextlink>
          </div>
        </div>
      </div>
    </>
  );
}