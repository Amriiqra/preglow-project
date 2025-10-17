"use client";

import * as React from "react";
import { useState, useCallback } from "react";
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
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, X, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageUploadPreview from "@/components/shared/UploadImage";

const forumThreads = [
    { title: "Tips for better sleep?", content: "Saya mengalami susah tidur sejak trimester kedua. Ada tips posisi atau rutinitas sebelum tidur?", replies: 15, time: "Posted 3 hours ago", author: "Anonymous" },
    { title: "How to manage nausea?", content: "Mual tiap pagi bikin susah makan. Obat alami apa yang aman untuk mengurangi mual?", replies: 28, time: "Posted 1 day ago", author: "Anonymous" },
    { title: "Best prenatal exercises?", content: "Ingin mulai olahraga ringan. Jenis latihan apa yang aman untuk ibu hamil 20 minggu?", replies: 10, time: "Posted 1 week ago", author: "Anonymous" },
    { title: "What foods to avoid?", content: "Ada daftar makanan yang sebaiknya dihindari selama kehamilan? Bagaimana dengan sushi dan keju lunak?", replies: 12, time: "Posted 2 days ago", author: "Anonymous" },
    { title: "Back pain remedies", content: "Nyeri punggung bawah sangat mengganggu. Stretching atau bantalan apa yang membantu?", replies: 9, time: "Posted 4 days ago", author: "Anonymous" },
    { title: "How to manage stress?", content: "Tekanan kerja membuat saya stres. Teknik relaksasi apa yang direkomendasikan untuk ibu hamil?", replies: 7, time: "Posted 3 days ago", author: "Anonymous" },
    { title: "Breastfeeding tips", content: "Apa persiapan terbaik untuk menyusui sejak trimester akhir? Ada kelas atau literatur yang bagus?", replies: 18, time: "Posted 6 days ago", author: "Anonymous" },
    { title: "Prenatal vitamins", content: "Apakah suplemen tertentu wajib dikonsumsi? Kapan sebaiknya mulai mengonsumsi vitamin prenatal?", replies: 21, time: "Posted 1 week ago", author: "Anonymous" },
    { title: "Baby names suggestions", content: "Sedang bingung cari nama bayi. Prefer nama yang pendek dan modern. Ada saran?", replies: 34, time: "Posted 5 days ago", author: "Anonymous" },
    { title: "Maternity clothing tips", content: "Di mana toko maternity yang nyaman dan terjangkau? Butuh baju yang fleksibel untuk kerja.", replies: 5, time: "Posted 2 weeks ago", author: "Anonymous" },
    { title: "Travel during pregnancy", content: "Apakah aman bepergian jauh di trimester kedua? Tips agar perjalanan nyaman?", replies: 6, time: "Posted 10 days ago", author: "Anonymous" },
    { title: "Gestational diabetes diet", content: "Baru didiagnosis GDM. Pola makan seperti apa yang direkomendasikan oleh tenaga medis?", replies: 11, time: "Posted 3 weeks ago", author: "Anonymous" },
    { title: "Preparing the nursery", content: "Apa prioritas utama saat menyiapkan kamar bayi? Terlalu banyak pilihan membuat bingung.", replies: 4, time: "Posted 1 month ago", author: "Anonymous" },
    { title: "Managing swelling", content: "Bengkak di kaki meningkat saat siang. Ada tips posisi atau sepatu yang membantu?", replies: 8, time: "Posted 8 days ago", author: "Anonymous" },
    { title: "Labor classes", content: "Apakah kelas persiapan melahirkan benar-benar membantu? Pengalaman kalian bagaimana?", replies: 14, time: "Posted 2 months ago", author: "Anonymous" },
];

const ForumThreadItem = ({ title, content, replies, time, author, router }) => (
    <div className="py-4 border border-gray-100 hover:bg-gray-50 cursor-pointer p-5"
        onClick={() => router.push('/forum/1')}
    >
        <h3 className="text-lg font-semibold text-gray-800 hover:text-[#B55B77] transition-colors">
            {title}
        </h3>
        <p className="text-sm text-gray-700 mt-2 line-clamp-3">
            {content}
        </p>
        <div className="text-sm text-gray-500 mt-1 space-x-2">
            <span>{replies} Replies</span>
            <span className="text-xs">•</span>
            <span>{time}</span>
        </div>
        <div className="flex items-center justify-start mt-4 gap-2">
            <Avatar>
                <AvatarImage src="https://github.com/evilrabbit.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-sm text-gray-600 mt-1">
                {author}
            </p>
        </div>
    </div>
);

export default function ForumView() {
    const router = useRouter();
    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = useCallback((event) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    }, []);

    const handleRemoveImage = useCallback(() => {
        setImageFile(null);
        const inputElement = document.getElementById('image-upload');
        if (inputElement) {
            inputElement.value = '';
        }
    }, []);

    return (
        <div className="p-4 lg:p-8 space-y-8 min-h-screen bg-[#F8F8F8]">
            <header className="lg:mb-8 mb-5 flex lg:flex-row flex-col w-full lg:items-center lg:gap-0 gap-5 justify-between">
                <h1 className="text-2xl lg:text-3xl font-bold text-secondary">FORUM</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-primary text-white text-base py-2 px-4 hover:bg-primary/90">
                            Add Forum
                            <Plus className="size-4 ml-2" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Add New Forum</DialogTitle>
                            <DialogDescription>
                                Fill in the details below to add a new forum topic.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="forum-title">Title</Label>
                                <Input
                                    id="forum-title"
                                    name="forum-title"
                                    placeholder="Forum Title"
                                    className="bg-gray-50 focus-visible:ring-[#B55B77]"
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="forum-content">Content</Label>
                                <Textarea
                                    id="forum-content"
                                    name="forum-content"
                                    placeholder="Tuliskan konten forum di sini..."
                                    className="min-h-[150px] resize-none pt-3.5 bg-gray-50 focus-visible:ring-[#B55B77]"
                                />
                            </div>

                            <ImageUploadPreview
                                imageFile={imageFile}
                                onImageChange={handleImageChange}
                                onRemoveImage={handleRemoveImage}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </header>

            <div className="space-y-1">
                <Card className="shadow-sm">
                    <CardContent className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-2 p-4 lg:p-6">
                        {forumThreads.map((thread, index) => (
                            <ForumThreadItem
                                key={index}
                                title={thread.title}
                                replies={thread.replies}
                                time={thread.time}
                                author={thread.author}
                                content={thread.content}
                                router={router}
                            />
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}