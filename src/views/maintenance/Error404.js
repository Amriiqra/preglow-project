import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';


export default function Error404() {
    return (
        <div className="min-h-screen relative overflow-hidden pt-16">
            <div className="absolute inset-0">
                <Image
                    src="/assets/images/background_login.png"
                    alt='background_login'
                    width={1200}
                    height={1200}
                    className='w-full h-full object-cover'
                />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
                <div className='flex items-center justify-center flex-col'>
                    <h1 className='text-9xl text-white font-bold leading-[120px]'>404</h1>
                    <p className='text-white text-5xl font-bold'>Oops! Page Not Found.</p>
                </div>
                <Link href="/dashboard">
                    <Button variant="primary" className="bg-primary mt-5 text-white shadow-sm w-full px-10 text-xl py-9 border-white border cursor-pointer">Go to Dashboard</Button>
                </Link>
            </div>
        </div>
    );
}