import React from "react";
import {
  Tabs,
  Tab,
  Spinner
} from "@nextui-org/react";
import { FaceRecognitionNavigation } from "@/components/Navigation";

const Realtime = React.lazy(() => import('@/pages/ReconitionSystem/Realtime'));
const Snapshot = React.lazy(() => import('@/pages/ReconitionSystem/Snapshot'));

export default function Recognition() {
  const [selected, setSelected] = React.useState("photos");


  return (
    <div>
      <FaceRecognitionNavigation />
      <div className="flex flex-col mt-2 ml-[10vw]">
        <Tabs
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={setSelected}
          className="mt-4 -mb-4 ml-8"
        >
          <Tab key="photos" title="Photos">
            <React.Suspense fallback={<Spinner className="mt-[350px] ml-[350px]"/>}>
              <Snapshot />
            </React.Suspense>
          </Tab>
          <Tab key="videos" title="Videos">
            <React.Suspense fallback={<Spinner className="mt-[350px] ml-[350px]"/>}>
              <Realtime />
            </React.Suspense>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
