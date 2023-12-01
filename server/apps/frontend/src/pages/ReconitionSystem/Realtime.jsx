import { useRef, useEffect, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import Webcam from "react-webcam";
import { useMutation } from "@tanstack/react-query";
import { CameraOff, File } from "react-feather";
import faceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";
import { useAuth } from "@/contexts/AuthContext";
import { base64toFile, convertImage } from "@/utils/ConvertImage";
import { postImageRecognition } from "@/api/post";
import { toast } from "react-toastify";
import { AnimateListItem } from "@/components/Box/AnimateListItem";

export default function Realtime() {
  const lockRef = useRef(false);
  const queueRef = useRef([]);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const FaceCamRef = useRef(null);
  const [selectedKeys, setSelectedKeys] = useState(new Set([""]));
  const [deviceId, setDeviceId] = useState({});
  const [devices, setDevices] = useState([]);
  const [image, setImage] = useState([""]);
  const [recognitionData, setRecognitionData] = useState([]);
  const [date, setDate] = useState(Date.now());
  const [open, setOpen] = useState(true);
  const { organizeData } = useAuth();

  const sendImg = useMutation({
    mutationKey: ["recimage"],
    mutationFn: async (image) => {
      return postImageRecognition(organizeData.id, image);
    },
    onSuccess: (data) => {
      const rdata = data.data;
      const RecognitionData = [];
      for (let i = 0; i < rdata.accuracy.length; i++) {
        if (rdata.statusCode === 1) {
          RecognitionData.unshift({
            id: rdata.result[i].id + i,
            accuracy: rdata.accuracy[i],
            result: rdata.result[i],
          });
        }
      }
      if (rdata.statusCode === 1)
        setRecognitionData((prevData) => {
          if (prevData.length > 20) {
            prevData = prevData.pop()
          }
          return [
            ...prevData,
            {
              id: uuidv4(),
              image: image,
              contact: RecognitionData.sort(
                (a, b) => b.accuracy - a.accuracy
              ).slice(0, 2),
            },
          ];
        });
    },
  });

  /** handle other device that connect to hardware */
  const handleDevices = useCallback(
    (mediaDevices) => {
      const videoDevices = mediaDevices.filter(
        ({ kind }) => kind === "videoinput"
      );
      setDevices(
        videoDevices || [
          {
            deviceId: 0,
            label: "camera not found",
          },
        ]
      );
    },
    [setDevices]
  );

  /** Face recognition */
  useEffect(() => {
    const runFaceDetection = async () => {
      const faceDetectionModule = new faceDetection.FaceDetection({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
      });
      faceDetectionModule.setOptions({
        model: "short",
        minDetectionConfidence: 0.5,
      });
      faceDetectionModule.onResults(onResults);
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null
      ) {
        const WebCamera = new Camera(webcamRef.current.video, {
          onFrame: async () => {
            await faceDetectionModule.send({ image: webcamRef.current.video });
          },
          width: 1280,
          height: 720,
        });
        WebCamera.start();
        FaceCamRef.current = WebCamera;
      }
    };
    runFaceDetection();
  }, []);

  /** get result of face recognition */
  const onResults = (results) => {
    /** Call WebcamRef and CanvasRef */
    const videoWidth = webcamRef.current.video.videoHeight;
    const videoHeight = webcamRef.current.video.videoWidth;
    const image = webcamRef.current.getScreenshot();
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    if (results.detections.length > 0) {
      for (const Box of results.detections) {
        const { xCenter, yCenter, width, height } = Box.boundingBox;
        // Calculate the pixel coordinates based on normalized values
        const topLeftX = xCenter * videoWidth - (width * videoWidth) / 2;
        const topLeftY = yCenter * videoHeight - (height * videoHeight) / 2;
        const boundingBoxWidth = width * videoWidth;
        const boundingBoxHeight = height * videoHeight;
        const acc = Math.round(Box.V[0].ga * 100);

        // Draw the bounding box
        canvasCtx.strokeStyle = "#2986cc";
        canvasCtx.lineWidth = 2;
        canvasCtx.beginPath();
        canvasCtx.rect(topLeftX, topLeftY, boundingBoxWidth, boundingBoxHeight);
        canvasCtx.fillStyle = "#2986cc";
        canvasCtx.fillRect(topLeftX, topLeftY - 20, 16, 20);
        canvasCtx.fillStyle = "white";
        canvasCtx.fillText(acc, topLeftX + 6, topLeftY - 6, 8);
        canvasCtx.stroke();

        // send to ml server
        if (acc > 90) {
          handleSendtoserver(
            image,
            Math.floor(topLeftX),
            Math.floor(topLeftY),
            Math.floor(boundingBoxWidth),
            Math.floor(boundingBoxHeight),
            results.detections.length
          );
        }
      }
    }
    canvasCtx.restore();
  };

  const CropImageFunction = async ({
    image,
    topLeftX,
    topLeftY,
    boundingBoxWidth,
    boundingBoxHeight,
  }) => {
    let imageObj1 = new Image();
    imageObj1.src = image;
    imageObj1.onload = async function () {
      const canvasElement = document.createElement("canvas");
      const context = canvasElement.getContext("2d");
      const cwidth = boundingBoxWidth + 160;
      const cheight = boundingBoxHeight + 60;
      canvasElement.width = cwidth;
      canvasElement.height = cheight;
      context.drawImage(
        imageObj1,
        topLeftX + 30,
        topLeftY - 120,
        cwidth,
        cheight,
        0,
        0,
        cwidth,
        cheight
      );
      const dataURL = canvasElement.toDataURL("image/jpeg");
      const file = base64toFile(dataURL, "image.jpeg");
      const formatImage = await convertImage(file);
      const formData = new FormData();
      setImage(URL.createObjectURL(formatImage));
      formData.append("image", formatImage, file.name);
      await sendImg.mutateAsync(formData);
    };
  };

  /** Send image to decode on ml  */
  const handleSendtoserver = useCallback(
    async (
      image,
      topLeftX,
      topLeftY,
      boundingBoxWidth,
      boundingBoxHeight,
      lengths
    ) => {
      if (lockRef.current) {
        return;
      }
      if (queueRef.current.length < 9) {
        queueRef.current.push({
          image,
          topLeftX,
          topLeftY,
          boundingBoxWidth,
          boundingBoxHeight,
        });
      }
      if (queueRef.current.length >= Math.min(lengths, 6) && !lockRef.current) {
        lockRef.current = true;
        while (queueRef.current.length > 0) {
          const nextCall = queueRef.current.shift();
          await CropImageFunction(nextCall);
        }
        if (queueRef.current.length === 0) {
          setTimeout(() => {
            lockRef.current = false;
          }, lengths * 1250);
        }
      }
    }
  );

  /** handle action open & close */
  const handleOnclose = useCallback(() => {
    if (open) {
      //AI cam
      FaceCamRef.current.stop();
      //Client cam
      const tracks = webcamRef.current.stream.getTracks();
      tracks.forEach((track) => track.stop());
      setOpen(false);
    } else {
      const openWebcam = async () => {
        try {
          //client cam
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: deviceId, facingMode: "user" },
          });
          webcamRef.current.stream = stream;
          //AI cam
          FaceCamRef.current.start();
          setOpen(true);
        } catch (error) {
          toast.error(`Error opening webcam: ${error}`);
        }
      };
      openWebcam();
    }
  }, [open]);

  /** handle selected device */
  useEffect(() => {
    for (const item of devices) {
      if (item.deviceId == selectedKeys.values().next().value)
        setDeviceId(item.deviceId);
    }
  }, [selectedKeys]);

  /** handle device input i/o */
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  return (
    <>
      <div className="relative w-full flex flex-row">
        <div className="mt-4 w-[50rem]">
          <Card
            className="w-[700px] h-[606px] max-xl:w-[70vw] max-xl:h-[calc(70vw*9/16)]"
            isFooterBlurred
            radius="lg"
          >
            {/* Webcam */}
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
        </div>
        <div className="mt-7 w-full  ml-[4rem] flex flex-col pl-0.5 pt-0.5 pr-8 h-[90vh]">
          <Card className="py-4 w-full">
            <CardBody className="overflow-scroll py-2">
              <p className="font-light text-sm text-gray-400 ml-2 mb-1">
                Photo result
              </p>
              {recognitionData.length == 0 && (
                <div className="flex flex-row ml-4 mt-8 mr-12">
                  <File />
                  <p className="ml-2 text-gray-600 text-md">no user found</p>
                </div>
              )}
              <ul className="w-full min-h-full p-4">
                {recognitionData.reverse().map((item) => (
                  <AnimateListItem key={item.id}>
                  <Card radius="lg" className="mt-3 p-4">
                    <div className="flex flex-row">
                      <img
                        alt="Card background"
                        className="object-cover rounded-xl max-h-[100px] max-w-[100px]"
                        src={item.image}
                      />
                      <div className="flex flex-col">
                        {item.contact.map((contact, cindex) => (
                          <div>
                            <div key={cindex} className="flex flex-row">
                              <div
                                className={`ml-3 mt-2 text-sm font-medium p-1.5 rounded-md ${
                                  contact.accuracy > 95
                                    ? "text-green-800 bg-green-100"
                                    : contact.accuracy > 90
                                      ? "text-yellow-700 bg-yellow-100"
                                      : "text-gray-300 bg-gray-50"
                                }`}
                              >{`${parseInt(contact.accuracy)}`}</div>
                              <div className=" ml-3 pl-2 mt-2.5 text-md font-medium w-[270px] truncate">{`${contact.result.firstname} ${contact.result.lastname}`}</div>
                            </div>
                            <div className="flex flex-col ml-7">
                              <div className="text-sm text-gray-500 mt-1">
                                {`Email: ${contact.result.email1 ?? "n/a"}`}
                              </div>
                              <div className="text-sm text-gray-500 mb-3">
                                {`Tel: ${contact.result.mobile ?? "n/a"}`}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                  </AnimateListItem>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
