import React from "react";
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
} from "@nextui-org/react";
import Webcam from "react-webcam";
import {
  CameraOff,
  Camera as CameraIcon,
  Send,
  Delete,
  File,
} from "react-feather";

export default function Snapshot() {
  const webcamRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const [deviceId, setDeviceId] = React.useState({});
  const [devices, setDevices] = React.useState([]);
  const [image, setImage] = React.useState("");
  const [date, setDate] = React.useState(Date.now());
  const [open, setOpen] = React.useState(true);

  /** handle other device that connect to hardware */
  const handleDevices = React.useCallback(
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
  const capture = React.useCallback(
    () => {
      if (selectedKeys == new Set([""])) setImage("")
      else {
        console.log("captured")
        const imageSrc = webcamRef.current.getScreenshot();
        const DateNow = new Date()
        setImage(imageSrc)
        setDate(DateNow.toLocaleTimeString("th-TH") + " " + DateNow.toLocaleDateString("th-TH"))
      }
    },
    [webcamRef]
  );

  /** Send image base64 type to ml server */
  const handleSendtoserver = React.useCallback(() => {
    /** . . . .  */
  })
  /** handle action open & close */
  const handleOnclose = React.useCallback(() => {
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
  React.useEffect(() => {
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

  }

  /** handle selected device */
  React.useEffect(() => {
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

        <div className="mt-7 w-[324px] ml-[4rem] flex flex-col">
          <Card className="py-4 w-[20rem]">
            <CardBody className="overflow-visible py-2">
              <p className="font-light text-sm text-gray-400 ml-2 mb-1">Photo result</p>
              {(image == "") && <div className="flex flex-row ml-4 mt-8 mr-12">
                <File />
                <p className="ml-2 text-gray-600 text-md">no picture found</p>
              </div>}
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={image}
                width={270}
              />
              {(image != "") && <p className="ml-4 text-sm text-gray-300 mt-1">{`> captured at ${date}`}</p>}
              <div className="w-full max-w-[260px] border-small drop-shadow-md px-1 py-2 rounded-small border-default-200 dark:border-default-100 mt-8 ml-1">
                <Listbox
                  variant="flat"
                  aria-label="Actions"
                  onAction={(key) => handleAction(key)}
                >
                  <ListboxItem
                    key="capture"

                    startContent={
                      <div className="flex items-center bg-green-300/20 dark:bg-green-600/80 rounded-small drop-shadow-md justify-center w-9 h-9 mr-2">
                        <CameraIcon className=" text-green-800/80 w-5 h-5 dark:text-green-200/80" />
                      </div>
                    }
                  >
                    Capture
                  </ListboxItem>
                  <ListboxItem
                    key="send"
                    startContent={
                      <div className="flex items-center bg-yellow-300/20 dark:bg-yellow-500/80 rounded-small drop-shadow-md justify-center w-9 h-9 mr-2">
                        <Send className=" text-yellow-800/80 dark:text-yellow-200/80 w-5 h-5 -ml-0.5" />
                      </div>
                    }
                  >
                    Send to server
                  </ListboxItem>
                  <ListboxItem
                    key="clear"
                    startContent={
                      <div className="flex items-center bg-purple-300/20 dark:bg-purple-500/80 rounded-small drop-shadow-md justify-center w-9 h-9 mr-2">
                        <Delete className=" text-purple-800/80 dark:text-purple-200/80 w-5 h-5 -ml-0.5" />
                      </div>
                    }
                  >
                    Clear
                  </ListboxItem>
                </Listbox>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}