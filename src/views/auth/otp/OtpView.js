"use client"

import React, { useEffect } from 'react';
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
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import * as API from "@/core/services/api";
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './ValidationSchema';

export default function OtpView() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const emailFromQuery = searchParams.get('email');
    const typeFromQuery = searchParams.get('type');
    const displayEmail = emailFromQuery;

    const isForgotPassword = typeFromQuery === 'forgot-password';

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
                const payload = {
                    email: displayEmail,
                    verificationCode: values.verificationCode,
                };

                const verifyPromise = isForgotPassword
                    ? API.SendOtp.verifyOtpForgotPassword(payload)
                    : API.SendOtp.verifyOtpRegister(payload);

                toast.promise(verifyPromise, {
                    loading: "Verifying OTP code...",
                    success: (data) => {
                        return data.message || "Verification successful!";
                    },
                    error: (err) => {
                        return `Verification failed! ${err.message || "The OTP code is invalid or has expired."}`;
                    },
                });

                await verifyPromise;

                if (isForgotPassword) {
                    router.push(`/new-password?email=${displayEmail}`);
                } else {
                    router.push(`/login`);
                }

            } catch (error) {
                console.error("Verification failed:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleResendOtp = async () => {
        if (!displayEmail) {
            toast.error("Email not found. Cannot resend OTP.");
            return;
        }

        try {
            const resendPromise = isForgotPassword
                ? API.SendOtp.sendOtpResetPassword({ email: displayEmail })
                : API.SendOtp.sendOtpRegister({ email: displayEmail });

            toast.promise(resendPromise, {
                loading: "Resending code...",
                success: (res) => {
                    return res.message || "OTP code resent successfully!";
                },
                error: (err) => {
                    return `Failed to resend! ${err.message || "A server error occurred."}`;
                }
            });

        } catch (error) {
            console.error("Resend OTP failed:", error);
        }
    }

    useEffect(() => {
        if (!emailFromQuery) {
            router.push('/login');
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
                        <h1 className="lg:text-4xl text-2xl font-bold text-gray-800 text-center">Check Your Email</h1>
                        <p className='text-center mb-8 mt-2 text-gray-500'>
                            Please enter the four-digit verification code we sent to <strong className='text-black'>{displayEmail}</strong>
                        </p>

                        <form onSubmit={formik.handleSubmit} className="space-y-8">
                            <div className="flex justify-center">
                                <InputOTP
                                    maxLength={4}
                                    value={formik.values.verificationCode}
                                    onChange={(value) => formik.setFieldValue('verificationCode', value)}
                                    onBlur={() => formik.setFieldTouched('verificationCode', true)}
                                >
                                    <InputOTPGroup className="flex gap-4">
                                        <InputOTPSlot index={0} className="w-16 h-16 text-2xl font-semibold border-2 border-gray-200 !rounded-full focus:border-pink-400 focus:ring-2 focus:ring-pink-200 bg-gray-50" />
                                        <InputOTPSlot index={1} className="w-16 h-16 text-2xl font-semibold border-2 border-gray-200 !rounded-full focus:border-pink-400 focus:ring-2 focus:ring-pink-200 bg-gray-50" />
                                        <InputOTPSlot index={2} className="w-16 h-16 text-2xl font-semibold border-2 border-gray-200 !rounded-full focus:border-pink-400 focus:ring-2 focus:ring-pink-200 bg-gray-50" />
                                        <InputOTPSlot index={3} className="w-16 h-16 text-2xl font-semibold border-2 border-gray-200 !rounded-full focus:border-pink-400 focus:ring-2 focus:ring-pink-200 bg-gray-50" />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>

                            {formik.touched.verificationCode && formik.errors.verificationCode && (
                                <div className="text-red-500 text-center text-xs mt-1">
                                    {formik.errors.verificationCode}
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={formik.isSubmitting || !formik.isValid || formik.values.verificationCode.length !== 4}
                                className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-medium text-lg rounded-full"
                            >
                                {formik.isSubmitting ? 'Verifying...' : 'Submit Now'}
                            </Button>

                            <div className='flex items-center justify-center'>
                                <p>
                                    Didn't receive the code?{' '}
                                    <span
                                        className='text-primary cursor-pointer hover:underline'
                                        onClick={handleResendOtp}
                                    >
                                        Resend
                                    </span>
                                </p>
                            </div>
                            <Link href="/login" className='flex items-center justify-center gap-2'>
                                <ArrowLeft size={20} />
                                <p className="text-center text-sm text-gray-600 font-medium">
                                    Back to Login
                                </p>
                            </Link>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}