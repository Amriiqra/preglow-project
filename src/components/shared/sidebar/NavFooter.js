import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { CircleUser, EllipsisVertical, LogOut } from 'lucide-react'
import React from 'react'

export default function NavFooter() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <Popover>
                    <PopoverTrigger asChild>
                        <SidebarMenuButton className="bg-[#F2F2F2] rounded-2xl">
                            <Avatar>
                                <AvatarImage
                                    src="https://github.com/evilrabbit.png"
                                    alt="@evilrabbit"
                                />
                                <AvatarFallback>ER</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start justify-start">
                                <span className="text-secondary font-semibold">Username</span>
                                <p className="text-muted-foreground">28 week Pregnant</p>
                            </div>
                            <EllipsisVertical className="ml-auto" />
                        </SidebarMenuButton>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 ml-3">
                        <div className="grid gap-4">
                            <div className="flex items-center gap-5">
                                <Avatar>
                                    <AvatarImage
                                        src="https://github.com/evilrabbit.png"
                                        alt="@evilrabbit"
                                    />
                                    <AvatarFallback>ER</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-start justify-start">
                                    <span className="text-secondary font-semibold">Username</span>
                                    <p className="text-muted-foregrounde text-sm">28 week Pregnant</p>
                                </div>
                            </div>
                            <Separator />
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2">
                                    <CircleUser color="#828282" />
                                    <span className="text-[#828282] text-normal text-sm">Update Pregnancy</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <LogOut color="#828282" />
                                    <span className="text-[#828282] text-normal text-sm">Log out</span>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
