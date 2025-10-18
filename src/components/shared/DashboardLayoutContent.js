"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AIChat from "@/components/shared/AIChat";
import React from 'react';

export default function DashboardLayoutContent({ children }) {
    const pathname = usePathname();

    return (
        <>
            {pathname !== "/sara-ai" && (
                <AIChat />
            )}
            <main className="w-full overflow-y-hidden">
                <SidebarTrigger />
                {children}
            </main>
        </>
    );
}