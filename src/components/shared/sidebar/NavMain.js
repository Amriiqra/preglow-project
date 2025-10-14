"use client"

import { Button } from "@/components/ui/button"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({ items }) {
    const pathname = usePathname();

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
                                <Link href={item.url} passHref>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        isActive={isActive}
                                        className="[&>svg]:size-6"
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
