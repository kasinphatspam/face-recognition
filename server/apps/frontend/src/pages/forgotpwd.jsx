import { useState, useRef } from "react";
import { ArrowLeft } from "react-feather";
import { Button, Input } from "@nextui-org/react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { messageCode } from "@/utils/errMessage";
import Switchthemebutton from "@/components/Button/SwitchTheme";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation} from "@tanstack/react-query";
import { changePasswordWoOldPassword, forgetPwd } from "@/api/put";

export default function ForgotPwdPage() {
  const { userStat, fetchUser, user } = useAuth();
  const forgotToast = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState(["", ""]);
  const [errPassword, setErrPassword] = useState(false);
  const navigate = useNavigate();

  const authForgot = useMutation({
    mutationKey: ["authforgotpassword"],
    mutationFn: (data) => {
      return forgetPwd(data);
    },
    onSuccess: () => {
      if (totalPages <= 1) {
        setTotalPages(2);
        setCurrentPage(2);
      }
    },
    onError: (err) => {
      toast.error(`${messageCode(err.response?.data?.message ?? err.message)}`);
    },
  });

  const forgotVerify = useMutation({
    mutationKey: ["forgot_verify"],
    mutationFn: (data) => {
      return forgetPwd(data);
    },
    onSuccess: () => {
      if (totalPages <= 2) {
        setTotalPages(3);
        setCurrentPage(3);
      }
    },
    onError: (err) => {
      toast.error(`${messageCode(err.response?.data?.message ?? err.message)}`);
    },
  });

  const setPasswordWoc = useMutation({
    mutationKey: ["set_password"],
    mutationFn: (data) => {
      return changePasswordWoOldPassword(data);
    },
    onSuccess: () => {
      toast.success(`changed password successfully`);
      navigate(`/login`)
    },
    onError: (err) => {
      toast.error(`${messageCode(err.response?.data?.message ?? err.message)}`);
    }
  })

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    authForgot.mutate(email);
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();
    forgotVerify.mutate(code);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (password[0] !== password[1]) {
      setErrPassword(true);
      return
    }
  }
  return (
    <>
      {/* Page offset */}
      <div className="relative pt-8 px-8 max-md:pl-6 bg-gray-5 dark:bg-zinc-800/80 w-screen min-h-screen">
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
          <div className="font-medium text-end w-full px-10 mt-8 text-gray-500 text-sm">
            Step {currentPage} of 3
          </div>
          {/* Head content */}
          {currentPage === 1 && (
            <>
              <div className="mt-8 px-20 min-w-[450px] w-full">
                {/* Text */}
                <p className="text-inherit font-bold text-[30px]">
                  Reset Password
                </p>
                <p className="h-[40px] text-inherit font-light text-[12px] text-gray-500">
                  Enter the email address associated with your account add we'll
                  send a code to reset password.
                </p>
              </div>
              <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4 px-20 max-sm:px-8 mt-10">
                <Input
                  autoFocus
                  autoCorrect="@gmail.com"
                  isRequired
                  isClearable
                  defaultValue={email ?? ""}
                  type="email"
                  label="Email"
                  variant="bordered"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-6 mb-4">
                <Button
                  disabled={forgotToast.current !== null}
                  color={userStat === "pending" ? "default" : "primary"}
                  variant="flat"
                  className="w-[120px]"
                  onClick={(e) => handleSubmitEmail(e)}
                >
                  Submit
                </Button>
              </div>
            </>
          )}
          {currentPage === 2 && (
            <>
              <div className="mt-8 max-md:px-20 min-w-[450px] max-w-[500px]">
                {/* Text */}
                <p className="text-inherit font-bold text-[30px] text-blue-600]">
                  Enter a code
                </p>
                <p className="h-[40px] text-inherit font-light text-[12px] text-gray-500">
                Your verification code has been sent to <span className="font-bold">{email}</span> Please copy the code and enter it below to complete the verification process.
                </p>
              </div>
              <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4 px-20 max-sm:px-8 mt-10">
                <Input
                  autoFocus
                  isRequired
                  isClearable
                  type="text"
                  label="Verification Code"
                  variant="bordered"
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div className="w-full px-20">
                <button className="ml-2 text-start text-primary-500 text-sm hover:text-primary-700 hover:bg-primary-50">
                  Resend code
                </button>
              </div>
              <div className="mt-6 mb-4">
                <Button
                  disabled={forgotToast.current !== null}
                  color={userStat === "pending" ? "default" : "primary"}
                  variant="flat"
                  className="w-[120px]"
                  onClick={(e) => handleSubmitCode(e)}
                >
                  Submit
                </Button>
              </div>
            </>
          )}
          {currentPage === 3 && (
          <>
          <div className="mt-8 max-md:px-20 min-w-[450px] max-w-[500px]">
                {/* Text */}
                <p className="text-inherit font-bold text-[30px] text-blue-600]">
                  Change password
                </p>
              </div>
              <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4 px-20 max-sm:px-8 mt-12">
                <Input
                  autoFocus
                  isRequired
                  isClearable
                  isInvalid={errPassword}
                  errorMessage="Password did not match"
                  type="password"
                  label="Password"
                  variant="bordered"
                  onChange={(e) => setPassword((curr) => curr[0] = e.target.value)}
                />
                <Input
                  isRequired
                  isClearable
                  isInvalid={errPassword}
                  errorMessage="Password did not match"
                  type="password"
                  label="Confirm Password"
                  variant="bordered"
                  onChange={(e) => setPassword((curr) => curr[1] = e.target.value)}
                />
              </div>
              <div className="mt-6 mb-4">
                <Button
                  disabled={forgotToast.current !== null}
                  color={useLogin.status === "pending" ? "default" : "primary"}
                  variant="flat"
                  className="w-[120px]"
                  onClick={(e) => handleSubmitCode(e)}
                >
                  Submit
                </Button>
              </div>
          </>
          )}
          <div className="flex w-full px-20 my-8 justify-between">
            {currentPage - 1 > 0 ? (
              <Button
                variant="light"
                color="secondary"
                onPress={() => setCurrentPage((curr) => (curr -= 1))}
              >
                Previous
              </Button>
            ) : (
              <div>{" "}</div>
            )}
            {currentPage + 1 <= totalPages ? (
              <Button
                variant="light"
                color="secondary"
                onPress={() => setCurrentPage((curr) => (curr += 1))}
              >
                Next
              </Button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
