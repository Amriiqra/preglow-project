"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between py-4 px-8 max-w-7xl mx-auto">
            <Image src="/assets/logo.svg" alt="Logo" width={100} height={100} />
            <ul className="flex items-center gap-10">
                <li className="cursor-pointer">Home</li>
                <li className="cursor-pointer">About</li>
                <li className="cursor-pointer">Contact</li>
            </ul>
            <Button
                className="rounded-full bg-secondary"
                onClick={() => router.push("/login")}
            >
                Login
            </Button>
        </div>
    )
}
