"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import * as API from "@/core/services/api";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArticleSkeleton } from "@/components/shared/skeleton/SkeletonDetailBlog";
import Footer from "./Footer";

const RelatedArticleCard = ({ title, image, id }) => (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="relative w-full h-40">
            <Image src={image} alt={title} fill className="object-cover" />
        </div>
        <CardContent className="p-4">
            <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                {title}
            </p>
            <Link href={`/blog/${id}`}>
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg mt-4 w-full">
                    Learn More
                </Button>
            </Link>
        </CardContent>
    </Card>
);

export default function DetailBlog() {
    const params = useParams();
    const articleId = params.id;

    const { data: articleData, isLoading } = useSWR(
        articleId ? ["article", articleId] : null,
        async () => {
            if (!articleId) return null;
            return API.Landing.getArticlesById(articleId);
        },
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
        }
    );

    const { data: otherArticleData, isLoading: isLoadingOther } = useSWR(
        articleId ? ["other-article", articleId] : null,
        async () => {
            if (!articleId) return null;
            return API.Landing.getOtherArticlesById(articleId);
        },
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
        }
    );

    const renderArticleContent = (rawContent) => {
        if (!rawContent) return null;
        const blocks = rawContent.split("\n\n");

        return blocks.map((block, index) => {
            const trimmedBlock = block.trim().replace(/(\n)/g, " ");

            if (/^\d+\.\s/.test(trimmedBlock)) {
                return (
                    <h2 key={index} className="pt-4 font-semibold text-gray-800">
                        {trimmedBlock}
                    </h2>
                );
            }

            if (trimmedBlock.startsWith("Focus Area:")) {
                return (
                    <h2 key={index} className="pt-4 font-semibold text-gray-800">
                        {trimmedBlock}
                    </h2>
                );
            }

            return (
                <p
                    key={index}
                    className="text-lg leading-relaxed text-gray-700 text-justify"
                >
                    {trimmedBlock}
                </p>
            );
        });
    };

    if (isLoading || isLoadingOther) {
        return <ArticleSkeleton />;
    }

    return (
        <>
            <div className="bg-white min-h-screen" id="blog">
                <div className="h-[80px]" />

                <div className="container mx-auto px-6 max-w-4xl py-12">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center">
                        {articleData?.title}
                    </h1>

                    <Card className="shadow-lg border-none mb-12">
                        <CardContent className="p-0">
                            <div className="relative w-full h-80 sm:h-96">
                                <Image
                                    src={articleData?.photo}
                                    alt={articleData?.title || "Article image"}
                                    fill
                                    className="object-cover rounded-t-lg"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="text-lg leading-relaxed text-gray-700 space-y-6 text-justify">
                        {renderArticleContent(articleData?.content)}
                    </div>
                </div>

                <div className="container mx-auto px-6 max-w-7xl py-12">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Read Our Latest Articles
                            </h2>
                            <Separator className="border-2 border-secondary mt-3 mb-0" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherArticleData?.data?.map((article, index) => (
                            <RelatedArticleCard
                                key={index}
                                title={article?.title}
                                image={article?.photo}
                                id={article?._id}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
