import _, { useRef, useState, useCallback, useEffect, useMemo } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Card,
  CardBody,
  Image,
  Input,
  CardFooter,
  Listbox,
  ListboxItem,
  ListboxSection,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalContent,
  Select,
  Avatar,
  SelectItem,
} from "@nextui-org/react";
import Webcam from "react-webcam";
import {
  CameraOff,
  Camera as CameraIcon,
  Send,
  Delete,
  File as FileIcon,
  Cpu,
} from "react-feather";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postImageRecognition } from "@/api/post";
import { updateEncode } from "@/api/put";
import { getContacts } from "@/api/get";
import { useAuth } from "@/contexts/AuthContext";
import { config } from "@/utils/toastConfig";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";

export default function Snapshot() {
  // -------------------------------- VARIABLES --------------------------------
  const statusFilter = "all";
  const { user, organizeData } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const webcamRef = useRef(null);
  const toastsnap = useRef(null);
  const toastencode = useRef(null);
  const canvasRef = useRef(null);
  const [selectedKeys, setSelectedKeys] = useState(new Set([""]));
  const [contactData, setContactData] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [contactId, setContactId] = useState(null);
  const [deviceId, setDeviceId] = useState({});
  const [devices, setDevices] = useState([]);
  const [image, setImage] = useState("");
  const [date, setDate] = useState(Date.now());
  const [open, setOpen] = useState(true);

  // ------------------------------    API    -------------------------------------
  const { data: contact, status: contactStatus } = useQuery({
    enabled: !!organizeData,
    queryKey: ["getContacts"],
    queryFn: async () => {
      return getContacts(organizeData.id);
    },
  });
  if (contactStatus === "success" && contactData.length === 0)
    setContactData(contact);

  const sendImg = useMutation({
    mutationKey: ["recimage"],
    mutationFn: async (image) => {
      return postImageRecognition(user.id, organizeData.id, { image });
    },
    onMutate: () => {
      const snapid = toast.loading("sending image ...", {
        containerId: "main",
      });
      toastsnap.current = snapid;
    },
    onSuccess: () => {
      toast.update(
        toastsnap.current,
        config("image sented to server successfully", "success")
      );
      toastsnap.current = null;
    },
    onError: (error) => {
      toast.update(toastsnap.current, config(`${error.message}`, "error"));
      toastsnap.current = null;
      sendImg.reset();
    },
  });

  const encodeImg = useMutation({
    mutationKey: ["encodeimage"],
    mutationFn: async (Id) => {
      console.log(image.split(",")[1]);
      return updateEncode(organizeData.id, Id, image.split(",")[1]);
    },
    onMutate: () => {
      const encodeid = toast.loading("sending image ...", {
        containerId: "main",
      });
      toastencode.current = encodeid;
    },
    onSuccess: () => {
      toast.update(
        toastencode.current,
        config("image encoded successfully", "success")
      );
      toastencode.current = null;
    },
    onError: (error) => {
      toast.update(toastencode.current, config(`${error.message}`, "error"));
      toastencode.current = null;
      encodeImg.reset();
    },
  });

  // ----------------------------   GENERALS   -------------------------------
  const hasSearchFilter = Boolean(filterValue);

  /** filter items in list */
  const filteredItems = useMemo(() => {
    let filteredData = [...contactData];
    if (hasSearchFilter) {
      filteredData = filteredData.filter((item) =>
        (item.firstname + item.lastname + item.officePhone)
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredData = filteredData.filter((item) =>
        Array.from(statusFilter).includes(item.status)
      );
    }
    return filteredData;
  }, [contactData, filterValue, statusFilter]);

  const searchOnChange = useCallback((event) => {
    const value = event.target.value;
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  /** handle other device that connect to hardware */
  const handleDevices = useCallback(
    (mediaDevices) => {
      const videoDevices = mediaDevices.filter(
        ({ kind }) => kind === "videoinput"
      );
      if (videoDevices.length === 0) {
        setDevices([
          {
            deviceId: 0,
            label: "camera not found",
          },
        ]);
      } else {
        setDevices(videoDevices);
      }
    },
    [setDevices]
  );
  
  /** convert base64 to image files type image/jpeg */
  function base64toFile(base64String, fileName) {
      const imageWithoutPrefix = base64String.split(',')[1]
      const byteCharacters = atob(imageWithoutPrefix) ;
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      const file = new File([blob], fileName, { type: "image/jpeg" })
      return file
  }

  /** image optimizer */
  const convertImage = async (file) => {
    return new Promise((resolve, reject) => {
      const maxWH = 1100;
      const image = Resizer.imageFileResizer(
        file,
        maxWH, maxWH, // width x height
        "JPEG", // Specify the format
        80, // Quality
        0, // Rotation
        (uri) => {
          resolve(uri);
        },
        "file" //(base64, blob, or file)
      );
    });
  };

  /** Web cam capture */
  const capture = useCallback(async () => {
    if (selectedKeys == new Set([""])) setImage("");
    else {
      const imageSrc = webcamRef.current.getScreenshot();
      const DateNow = new Date();
      const file = base64toFile(imageSrc, "image.jpeg");
      const formatimage = await convertImage(file)
      console.log(`file size: ${formatimage.size} B  \nbase64 size: ${imageSrc.length} B`);
      setImage(imageSrc);
      setDate(
        `${DateNow.toLocaleTimeString("th-TH")} ${DateNow.toLocaleDateString("th-TH")}`
      );
    }
  }, [webcamRef]);

  /** Send image :base64 type to ml server */
  const handleSendToServer = useCallback(async () => {
    if (image == null || image === "") toast.error("No image found");
    else await sendImg.mutateAsync(image.split(",")[1]);
  });

  /** Send image :base64 type to encode to ml */
  /** handle action open & close */
  const handleOnclose = useCallback(() => {
    if (open) {
      //Client cam
      webcamRef.current.video.pause();
      setOpen(false);
    } else {
      const openWebcam = async () => {
        try {
          //client cam
          webcamRef.current.video.play();
          setOpen(true);
        } catch (error) {
          toast.error("error opening webcam");
        }
      };
      openWebcam();
    }
  }, [open]);

  /** handle device input i/o */
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  /** handle selection change */
  const handleSelectionChange = (item) => {
    const index = item.values().next().value;
    const contactItem = contactData.find((user) => user.id === +index);
    if (contactItem) {
      setContactId(contactItem.id);
    } else {
      toast.error("Error: can't find a contact in list");
    }
  };

  /** handle submit button */
  const handleRegSubmit = async () => {
    if (!image) {
      toast.error("Error: loading image");
    }
    if (!contactId) {
      toast.error("Error: cannot loading customer contact");
    }
    encodeImg.mutate(contactId).then(onClose());
  };

  /** handle action on list box */
  const handleAction = (item) => {
    switch (item) {
      case "capture":
        capture();
        break;
      case "clear":
        setImage("");
        break;
      case "send":
        handleSendToServer();
        break;
      case "encode":
        onOpen();
        break;
      default:
        break;
    }
  };

  /** handle selected device */
  useEffect(() => {
    for (const item of devices) {
      if (item.deviceId == selectedKeys.values().next().value)
        setDeviceId(item.deviceId);
    }
  }, [selectedKeys]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Register customers
              </ModalHeader>
              <ModalBody>
                <p className="text-black/50 dark:text-white/70 text-sm">
                  Picture preview
                </p>
                <img
                  src={image}
                  className="rounded-md w-1/2 ring-1 ring-offset-2 ring-black dark:ring-white"
                />
                <p className="text-black/40 dark:text-white/60 text-xs ml-4">{`there ${
                  filteredItems.length <= 1 ? "is" : "are"
                } ${filteredItems.length || 0} in this database customers`}</p>
                <Input
                  autoFocus
                  isClearable
                  aria-label="Title"
                  className="w-full px-1.5"
                  placeholder="search by name .."
                  size="xs"
                  type="text"
                  variant="bordered"
                  name="title"
                  onChange={searchOnChange}
                />
                <Select
                  items={filteredItems}
                  aria-label="customers"
                  placeholder="select customers"
                  size="lg"
                  onSelectionChange={(item) => handleSelectionChange(item)}
                  renderValue={(items) => {
                    return items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 mr-1"
                      >
                        <Avatar
                          alt={item.data.name}
                          className="flex-shrink-0"
                          src={item.data.image}
                        />
                        <div className="ml-1.5 flex flex-col">
                          <span>
                            {item.data.firstname + " " + item.data.lastname}
                          </span>
                          <span className="text-default-500 text-tiny">
                            {item.data.email1}
                          </span>
                          <span className="text-default-500 text-tiny">
                            {item.data.officePhone}
                          </span>
                        </div>
                      </div>
                    ));
                  }}
                >
                  {(contact) => (
                    <SelectItem key={contact.id}>
                      <div className="flex gaps-2 items-center">
                        <Avatar
                          alt={contact.id}
                          className="flex-shrink-0"
                          size="sm"
                          src={contact.image}
                        />
                        <div className="ml-1.5 flex flex-col">
                          <span>
                            {contact.firstname + " " + contact.lastname}
                          </span>
                          <span className="text-default-500 text-tiny">
                            {contact.email1 + "\t" + contact.officePhone ??
                              "unknown"}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </Select>
                <div className="text-black/60 text-tiny ml-1.5 flex flex-row">
                  if you didn't see customers in list. try to add new by
                  <div
                    className="font-medium underline ml-1"
                    onClick={() => window.open("/contact", "_blank")}
                  >
                    click here
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleRegSubmit}>
                  Register
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="mt-4 w-full flex flex-row">
        <Card className="w-[700px] h-[606px]" isFooterBlurred radius="lg">
          <Webcam
            ref={webcamRef}
            audio={false}
            height={720}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={{ deviceId: deviceId, facingMode: "user" }}
            className={
              open ? "absolute drop-shadow-md w-[700px] h-[526px]" : "hidden"
            }
          />
          <canvas
            ref={canvasRef}
            className={open ? "absolute w-[700px] h-[526px] z-10" : "hidden"}
          />
          <div
            className={open ? "bg-transparent w-[700px] h-[526px]" : "hidden"}
          ></div>
          {!open && (
            <div className="w-[700px] h-[526px] bg-gray-500 flex flex-col pt-52 pl-64">
              <CameraOff className="w-8 h-8 ml-[5rem] mt-4 text-white/50" />
              <p className="text-lg text-white/30 mt-2 ml-[1.5rem]">
                Camera is closing
              </p>
            </div>
          )}
          <CardFooter className="mt-8 mb-2">
            <div className="flex justify-between">
              <div className="mr-2">
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">Choose Camera</Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Dynamic Actions"
                    items={devices}
                    selectionMode="single"
                    disallowEmptySelection
                    defaultSelectedKeys={0}
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                  >
                    {(item) => (
                      <DropdownItem key={item.deviceId} color={"default"}>
                        {item.label}
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="ml-2">
                <Button
                  color={open ? "foreground" : "danger"}
                  variant={open ? "ghost" : "flat"}
                  onClick={handleOnclose}
                >
                  {open ? "Open camera" : "Close camera"}
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
        <div className="-mt-12 w-[324px] ml-[4rem] flex flex-col">
          <Card className="py-4 w-[20rem]">
            <CardBody className="overflow-visible py-2">
              <p className="font-light text-sm text-gray-400 ml-4 mb-1">
                Photo preview
              </p>
              {image == "" && (
                <div className="flex flex-row ml-4 mt-8 mr-12">
                  <FileIcon />
                  <p className="ml-2 text-gray-600 text-md">no picture found</p>
                </div>
              )}
              <Image
                alt="Card background"
                className="object-cover rounded-xl ml-3"
                src={image}
                width={270}
              />
              {image != "" && (
                <p className="ml-4 text-sm text-gray-300 mt-1 border-l-3 pl-2 border-gray-400">{`captured at ${date}`}</p>
              )}
              <div className="w-full max-w-[260px] border-small drop-shadow-md px-1 py-2 rounded-small border-default-200 dark:border-default-100 mt-8 ml-1">
                <Listbox
                  variant="flat"
                  aria-label="Actions"
                  disabledKeys={image ? "" : ["send", "encode"]}
                  onAction={(key) => handleAction(key)}
                >
                  <ListboxSection title="actions">
                    <ListboxItem
                      key="capture"
                      startContent={
                        <div className="flex items-center bg-green-300/20 dark:bg-green-600/70 rounded-small drop-shadow-md justify-center w-9 h-9 mr-2">
                          <CameraIcon className=" text-green-800/80 w-5 h-5 dark:text-green-200/80" />
                        </div>
                      }
                    >
                      Capture
                    </ListboxItem>
                    <ListboxItem
                      key="clear"
                      showDivider
                      startContent={
                        <div className="flex items-center bg-purple-300/20 dark:bg-purple-500/70 rounded-small drop-shadow-md justify-center w-9 h-9 mr-2">
                          <Delete className=" text-purple-800/80 dark:text-purple-200/80 w-5 h-5 -ml-0.5" />
                        </div>
                      }
                    >
                      Clear
                    </ListboxItem>
                  </ListboxSection>
                  <ListboxSection title="old customer">
                    <ListboxItem
                      key="send"
                      showDivider
                      startContent={
                        <div className="flex items-center bg-blue-300/20 dark:bg-blue-600/70 rounded-small drop-shadow-md justify-center w-9 h-9 mr-2">
                          <Cpu className=" text-blue-800/80 dark:text-blue-200/80 w-5 h-5" />
                        </div>
                      }
                    >
                      Send
                    </ListboxItem>
                  </ListboxSection>
                  <ListboxSection title="new customer">
                    <ListboxItem
                      key="encode"
                      startContent={
                        <div className="flex items-center bg-yellow-300/20 dark:bg-yellow-600/70 rounded-small drop-shadow-md justify-center w-9 h-9 mr-2">
                          <Send className=" text-yellow-800/80 dark:text-yellow-200/80 w-5 h-5 -ml-0.5" />
                        </div>
                      }
                    >
                      Register
                    </ListboxItem>
                  </ListboxSection>
                </Listbox>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
