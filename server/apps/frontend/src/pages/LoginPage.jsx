import React from "react";
import { ArrowLeft, Eye, EyeOff } from "react-feather"; 
import { Button, Input, Link as Nextlink } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function Loginpage() {

    {/* variable for keeping register */}
    const [ email, setEmail ] = React.useState("");
    const [ password, setPassword ] = React.useState("");
    const [ error, setError ] = React.useState(false);

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (/\S+@\S+\.\S+/.test(email)) {
        // Email is valid, do something
        console.log("Valid email:", email);
        setError(false);
      } else {
        // Email is invalid, show error message
        setError(true);
      }
    }
    
    const ForgetPassword = async (event) => {
      event.preventDefault();
      {/* ... */}
    }

    {/* Password visibility */}
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
  
  return (
    <>
      {/* Page offset */}
      <div className="pt-8 pl-10 bg-gray-50 w-screen min-h-screen">
        {/* Button menu */}
        <Link to="/" className="w-[28px] h-[28px]">
          <ArrowLeft/>
        </Link>

          {/* Main content */}
          <div className="flex flex-col items-center mt-[35px] ml-[45vw] max-sm:ml-0 max-sm:mx-[7vw] max-sm:translate-x-0 -translate-x-1/2 bg-white rounded-md max-w-[600px] drop-shadow-md">
              {/* Head content */}  
              <div className="mt-10 max-sm:pl-16 min-w-[450px] max-w-[500px]">
                {/* Text */}
                <p className="text-inherit font-bold text-[30px] text-blue-600"> Login </p>
                <p className="text-inherit font-light text-[12px] text-gray-500"> Please login or sign up before using our website. </p>
              </div>
              <img src="/Login.svg" className="px-8 -mt-16 w-[360px] h-[360px] pointer-events-none" />

              {/* input Email & Password*/}
              <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4 px-20 -mt-8">
                <Input 
                  isRequired
                  isClearable
                  type="email" 
                  label="Email" 
                  variant="bordered"
                  />
                <Input 
                  isRequired
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeOff className="w-6 h-6 max-sm:w-4 max-sm:h-4 text-default-400 pointer-events-none" />
                      ) : (
                        <Eye className="w-6 h-6 max-sm:w-4 max-sm:h-4 text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  label="Password" 
                  variant="bordered" 
                  />
                <Nextlink herf="" underline="always" className="flex justify-end mr-4 -mt-2"> <p className="text-[12px]"> forgot password? </p> </Nextlink>
              </div>

              {/* Sumbit button */}
              <div className="mt-4 mb-4">
                <Button color="primary" variant="shadow" onClick={handleSubmit} className="w-[120px]"> Login </Button>
              </div>

              {/* sign up */}
              <div className="flex flex-row justify-start w-[420px] mb-8 pl-16">
                <p className="text-sm font-medium"> Don't have an account?</p>
                <Nextlink className="text-sm ml-1 font-medium" href="/signup"> sign up </Nextlink>
              </div>
          </div>
        </div>
    </>
  );
}