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
  Switch,
} from "@nextui-org/react";
import Webcam from "react-webcam";
import Navigation from "@/components/Navigation";
import { CameraOff,
   Camera as CameraIcon, 
   Send, 
   Delete, 
   File, 
   CornerDownRight 
  } from "react-feather";
import faceDetection from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';

export default function Recognition() {
  const webcamRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const [auto, setAuto] = React.useState(false);
  const [deviceId, setDeviceId] = React.useState({});
  const [devices, setDevices] = React.useState([]);
  const [image, setImage] = React.useState("");
  const [date, setDate] = React.useState(Date.now());
  const [open, setOpen] = React.useState(true);
  const FaceCamRef = React.useRef(null)

  /** handle other device that connect to hardware */
  const handleDevices = React.useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  /** Face recognition */
  React.useEffect(() => {
    const runFaceDetection = async () => {
      const faceDetectionModule = new faceDetection.FaceDetection({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
      });
      faceDetectionModule.setOptions({
        model: 'short',
        minDetectionConfidence: 0.5
      })
      faceDetectionModule.onResults(onResults);
      if (
        typeof webcamRef.current !== 'undefined' &&
        webcamRef.current !== null
      ) {
        const WebCamera = new Camera(webcamRef.current.video, {
          onFrame: async () => {
            await faceDetectionModule.send({ image: webcamRef.current.video })
          },
          width: 1280,
          height: 720,
        });
        FaceCamRef.current = WebCamera
      }
      console.log("On detected")
    };
    runFaceDetection()
  }, []);

  /** get result of face recognition */
  const onResults = (results) => {
    /** Call WebcamRef and CanvasRef */
    const videoWidth = webcamRef.current.video.videoHeight
    const videoHeight = webcamRef.current.video.videoWidth
    canvasRef.current.width = videoWidth
    canvasRef.current.height = videoHeight
    const canvasElement = canvasRef.current
    const canvasCtx = canvasElement.getContext("2d");

    if (results.detections.length > 0) {
      for (const Box of results.detections) {
        const { xCenter, yCenter, width, height } = Box.boundingBox;
        // Calculate the pixel coordinates based on normalized values
        const topLeftX = xCenter * videoWidth - (width * videoWidth) / 2;
        const topLeftY = yCenter * videoHeight - (height * videoHeight) / 2;
        const boundingBoxWidth = width * videoWidth;
        const boundingBoxHeight = height * videoHeight;
        const message = Math.round(Box.V[0].ga * 100)
        // console.log('x:', topLeftX, ' y:', topLeftY, ' h:', boundingBoxHeight, ' w:', boundingBoxWidth)

        // Draw the bounding box
        canvasCtx.strokeStyle = '#2986cc';
        canvasCtx.lineWidth = 2;
        canvasCtx.beginPath();
        canvasCtx.rect(topLeftX, topLeftY, boundingBoxWidth, boundingBoxHeight);
        canvasCtx.fillStyle = '#2986cc';
        canvasCtx.fillRect(topLeftX, topLeftY - 20, 16, 20)
        canvasCtx.fillStyle = 'white';
        canvasCtx.fillText(message, topLeftX + 6, topLeftY - 6, 8)
        canvasCtx.stroke();
      }
    } canvasCtx.restore();
  }


  /** Web cam capture */
  const capture = React.useCallback(
    () => {
      console.log("captured")
      const imageSrc = webcamRef.current.getScreenshot();
      const DateNow = new Date()
      setImage(imageSrc)
      setDate(DateNow.toLocaleTimeString("th-TH") + " " + DateNow.toLocaleDateString("th-TH"))
    },
    [webcamRef]
  );

  /** Send image base64 type to ml server */
  const handleSendtoserver = React.useCallback(() => {
    /** . . . .  */
  })
  /** handle action open & close */
  const handleOnclose = React.useCallback(() => {
    console.log(!open)
    if (open) {
      //AI cam
      FaceCamRef.current.stop()
      //Client cam
      const tracks = webcamRef.current.stream.getTracks();
      tracks.forEach((track) => track.stop());
      setOpen(false);
    }
    else {
      const openWebcam = async () => {
        try {
          //client cam
          const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: deviceId, facingMode: "user" }});
          webcamRef.current.stream = stream;
          //AI cam
          FaceCamRef.current.start()
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
    <div>
      <Navigation />
      <div className="flex flex-col mt-[4vh] ml-[10vw]">
        <div className="flex flex-row">
          <CornerDownRight className="mt-1 mr-2" />
          <p className="text-inherit font-bold text-4xl align-bottom">
            Face Recognition
          </p>
        </div>
        <div className="">
        </div>
        <div className="flex">
          <div className="mt-4 w-[50rem]">
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
          </div>
          <div className="mt-7 w-[50rem] ml-[4rem] flex flex-col">
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
                        <div className="flex items-center bg-green-300/20 rounded-small drop-shadow-md justify-center w-9 h-9 mr-2">
                          <CameraIcon className=" text-green-800/80 w-5 h-5" />
                        </div>
                      }
                    >
                      Capture
                    </ListboxItem>
                    <ListboxItem
                      key="send"
                      startContent={
                        <div className="flex items-center bg-yellow-300/20 rounded-small drop-shadow-md justify-center w-9 h-9 mr-2">
                          <Send className=" text-yellow-800/80 w-5 h-5" />
                        </div>
                      }
                    >
                      Send to server
                    </ListboxItem>
                    <ListboxItem
                      key="clear"
                      startContent={
                        <div className="flex items-center bg-purple-300/20 rounded-small drop-shadow-md justify-center w-9 h-9 mr-2">
                          <Delete className=" text-purple-800/80 w-5 h-5" />
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
        <div>
          <p className="text-inherit font-bold text-3xl align-bottom mt-[5rem]">
            Recognition History
          </p>
          <Card className="mt-10 w-[95rem]">
            <CardBody>
              <p>Place recognition history</p>
            </CardBody>
          </Card>
          <Card className="mt-10 w-[95rem]">
            <CardBody>
              <p>Place recognition history</p>
            </CardBody>
          </Card>
          <Card className="mt-10 w-[95rem]">
            <CardBody>
              <p>Place recognition history</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div >
  );
}
