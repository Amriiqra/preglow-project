"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// --- Data Dummy Thread Forum ---
const forumThreads = [
    { title: "Tips for better sleep?", replies: 15, time: "Posted 3 hours ago", author: "Anonymous" },
    { title: "How to manage nausea?", replies: 28, time: "Posted 1 day ago", author: "Anonymous" },
    { title: "Best prenatal exercises?", replies: 10, time: "Posted 1 week ago", author: "Anonymous" },
    { title: "Tips for better sleep?", replies: 15, time: "Posted 3 hours ago", author: "Anonymous" },
    { title: "How to manage nausea?", replies: 28, time: "Posted 1 day ago", author: "Anonymous" },
    { title: "Best prenatal exercises?", replies: 10, time: "Posted 1 week ago", author: "Anonymous" },
    { title: "Tips for better sleep?", replies: 15, time: "Posted 3 hours ago", author: "Anonymous" },
    { title: "How to manage nausea?", replies: 28, time: "Posted 1 day ago", author: "Anonymous" },
    { title: "Best prenatal exercises?", replies: 10, time: "Posted 1 week ago", author: "Anonymous" },
    // Data ini akan ditampilkan di Kolom Kanan:
    { title: "Tips for better sleep?", replies: 15, time: "Posted 3 hours ago", author: "Anonymous" },
    { title: "How to manage nausea?", replies: 28, time: "Posted 1 day ago", author: "Anonymous" },
    { title: "Best prenatal exercises?", replies: 10, time: "Posted 1 week ago", author: "Anonymous" },
    { title: "Tips for better sleep?", replies: 15, time: "Posted 3 hours ago", author: "Anonymous" },
    { title: "How to manage nausea?", replies: 28, time: "Posted 1 day ago", author: "Anonymous" },
    { title: "Best prenatal exercises?", replies: 10, time: "Posted 1 week ago", author: "Anonymous" },
];

// --- Komponen Item Thread ---
const ForumThreadItem = ({ title, replies, time, author }) => (
    <div className="py-4 border border-gray-100 hover:bg-gray-50 cursor-pointer p-5">
        <h3 className="text-lg font-semibold text-gray-800 hover:text-[#B55B77] transition-colors">
            {title}
        </h3>
        <div className="text-sm text-gray-500 mt-1 space-x-2">
            <span>{replies} Replies</span>
            <span className="text-xs">•</span>
            <span>{time}</span>
        </div>
        <p className="text-sm italic text-gray-600 mt-1">
            — {author}
        </p>
    </div>
);

// --- KOMPONEN UTAMA FORUM ---
export default function ForumView() {

    return (
        <div className="p-8 space-y-8 min-h-screen bg-[#F8F8F8]">
            <header className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">FORUM</h1>
                <Button className="bg-primary text-white text-base py-2 px-4 hover:bg-primary/90">
                    Add Forum
                </Button>
            </header>

            {/* Grid 2 Kolom untuk Daftar Thread */}

            {/* Kolom Kiri */}
            <div className="space-y-1">
                <Card className="shadow-sm">
                    <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {forumThreads.map((thread, index) => (
                            <ForumThreadItem
                                key={index}
                                title={thread.title}
                                replies={thread.replies}
                                time={thread.time}
                                author={thread.author}
                            />
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}