"use client"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({ items }) {
    const pathname = usePathname();
    const { isMobile, setOpen, setOpenMobile } = useSidebar();

    const handleNavigation = () => {
        if (isMobile) {
            setOpenMobile(false);
        }
    };

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    {items.map((item) => {
                        let isActive;

                        if (item.url === '/dashboard') {
                            isActive = pathname === item.url;
                        } else {
                            isActive = pathname.startsWith(item.url);
                        }

                        return (
                            <SidebarMenuItem key={item.title}>
                                <Link
                                    href={item.url}
                                    passHref
                                    onClick={handleNavigation}
                                >
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        isActive={isActive}
                                        className="[&>svg]:size-6 text-secondary font-medium"
                                    >
                                        {item.icon ?? null}
                                        <span className="text-base">{item.title}</span>
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}