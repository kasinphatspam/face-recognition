import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "react-feather";
import {
  Button,
  Checkbox,
  Input,
  ModalBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Link as Nextlink,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import Policy from "@/components/Policy";
import Switchthemebutton from "@/components/Button/SwitchTheme";
import useLocalStorage from "@/utils/useLocalstorage";
import { useAuth } from "@/contexts/AuthContext";
import { messageCode } from "../utils/errMessage";
import { toast } from "react-toastify";
import { config } from "@/utils/toastConfig";

export default function Signuppage() {
  // ---------------------------- VARIABLES ----------------------------
  const { useSignup } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const [language, setLanguage] = useLocalStorage("lang", "th");
  const [errorData, setErrorData] = useState({});
  const [formData, setFormData] = useState({});
  const [isSelected, setIsSelected] = useState(false);

  // collect error varibles
  const handleError = (errorType, error) => {
    if (error) {
      setErrorData(prevData => {
        const newData = { ...prevData, [errorType]: error }
        return newData;
      });
    }
    return error;
  };

  // --------------------------   VALIDATION   -------------------------------
  // check information in form is valid
  const checkForm = () => {
    const {
      email,
      password,
      confirmpassword,
      personalId,
      firstname,
      lastname,
    } = formData;
    // check handleError("name", "function")
    const error =
      handleError(
        "Email",
        !email || 
        !!!email?.toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) || // OR
      handleError("Password Length", !password || password?.length < 8) || // OR
      handleError(
        "Weak Password",
        !password ||
          !(
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /\d/.test(password)
          )
      ) || // OR
      (handleError(
        "PersonalNumber",
        (!personalId|| personalId.length !== 13 || !/^\d+$/.test(personalId))
      ) && // AND
        handleError(
          "PassportNumber",
            (!personalId || personalId.length < 7 || personalId.length > 9)
        )) 
      || handleError("Match", !confirmpassword || password != confirmpassword) 
      || handleError("Policy", !isSelected) 
      || handleError(
        "FirstName",
        !firstname || firstname?.length > 48 || /\d/.test(firstname)
      ) ||
      handleError(
        "LastName",
        !lastname || lastname?.length > 48 || /\d/.test(lastname)
      );
    
    if (error) {
      if (errorData["Policy"])
        toast.error("Please check policy first", { containerId: "main" });
      else {
        toast.error("your information was wrong", { containerId: "main" });
      }
    }
    return error;
  };
  // ---------------------------- HANDLER ----------------------------
  /** handle sumbit button */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, firstname, lastname, personalId } = formData;
    if (!checkForm()) {
      const id = toast.loading("Please wait ..", { containerId: "main" });
      try {
        await useSignup.mutateAsync({
          email,
          password,
          firstname,
          lastname,
          personalId,
        });
        toast.update(id, config("Sign up successfully!", "success"));
        navigate("/login");
      } catch (err) {
        toast.update(
          id,
          config(
            `${messageCode(err.response?.data?.message ?? err.message)}`,
            "error"
          )
        );
        useSignup.reset();
      }
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setErrorData({});
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      {/** Policy Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior}
        onValueChange={setScrollBehavior}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 mt-4">
                Privacy Policy
              </ModalHeader>
              <ModalBody>
                <Policy lang={language} />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="foreground"
                  size="sm"
                  className="mr-4 mt-1"
                  variant="bordered"
                  onPress={() => {
                    language == "th" ? setLanguage("en") : setLanguage("th");
                  }}
                >
                  {language}
                </Button>
                <Button color="primary" variant="shadow" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* Page offset */}
      <div className="pt-4 px-8 pb-[45px] max-md:pl-5 bg-gray-50 dark:bg-zinc-800 w-screen min-h-screen">
        {/* Button menu warpper */}
        <div className="absolute mt-8 flex flex-row">
          {/* Back button */}
          <Link to="/" className="w-[28px] h-[28px]">
            <ArrowLeft />
          </Link>
          <div className="ml-4">
            <Switchthemebutton />
          </div>
        </div>
        {/* Main content */}
        <div className="relative flex flex-col items-center mt-[35px] mx-auto bg-white dark:bg-zinc-700/60 rounded-md max-w-[600px] drop-shadow-md">
          {/* Head content */}
          <div className="mt-16 max-sm:mt-8 max-sm:min-w-[250px] min-w-[450px] max-w-[500px]">
            {/* Text */}
            <p className="text-inherit font-bold text-[30px] text-blue-600">
              {" "}
              Sign up{" "}
            </p>
            <p className="text-inherit font-light text-[12px] text-gray-500">
              {" "}
              Please login or sign up before using our website.{" "}
            </p>
          </div>

          {/* input Email & Password*/}
          <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4 px-20 max-sm:px-8 mt-10 max-sm:mt-4">
            <Input
              autoFocus
              isRequired
              type="text"
              size="sm"
              label="FirstName"
              name="firstname"
              variant="bordered"
              isInvalid={errorData["FirstName"]}
              errorMessage={
                errorData["FirstName"] &&
                "Name can't include special characters or numbers"
              }
              onChange={handleChange}
            />
            <Input
              isRequired
              type="text"
              size="sm"
              label="LastName"
              name="lastname"
              variant="bordered"
              isInvalid={errorData["LastName"]}
              errorMessage={
                errorData["LastName"] &&
                "Name can't include special characters or numbers"
              }
              onChange={handleChange}
            />
            <Input
              isRequired
              isClearable
              type="email"
              name="email"
              size="sm"
              label="Email"
              variant="bordered"
              isInvalid={errorData["Email"]}
              errorMessage={errorData["Email"] && "Please enter a valid email"}
              onChange={handleChange}
            />
            <Input
              isRequired
              type="text"
              name="personalId"
              size="sm"
              label="Personal identification / Passport Number"
              variant="bordered"
              isInvalid={errorData["PersonalNumber"] && errorData["PassportNumber"]}
              errorMessage={
                (errorData["PersonalNumber"] && errorData["PassportNumber"] &&"Personal number or Passport number must wrong") 
              }
              onChange={handleChange}
            />
            <Input
              isRequired
              size="sm"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeOff className="w-6 h-6 sm:w-4 sm:h-4 text-default-400 pointer-events-none" />
                  ) : (
                    <Eye className="w-6 h-6 sm:w-4 sm:h-4 text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              label="Password"
              name="password"
              variant="bordered"
              isInvalid={errorData["Match"] || errorData["Password Length"] || errorData["Weak Password"]}
              errorMessage={
                (errorData["Weak Password"] &&
                "Password must include atleast one Upper, Lower and Number Character") ||
                (errorData["Password Length"] && "Password Length must more than 8 characters")
              }
              onChange={handleChange}
            />
            <Input
              isRequired
              size="sm"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeOff className="w-6 h-6 sm:w-4 sm:h-4 text-default-400 pointer-events-none" />
                  ) : (
                    <Eye className="w-6 h-6 sm:w-4 sm:h-4 text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              label="Comfirm password"
              name="confirmpassword"
              isInvalid={errorData["Match"]}
              errorMessage={
                errorData["Match"] &&
                "Please double your password and confirm password"
              }
              variant="bordered"
              onChange={handleChange}
            />
            {/* Policy */}
            <div className="flex flex-row">
              <Checkbox
                isSelected={isSelected}
                onValueChange={() => setIsSelected(!isSelected)}
                size="sm"
              >
                I agree with
              </Checkbox>
              <div
                className="ml-1 text-sm hover:underline duration-150 delay-150 font-medium"
                onClick={onOpen}
              >
                privacy policy
              </div>
            </div>
          </div>

          {/* Sumbit button */}
          <div className="mt-4 mb-4">
            <Button
              disabled={useSignup.status === "pending"}
              color={useSignup.status === "pending" ? "default" : "primary"}
              variant="shadow"
              onClick={handleSubmit}
              className="w-[120px]"
            >
              {" "}
              Sign up{" "}
            </Button>
          </div>

          {/* sign up? */}
          <div className="flex flex-row justify-start w-[420px] mb-8 max-sm:pl-[15%]">
            <p className="text-sm font-medium"> You already have an account?</p>
            <Nextlink className="text-sm ml-1 font-medium" href="/login">
              {" "}
              Login{" "}
            </Nextlink>
          </div>
        </div>
      </div>
    </>
  );
}
