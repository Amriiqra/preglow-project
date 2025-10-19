import { Skeleton } from "@/components/ui/skeleton";

export const FAQItemSkeleton = () => (
    <div className="border-b py-4">
        <div className="flex justify-between items-center py-2">
            <Skeleton className="h-6 w-3/4 rounded-md" />
            <Skeleton className="h-5 w-5 rounded-full" />
        </div>
    </div>
);