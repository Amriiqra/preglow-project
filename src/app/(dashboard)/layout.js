import { cookies } from "next/headers"

import { AppSidebar } from "@/components/shared/sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AIChat from "@/components/shared/AIChat";

export async function Layout({ children }) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <AIChat />
            <main className="w-full overflow-y-hidden">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
};

export default Layout;