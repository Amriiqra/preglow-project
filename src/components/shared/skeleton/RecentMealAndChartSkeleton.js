"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MealItemSkeleton = () => (
    <div className="text-center flex flex-col items-center">
        <Skeleton className="w-8 h-8 rounded-full mb-1" />
        <Skeleton className="w-1/2 h-4 mb-1" />
        <Skeleton className="w-3/4 h-3 mb-1" />
        <Skeleton className="w-1/3 h-3" />
    </div>
);

const FeaturedRecentMealSkeleton = () => (
    <div className="mt-4 h-full flex flex-col pb-28 lg:pb-20">
        <Skeleton className="w-1/2 h-6 mb-4" />
        <div className="grid grid-cols-2 gap-4 flex-grow">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="text-center p-4 rounded-md border flex flex-col items-center justify-center border-gray-200">
                    <Skeleton className="w-3/4 h-4 mb-2" />
                    <Skeleton className="w-1/2 h-6 mb-1" />
                    <Skeleton className="w-1/4 h-3" />
                </div>
            ))}
        </div>
    </div>
);


export const RecentMealAndChartSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 items-stretch">
        <div className="pb-10">
            <Skeleton className="w-1/3 h-6 mb-2" />
            <Skeleton className="w-2/3 h-4 mb-4" />
            <Skeleton className="w-40 h-10 mb-4 rounded-full" />
            <FeaturedRecentMealSkeleton />
        </div>

        <div className="h-full space-y-4">
            <Skeleton className="w-3/4 h-6 mb-4" />

            <Card className="shadow-none border-2 border-gray-100 p-6 rounded-2xl relative overflow-hidden">
                <Skeleton className="w-1/2 h-4 mb-4" />
                <div className="grid grid-cols-4 gap-4">
                    {[...Array(4)].map((_, index) => <MealItemSkeleton key={index} />)}
                </div>
            </Card>

            <Card className="p-4 rounded-2xl shadow-lg border-none">
                <Skeleton className="h-[250px] w-full" />
            </Card>
        </div>
    </div>
);