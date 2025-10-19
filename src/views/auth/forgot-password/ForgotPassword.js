"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import * as API from "@/core/services/api";

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
});

export default function ForgotPasswordView() {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
                const forgotPasswordPromise = API.User.forgotPassword(values);

                toast.promise(forgotPasswordPromise, {
                    loading: "Sending otp code...",
                    success: (data) => {
                        return data.message || "OTP code sent successfully!";
                    },
                    error: (err) => {
                        return `Failed to send OTP code! ${err.message || "Please try again."}`;
                    },
                });

                await forgotPasswordPromise;
                router.push(`/otp?email=${values.email}&type=forgot-password`);

            } catch (error) {
                console.error("Forgot password process failed:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const getError = (fieldName) => {
        return formik.touched[fieldName] && formik.errors[fieldName];
    };

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
                        <h1 className="lg:text-4xl text-2xl font-bold text-gray-800 mb-8">Forgot Your Password</h1>

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

                            <Button
                                type="submit"
                                disabled={formik.isSubmitting || !formik.isValid}
                                className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-medium text-lg rounded-full"
                            >
                                {formik.isSubmitting ? 'Sending...' : 'Submit Now'}
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