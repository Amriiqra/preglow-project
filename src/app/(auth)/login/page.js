"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    return (
        <div className="min-h-screen relative overflow-hidden pt-16">
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
                        <h1 className="text-4xl font-bold text-gray-800 mb-8">Login</h1>

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

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-12 px-4 pr-12 bg-gray-50 border-gray-200 focus:border-pink-400 focus:ring-pink-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Link href="/forgot-password" className="text-sm text-pink-500 hover:text-pink-600 font-medium">
                                    Forgot Password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                onClick={() => {
                                    router.push('/dashboard');
                                }}
                                className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-medium text-lg rounded-full"
                            >
                                Log In
                            </Button>

                            <p className="text-center text-sm text-gray-600 mt-6">
                                Don't have an account?{' '}
                                <Link href="/register" className="text-pink-500 hover:text-pink-600 font-semibold">
                                    Sign Up
                                </Link>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}