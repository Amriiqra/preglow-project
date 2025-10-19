"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './ValidationSchema';
import * as API from "@/core/services/api";
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';


export default function NewPasswordView() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const emailFromQuery = searchParams.get('email') || '';

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: emailFromQuery || '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
                const resetPasswordPromise = API.User.resetPassword(values);

                toast.promise(resetPasswordPromise, {
                    loading: "Resetting Password...",
                    success: (data) => {
                        return data.message || "Password reset successful!";
                    },
                    error: (err) => {
                        return `Failed to reset password! ${err.message || "Please try again."}`;
                    },
                });
                await resetPasswordPromise;
                router.push(`/login`);

            } catch (error) {
                console.error("Reset password process failed:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const getError = (fieldName) => {
        return formik.touched[fieldName] && formik.errors[fieldName];
    };

    useEffect(() => {
        if (!emailFromQuery) {
            toast.error("Email not found. Please try again from forgot password page.");
            router.push('/forgot-password');
        }
    }, [emailFromQuery, router]);

    return (
        <div className="min-h-screen relative overflow-hidden pt-14">
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
                        <h1 className="lg:text-4xl text-2xl font-bold text-gray-800 mb-8">Add New Password</h1>

                        <form className="space-y-6" onSubmit={formik.handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                                    New Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="newPassword"
                                        name="newPassword"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter New Password"
                                        {...formik.getFieldProps('newPassword')}
                                        className={`h-12 px-4 pr-12 bg-gray-50 border-gray-200 focus:border-pink-400 focus:ring-pink-400
                                            ${getError('newPassword') ? 'border-red-500' : ''}`}
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
                                {getError('newPassword') && (
                                    <div className="text-red-500 text-xs mt-1">{formik.errors.newPassword}</div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Enter Confirm Password"
                                        {...formik.getFieldProps('confirmPassword')}
                                        className={`h-12 px-4 pr-12 bg-gray-50 border-gray-200 focus:border-pink-400 focus:ring-pink-400
                                            ${getError('confirmPassword') ? 'border-red-500' : ''}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {getError('confirmPassword') && (
                                    <div className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</div>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={formik.isSubmitting || !formik.isValid}
                                className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-medium text-lg rounded-full"
                            >
                                {formik.isSubmitting ? 'Changing Password...' : 'Change Password'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}