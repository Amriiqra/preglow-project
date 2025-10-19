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
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import useSWR from 'swr';
import * as API from "@/core/services/api";
import { useFormik } from 'formik'
import { toast } from 'sonner';
import { TokenManager } from '@/utils/tokenManager'

export default function NavFooter() {
    const router = useRouter();

    const {
        data: profile,
        isLoading
    } = useSWR('userProfile', API.User.getProfile);

    const formik = useFormik({
        initialValues: {},
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
                const logoutPromise = API.User.logout();

                toast.promise(logoutPromise, {
                    loading: "Logging out...",
                    success: (data) => {
                        TokenManager.removeToken();
                        return data.message || "Logout successful!";
                    },
                    error: (err) => {
                        return `Failed to log out! ${err.message || "Please try again."}`;
                    },
                });

                await logoutPromise;

                router.push('/');
                router.refresh();

            } catch (error) {
                console.error("Logout process failed:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    if (isLoading) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <div className="flex items-center p-3 w-full bg-[#F2F2F2] rounded-2xl animate-pulse">
                        <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
                        <div className="flex flex-col items-start justify-start space-y-1">
                            <div className="w-20 h-4 bg-gray-300 rounded"></div>
                            <div className="w-32 h-3 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <Popover>
                    <PopoverTrigger asChild>
                        <SidebarMenuButton className="bg-[#F2F2F2] rounded-2xl">
                            <Avatar>
                                <AvatarImage
                                    src="/assets/photoProfile.jpg"
                                    alt="photo profile"
                                />
                                <AvatarFallback>ER</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start justify-start">
                                <span className="text-secondary font-semibold capitalize">{profile?.username}</span>
                                <p className="text-muted-foreground">{profile?.pregnancy_weeks} week Pregnant</p>
                            </div>
                            <EllipsisVertical className="ml-auto" />
                        </SidebarMenuButton>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 ml-3">
                        <div className="grid gap-4">
                            <div className="flex items-center gap-5">
                                <Avatar>
                                    <AvatarImage
                                        src="/assets/photoProfile.jpg"
                                        alt="photo profile"
                                    />
                                    <AvatarFallback>ER</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-start justify-start">
                                    <span className="text-secondary font-semibold capitalize">{profile?.username}</span>
                                    <p className="text-muted-foreground text-sm">{profile?.pregnancy_weeks} week Pregnant</p>
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
                                            <Button
                                                onClick={formik.handleSubmit}
                                                disabled={formik.isSubmitting}
                                            >
                                                {formik.isSubmitting ? 'Logging out...' : 'Log Out'}
                                            </Button>
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