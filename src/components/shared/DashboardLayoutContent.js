"use client";

import { usePathname, useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AIChat from "@/components/shared/AIChat";
import React, { useEffect } from 'react';

export default function DashboardLayoutContent({ children }) {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const tokenDataString = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
        if (!tokenDataString) {
            router.push('/login');
        }
    }, [router]);

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