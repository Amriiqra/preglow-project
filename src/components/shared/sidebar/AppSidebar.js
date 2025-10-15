"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar"
import Image from "next/image";
import { FaRegFaceGrin } from "react-icons/fa6";
import { MdHomeFilled, MdOutlineForum, MdOutlineInventory } from "react-icons/md";
import { RiSparkling2Fill } from "react-icons/ri";
import { NavMain } from "./NavMain";
import NavFooter from "./NavFooter";
import { IoInfinite } from "react-icons/io5";

const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: <MdHomeFilled />,
        },
        {
            title: "Forum",
            url: "/forum",
            icon: <MdOutlineForum />,
        },
        {
            title: "Meditation",
            url: "/meditation",
            icon: <IoInfinite />,
        },
        {
            title: "Mood",
            url: "/mood",
            icon: <FaRegFaceGrin />,
        },
        {
            title: "Nutrition",
            url: "/nutrition",
            icon: <MdOutlineInventory />,
        },
        {
            title: "Sara AI",
            url: "/sara-ai",
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