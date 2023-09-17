import React from "react";
import { ArrowLeft, Eye, EyeOff } from "react-feather";
import { Button, Checkbox, Input, Link as Nextlink } from "@nextui-org/react";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

export default function Signuppage() {

    {/* variable for keeping register */}
    const [ email, setEmail ] = React.useState("");
    const [ password, setPassword ] = React.useState("");
	const [ firstname, setFirstname ] = React.useState(""); 
	const [ lastname, setLastname ] = React.useState(""); 
	const [ confirmpassword, setConfirmpassword] = React.useState("");
    const [ error, setError ] = React.useState(0);

	/** check email and password to identify user */
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!(/\S+@\S+\.\S+/.test(email))) {
        setError(1); // 1 : invaild email
      } else if (password != confirmpassword) setError(2); // 2 : password didn't match
		else {
        setError(true);
      }
    }
    
	if (error == 0) {

	}
	else {
		if (error == 1) Swal.fire({
			title: 'Error!',
			text: 'invaild email',
			icon: 'error',
		})
		else if (error == 2) Swal.fire({
			title: 'Error!',
			text: "password didn't match",
			icon: 'error'
		})
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
					<ArrowLeft />
				</Link>

				{/* Main content */}
				<div className="flex flex-col items-center mt-[35px] ml-[45vw] -translate-x-1/2 bg-white rounded-md max-w-[600px] drop-shadow-md">
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
							label="FirstName"
							variant="bordered"
							onChange={(e) => setFirstname(e.target.value)}
						/>
					<Input
							isRequired
							type="text"
							label="LastName"
							variant="bordered"
							onChange={(e) => setLastname(e.target.value)}
						/>
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
										<EyeOff className="w-6 h-6 text-default-400 pointer-events-none" />
									) : (
										<Eye className="w-6 h-6 text-default-400 pointer-events-none" />
									)}
								</button>
							}
							type={isVisible ? "text" : "password"}
							label="Password"
							variant="bordered"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Input
							isRequired
							endContent={
								<button className="focus:outline-none" type="button" onClick={toggleVisibility}>
									{isVisible ? (
										<EyeOff className="w-6 h-6 text-default-400 pointer-events-none" />
									) : (
										<Eye className="w-6 h-6 text-default-400 pointer-events-none" />
									)}
								</button>
							}
							type={isVisible ? "text" : "password"}
							label="Comfirm password"
							variant="bordered"
							onChange={(e) => setConfirmpassword(e.target.value)}
						/>
						<Checkbox size="sm">I agree with privacy policy</Checkbox>
					</div>

					{/* Sumbit button */}
					<div className="mt-4 mb-4">
						<Button color="primary" variant="shadow" onClick={handleSubmit} className="w-[120px]"> Sign up </Button>
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