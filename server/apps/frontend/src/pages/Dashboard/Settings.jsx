import { useState, useRef } from "react";
import { AnalyticsNavigation } from "@/components/Navigation";
import Vertical from "@/components/Vertical";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import { config } from "@/utils/toastConfig";
import Resizer from "react-image-file-resizer";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { updateUser, updateImage, changePassword } from "@/api/put";
import { messageCode } from "@/utils/errMessage";

export default function Settings() {
  // -----------------------   VARIABLES   -------------------------------
  const { user, fetchUser } = useAuth();
  const {
    firstname = "",
    lastname = "",
    email = "",
    gender = "",
    dob = "",
  } = user;
  const toastid = useRef(null);
  const [date, setDate] = useState("");
  const [imagefile, setImagefile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [password, setPassword] = useState(["", "", ""]);
  const [errPassword, setErrPassword] = useState(0)
  const [editData, setEditData] = useState({
    firstname: firstname,
    lastname: lastname,
    email: email,
    gender: [gender],
    dob: dob,
  });

  // -----------------------   API   -------------------------------
  /** update image api */
  const uploadImage = useMutation({
    mutationKey: ["update"],
    mutationFn: async (data) => {
      return updateImage(user.id, data);
    },
    onMutate: () => {
      const id = toast.loading("Please wait ...", { containerId: "main" });
      toastid.current = id;
    },
    onSuccess: () => {
      toast.update(
        toastid.current,
        config("update image successfully", "success")
      );
      toastid.current = null;
      fetchUser();
    },
    onError: (err) => {
      toast.update(
        toastCreate.current,
        config(`${messageCode(err.message)}`, "error")
      );
      toastid.current = null;
      updateData.reset();
    },
  });
  
  const wcPassword = useMutation({
    mutationKey: ["password"],
    mutationFn: async (oldPassword, newPassword) => {
      return changePassword(oldPassword, newPassword);  
    },
    onMutate: () => {
      const id = toast.loading("Please wait ...", { containerId: "main" });
      toastid.current = id;
    },
    onSuccess: () => {
      toast.update(
        toastid.current,
        config("change password successfully", "success")
      );
      toastid.current = null;
    },
    onError: (err) => {
      toast.update(
        toastCreate.current,
        config(`${messageCode(err.message)}`, "error")
      );
      toastid.current = null;
    },
  })

  /** update user api */
  const updateData = useMutation({
    mutationKey: ["update"],
    mutationFn: async (data) => {
      return updateUser(user.id, data);
    },
    onMutate: () => {
      const toastedit = toast.loading("Please wait...", {
        containerId: "main",
      });
      toastid.current = toastedit;
    },
    onSuccess: () => {
      toast.update(
        toastid.current,
        config("update user information successfully", "success")
      );
      fetchUser();
    },
    onError: (err) => {
      toast.update(
        toastCreate.current,
        config(`${messageCode(err.message)}`, "error")
      );
      updateData.reset();
    },
  });

  // -----------------------   GENERAL   -------------------------------

  /** handle date inpput */
  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/\D/g, "");

    // Add slashes to the input value based on the DD/MM/YYYY format
    if (inputValue.length <= 2) {
      setDate(inputValue);
    } else if (inputValue.length <= 4) {
      setDate(`${inputValue.slice(0, 2)}/${inputValue.slice(2)}`);
    } else {
      setDate(
        `${inputValue.slice(0, 2)}/${inputValue.slice(2, 4)}/${inputValue.slice(
          4,
          8
        )}`
      );
    }
  };

  const convertImage = async (file) => {
    return new Promise((resolve, reject) => {
      const maxWH = 300;
      const image = Resizer.imageFileResizer(
        file,
        maxWH,
        maxWH, // width x height
        "JPEG", // Specify the format
        80, // Quality
        0, // Rotation
        (uri) => {
          resolve(uri);
        },
        "file" //(base64, blob, or file)
      );
      return image;
    });
  };

  /** handle image event */
  const handleImage = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      const formatimage = await convertImage(image);
      const formData = new FormData();
      formData.append("image", formatimage, image.name);
      setImageURL(URL.createObjectURL(formatimage));
      setImagefile(formData);
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleImageSaver = (e) => {
    e.preventDefault();
    uploadImage.mutate(imagefile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const datesplit = date.split("/");
    let dateObject;
    if (datesplit.length === 3) {
      dateObject = new Date(+datesplit[2], datesplit[1] - 1, datesplit[0]);
    } else dateObject = new Date("1970-01-01");
    const data = {
      ...editData,
      gender: editData.gender.length > 0 ? editData.gender[0] : "none",
      dob: dateObject,
    };
    updateData.mutate(data);
  };

  const handleChangePassword = (e) => {
    setErrPassword(0)
    e.preventDefault();
    if (password[1] !== password[2]) {
      setErrPassword(1)
      return
    }
    wcPassword.mutate(password[0], password[1]);
  }

  return (
    <>
      {/* Pages offset setup */}
      <div className="min-h-screen w-screen bg-gray-50 dark:bg-zinc-900">
        <AnalyticsNavigation Active="Analytics" />
        <div className="flex flex-row">
          <Vertical />

          <div className="flex flex-row mt-12 ml-[80px] mb-6">
            <div className="flex flex-col">
              <p className="text-inherit font-bold text-4xl align-bottom">
                Settings
              </p>

              {/* Head text display forum */}
              <div className="flex flex-row mt-6 ml-1">
                <p className="text-inherit font-light text-md align-bottom hover:underline">
                  Profile
                </p>
                <p className="text-inherit font-light text-md align-bottom ml-2">
                  /
                </p>
                <p className="text-blue-500 font-medium text-md align-bottom ml-2 hover:underline">
                  Setting
                </p>
              </div>

              {/* Employee list */}
              <div className="relative flex flex-col w-[70vw] min-h-[300px] -ml-4 mt-8 bg-white dark:bg-zinc-800/50 shadow-md rounded-lg py-12 px-24">
                <p className="w-full ml-4 text-2xl font-semibold border-l-4 pl-3">
                  User details
                </p>
                <div className="flex flex-row mt-6">
                  <div className="flex flex-col w-1/3">
                    <img
                      src={
                        imageURL === null
                          ? user
                            ? user.image
                            : "/default.jpg"
                          : imageURL
                      }
                      className="w-3/4 ,x-auto rounded-lg"
                    />
                    {!!!imageURL && (
                      <input
                        className="block w-full ml-1/5 mt-6 text-[1px] text-white
                      file:mr-4 file:py-1.5 file:px-3 file:rounded-md
                      file:border-0 file:text-sm file:font-semibold
                      file:bg-pink-50 file:text-pink-700
                      hover:file:bg-pink-100 dark:text-slate-800/10"
                        type="file"
                        accept="image/*"
                        mutiple="false"
                        name="image"
                        onChange={handleImage}
                      />
                    )}
                    {!!imageURL && (
                      <div className="w-3/4 flex flex-col">
                        <Button
                          className="mt-6 mx-auto w-1/6"
                          onClick={(e) => handleImageSaver(e)}
                          disabled={uploadImage.status === "pending"}
                          size="md"
                          variant="ghost"
                          color="primary"
                        >
                          Save
                        </Button>
                        <Button
                          className="mt-2 mx-auto"
                          onClick={() => setImageURL(null)}
                          size="sm"
                          variant="light"
                        >
                          clear
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col w-2/3">
                    <div className="flex flex-row w-full">
                      <Input
                        className="mx-3"
                        type="text"
                        label="firstname"
                        name="firstname"
                        placeholder={
                          firstname ?? "please enter your first name"
                        }
                        onChange={handleChange}
                      />
                      <Input
                        className="mx-3"
                        type="text"
                        label="lastname"
                        name="lastname"
                        placeholder={lastname ?? "please enter your last name"}
                        onChange={handleChange}
                      />
                    </div>
                    <Input
                      className="ml-3 w-[95%] my-4"
                      type="email"
                      label="email"
                      name="email"
                      placeholder={email ?? "ex. example@example.com"}
                      onChange={handleChange}
                    />
                    <Select
                      label="gender"
                      variant="bordered"
                      name="gender"
                      placeholder={gender || "none"}
                      value={["male", "female", "none"]}
                      className="max-w-xs w-32 ml-3"
                      onSelectionChange={(item) =>
                        setEditData({ ...editData, gender: [...item.values()] })
                      }
                    >
                      <SelectItem key="male" value="male">
                        male
                      </SelectItem>
                      <SelectItem key="female" value="female">
                        female
                      </SelectItem>
                      <SelectItem key="none" value="none">
                        none
                      </SelectItem>
                    </Select>
                    <div className="flex flex-row">
                      <Input
                        className="ml-3 w-64 my-4"
                        type="text"
                        label="Birth date (D/M/Y)"
                        size="sm"
                        placeholder={dob || "DD/MM/YYYY"}
                        value={date}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>
                    <Button
                      className="ml-8 mt-4 w-28 px-8"
                      size="md"
                      color="primary"
                      disabled={updateData.status === "pending"}
                      onClick={(e) => handleSubmit(e)}
                    >
                      save profile
                    </Button>
                  </div>
                </div>
                <div className="py-20">
                  <p className="w-full ml-4 text-2xl font-semibold border-l-4 pl-3">
                    Account settings
                  </p>
                  <div className="mt-8 flex flex-row w-full max-md:flex-col">
                    <p className="w-1/3 font-medium ">Change password</p>
                    <div className="flex flex-col w-2/3 px-12 max-md:px-2 gap-y-4">
                      <Input
                        isRequired
                        isClearable
                        type="password"
                        label="Old Password"
                        variant="bordered"
                        onChange={(e) =>
                          setPassword((curr) => (curr[0] = e.target.value))
                        }
                      />
                      <Input
                        isRequired
                        isClearable
                        type="password"
                        label="New Password"
                        variant="bordered"
                        onChange={(e) =>
                          setPassword((curr) => (curr[1] = e.target.value))
                        }
                      />
                      <Input
                        isRequired
                        isClearable
                        isInvalid={errPassword === 1}
                        errorMessage={errPassword === 1 && "Password did not match"}
                        type="password"
                        label="Confirm New Password"
                        variant="bordered"
                        onChange={(e) =>
                          setPassword((curr) => (curr[2] = e.target.value))
                        }
                      />
                      <Button
                      className="mt-4 w-28 px-8"
                      size="md"
                      color="primary"
                      disabled={updateData.status === "pending"}
                      onClick={(e) => handleChangePassword(e)}
                    >
                      Change
                    </Button>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
