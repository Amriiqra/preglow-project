"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import * as API from "@/core/services/api";
import useSWR from 'swr';
import { toast } from 'sonner';
import { ArticleCardSkeleton } from '@/components/shared/skeleton/SkeletonBlog';

export default function Blog() {

    const { data, isLoading } = useSWR(
        'landingArticles',
        async () => {
            const response = await API.Landing.getArticles();
            return response;
        },
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
            onError: (error) => {
                toast.error(`Failed to load data!\n${error.message}`);
            },
        }
    );

    const renderContent = () => {
        if (isLoading) {
            return Array.from({ length: 3 }).map((_, index) => (
                <ArticleCardSkeleton key={index} />
            ));
        }

        if (!data || data.length === 0) {
            return <p className="text-gray-600 col-span-3">No articles found.</p>;
        }

        return data.map((item, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden p-0 gap-0">
                <Image
                    src={item.photo}
                    alt='image blog'
                    width={600}
                    height={400}
                    className="w-full h-72 object-cover"
                />
                <CardContent className="p-4">
                    <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                        {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                        {item.description}
                    </p>
                    <Link href={`/blog/${item._id}`}>
                        <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg w-full">
                            Learn More
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        ));
    };

    return (
        <section id="blog" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 max-w-7xl">
                <h2 className="text-2xl lg:text-4xl font-bold text-left text-secondary">
                    Read Our Latest Articles
                </h2>
                <div className='w-1/6'>
                    <Separator className="border-2 border-secondary mb-16 mt-3" />
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {renderContent()}
                </div>
            </div>
        </section>
    );
}