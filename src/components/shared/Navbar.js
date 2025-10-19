"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { TokenManager } from "@/utils/tokenManager";
import useSWR, { mutate } from "swr";
import * as API from "@/core/services/api";
import { useFormik } from "formik";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const ProfileSkeleton = () => (
    <div className="lg:flex items-center gap-3 hidden">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-[20px] w-[100px] rounded-full" />
    </div>
);


export default function Navbar({ sectionId }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);
    const [token, setToken] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('header');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setToken(TokenManager.getToken());
    }, []);

    const navItems = [
        { name: "Home", id: "header" },
        { name: "Features", id: "features" },
        { name: "Testimony", id: "testimonial" },
        { name: "Article", id: "blog" },
        { name: "FAQ", id: "faq" },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (pathname === '/') {
            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: 'smooth'
                });
                setActiveSection(id);
                setIsMenuOpen(false);
            }
        } else {
            router.push(`/#${id}`);
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        if (!isClient || pathname !== "/") return;

        const handleScroll = () => {
            let current = sectionId || "header";
            navItems.forEach((item) => {
                const section = document.getElementById(item.id);
                if (section && window.scrollY >= section.offsetTop - 150) {
                    current = item.id;
                }
            });
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isClient, pathname]);

    const { data: profile, isLoading } = useSWR(
        isClient && token ? 'userProfile' : null,
        API.User.getProfile
    );

    const formik = useFormik({
        initialValues: {},
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            setIsDialogOpen(false);

            const logoutPromise = API.User.logout();

            toast.promise(logoutPromise, {
                loading: "Logging out...",
                success: (data) => {
                    TokenManager.removeToken();
                    setIsDialogOpen(false);
                    setIsMenuOpen(false);
                    return data.message || "Logout successful!";
                },
                error: (err) => {
                    TokenManager.removeToken();
                    return `Failed to log out! ${err.message || "Please try again."}`;
                },
            });

            try {
                await logoutPromise;
                mutate('userProfile');
            } catch (error) {
                console.error("Logout process failed:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    if (isLoading && token) {
        return (
            <nav className="fixed w-full bg-white shadow-md z-50">
                <div className="flex items-center justify-between py-3 lg:py-5 px-4 sm:px-8 max-w-7xl mx-auto">
                    <Image src="/assets/logo.svg" alt="Logo" width={100} height={31} />
                    <ProfileSkeleton />
                </div>
            </nav>
        );
    }

    return (
        <nav className="fixed w-full bg-white shadow-md z-50">
            <div className="flex items-center justify-between py-3 lg:py-5 px-4 sm:px-8 max-w-7xl mx-auto">
                <Link href="/" onClick={() => scrollToSection('header')}>
                    <Image src="/assets/logo.svg" alt="Logo" width={100} height={31} />
                </Link>

                <button
                    className="md:hidden p-2 text-secondary"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <ul className="hidden md:flex items-center gap-10">
                    {navItems.map((item) => {
                        const isActive = sectionId
                            ? item.id === sectionId
                            : item.id === activeSection;

                        return (
                            <li
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`cursor-pointer relative pb-1 transition-colors text-gray-700 hover:text-secondary 
                                    ${isActive ? 'text-secondary font-semibold' : ''}`}
                            >
                                {item.name}
                                {isActive && (
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary rounded-full" />
                                )}
                            </li>
                        );
                    })}
                </ul>

                {token ? (
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="lg:flex items-center gap-2 cursor-pointer hidden">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src="/assets/photoProfile.jpg" alt="Profile Picture" />
                                    <AvatarFallback>
                                        {profile?.username
                                            ? profile.username.trim().slice(0, 2).toUpperCase()
                                            : ''}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="capitalize">{profile?.username}</span>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-40 ml-3">
                            <div className="grid gap-4">
                                <div className="grid gap-4">
                                    <div className="flex items-center justify-end gap-2 cursor-pointer"
                                        onClick={() => router.push("/dashboard")}
                                    >
                                        <span className="text-[#828282] text-sm">Dashboard</span>
                                        <LayoutDashboard color="#828282" size={16} />
                                    </div>

                                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                        <DialogTrigger asChild>
                                            <div className="flex items-center justify-end gap-2 cursor-pointer">
                                                <span className="text-[#828282] text-sm">Log out</span>
                                                <LogOut color="#828282" size={16} />
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
                                                <Button variant="outline"
                                                    onClick={() =>
                                                        setIsDialogOpen(false)}>Cancel</Button>

                                                <Button onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
                                                    {formik.isSubmitting ? 'Logging out...' : 'Log Out'}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                ) : (
                    <Button
                        className="rounded-full bg-secondary hover:bg-secondary/90 text-white w-32 hidden md:block"
                        onClick={() => router.push("/login")}
                    >
                        Login
                    </Button>
                )}
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-lg pb-4 px-4">
                    <ul className="flex flex-col gap-3 py-2">
                        {navItems.map((item) => {
                            const isActive = sectionId
                                ? item.id === sectionId
                                : item.id === activeSection;

                            return (
                                <li
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`cursor-pointer p-2 rounded-md transition-colors 
                                        ${isActive ? 'bg-secondary/10 text-secondary font-semibold' :
                                            'text-gray-700 hover:bg gray-100'}`}
                                >
                                    {item.name}
                                </li>
                            );
                        })}
                    </ul>
                    <Separator className="mt-2" />
                    {token ? (
                        <div className="grid gap-4 mt-4">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/assets/photoProfile.jpg" alt="Profile Picture" />
                                    <AvatarFallback>
                                        {profile?.username.trim().slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex items-start flex-col">
                                    <span className="text-sm">{profile?.username}</span>
                                    <span className="text-xs text-gray-400">{profile?.pregnancy_weeks} week Pregnant</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-start gap-2 cursor-pointer"
                                onClick={() => router.push("/dashboard")}
                            >
                                <LayoutDashboard color="#828282" />
                                <span className="text-[#828282] text-normal text-sm">Dashboard</span>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="flex items-center justify-start gap-2 cursor-pointer">
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
                                        <DialogClose asChild>
                                            <Button onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
                                                {formik.isSubmitting ? 'Logging out...' : 'Log Out'}
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    ) : (
                        <Button
                            className="rounded-full mt-4 bg-secondary hover:bg-secondary/90 text-white w-full"
                            onClick={() => {
                                router.push("/login");
                                setIsMenuOpen(false);
                            }}
                        >
                            Login
                        </Button>
                    )}
                </div>
            )}
        </nav>
    )
}