"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonForumDetail() {
    return (
        <div className="p-4 sm:p-8 space-y-5 lg:space-y-8 min-h-screen bg-[#F8F8F8] animate-in fade-in">
            <Skeleton className="h-8 w-44 rounded-md" />

            <Card>
                <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4">
                    <div className="flex justify-center">
                        <Skeleton className="h-8 w-3/4 max-w-lg rounded-md" />
                    </div>

                    <div className="w-full h-48 sm:h-64 md:h-72 lg:h-96 my-6">
                        <Skeleton className="w-full h-full rounded-lg" />
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                        <Skeleton className="h-6 w-28 rounded-md" />
                        <Skeleton className="h-6 w-16 rounded-md" />
                        <Skeleton className="h-6 w-20 rounded-md" />
                    </div>

                    <div className="space-y-2 mt-6">
                        <Skeleton className="h-4 w-full rounded-md" />
                        <Skeleton className="h-4 w-11/12 rounded-md" />
                        <Skeleton className="h-4 w-4/5 rounded-md" />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-3">
                <Skeleton className="h-6 w-40 rounded-md" />
                <Card className="shadow-sm">
                    <CardContent className="p-3 sm:p-4 lg:p-6 space-y-3">
                        <Skeleton className="h-24 w-full rounded-md" />
                        <div className="flex justify-end gap-3">
                            <Skeleton className="h-10 w-20 rounded-md" />
                            <Skeleton className="h-10 w-32 rounded-md" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-3">
                <Skeleton className="h-6 w-52 rounded-md" />
                <Card className="shadow-sm">
                    <CardContent className="p-3 sm:p-4 lg:p-6 space-y-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="space-y-2 border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                    <Skeleton className="h-4 w-1/3 rounded-md" />
                                </div>
                                <Skeleton className="h-4 w-full rounded-md" />
                                <Skeleton className="h-4 w-2/3 rounded-md" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
