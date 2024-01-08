import { Key, Tv } from "react-feather";
import { useEffect, useRef, useState } from "react";
import { Button, Divider, Input } from "@nextui-org/react";
import { useVerification } from "@/utils/Verification";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { passCode } from "@/api/post";
import { toast } from "react-toastify";
import { createNewOrg } from "@/api/post";
import { messageCode } from "../utils/errMessage";
import { useNavigate } from "react-router-dom";
import { config } from "@/utils/toastConfig";

export default function CreateTeam() {
  const displayCode = useRef(false);
  const toastCreate = useRef(null);
  const idCode = useRef(null);
  const { user, fetchUser, userStat } = useAuth();
  const navigate = useNavigate();
  const [createData, setCreateData] = useState({});
  const { code, inputStates, handleChange, handleKeyDown, handlePaste } =
    useVerification(6);

  /** check have organization already */
  useEffect(() => {
    if (!!!user) {
      navigate("/login");
    }
    if (!!user?.organization) {
      navigate("/organization");
    }
  }, []);

  /** post new organization */
  const createOrg = useMutation({
    mutationKey: ["organize", user?.id],
    mutationFn: async (name) => {
      return await createNewOrg({ name });
    },
    onMutate: () => {
      const idCreate = toast.loading("Please wait ...", {
        containerId: "main",
      });
      toastCreate.current = idCreate;
    },
    onSuccess: async () => {
      await fetchUser();
      toast.update(
        toastCreate.current,
        config(`create organization successfully`, "success")
      );
      toastCreate.current = null;
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.update(
        toastCreate.current,
        config(`${messageCode(err.message)}`, "error")
      );
      toastCreate.current = null;
      createOrg.reset();
    },
  });

  /** post passcode */
  const codeData = useMutation({
    mutationKey: ["code"],
    mutationFn: async (data) => {
      return await passCode(data);
    },
    onSuccess: async (data) => {
      await fetchUser()
      console.log(data);
      if (data.statusText === 'ACCEPT') {
        toast.update(
          idCode.current,
          config("Organize was found. Waiting response from admin.", "success")
        );
        idCode.current = null;
        navigate("/");
      } else {
        toast.update(
          idCode.current,
          config("user is joining organization. Please wait.", "success")
        );
        idCode.current = null;
        await fetchUser();
        navigate("/organization");
      }
    },
    onError: (err) => {
      toast.update(
        idCode.current,
        config(`${messageCode(err.message)}`, "error")
      );
      idCode.current = null;
      codeData.reset();
    },
  });

  /** check code fullfilled? */
  useEffect(() => {
    if (!!code) {
      codeData.mutate(code);
    }
  }, [code]);

  /** toast handle fetch state changed */
  const handletoast = () => {
    // display is false and code is null
    if (!displayCode.current && !!code) {
      const toastid = toast.loading("Please wait ..", { containerId: "main" });
      idCode.current = toastid;
      displayCode.current = true;
    }
    // display is true and code is not null
    else if (displayCode.current && !!!code) {
      displayCode.current = false;
    }
  };
  handletoast();

  /** handle event changed */
  const handleOnChange = (event) => {
    setCreateData({ ...createData, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    createOrg.mutate(createData.name);
  };

  return (
    <>
      {/* Background */}
      <div className="pt-8 pl-10 max-md:pl-6 bg-gray-50 dark:bg-zinc-800/80 w-screen min-h-screen">
        {/* Warpper */}
        <div className="flex flex-col items-center mt-[20px] mx-auto bg-white dark:bg-zinc-700/50 rounded-md max-w-[900px] drop-shadow-md">
          {/* Inner warpper */}
          <div className="flex flex-col mt-[38px] w-[700px]">
            <p className="text-inherit font-bold text-[36px] mb-4 leading-[44px] mt-4 -ml-7 w-[800px] border-l-8 pl-5">
              It seem that you do not participate any corporation team.
            </p>
            <div className="flex flex-row">
              <Key className="mt-1 mr-2" />
              <p className="text-inherit font-semibold text-[22px]">
                Join a session
              </p>
            </div>
            <p className="ml-4 font-regular text-xs text-black/30 dark:text-white/70">
              Enter the session code provided by the admin to join a
              organization
            </p>
            <div className="ml-[25.6%] mt-6">
              {inputStates.map((state, index) => {
                return (
                  <input
                    key={index}
                    id={`input-${index}`}
                    type="text"
                    value={state.code}
                    className="code-digit w-10 h-12 mx-2 py-1 pl-3.5 ring-1 ring-inset drop-shadow-sm rounded-md text-gray-900 dark:text-white ring-gray-300 focus:ring-2 font-semibold focus:outline-none focus:ring-indigo-600 sm:text-lg sm:leading-6 placeholder:text-gray-300"
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={(e) => handlePaste(e)}
                  />
                );
              })}
            </div>
            <p className="mt-2 ml-[41%] text-xs text-gray-400 mx-auto ">
              fill up your code here ..
            </p>
          </div>

          {userStat === "success" ? (
            user.role?.name === "god" ? (
              <>
                <div className="flex flex-row w-full text-black/20 text-xs mt-5 mb-8">
                  <Divider
                    orientation="horizontal"
                    className="w-[calc(50%-5rem)] ml-12 mr-3 mt-2"
                  />
                  OR
                  <Divider
                    orientation="horizontal"
                    className="w-[calc(50%-5rem)] ml-3 mr-12  mt-2"
                  />
                </div>
                <div className="w-[700px]">
                  <div className="flex flex-row">
                    <Tv className="mt-1 mr-2" />
                    <p className="text-inherit font-semibold text-[22px]">
                      Create a session
                    </p>
                  </div>
                  <p className="ml-4 font-regular text-xs text-black/30 dark:text-white/70">
                    Create organization session for your smoothly workflow
                  </p>
                  <div className="flex w-full justify-center mt-12">
                    <Input
                      className="w-[450px]"
                      label="Corporation name"
                      labelPlacement="outside"
                      name="name"
                      size="md"
                      type="text"
                      placeholder="please enter your business name"
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>
                  <div className="flex w-full justify-center mt-10 mb-8">
                    <Button
                      size="md"
                      color="primary"
                      onClick={(e) => handleOnSubmit(e)}
                    >
                      get starting
                    </Button>
                  </div>
                </div>
              </>
            ) : <div className="py-6">
            </div>
          ) : (
            <div>loading</div>
          )}
        </div>
      </div>
    </>
  );
}
