import { useRef, useState, useCallback, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Card,
  CardBody,
  Image,
  CardFooter,
  Listbox,
  ListboxItem,
  ListboxSection
} from "@nextui-org/react";
import Webcam from "react-webcam";
import {
  CameraOff,
  Camera as CameraIcon,
  Send,
  Delete,
  File,
  Cpu
} from "react-feather";
import { useMutation } from "@tanstack/react-query";
import { postImageRecognition } from "@/api/post";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";

export default function Snapshot() {
  const { user, organizeData } = useAuth();
  const webcamRef = useRef(null);
  const toastsnap = useRef(null);
  const canvasRef = useRef(null);
  const [selectedKeys, setSelectedKeys] = useState(new Set([""]));
  const [deviceId, setDeviceId] = useState({});
  const [devices, setDevices] = useState([]);
  const [image, setImage] = useState("");
  const [date, setDate] = useState(Date.now());
  const [open, setOpen] = useState(true);

  const sendImg = useMutation({
    mutationKey: "image",
    mutationFn: async (image) => {
        return postImageRecognition(user.id, organizeData.id, {image});
    },
    onMutate: () => {
      const snapid = toast.loading("sending image ..." , { containerId: "main"});
      toastsnap.current = snapid;
    },
    onSuccess: (sendImg) => {
      console.log(sendImg.data);
      toast.update(toastsnap.current, {
        render: "image sented to server successfully",
        type: "success",
        isLoading: false,
        containerId: "main",
        closeButton: true,
        autoClose: 3000,
      });
      toastsnap.current = null;
    },
    onError: (error) => {
      toast.update(toastsnap.current, { 
        render: `${error.message}`,
        type: "error",
        isLoading: false,
        containerId: "main",
        closeButton: true,
        autoClose: 3000,
       });
      toastsnap.current = null;
    },
  })
  /** handle other device that connect to hardware */
  const handleDevices = useCallback(
    (mediaDevices) => {
      const videoDevices = mediaDevices.filter(({ kind }) => kind === "videoinput");
      if (videoDevices.length === 0) {
        setDevices([{
          deviceId: 0,
          label: 'camera not found'
        }]);
      } else {
        setDevices(videoDevices);
      }
    
    },
    [setDevices]
  );

  /** Web cam capture */
  const capture = useCallback(
    () => {
      if (selectedKeys == new Set([""])) setImage("")
      else {
        const imageSrc = webcamRef.current.getScreenshot();
        const DateNow = new Date()
        setImage(imageSrc)
        setDate(DateNow.toLocaleTimeString("th-TH") + " " + DateNow.toLocaleDateString("th-TH"))
      }
    },
    [webcamRef]
  );

  /** Send image :base64 type to ml server */
  const handleSendtoserver = useCallback(async () => {
    await sendImg.mutateAsync(image.split(',')[1]);
  })

  /** Send image :base64 type to encode to ml */
  /** handle action open & close */
  const handleOnclose = useCallback(() => {
    if (open) {
      //Client cam
      webcamRef.current.video.pause();
      setOpen(false);
    }
    else {
      const openWebcam = async () => {
        try {
          //client cam
          webcamRef.current.video.play();
          setOpen(true);
        } catch (error) {
          console.error('Error opening webcam:', error);
        }
      }
      openWebcam()
    }
  }, [open]);

  /** handle device input i/o */
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  /** handle action on list box */
  const handleAction = (item) => {
    if (item === "capture")
      capture()
    if (item === "clear")
      setImage("")
    if (item === "send")
      handleSendtoserver()
    if (item === "encode")
      handleEncodeUser()
  }

  /** handle selected device */
  useEffect(() => {
    for (const item of devices) {
      if (item.deviceId == (selectedKeys.values()).next().value)
        setDeviceId(item.deviceId)
    }
  }, [selectedKeys])


  return (
    <>
      <div className="mt-4 w-full flex flex-row">
        <Card className="w-[700px] h-[606px]"
          isFooterBlurred
          radius="lg"
        >
          <Webcam
            ref={webcamRef}
            audio={false}
            height={720}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={{ deviceId: deviceId, facingMode: "user" }}
            className={open ? "absolute drop-shadow-md w-[700px] h-[526px]" : "hidden"}
          />
          <canvas ref={canvasRef} className={open ? "absolute w-[700px] h-[526px] z-10" : "hidden"} />
          <div className={open ? "bg-transparent w-[700px] h-[526px]" : "hidden"}></div>
          {!open && <div className="w-[700px] h-[526px] bg-gray-500 flex flex-col pt-52 pl-64">
            <CameraOff className="w-8 h-8 ml-[5rem] mt-4 text-white/50" />
            <p className="text-lg text-white/30 mt-2 ml-[1.5rem]">Camera is closing</p>

          </div>}
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
                    onSelectionChange={setSelectedKeys}>
                    {(item) => (
                        <DropdownItem key={item.deviceId} color={"default"}>
                          {item.label}
                        </DropdownItem> 
                    )}
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="ml-2">
                <Button color={open ? "foreground" : "danger"} variant={open ? "ghost" : "flat"} onClick={handleOnclose}>{open ? "Open camera" : "Close camera"}</Button>
              </div>
            </div>
          </CardFooter>
        </Card>
        <div className="-mt-12 w-[324px] ml-[4rem] flex flex-col">
          <Card className="py-4 w-[20rem]">
            <CardBody className="overflow-visible py-2">
              <p className="font-light text-sm text-gray-400 ml-4 mb-1">Photo preview</p>
              {(image == "") && <div className="flex flex-row ml-4 mt-8 mr-12">
                <File />
                <p className="ml-2 text-gray-600 text-md">no picture found</p>
              </div>}
              <Image
                alt="Card background"
                className="object-cover rounded-xl ml-3"
                src={image}
                width={270}
              />
              {(image != "") && <p className="ml-4 text-sm text-gray-300 mt-1 border-l-3 pl-2 border-gray-400">{`captured at ${date}`}</p>}
              <div className="w-full max-w-[260px] border-small drop-shadow-md px-1 py-2 rounded-small border-default-200 dark:border-default-100 mt-8 ml-1">
                  <Listbox
                  variant="flat"
                  aria-label="Actions"
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
  )
}