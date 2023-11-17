import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
export default function FeaturesCard({ head, desc }) {
    return (
        <>
            <Card isBlurred shadow="none" className="shadow-xl min-w-[200px] overflow-hidden max-w-[500px] border-small border-[#ffffff] dark:border-[#ffffff] bg-white text-black dark:text-white">
                <CardHeader>
                    <div className=" text-cyan-500 font-semibold ml-[8px] text-lg">{head}</div>
                </CardHeader>
                <CardBody>
                    <div className="min-w-[150px] max-sm:-mt-4 text-sm -mt-4">
                        {desc}
                    </div>
                </CardBody>
            </Card>
        </>
    )
}