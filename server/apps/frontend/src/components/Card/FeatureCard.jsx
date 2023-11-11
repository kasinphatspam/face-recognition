import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
export default function FeaturesCard({ head, desc }) {
    return (
        <>
            <Card isBlurred shadow="none" className="min-w-[200px] overflow-hidden max-w-[500px] border-small border-white/50 dark:border-white/20 bg-transparent/20 text-white">
                <CardHeader>
                    <div className="font-semibold ml-[8px] text-lg">{head}</div>
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