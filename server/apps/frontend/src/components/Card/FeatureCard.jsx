import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
export default function FeaturesCard({ head, desc, icon }) {
    return (
        <>
            <Card isBlurred shadow="none" className="shadow-xl min-w-[200px] overflow-hidden max-w-[500px] py-3 border-small border-[#f1f1f1] dark:border-[#f1f1f1] bg-white text-black dark:text-white">
                <CardHeader>
                    <div className="flex flex-row ml-2">
                        {icon}
                        <h1 className="text-cyan-500 font-semibold ml-[8px] text-lg">{head}</h1>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="min-w-[150px] max-sm:-mt-4 text-sm -mt-4 ml-1">
                        {desc}
                    </div>
                </CardBody>
            </Card>
        </>
    )
}