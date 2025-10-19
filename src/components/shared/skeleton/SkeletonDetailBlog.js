import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";


export const ArticleSkeleton = () => (
    <div className="bg-white min-h-screen animate-pulse">
        <div className="h-[80px]" />
        <div className="container mx-auto px-6 max-w-4xl py-12">
            <Skeleton className="h-10 w-2/3 mx-auto mb-8" />
            <Card className="shadow-lg border-none mb-12">
                <CardContent className="p-0">
                    <Skeleton className="w-full h-96 rounded-t-lg" />
                </CardContent>
            </Card>
            <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
            </div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl py-12">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Separator className="border-2 border-secondary mt-3 mb-0" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="border-0 shadow-lg overflow-hidden">
                        <Skeleton className="h-40 w-full" />
                        <CardContent className="p-4 space-y-3">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </div>
);