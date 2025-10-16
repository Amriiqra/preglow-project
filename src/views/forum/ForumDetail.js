import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';
import CommentThread from './CommentForum';

const commentsData = [
    {
        user: "Anonymous",
        avatar: "https://github.com/anon1.png",
        text: "I found that a warm bath before bed really helps!",
        time: "5 hours ago",
        hiddenReplies: 2,
        replies: [
            { user: "Anonymous", avatar: "https://github.com/anon2.png", text: "I agree, but sometimes the nausea makes it hard.", time: "4 hours ago", hiddenReplies: 0, replies: [] },
            { user: "Anonymous", avatar: "https://github.com/anon3.png", text: "Maybe try a pillow between your knees?", time: "3 hours ago", hiddenReplies: 0, replies: [] }
        ]
    },
    {
        user: "Anonymous",
        avatar: "https://github.com/anon4.png",
        text: "My doctor suggested magnesium supplements, anyone tried that?",
        time: "1 day ago",
        hiddenReplies: 0,
        replies: []
    }
];

export default function ForumDetail() {
    return (
        <div className="p-4 sm:p-8 space-y-5 lg:space-y-8 min-h-screen bg-[#F8F8F8]">
            <h1 className="text-2xl lg:text-3xl font-bold text-secondary">FORUM DETAIL</h1>

            <div className="space-y-1">
                <Card>
                    <CardContent className="p-4 sm:p-6 lg:p-8">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-800">
                            Tips for better sleep?
                        </h3>

                        <div className='flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mt-3 lg:mt-4'>
                            <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6 lg:w-8 lg:h-8">
                                    <AvatarImage src="https://github.com/evilrabbit.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p className="text-xs sm:text-sm text-gray-600">
                                    Anonymous
                                </p>
                            </div>

                            <p className="text-xs">•</p>
                            <p className='text-xs sm:text-sm'>Maret 20, 2025</p>
                            <p className="text-xs">•</p>
                            <p className='text-xs sm:text-sm'>22 Replies</p>
                        </div>

                        <div className='w-full h-48 sm:h-64 md:h-72 lg:h-96 my-6 relative'>
                            <Image
                                src="/assets/images/nature.jpeg"
                                alt='Forum Post Image'
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>

                        <p className="text-base lg:text-lg text-black mt-6 leading-relaxed text-justify">
                            Welcome to the very beginning of your incredible journey to motherhood. The first trimester, spanning from week 1 to the end of week 13, is a time of profound and invisible transformation. While the world may not see any changes yet, your body is working tirelessly to build a nurturing environment for your growing baby. It's a period often filled with a mix of excitement, anticipation, and perhaps a little uncertainty. This guide is designed to be your calm and steady companion, helping you navigate these foundational first few months with confidence and peace of mind.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="pt-2">
                <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-3">
                    Komentar ({commentsData.length})
                </h2>
                <Card className="shadow-sm">
                    <CardContent className="p-3 sm:p-4 lg:p-6 space-y-2">
                        {commentsData.map((comment, index) => (
                            <CommentThread key={index} comment={comment} />
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}