
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const MoodHistoryItemSkeleton = () => (
    <Card className="p-4 shadow-none border border-gray-200">
        <Skeleton className="h-5 w-32 bg-gray-200 mb-2" />
        <Skeleton className="h-4 w-20 bg-gray-200 mb-2" />
        <Skeleton className="h-10 w-full bg-gray-200" />
    </Card>
);

const MoodRecapSkeleton = () => (
    <Card className="w-full h-full">
        <CardHeader>
            <Skeleton className="h-6 w-40 bg-gray-200" />
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-4">
            <div className="grid grid-cols-3 gap-4 w-full">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </div>

            <div className="mt-4">
                <Skeleton className="h-3 w-1/3 mb-1" />
                <Skeleton className="h-10 w-1/2" />
            </div>

            <div className="flex w-full items-center justify-between">
                <Skeleton className="rounded-full w-[160px] h-[160px] bg-gray-200" />
                <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Skeleton className="w-2 h-2 rounded-full bg-gray-300" />
                            <Skeleton className="h-3 w-20 bg-gray-200" />
                        </div>
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
);

const MoodFormSkeleton = () => (
    <Card className="shadow-none col-span-2">
        <CardHeader>
            <Skeleton className="h-6 w-56 bg-gray-200" />
            <Skeleton className="h-4 w-40 bg-gray-200 mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-3">
                <Skeleton className="h-4 w-64 bg-gray-200" />
                <div className="flex flex-wrap gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="text-center">
                            <Skeleton className="w-10 h-10 rounded-md bg-gray-200 mb-1 mx-auto" />
                            <Skeleton className="h-3 w-12 bg-gray-200" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <Skeleton className="h-4 w-64 bg-gray-200" />
                <Skeleton className="h-[120px] w-full rounded-md bg-gray-200" />
            </div>

            <Skeleton className="h-12 w-full rounded-full bg-gray-200" />
        </CardContent>
    </Card>
);

export function MoodSkeleton() {
    return (
        <div className="p-4 sm:p-8 space-y-8 min-h-screen bg-[#F8F8F8] animate-pulse">
            <header className="mb-8">
                <Skeleton className="h-8 w-64 bg-gray-200" />
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="w-full col-span-2 lg:col-span-1">
                    <MoodRecapSkeleton />
                </div>

                <div className="col-span-2">
                    <MoodFormSkeleton />
                </div>
            </div>

            <div className="mt-8 space-y-4">
                <h2 className="text-2xl font-bold text-secondary">Mood History</h2>
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <MoodHistoryItemSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}