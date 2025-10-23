"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => (
    <Card className="p-3 shadow-sm h-full flex flex-col justify-between relative border-2 border-gray-100" style={{ minHeight: '120px' }}>
        <Skeleton className="w-1/4 h-3 self-end" />
        <div>
            <Skeleton className="w-1/3 h-3 mb-1" />
            <Skeleton className="w-3/4 h-4" />
        </div>
    </Card>
);

export const ProductListSkeleton = ({ count = 5 }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-10">
        {[...Array(count)].map((_, index) => (
            <ProductCardSkeleton key={index} />
        ))}
    </div>
);