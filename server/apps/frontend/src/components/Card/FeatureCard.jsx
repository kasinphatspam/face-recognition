import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
export default function FeaturesCard({ head, desc }) {
    return (
        <>
            <Card isBlurred shadow="none" className="min-w-[240px] max-w-[450px] border-small border-white/50 dark:border-white/20 bg-transparent/20 text-white">
                <CardHeader>
                    <div className="font-semibold ml-[8px] text-lg">{head}</div>
                </CardHeader>
                <CardBody>
                    <div className="min-w-[240px] text-sm -mt-6">
                        {desc}
                    </div>
                </CardBody>
            </Card>
        </>
    )
}