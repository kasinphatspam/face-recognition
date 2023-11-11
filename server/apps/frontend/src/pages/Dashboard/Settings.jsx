import { useState, useRef } from "react";
import { AnalyticsNavigation } from "@/components/Navigation";
import Vertical from "@/components/Vertical";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/api/put";

export default function Settings() {
  const toastid = useRef(null);
  const { user, fetchUser } = useAuth();
  const { firstname, lastname, email, gender, dob, image } = user;
  const [ dateData, setDateData] = useState(datetoJson(dob));
  
  function datetoJson(date) {
    if (date === undefined || date === null) {
      return {
        day: null,
        month: null,
        year: null,
      };
    }
    const dateFormat = new Date(date)
    return {
      day: dateFormat.getDate(),
      month: dateFormat.getMonth() + 1,
      year: dateFormat.getFullYear()
    };
  }

  function JsonToDate(date) {
    return new Date(date.year, date.month - 1, date.day);
  }

  const updateData = useMutation({
    mutationKey: ["update"],
    mutationFn: async () => {
      updateUser(id, editData);
    },
    onMutate: () => {
      const toastedit = toast.loading("Please wait...", {
        containerId: "main",
      });
      toastid.current = toastedit;
    },
    onSuccess: () => {
      toast.update(toastid.current, {
        render: "update user information successfully",
        type: "success",
        isLoading: false,
        containerId: "main",
        closeButton: true,
        autoClose: 3000,
      });
      fetchUser();
    },
    onError: (err) => {
      toast.update(toastCreate.current, {
        render: `${messageCode(err.message)}`,
        type: "error",
        isLoading: false,
        containerId: "main",
        closeButton: true,
        autoClose: 3000,
      });
      updateData.reset();
    },
  });

  const [editData, setEditData] = useState({
    firstname: firstname,
    lastname: lastname,
    email: email,
    gender: gender,
    dob: dob,
    image: image,
  });

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleDayChange = (e) => {
    if (e.target.name == 'day') {
      setDateData({ ...dateData, day: e.target.value });
    }
    else if (e.target.name =='month') {
      setDateData({...dateData, month: e.target.value });
    }
    else if (e.target.name == 'year') {
      setDateData({...dateData, year: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData.mutate();
  };
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
                    <img src={image} className="w-3/4 ,x-auto rounded-lg" />
                    <Button className="ml-1 mt-4 w-16" size="sm">
                      edit
                    </Button>
                  </div>
                  <div className="flex flex-col w-2/3">
                    <div className="flex flex-row w-full">
                      <Input
                        className="mx-3"
                        type="text"
                        label="firstname"
                        name="firstname"
                        placeholder={firstname}
                        onChange={handleChange}
                      />
                      <Input
                        className="mx-3"
                        type="text"
                        label="lastname"
                        name="lastname"
                        placeholder={lastname}
                        onChange={handleChange}
                      />
                    </div>
                    <Input
                      className="ml-3 w-[95%] my-4"
                      type="email"
                      label="email"
                      name="email"
                      placeholder={email}
                      onChange={handleChange}
                    />
                    <Select
                      label="gender"
                      variant="bordered"
                      name="gender"
                      placeholder={gender || "none"}
                      selectedKeys={editData["gender"]}
                      className="max-w-xs w-32 ml-3"
                      onSelectionChange={handleChange}
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
                    <p className="mt-2 ml-4 text-white/40 text-sm">date of birth</p>
                    <div className="flex flex-row">
                      <Input
                        className="ml-3 w-1/4 my-4"
                        type="number"
                        label="day"
                        name="day"
                        size="sm"
                        placeholder={dateData.day || ""}
                        onChange={(e) => handleDayChange(e)}
                        >
                        </Input>
                      <Input
                        className="ml-3 w-1/3 my-4"
                        type="text"
                        label="month"
                        name="month"
                        size="sm"
                        placeholder={dateData.month || ""}
                        onChange={(e) => handleDayChange(e)}
                      />
                      <Input
                        className="ml-3 w-1/4 my-4"
                        type="number"
                        label="year"
                        name="year"
                        size="sm"
                        placeholder={dateData.year || ""}
                        onChange={(e) => handleDayChange(e)}
                      />
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
