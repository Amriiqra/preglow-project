"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MoodSkeleton() {
    return (
        <div className="p-4 sm:p-8 space-y-8 min-h-screen bg-[#F8F8F8] animate-pulse">
            {/* Header */}
            <header className="mb-8">
                <Skeleton className="h-8 w-64 bg-gray-200" />
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Chart Skeleton */}
                <div className="space-y-6 w-full col-span-2 lg:col-span-1">
                    <Card className="w-full h-full">
                        <CardHeader>
                            <Skeleton className="h-6 w-40 bg-gray-200" />
                        </CardHeader>
                        <CardContent className="flex flex-col items-center gap-6">
                            <Skeleton className="h-8 w-24 bg-gray-200" />
                            <Skeleton className="rounded-full w-[220px] h-[220px] bg-gray-200" />
                            <div className="space-y-2 w-full">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <Skeleton className="w-2 h-2 rounded-full bg-gray-300" />
                                        <Skeleton className="h-3 w-20 bg-gray-200" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Form Skeleton */}
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
                                    <Skeleton key={i} className="w-12 h-12 rounded-md bg-gray-200" />
                                ))}
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-64 bg-gray-200" />
                            <Skeleton className="h-[100px] w-full rounded-md bg-gray-200" />
                        </div>
                        <Skeleton className="h-12 w-full rounded-full bg-gray-200" />
                    </CardContent>
                </Card>
            </div>

            {/* Mood History Skeleton List */}
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <Card key={i} className="p-4 shadow-none border border-gray-200">
                        <Skeleton className="h-5 w-40 bg-gray-200 mb-2" />
                        <Skeleton className="h-4 w-24 bg-gray-200 mb-2" />
                        <Skeleton className="h-12 w-full bg-gray-200" />
                    </Card>
                ))}
            </div>
        </div>
    );
}
