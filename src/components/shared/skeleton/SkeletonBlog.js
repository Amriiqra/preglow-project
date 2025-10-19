import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ArticleCardSkeleton = () => (
    <Card className="border-0 shadow-lg overflow-hidden p-0 gap-0">
        <Skeleton className="w-full h-72 rounded-t-lg" />
        <CardContent className="p-4">
            <Skeleton className="h-6 w-3/4 mb-3" />

            <div className="space-y-2 mb-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-10/12" />
            </div>

            <Skeleton className="h-10 w-full rounded-lg" />
        </CardContent>
    </Card>
);