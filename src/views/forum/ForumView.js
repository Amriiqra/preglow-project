"use client";

import * as React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import ImageUploadPreview from "@/components/shared/UploadImage";
import * as API from "@/core/services/api";
import { IoPersonCircle } from "react-icons/io5";
import moment from "moment/moment";
import { ForumThreadSkeleton } from "@/components/shared/skeleton/SkeletonListForum";
import { useFormik } from "formik";
import { toast } from "sonner";
import { ForumSchema, initialValues } from "./ValidationSchema";
import Image from "next/image";


const ForumThreadItem = ({ title, content, replies, time, author, router, id, photo }) => {
    const relativeTime = moment.utc(time).local().fromNow();

    return (
        <div
            className="py-4 border border-gray-100 hover:bg-gray-50 cursor-pointer p-5 rounded-lg transition-all flex lg:flex-row flex-col-reverse items-start justify-between lg:gap-0 gap-2"
            onClick={() => router.push(`/forum/${id}`)}
        >
            <div className="flex justify-between flex-col h-full">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-[#B55B77] transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-700 mt-2 line-clamp-3">{content}</p>
                </div>
                <div className="flex items-start justify-end flex-col">
                    <div className="text-sm text-gray-500 mt-1 space-x-2">
                        <span>{replies} Replies</span>
                        <span className="text-xs">•</span>
                        <span>{relativeTime}</span>
                    </div>
                    <div className="flex items-center justify-start mt-4 gap-2">
                        <IoPersonCircle size={32} />
                        <p className="text-sm text-gray-600 mt-1">{author}</p>
                    </div>
                </div>
            </div>
            {photo && (
                <div className="lg:ml-4 flex-shrink-0 lg:w-52 w-full">
                    <Image
                        src={photo}
                        alt="Forum Image"
                        width={400}
                        height={200}
                        className="mt-4 rounded-lg object-cover max-h-44 w-full"
                    />
                </div>
            )}
        </div>
    );
};

export default function ForumView() {
    const router = useRouter();
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);
    const [open, setOpen] = useState(false);

    const [forums, setForums] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const observerTarget = useRef(null);

    const limit = 10;

    const fetchForums = async (page) => {
        try {
            if (page === 1) {
                setIsInitialLoading(true);
            } else {
                setIsLoadingMore(true);
            }

            const data = await API.Forum.getAll({ page, limit });

            if (page === 1) {
                setForums(data.forums);
            } else {
                setForums(prev => [...prev, ...data.forums]);
            }

            setHasMore(page < data.totalPages);
        } catch (error) {
            console.error("Error fetching forums:", error);
            toast.error("Failed to load forums");
        } finally {
            setIsInitialLoading(false);
            setIsLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchForums(1);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoadingMore && !isInitialLoading) {
                    setCurrentPage(prev => prev + 1);
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [hasMore, isLoadingMore, isInitialLoading]);

    useEffect(() => {
        if (currentPage > 1) {
            fetchForums(currentPage);
        }
    }, [currentPage]);

    const formik = useFormik({
        initialValues,
        validationSchema: ForumSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const formData = new FormData();
                formData.append("title", values.title);
                formData.append("question", values.content);
                if (imageFile) {
                    formData.append("photo", imageFile);
                }

                await API.Forum.create(formData);
                toast.success("Forum added successfully!");
                resetForm();
                setImageFile(null);
                setOpen(false);

                setCurrentPage(1);
                fetchForums(1);
            } catch (error) {
                console.error(error);
                toast.error("Failed to create forum. Please try again.");
            }
        },
    });

    const handleImageChange = useCallback((event) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    }, []);

    const handleRemoveImage = useCallback(() => {
        setImageFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, []);

    useEffect(() => {
        if (!open) {
            setImageFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    }, [open]);

    return (
        <div className="p-4 lg:p-8 space-y-8 min-h-screen bg-[#F8F8F8]">
            <header className="lg:mb-8 mb-5 flex lg:flex-row flex-col w-full lg:items-center lg:gap-0 gap-5 justify-between">
                <h1 className="text-2xl lg:text-3xl font-bold text-secondary">FORUM</h1>

                <Dialog
                    open={open}
                    onOpenChange={(isOpen) => {
                        setOpen(isOpen);
                        if (!isOpen) {
                            formik.resetForm();
                        }
                    }}
                >
                    <DialogTrigger asChild>
                        <Button className="bg-primary text-white text-base py-2 px-4 hover:bg-primary/90">
                            Add Forum
                            <Plus className="size-4 ml-2" />
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto overflow-x-hidden">
                        <DialogHeader>
                            <DialogTitle>Add New Forum</DialogTitle>
                            <DialogDescription>
                                Fill in the details below to add a new forum topic.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="Forum Title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`bg-gray-50 focus-visible:ring-[#B55B77] ${formik.touched.title && formik.errors.title
                                        ? "border-red-500 focus-visible:ring-red-500"
                                        : ""
                                        }`}
                                />
                                {formik.touched.title && formik.errors.title && (
                                    <p className="text-red-500 text-sm">{formik.errors.title}</p>
                                )}
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    placeholder="Tuliskan konten forum di sini..."
                                    value={formik.values.content}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`min-h-[150px] resize-none pt-3.5 bg-gray-50 focus-visible:ring-[#B55B77] ${formik.touched.content && formik.errors.content
                                        ? "border-red-500 focus-visible:ring-red-500"
                                        : ""
                                        }`}
                                />
                                {formik.touched.content && formik.errors.content && (
                                    <p className="text-red-500 text-sm">{formik.errors.content}</p>
                                )}
                            </div>

                            <ImageUploadPreview
                                imageFile={imageFile}
                                onImageChange={handleImageChange}
                                onRemoveImage={handleRemoveImage}
                                inputRef={fileInputRef}
                            />

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button
                                    onClick={formik.handleSubmit}
                                    disabled={formik.isSubmitting}
                                    className="bg-primary text-white hover:bg-primary/90"
                                >
                                    {formik.isSubmitting ? "Saving..." : "Save Forum"}
                                </Button>
                            </DialogFooter>
                        </div>
                    </DialogContent>
                </Dialog>
            </header>

            <div className="space-y-1">
                <Card className="shadow-sm">
                    <CardContent className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-2">
                        {isInitialLoading && (
                            Array.from({ length: 6 }).map((_, i) => <ForumThreadSkeleton key={i} />)
                        )}

                        {forums.length === 0 && !isInitialLoading && (
                            <p className="text-center text-gray-500 col-span-full">
                                No forums available. Be the first to add one!
                            </p>
                        )}

                        {!isInitialLoading && forums.map((thread) => (
                            <ForumThreadItem
                                key={thread._id}
                                title={thread.title}
                                replies={thread.totalComment}
                                time={thread.createdAt}
                                author="Anonymous"
                                content={thread.question}
                                router={router}
                                id={thread._id}
                                photo={thread?.photo}
                            />
                        ))}

                        {isLoadingMore && (
                            Array.from({ length: 2 }).map((_, i) => (
                                <ForumThreadSkeleton key={`loading-${i}`} />
                            ))
                        )}
                    </CardContent>
                </Card>

                <div ref={observerTarget} className="h-10 flex items-center justify-center">
                    {isLoadingMore && (
                        <div className="flex items-center gap-2 text-gray-500">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span className="text-sm">Loading more forums...</span>
                        </div>
                    )}
                    {!hasMore && forums.length > 0 && (
                        <p className="text-sm text-gray-500">No more forums to load</p>
                    )}
                </div>
            </div>
        </div>
    );
}