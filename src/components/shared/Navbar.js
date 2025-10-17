"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { CircleUser, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

export default function Navbar() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('header');

    const navItems = [
        { name: "Home", id: "header" },
        { name: "Features", id: "features" },
        { name: "Testimony", id: "testimonial" },
        { name: "Article", id: "blog" },
        { name: "FAQ", id: "faq" },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
            setActiveSection(id);
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            let current = 'header';
            navItems.forEach((item) => {
                const section = document.getElementById(item.id);
                if (section && window.scrollY >= section.offsetTop - 150) {
                    current = item.id;
                }
            });
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                    {navItems.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`cursor-pointer relative pb-1 transition-colors text-gray-700 hover:text-secondary 
                                ${activeSection === item.id ? 'text-secondary font-semibold' : ''}`}
                        >
                            {item.name}
                            {activeSection === item.id && (
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary rounded-full" />
                            )}
                        </li>
                    ))}
                </ul>

                <Button
                    className="rounded-full bg-secondary hover:bg-secondary/90 text-white w-32 hidden md:block"
                    onClick={() => router.push("/login")}
                >
                    Login
                </Button>
                {/* <Popover>
                    <PopoverTrigger asChild>
                        <div className="lg:flex items-center gap-2 cursor-pointer hidden">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src="https://github.com/evilrabbit.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span>Username</span>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 ml-3">
                        <div className="grid gap-4">
                            <div className="grid gap-4">
                                <div className="flex items-center justify-end gap-2 cursor-pointer"
                                    onClick={() => router.push("/dashboard")}
                                >
                                    <span className="text-[#828282] text-normal text-sm">Dashboard</span>
                                    <LayoutDashboard color="#828282" />
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="flex items-center justify-end gap-2 cursor-pointer">
                                            <span className="text-[#828282] text-normal text-sm">Log out</span>
                                            <LogOut color="#828282" />
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
                                                <Button>Log Out</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover> */}
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-lg pb-4 px-4">
                    <ul className="flex flex-col gap-3 py-2">
                        {navItems.map((item) => (
                            <li
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`cursor-pointer p-2 rounded-md transition-colors 
                                    ${activeSection === item.id ? 'bg-secondary/10 text-secondary font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                                {item.name}
                            </li>
                        ))}
                        <div className="pt-2">
                            <Button
                                className="rounded-full bg-secondary hover:bg-primary text-white w-full"
                                onClick={() => router.push("/login")}
                            >
                                Login
                            </Button>
                        </div>
                    </ul>
                    {/* <Separator className="mt-2" />
                    <div className="grid gap-4 mt-4">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="https://github.com/evilrabbit.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex items-start flex-col">
                                <span className="text-sm">Username</span>
                                <span className="text-xs text-gray-400">30 Week</span>
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
                                        <Button>Log Out</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div> */}
                </div>
            )}
        </nav>
    )
}