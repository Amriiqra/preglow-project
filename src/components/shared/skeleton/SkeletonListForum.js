import { Skeleton } from "@/components/ui/skeleton";

export const ForumThreadSkeleton = () => {
    return (
        <div className="py-4 border border-gray-100 p-5 rounded-lg">
            <Skeleton className="h-6 w-3/4 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-24" />
            </div>
        </div>
    );
};