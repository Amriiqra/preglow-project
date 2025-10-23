"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const StatCardSkeleton = () => (
    <Card className="text-center p-4 rounded-md shadow-sm border-2 border-gray-100">
        <Skeleton className="w-1/3 h-3 mx-auto mb-2" />
        <Skeleton className="w-1/2 h-8 mx-auto mt-1 mb-1" />
        <Skeleton className="w-1/4 h-3 mx-auto" />
    </Card>
);

export const NutritionStatsSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <StatCardSkeleton />
                <StatCardSkeleton />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <StatCardSkeleton />
                <StatCardSkeleton />
            </div>
        </div>

        <div className="lg:col-span-3 p-5 rounded-2xl bg-white border border-gray-100">
            <Skeleton className="w-2/5 h-5 mb-4" />
            <Skeleton className="h-[200px] w-full" />
        </div>
    </div>
);