import { Card, 
    Image, 
    CardFooter, 
    CardHeader,
    Chip, 
     } 
        from "@nextui-org/react";
import React from "react";
import { Link as LinkR } from "react-router-dom";

export default function OrganizeCard(props) {
    return (
        <>  
            {/** Tool name */}
            <LinkR to={{pathname:`/organization/${props.id}`}}>
                <Card isFooterBlurred isHeaderBlurred 
                className="relative group min-w-[240px] h-[240px] max-w-[420px] col-span-12 sm:col-span-7">
                    {/** Box Upper */}
                    <CardHeader className="absolute z-10 top-0 flex-col items-start bg-white/30">
                        <p className=" text-[0.6rem] text-black/60 uppercase font-bold">Total {props.employee} users</p>
                        <h4 className="text-black/90 font-medium text-2xl">{props.name}</h4>
                        
                    </CardHeader>
                    <div className="absolute z-10 top-4 right-4">
                        <Chip variant="flat" color="success" size="sm">{props.package}</Chip>
                    </div>
                    {/** background image */}
                    <Image
                        removeWrapper
                        className="z-0 w-full h-full object-cover group-hover:opacity-80 duration-250 delay-100"
                        src="/default.jpg"
                    />
                    {/** Box Bottom */}
                    <CardFooter className="absolute bg-black/40 bottom-0 z-10 
                    border-t-1 border-default-600 dark:border-default-100">
                        <div className="flex flex-col ml-8">
                            <div className="flex flex-col">
                                <p className="text-tiny text-white/60 w-[160px] h-[60px]">{props.description}</p>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </LinkR>
        </>
    )
}