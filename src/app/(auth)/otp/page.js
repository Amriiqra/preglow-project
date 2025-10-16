"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

export default function Otp() {
    const [otp, setOtp] = useState('');

    const handleSubmit = () => {
        console.log('OTP:', otp);
    };

    return (
        <div className="min-h-screen relative overflow-hidden pt-14">
            <div className="absolute inset-0">
                <Image
                    src="/assets/images/background_login.png"
                    alt='background_login'
                    width={600}
                    height={600}
                    className='w-full'
                />
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
                <Card className="w-full max-w-lg shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-none">
                    <CardContent className="p-8 md:p-10">
                        <h1 className="text-4xl font-bold text-gray-800 text-center">Check Your Email</h1>
                        <p className='text-center mb-8 mt-2 text-gray-500'>
                            Please enter the four digit verification code we send to <strong className='text-black'>example@gmail.com</strong>
                        </p>

                        <div className="space-y-8">
                            <style jsx>{`
                [data-slot="carousel-item"] input {
                  border-radius: 9999px !important;
                }
              `}</style>
                            <div className="flex justify-center">
                                <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                                    <InputOTPGroup className="flex gap-4">
                                        <InputOTPSlot index={0} className="w-16 h-16 text-2xl font-semibold border-2 border-gray-200 !rounded-full focus:border-pink-400 focus:ring-2 focus:ring-pink-200 bg-gray-50" />
                                        <InputOTPSlot index={1} className="w-16 h-16 text-2xl font-semibold border-2 border-gray-200 !rounded-full focus:border-pink-400 focus:ring-2 focus:ring-pink-200 bg-gray-50" />
                                        <InputOTPSlot index={2} className="w-16 h-16 text-2xl font-semibold border-2 border-gray-200 !rounded-full focus:border-pink-400 focus:ring-2 focus:ring-pink-200 bg-gray-50" />
                                        <InputOTPSlot index={3} className="w-16 h-16 text-2xl font-semibold border-2 border-gray-200 !rounded-full focus:border-pink-400 focus:ring-2 focus:ring-pink-200 bg-gray-50" />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>

                            <Button
                                onClick={handleSubmit}
                                className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-medium text-lg rounded-full"
                            >
                                Submit Now
                            </Button>
                            <Link href="/login" className='flex items-center justify-center gap-2'>
                                <ArrowLeft size={20} />
                                <p className="text-center text-sm text-gray-600 font-medium">
                                    Back to login
                                </p>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}