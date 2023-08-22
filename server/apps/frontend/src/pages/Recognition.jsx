import React from "react";
import { AnalyticsNavigation } from "@/components/Navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Card,
  CardHeader,
  CardBody,
  Image,
} from "@nextui-org/react";
import Webcam from "react-webcam";

export default function Recognition() {
  const items = [
    {
      key: "new",
      label: "New file",
    },
  ];
  const [deviceId, setDeviceId] = React.useState({});
  const [devices, setDevices] = React.useState([]);

  const handleDevices = React.useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  return (
    <div>
      <div className="flex flex-col mt-[15vh] ml-[10vw]">
        <p className="text-inherit font-bold text-6xl align-bottom">
          Face Recognition
        </p>

        <div className="mt-7">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Choose Camera</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions" items={devices}>
              {(item) => (
                <DropdownItem key={item.deviceId} color={"default"}>
                  {item.label}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="flex">
          <div className="mt-7 w-[50rem]">
            <Card className="py-4">
              <CardBody className="overflow-visible py-2">
                {/* <Webcam /> */}
              </CardBody>
            </Card>
          </div>
          <div className="mt-7 w-[50rem]">
            <Card className="py-4 w-[20rem] ml-[16.5rem]">
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="/mie.jpg"
                  width={270}
                />
              </CardBody>
            </Card>
            <Button
              color="primary"
              variant="bordered"
              className="w-96 ml-[15rem] mt-16"
            >
              Detect Face
            </Button>
            <Button
              color="primary"
              variant="bordered"
              className="w-96 ml-[15rem] mt-4"
            >
              Recognition
            </Button>
            <Button
              color="primary"
              variant="bordered"
              className="w-96 ml-[15rem] mt-4"
            >
              Button
            </Button>
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
    </div>
  );
}
