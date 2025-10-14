"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar"
import Image from "next/image";
import { FaRegFaceGrin } from "react-icons/fa6";
import { BsCalendarDate } from "react-icons/bs";    
import { MdHomeFilled, MdOutlineInventory } from "react-icons/md";
import { RiSparkling2Fill } from "react-icons/ri";
import { NavMain } from "./NavMain";
import NavFooter from "./NavFooter";

const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: <MdHomeFilled />,
        },
        {
            title: "Mood",
            url: "/mood",
            icon: <FaRegFaceGrin />,
        },
        {
            title: "Reminder",
            url: "/reminder",
            icon: <BsCalendarDate />,
        },
        {
            title: "Nutrition",
            url: "/nutrition",
            icon: <MdOutlineInventory />,
        },
        {
            title: "Chat Bot",
            url: "/chat-bot",
            icon: <RiSparkling2Fill />,
        },
    ]
}

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <Image
                    src="/assets/logo.svg"
                    alt="logo"
                    width={120}
                    height={31}
                    className="mx-auto my-6"
                />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavFooter />
            </SidebarFooter>
        </Sidebar>
    )
}