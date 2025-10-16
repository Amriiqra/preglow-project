"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const testimonialsData = [
    {
        quote: "This app has been a lifesaver. The mood tracker helped me understand my emotional patterns, and the community forum made me feel so much less isolated. It's like having a supportive friend in my pocket.",
        name: "Sarah,",
        title: "28 weeks pregnant",
        avatarSrc: "https://i.pravatar.cc/150?img=1",
        rating: 5,
    },
    {
        quote: "I love the weekly updates on my baby’s growth! The articles are so informative and easy to understand. I feel much more prepared and confident about my pregnancy journey.",
        name: "Jessica,",
        title: "mother to a newborn",
        avatarSrc: "https://i.pravatar.cc/150?img=2",
        rating: 4,
    },
    {
        quote: "Between the mood tracker and the community support, I finally feel like I have a safe space for my silly questions and my tough days. The guided meditations are also a wonderful way to wind down.",
        name: "Maria,",
        title: "first time mom",
        avatarSrc: "https://i.pravatar.cc/150?img=3",
        rating: 5,
    },
];

const StarRating = ({ rating }) => (
    <div className="flex space-x-0.5">
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={i < rating ? "h-4 w-4 fill-yellow-500 text-yellow-500" : "h-4 w-4 text-gray-300"}
            />
        ))}
    </div>
);

export default function Testimonial() {
    const [api, setApi] = useState(null);
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])


    return (
        <section className="relative w-full h-[450px] overflow-hidden" id='testimonial'>

            <div className="hidden lg:block absolute inset-y-0 w-[450px] py-4 overflow-hidden z-0">
                <img
                    src="/assets/images/image_testimoni.png"
                    alt="Latar Belakang Testimonial"
                    className="h-full w-full object-cover rounded-r-4xl"
                />
            </div>

            <div className="relative max-w-7xl mx-auto h-full flex items-center px-4 mt-5">

                <Carousel
                    opts={{ 
                        align: "start",
                    }}
                    setApi={setApi}
                    className="w-full lg:w-[calc(100%-100px)] lg:translate-x-20"
                >
                    <div className="flex justify-end space-x-2 absolute top-[-2.5rem] right-0 z-20">
                        <CarouselPrevious
                            className="static relative top-0 left-0 transform-none !translate-y-0 text-white bg-pink-700 hover:bg-pink-800 hover:text-white rounded-full border-none size-9 shadow-md"
                        />
                        <CarouselNext
                            className="static relative top-0 right-0 transform-none !translate-y-0 text-white bg-pink-700 hover:bg-pink-800 hover:text-white rounded-full border-none size-9 shadow-md"
                        />
                    </div>

                    <CarouselContent className="h-full">
                        {testimonialsData.map((testimonial, index) => (
                            <CarouselItem key={index} className="basis-full md:basis-1/2">

                                <div className="h-full flex items-center p-2">
                                    <Card className="w-full relative z-10 p-0 rounded-xl border h-full">
                                        <CardContent className="p-6">
                                            <div className='relative pt-8 h-[180px]'>
                                                <div className='absolute -top-6 left-0 text-6xl text-pink-100 font-serif'>“</div>
                                                <p className="text-lg text-gray-800 font-medium italic mb-6">
                                                    "{testimonial.quote}"
                                                </p>
                                            </div>

                                            <div className="flex items-start space-x-4 pt-4 border-t border-gray-100">
                                                <Avatar className="size-12 mt-1">
                                                    <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} />
                                                    <AvatarFallback className="bg-pink-200 text-pink-700 font-bold text-lg">
                                                        {testimonial.name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-bold text-pink-700">{testimonial.name}</p>
                                                    <p className="text-sm text-gray-500 -mt-1">{testimonial.title}</p>
                                                    <StarRating rating={testimonial.rating} />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <div className="flex justify-center mt-8 space-x-2">
                        {Array.from({ length: count }).map((_, index) => (
                            <button
                                key={index}
                                className={cn(
                                    "h-2 w-7 rounded-full transition-colors duration-300",
                                    current === index + 1 ? "bg-pink-700 w-14" : "bg-pink-300"
                                )}
                                onClick={() => api?.scrollTo(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                </Carousel>
            </div>
        </section>
    )
}