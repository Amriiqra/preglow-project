import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { CircleUser, EllipsisVertical, LogOut } from 'lucide-react'
import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function NavFooter() {
    const router = useRouter();

    const handleLogout = () => {
        router.push('/');
    }

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
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="flex items-center gap-2 cursor-pointer">
                                            <CircleUser color="#828282" />
                                            <span className="text-[#828282] text-normal text-sm">Update Pregnancy</span>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Update Pregnancy</DialogTitle>
                                            <DialogDescription>
                                                Fill in the details below to update your pregnancy information.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-3">
                                                <Button type="submit">Pregnant</Button>
                                            </div>
                                            <div className="grid gap-3">
                                                <Button variant="outline">Has Been Born</Button>
                                            </div>
                                        </div>
                                        <Separator />
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline">Cancel</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="flex items-center gap-2 cursor-pointer">
                                            <LogOut color="#828282" />
                                            <span className="text-[#828282] text-normal text-sm">Log out</span>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Log Out</DialogTitle>
                                            <DialogDescription>
                                                Are you sure you want to log out?
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline">Cancel</Button>
                                            </DialogClose>
                                            <Button onClick={handleLogout}>Log Out</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
