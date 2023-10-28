import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "react-feather";
import { Button, Checkbox, Input, ModalBody, Modal, ModalContent, ModalHeader, ModalFooter, useDisclosure, Link as Nextlink } from "@nextui-org/react";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import Policy from "@/components/Policy";
import Switchthemebutton from "@/components/Button/SwitchTheme";
import useLocalStorage from "@/utils/useLocalstorage";
import { useAuth } from "@/contexts/AuthContext";
import { messageCode } from "../utils/errMessage";

function alerterror(message) {
  Swal.fire({
    title: 'Error!',
    text: message,
    icon: 'error',
  })
}
export default function Signuppage() {

  const { useSignup } = useAuth()
  {/* variable for keeping register */ }
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const [language, setLanguage] = useLocalStorage('lang', 'th')
  const [errorData, setErrorData] = useState({})
  const [formData, setFormData] = useState({});
  const [isSelected, setIsSelected] = useState(false);

  // collect error varibles
  const handleError = (errorType) => {
    setErrorData({ ...errorData, [errorType]: true})
    return;
  }

  // check information in form is valid
  const checkForm = () => {
    const { email, password, confirmpassword, personalId } = formData;
    let error = false;
    if (!(/\S+@\S+\.\S+/.test(email))) {
      // invalid email
      handleError("Email")
      error = true
    } 
    if (password.length < 8) {
      // Password too short!
      handleError("Password")
      error = true
    }
    if (personalId.length !== 13) {
      // wrong personal number
      handleError("PersonalNumber")
      error = true
    } 
    if (password != confirmpassword) {
      // password didn't match
      handleError("Match")
      error = true
    }
    if (!isSelected) {
      // unchecck privacy
      alerterror("please check privacy policy box")
      error = true
    }
    return error
  }

  /** handle sumbit button */
  const handleSubmit = async (event) => {
    // reset error data
    event.preventDefault();
    
    setErrorData({})
    const { email, password, firstname, lastname, personalId } = formData;

    if (!checkForm()) {
      try {
        await useSignup.mutateAsync({ email, password, firstname, lastname, personalId })
        await Swal.fire({
          icon: 'success',
          title: 'Login successful!',
          text: `register successfully, ${email}`,
        })
        navigate('/login');
      }
      catch (err) {
        alerterror(messageCode(err.response.data.message))
        useSignup.reset()
      }
    }
  }

  const handleChange = (event) => {
    event.preventDefault()
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  {/* Password visibility */ }
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      {/** Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior}
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
                <Button color="foreground" size="sm" className="mr-4 mt-1" variant="bordered" onPress={() => { language == "th" ? setLanguage("en") : setLanguage("th") }}>
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
      <div className="pt-4 pl-10 pb-[45px] max-md:pl-5 bg-gray-50 dark:bg-zinc-800 w-screen min-h-screen">
        {/* Button menu */}
        <div className="absolute mt-8 flex flex-row">
          <Link to="/" className="w-[28px] h-[28px]">
            <ArrowLeft />
          </Link>
          <div className="ml-4">
            <Switchthemebutton />
          </div>
        </div>
        {/* Main content */}
        <div className="flex flex-col items-center mt-[35px] mx-auto bg-white dark:bg-zinc-700/60 rounded-md max-w-[600px] drop-shadow-md">
          {/* Head content */}
          <div className="mt-16 min-w-[450px] max-w-[500px]">
            {/* Text */}
            <p className="text-inherit font-bold text-[30px] text-blue-600"> Sign up </p>
            <p className="text-inherit font-light text-[12px] text-gray-500"> Please login or sign up before using our website. </p>
          </div>

          {/* input Email & Password*/}
          <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4 px-20 mt-10">
            <Input
              isRequired
              type="text"
              size="sm"
              label="FirstName"
              name="firstname"
              variant="bordered"
              onChange={handleChange}
            />
            <Input
              isRequired
              type="text"
              size="sm"
              label="LastName"
              name="lastname"
              variant="bordered"
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
              isInvalid={errorData['Email']}
              errorMessage={errorData['Email'] && "Please enter a valid email"}
              onChange={handleChange}
            />
            <Input
              isRequired
              isClearable
              type="text"
              name="personalId"
              size="sm"
              label="Personal Identification Number"
              variant="bordered"
              isInvalid={errorData['PersonalNumber']}
              errorMessage={errorData['PersonalNumber'] && "Please enter a valid personal identify number"}
              onChange={handleChange}
            />
            <Input
              isRequired
              size="sm"
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
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
              isInvalid={errorData['Match']}
              onChange={handleChange}
            />
            <Input
              isRequired
              size="sm"
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
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
              isInvalid={errorData['Match']}
              errorMessage={errorData['Match'] && "Please double your password and confirm password"}
              variant="bordered"
              onChange={handleChange}
            />
            <div className="flex flex-row">
              <Checkbox isSelected={isSelected} onValueChange={setIsSelected} size="sm">I agree with</Checkbox>
              <div className="ml-1 text-sm hover:underline duration-150 delay-150 font-medium" onClick={onOpen}>privacy policy</div>
            </div>
          </div>

          {/* Sumbit button */}
          <div className="mt-4 mb-4">
            <Button disabled={useSignup.status === "pending"} color={useSignup.status === "pending" ? "default" : "primary"} variant="shadow" onClick={handleSubmit} className="w-[120px]"> Sign up </Button>
          </div>

          {/* sign up */}
          <div className="flex flex-row justify-start w-[420px] mb-8">
            <p className="text-sm font-medium"> You already have an account?</p>
            <Nextlink className="text-sm ml-1 font-medium" href="/login"> Login </Nextlink>
          </div>
        </div>
      </div>
    </>
  );
}