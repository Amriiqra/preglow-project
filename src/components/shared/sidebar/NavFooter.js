import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { CircleUser, EllipsisVertical, LogOut } from 'lucide-react'
import React, { useState } from 'react'
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
import SkeletonNavFooter from '../skeleton/SkeletonNavFooter'

export default function NavFooter() {
    const router = useRouter();
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

    const {
        data: profile,
        isLoading,
        mutate
    } = useSWR('userProfile', API.User.getProfile);

    const logoutFormik = useFormik({
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

    const updateStatusFormik = useFormik({
        initialValues: {
            status: '',
        },
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
                const updatePromise = API.User.updateStatusUser(values);

                toast.promise(updatePromise, {
                    loading: "Updating pregnancy status...",
                    success: (data) => {
                        mutate();
                        setOpenUpdateDialog(false);
                        return data.message || "Status updated successfully!";
                    },
                    error: (err) => {
                        return `Failed to update status! ${err.message || "Please try again."}`;
                    },
                });

                await updatePromise;

            } catch (error) {
                console.error("Update status failed:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleStatusUpdate = (status) => {
        updateStatusFormik.setFieldValue('status', status);
        updateStatusFormik.handleSubmit();
    };

    if (isLoading) {
        return <SkeletonNavFooter />;
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
                                <AvatarFallback>
                                    {profile?.username.trim().slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start justify-start">
                                <span className="text-secondary font-semibold capitalize">{profile?.username}</span>
                                {profile.status === 'Pregnant' ? (
                                    <p className="text-muted-foreground">{profile?.pregnancy_weeks} week Pregnant</p>
                                ) : (
                                    <p className="text-muted-foreground">{profile?.status}</p>
                                )}
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
                                    <AvatarFallback>
                                        {profile?.username.trim().slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-start justify-start">
                                    <span className="text-secondary font-semibold capitalize">{profile?.username}</span>
                                    {profile.status === 'Pregnant' ? (
                                        <p className="text-muted-foreground">{profile?.pregnancy_weeks} week Pregnant</p>
                                    ) : (
                                        <p className="text-muted-foreground">{profile?.status}</p>
                                    )}
                                </div>
                            </div>
                            <Separator />
                            <div className="grid gap-2">
                                <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
                                    <DialogTrigger asChild>
                                        <div className="flex items-center gap-2 cursor-pointer">
                                            <CircleUser color="#828282" />
                                            <span className="text-[#828282] text-normal text-sm">Update Pregnancy</span>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Update Pregnancy Status</DialogTitle>
                                            <DialogDescription>
                                                Select your current pregnancy status below.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className={`grid gap-4 ${profile?.status === 'Pregnant' || profile?.status === 'Born' ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                            {profile?.status !== 'Pregnant' && (
                                                <Button
                                                    type="button"
                                                    onClick={() => handleStatusUpdate('Pregnant')}
                                                    disabled={updateStatusFormik.isSubmitting}
                                                    className="w-full"
                                                >
                                                    {updateStatusFormik.isSubmitting && updateStatusFormik.values.status === 'Pregnant'
                                                        ? 'Updating...'
                                                        : 'Pregnant'}
                                                </Button>
                                            )}
                                            {profile?.status !== 'Born' && (
                                                <Button
                                                    type="button"
                                                    onClick={() => handleStatusUpdate('Born')}
                                                    disabled={updateStatusFormik.isSubmitting}
                                                    className="w-full"
                                                >
                                                    {updateStatusFormik.isSubmitting && updateStatusFormik.values.status === 'Born'
                                                        ? 'Updating...'
                                                        : 'Has Been Born'}
                                                </Button>
                                            )}
                                        </div>
                                        <Separator />
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline" disabled={updateStatusFormik.isSubmitting}>
                                                    Cancel
                                                </Button>
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
                                                onClick={logoutFormik.handleSubmit}
                                                disabled={logoutFormik.isSubmitting}
                                            >
                                                {logoutFormik.isSubmitting ? 'Logging out...' : 'Log Out'}
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