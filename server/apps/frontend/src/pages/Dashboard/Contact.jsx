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
import { postNewContact } from "@/api/post";
import { config } from "@/utils/toastConfig";
import { toast } from "react-toastify";

export default function Contact() {
  // ---------------------------------- VARIABLES ---------------------------------------
  const { organizeData } = useAuth();
  const [contactData, setContactData] = useState();
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const formdata = new FormData();

  // ------------------------------------ API ------------------------------------------
  const {
    data: contact,
    status: contactStatus,
    refetch: fContact,
  } = useQuery({
    enabled: !!organizeData,
    queryKey: ["getContacts"],
    queryFn: async () => {
      return getContacts(organizeData.id);
    },
  });

  const postContact = useMutation({
    mutationkey: ["postContact"],
    mutationFn: async (data) => {
      return postNewContact(organizeData.id, data);
    },
    onSuccess: async () => {
      await fContact();
      toast.success(config(`contact added`, "success"));
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
  // ----------------------------------- GENERAL ----------------------------------------

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (contactStatus === "success" && !contactData) setContactData(contact);

  const handleOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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

  const columns = [
    { name: "NAME", uid: "name", sortable: true },
    { name: "EMAIL", uid: "email1" },
    { name: "CONTACT", uid: "company", sortable: true },
    { name: "CONTACT_OWNER", uid: "owner", sortable: true },
    { name: "PHONE", uid: "phone" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const visible = ["name", "email", "owner", "phone", "actions"];

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
                <Input
                  isRequired
                  label="Phone number"
                  placeholder="ex. 000-0000-000"
                  type="text"
                  className="w-full px-1.5"
                  variant="bordered"
                  name="officePhone"
                  onChange={handleOnChange}
                />
                <Input
                  isRequired
                  label="Email address"
                  placeholder="ex. example@example.com"
                  type="text"
                  className="w-full px-1.5"
                  variant="bordered"
                  name="email1"
                  onChange={handleOnChange}
                />
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
                  label="company name"
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
                  onChange={handleOnChange}
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
                    className="w-full px-1.5 file:rounded-md dark:text-white/40 file:text-md file:px-3 dark:file:text-black/60 file:border-none file:bg-zinc-50 file:shadow-md text-black/50"
                    variant="bordered"
                    name="csv"
                    onChange={handleUploadfiles}
                  />
                  <Button className="ml-4" disabled={!!file} size="sm">
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
                    postContact.mutate(formData);
                    onClose();
                  }}
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
                Dashboard
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
                    : organizeData?.name}
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
                      data={contact}
                      columns={columns}
                      visible_columns={visible}
                    />
                  ) : (
                    <div className="mt-8 text-center text-black/40 dark:text-white/60">
                      no contact found on {organizeData?.name}
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
