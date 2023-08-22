import { Card, Divider, Link, Image, CardFooter, CardHeader, Tooltip } from "@nextui-org/react";
import React from "react";

export default function OrganizeCard(props) {
    return (
        <>  
            <Tooltip color="default" content={props.name}>
                <Card isFooterBlurred isHeaderBlurred className="w-[300px] h-[240px] col-span-12 sm:col-span-7">
                    <CardHeader className="absolute z-10 top-1 flex-col items-start bg-white/30 mt-2">
                        <p className=" text-[0.6rem] text-black/60 uppercase font-bold">Total {props.employee} users</p>
                        <h4 className="text-black/90 font-medium text-2xl">{props.name}</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        className="z-0 w-full h-full object-cover"
                        src="/default.jpg"
                    />
                    <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                        <div className="flex flex-col ml-8">
                            <div className="flex flex-col">
                                <p className="text-tiny text-white/60 w-[160px]">{props.description}</p>
                            </div>
                            {/** Bottom Context */}
                             <Divider className="my-2 mt-4 bg-white/60" />
                            <div className="flex h-5 items-center space-x-4 text-small">
                                <Link className="text-white text-xs" showAnchorIcon>Info</Link>
                                <Divider orientation="vertical" className="bg-white/60"/>
                                <Link className="text-white text-xs">Member</Link>
                                <Divider orientation="vertical" className="bg-white/60"/>
                                <Link className="text-white text-xs">Contact</Link>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </Tooltip>
        </>
    )
}