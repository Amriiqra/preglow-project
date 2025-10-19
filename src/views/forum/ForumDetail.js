"use client";

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import React, { useState } from 'react';
import CommentThread from './CommentForum';
import { useFormik } from "formik";
import { toast } from "sonner";
import * as API from "@/core/services/api";
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { IoPersonCircle } from 'react-icons/io5';
import { formatContent } from '@/config/global';
import { Button } from '@/components/ui/button';
import { commentValidationSchema } from './ValidationSchema';
import SkeletonForumDetail from '@/components/shared/skeleton/SkeletonForumDetail';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function ForumDetail() {
    const params = useParams();
    const forumId = params.id;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data, isLoading, mutate } = useSWR(
        forumId ? ["forumDetail", forumId] : null,
        async () => {
            if (!forumId) return null;
            return API.Forum.getById(forumId);
        },
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
        }
    );

    const { data: commentsData, isLoading: isLoadingComments, mutate: mutateComments } = useSWR(
        forumId ? ["forumComments", forumId] : null,
        async () => {
            if (!forumId) return null;
            return API.Forum.getAllComment(forumId);
        },
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
        }
    );

    const formik = useFormik({
        initialValues: {
            comment: ""
        },
        validationSchema: commentValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            if (!forumId) {
                toast.error("Forum ID tidak ditemukan");
                return;
            }

            setIsSubmitting(true);

            const commentPromise = API.Forum.createComment(forumId, {
                comment: values.comment
            }).then((response) => {
                if (response) {
                    resetForm();
                    mutate();
                    mutateComments();
                    return response;
                }
                throw new Error("Failed to add comment");
            });

            toast.promise(commentPromise, {
                loading: "Mengirim komentar...",
                success: "Komentar berhasil ditambahkan!",
                error: (err) => err?.message || "Gagal menambahkan komentar",
                finally: () => {
                    setIsSubmitting(false);
                }
            });
        }
    });

    if (isLoading) {
        return <SkeletonForumDetail />;
    }

    if (!data) {
        return (
            <div className="p-4 sm:p-8 space-y-8 min-h-screen bg-[#F8F8F8] text-center pt-20">
                <p className="text-gray-600 text-xl">Forum tidak ditemukan.</p>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-8 space-y-5 lg:space-y-8 min-h-screen bg-[#F8F8F8]">
            <div className='flex items-center gap-4'>
                <Link
                    href="/forum"
                    className="bg-transparent border-2 border-secondary text-secondary p-1 rounded-lg hover:bg-secondary/80 hover:text-white transition-colors"
                >
                    <ChevronLeft size={30}/>
                </Link>
                <h1 className="text-2xl lg:text-3xl font-bold text-secondary">FORUM DETAIL</h1>
            </div>

            <div className="space-y-1">
                <Card>
                    <CardContent className="p-4 sm:p-6 lg:p-8">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-800">
                            {data?.title}
                        </h3>

                        <div className='w-full h-48 sm:h-64 md:h-72 lg:h-96 my-6 relative'>
                            <Image
                                src={data?.photo}
                                alt='Forum Post Image'
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>

                        <div className='flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mt-3'>
                            <div className="flex items-center gap-2">
                                <IoPersonCircle size={32} />
                                <p className="text-xs sm:text-sm text-gray-600">
                                    Anonymous
                                </p>
                            </div>

                            <p className="text-xs">•</p>
                            <p className='text-xs sm:text-sm'>Maret 20, 2025</p>
                            <p className="text-xs">•</p>
                            <p className='text-xs sm:text-sm'>{data?.totalComments || 0} Replies</p>
                        </div>

                        {formatContent(data?.question)}
                    </CardContent>
                </Card>
            </div>

            <div className="pt-2">
                <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-3">
                    Tambah Komentar
                </h2>
                <Card className="shadow-sm">
                    <CardContent className="p-3 sm:p-4 lg:p-6">
                        <form onSubmit={formik.handleSubmit} className="space-y-3">
                            <div>
                                <textarea
                                    name="comment"
                                    placeholder="Tulis komentar Anda..."
                                    rows={4}
                                    value={formik.values.comment}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none ${formik.touched.comment && formik.errors.comment
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                        }`}
                                    disabled={isSubmitting}
                                />
                                {formik.touched.comment && formik.errors.comment && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.comment}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    onClick={() => formik.resetForm()}
                                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                    disabled={isSubmitting}
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:bg-primary/40 disabled:cursor-not-allowed"
                                    disabled={isSubmitting || !formik.isValid}
                                >
                                    {isSubmitting ? 'Mengirim...' : 'Kirim Komentar'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            <div className="pt-2">
                <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-3">
                    Komentar ({data?.totalComments || 0})
                </h2>
                <Card className="shadow-sm">
                    <CardContent className="p-3 sm:p-4 lg:p-6 space-y-2">
                        {isLoadingComments ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">Memuat komentar...</p>
                            </div>
                        ) : commentsData && commentsData.length > 0 ? (
                            commentsData.map((comment, index) => (
                                <CommentThread
                                    key={comment._id || index}
                                    comment={comment}
                                />
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}