// FAQ.jsx

"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import * as API from "@/core/services/api";
import { toast } from 'sonner';
import useSWR from 'swr';
import { Skeleton } from '@/components/ui/skeleton';

const FAQItemSkeleton = ({ index }) => (
    <div className="border-b py-4">
        <div className="flex justify-between items-center py-2">
            <Skeleton className="h-6 w-3/4 rounded-md" />
            <Skeleton className="h-5 w-5 rounded-full" />
        </div>
    </div>
);
// ----------------------------------

export default function FAQ() {

    const { data, isLoading } = useSWR(
        'landingFAQ',
        async () => {
            const response = await API.Landing.getFAQ();
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

    const skeletonCount = 5;

    const renderContent = () => {
        if (isLoading) {
            return Array.from({ length: skeletonCount }).map((_, index) => (
                <FAQItemSkeleton key={index} index={index} />
            ));
        }

        if (!data || data.length === 0) {
            return <p className="text-gray-600 text-center mt-8">No frequently asked questions available right now.</p>;
        }

        // Tampilkan data FAQ
        return (
            <Accordion
                type="single"
                collapsible
                className="w-full"
            >
                {data.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="font-bold text-base md:text-xl text-left">
                            {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p className="text-base text-gray-500">
                                {item.answer}
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        );
    };

    return (
        <section id="faq" className="max-w-7xl mx-auto py-20">
            <div className="flex flex-col items-center justify-center my-10">
                <h1 className="text-secondary font-semibold text-2xl lg:text-4xl">Frequently Asked Questions</h1>
                <p className="text-gray-500 font-medium text-center">These are the most commonly asked questions about Preglow</p>
            </div>
            <div className="lg:w-1/2 w-full px-8 lg:px-0 mx-auto">
                {renderContent()}
            </div>
        </section>
    )
}