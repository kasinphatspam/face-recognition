import React from "react";
import {
  Tabs,
  Tab,
  Spinner
} from "@nextui-org/react";
import Navigation from "@/components/Navigation";
import {
  CornerDownRight
} from "react-feather";
const Realtime = React.lazy(() => import('@/pages/ReconitionSystem/Realtime'));
const Snapshot = React.lazy(() => import('@/pages/ReconitionSystem/Snapshot'));

export default function Recognition() {
  const [selected, setSelected] = React.useState("photos");


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
