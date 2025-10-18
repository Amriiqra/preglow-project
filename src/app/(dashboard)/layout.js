import { cookies } from "next/headers"

import { AppSidebar } from "@/components/shared/sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from 'react';
import DashboardLayoutContent from "@/components/shared/DashboardLayoutContent";
export async function Layout({ children }) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <DashboardLayoutContent>
                {children}
            </DashboardLayoutContent>
        </SidebarProvider>
    );
};

export default Layout;