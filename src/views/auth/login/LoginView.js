// LoginView.js

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
import { useFormik } from 'formik';
import { toast } from 'sonner';
import { initialValues, validationSchema } from './ValidationSchema';
import * as API from "@/core/services/api";
import { TokenManager } from '@/utils/tokenManager';


export default function LoginView() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            const loginPromise = API.User.login(values);
            toast.promise(loginPromise, {
                loading: "Logging in...",
                success: (data) => {
                    if (data?.user?.token) {
                        TokenManager.setToken(data.user.token);
                    }
                    router.push(`/dashboard`);
                    return data.message || "Login successful!";
                },
                error: (err) => {
                    return `Failed to log in! ${err.message || "Please try again."}`;
                },
            });
            try {
                await loginPromise;
            } catch (error) {
                console.error("Login process failed:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const getError = (fieldName) => {
        return formik.touched[fieldName] && formik.errors[fieldName];
    };

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

            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
                <Card className="w-full max-w-lg shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-none">
                    <CardContent className="p-8 md:p-10">
                        <h1 className="text-4xl font-bold text-gray-800 mb-8">Login</h1>

                        <form className="space-y-6" onSubmit={formik.handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    E-mail address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter Email"
                                    {...formik.getFieldProps('email')}
                                    className={`h-12 px-4 bg-gray-50 border-gray-200 focus:border-pink-400 focus:ring-pink-400
                                        ${getError('email') ? 'border-red-500' : ''}`}
                                />
                                {getError('email') && (
                                    <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
                                )}
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
                                        {...formik.getFieldProps('password')}
                                        className={`h-12 px-4 pr-12 bg-gray-50 border-gray-200 focus:border-pink-400 focus:ring-pink-400
                                            ${getError('password') ? 'border-red-500' : ''}`}
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
                                {getError('password') && (
                                    <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <Link href="/forgot-password" className="text-sm text-pink-500 hover:text-pink-600 font-medium">
                                    Forgot Password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                disabled={formik.isSubmitting || !formik.isValid}
                                className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-medium text-lg rounded-full"
                            >
                                {formik.isSubmitting ? 'Logging in...' : 'Log In'}
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