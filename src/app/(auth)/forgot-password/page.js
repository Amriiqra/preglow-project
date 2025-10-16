"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');

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
                        <h1 className="text-4xl font-bold text-gray-800 mb-8">Forgot Your Password</h1>

                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    E-mail address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12 px-4 bg-gray-50 border-gray-200 focus:border-pink-400 focus:ring-pink-400"
                                />
                            </div>

                            <Button
                                type="submit"
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
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}