import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AnalyticsNavigation } from "@/components/Navigation";
import Vertical from "@/components/Vertical";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Divider,
} from "@nextui-org/react";
import Employeecomponent from "@/components/Employeelist";
import { getContacts } from "@/api/get";
import { postContactCSV, postNewContact } from "@/api/post";
import { deleteContact } from "@/api/delete";
import { messageCode } from "@/utils/errMessage";
import { config } from "@/utils/toastConfig";
import { toast } from "react-toastify";

export default function Contact() {
  // ---------------------------------- VARIABLES ---------------------------------------
  const { user } = useAuth();
  const [contactData, setContactData] = useState();
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(new Date("1970-01-01"));

  // ------------------------------------ API ------------------------------------------
  const {
    data: contact,
    status: contactStatus,
    refetch: fContact,
  } = useQuery({
    enabled: !!user?.organization,
    queryKey: ["getContacts"],
    queryFn: async () => {
      return getContacts(user?.organization?.id);
    },
  });

  const postContact = useMutation({
    mutationkey: ["postContact"],
    mutationFn: async (data) => {
      return postNewContact(user?.organization?.id, data);
    },
    onSuccess: async () => {
      toast.success(config("contact added", "success"));
      await fContact();
    },
    onError: (error) => {
      toast.error(
        config(
          `${messageCode(error.response?.data?.message ?? error.message)}`,
          "error"
        )
      );
    },
  });

  const postCSV = useMutation({
    mutationkey: ["postCSV"],
    mutationFn: async (file) => {
      return postContactCSV(file);
    },
    onSuccess: async () => {
      toast.success("contact added successfully");
      await fContact();
    },
    onError: async (error) => {
      toast.error(
        `${messageCode(error.response?.data?.message ?? error.message)}`
      );
    },
  });

  const delContact = useMutation({
    mutationKey: ["deleteContact"],
    mutationFn: async (contactId) => {
      return deleteContact(user?.organization?.id, contactId).then(
        setContactData((prevData) =>
          prevData.filter((item) => item.id !== contactId)
        )
      );
    },
    onSuccess: async () => {
      toast.success(config("contact deleted", "success"));
      await fContact();
    },
    onError: async (error) => {
      toast.error(
        config(
          `${messageCode(error.response?.data?.message ?? error.message)}`,
          "error"
        )
      );
    },
  });
  // ----------------------------------- GENERAL ----------------------------------------

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (contactStatus === "success" && !contactData)
    setContactData(
      contact.map((item) => {
        return { ...item, status: !!item.encodedId ? "masked" : "unmasked" };
      })
    );

  const handleOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

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

  const getFileType = (file) => {
    const fileNameParts = file.name.split(".");
    const extension = fileNameParts[fileNameParts.length - 1].toLowerCase();

    if (extension === "xlsx") {
      return "xlsx";
    } else if (extension === "csv") {
      return "csv";
    } else {
      return "unsupported";
    }
  };

  const convertXLSXtoCSV = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const csvData = XLSX.utils.sheet_to_csv(
            workbook.Sheets[workbook.SheetNames[0]]
          );
          resolve(csvData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsBinaryString(file);
    });
  };

  const handleUploadfiles = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const fileType = getFileType(file);
        if (fileType === "xlsx") {
          const convertedData = await convertXLSXtoCSV(file);
          setFile(convertedData);
        } else if (fileType === "csv") {
          setFile(file);
        }
      } catch (error) {
        toast.error(`error files type: ${error}`);
      }
    }
  };

  const handleSubmitFiles = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      postCSV.mutate(formData);
    } else {
      toast.error("Not file found");
    }
  };

  const columns = [
    { name: "NAME", uid: "name", sortable: true },
    { name: "EMAIL", uid: "email1" },
    { name: "CONTACT", uid: "company", sortable: true },
    { name: "CONTACT_OWNER", uid: "owner", sortable: true },
    { name: "PHONE", uid: "phone" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const visible = ["name", "email", "phone", "status", "actions"];
  return (
    <>
      {/** Modal add customer*/}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="3xl"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="text-3xl font-semibold mt-2 ml-5">
                  Add new customer
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="w-full flex flex-row">
                  <Input
                    autoFocus
                    isRequired
                    label="Title"
                    className="w-1/5 px-1.5"
                    placeholder="ex. Mr Mrs"
                    type="text"
                    variant="bordered"
                    name="title"
                    onChange={handleOnChange}
                  />
                  <Input
                    isRequired
                    label="Firstname"
                    className="w-2/5 px-1.5"
                    placeholder="Enter your first name"
                    type="text"
                    variant="bordered"
                    name="firstname"
                    onChange={handleOnChange}
                  />
                  <Input
                    isRequired
                    placeholder="Enter your last name"
                    type="text"
                    className="w-2/5 px-1.5"
                    variant="bordered"
                    name="lastname"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="flex flex-row w-full">
                  <Input
                    isRequired
                    label="Phone number"
                    placeholder="ex. 000-0000-000"
                    type="text"
                    className="w-full px-1.5"
                    variant="bordered"
                    name="mobile"
                    onChange={handleOnChange}
                  />
                  <Input
                    isRequired
                    label="Office phone number"
                    placeholder="ex. 000-0000-000"
                    type="text"
                    className="w-full px-1.5"
                    variant="bordered"
                    name="officePhone"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="w-full flex flex-row">
                  <Input
                    isRequired
                    label="Email address"
                    placeholder="ex. example@example.com"
                    type="text"
                    className="w-1/2 px-1.5"
                    variant="bordered"
                    name="email1"
                    onChange={handleOnChange}
                  />
                  <Input
                    isRequired
                    label="Email address 2 (optional)"
                    placeholder="ex. example@example.com"
                    type="text"
                    className="w-1/2 px-1.5"
                    variant="bordered"
                    name="email2"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="w-full flex flex-row">
                  <Input
                    label="Line Id (optional)"
                    placeholder="enter your line id here"
                    type="text"
                    className="w-1/2 px-1.5"
                    variant="bordered"
                    name="lineId"
                    onChange={handleOnChange}
                  />
                  <Input
                    label="Facebook (optional)"
                    placeholder="enter your facebook profile name here"
                    type="text"
                    className="w-1/2 px-1.5"
                    variant="bordered"
                    name="facebook"
                    onChange={handleOnChange}
                  />
                </div>
                <Input
                  isRequired
                  label="Company name"
                  placeholder="enter your company name here"
                  type="text"
                  className="w-full px-1.5"
                  variant="bordered"
                  name="company"
                  onChange={handleOnChange}
                />
                <Input
                  label="dath of birth (optional)"
                  placeholder="DD/MM/YYYY"
                  type="text"
                  className="w-full px-1.5"
                  variant="bordered"
                  name="dob"
                  onChange={handleInputChange}
                />
                <Divider className="mt-4" />
                <p className="text-sm mt-2 ml-2 text-black/60 dark:text-white/90 font-semibold">
                  {
                    "Excel or CSV data customers (optional way to add customers)"
                  }
                </p>
                <div className="flex flex-row">
                  <input
                    label="Excel or CSV data customers"
                    placeholder=".xlsx"
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    className="w-full px-1.5 file:rounded-md dark:text-white/40 
                    file:text-md file:px-3 dark:file:text-black/60 file:border-none 
                    file:bg-zinc-50 file:shadow-md text-black/50"
                    variant="bordered"
                    name="csv"
                    onChange={handleUploadfiles}
                  />
                  <Button
                    className="ml-4"
                    disabled={!!file}
                    size="sm"
                    onClick={(e) => handleSubmitFiles(e)}
                  >
                    ok
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    await postContact.mutateAsync({
                      ...formData,
                      dob: date,
                      owner: `${user.firstname} ${user.lastname[0]}.`,
                    });
                    onClose();
                  }}
                  disabled={postContact.status === "pending"}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* Pages offset setup */}
      <div className="relative min-h-screen w-screen bg-gray-50 dark:bg-zinc-900">
        <AnalyticsNavigation />
        <div className="flex flex-row relative">
          <Vertical />
          <div className="relative flex flex-row mt-12 ml-[80px] mb-6 w-full">
            <div className="flex flex-col">
              <p className="text-inherit font-bold text-4xl align-bottom ">
                Customer
              </p>
              {/* Head text display forum */}
              <div className="flex flex-row mt-6 ml-1">
                <p className="text-inherit font-light text-md align-bottom hover:underline">
                  Analytics
                </p>
                <p className="text-inherit font-light text-md align-bottom ml-2">
                  /
                </p>
                <p className="text-inherit font-light text-md align-bottom ml-2 hover:underline">
                  {contactStatus === "pending"
                    ? "loading.."
                    : user?.organization?.name}
                </p>
                <p className="text-inherit font-light text-md align-bottom ml-2">
                  /
                </p>
                <p className="text-blue-500 font-medium text-md align-bottom ml-2 hover:underline">
                  Contact
                </p>
              </div>
              <div className="absolute right-16 top-4">
                <Button color="primary" onPress={onOpen} disabled={isOpen}>
                  Add Contact
                </Button>
              </div>
              <div className="relative w-[75vw] min-h-[300px] -ml-4 mt-8 bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
                <div className="mt-4">
                  {contactData ? (
                    <Employeecomponent
                      data={contactData}
                      columns={columns}
                      visible_columns={visible}
                      handleDelete={(id) => {
                        delContact.mutate(id);
                      }}
                    />
                  ) : (
                    <div className="mt-8 text-center text-black/40 dark:text-white/60">
                      no contact found on {user?.organization?.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
