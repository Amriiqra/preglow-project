import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Blog() {
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
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <Card key={item} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden p-0 gap-0">
                            <Image
                                src="/assets/images/image_blog.jpg"
                                alt='image blog'
                                width={600}
                                height={400}
                                className="w-full h-72 object-cover"
                            />
                            <CardContent className="p-4">
                                <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                                    Essential Nutrition Tips for Your First Trimester Journey
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    Discover the key nutrients and foods that will support you and your baby during the crucial first trimester.
                                </p>
                                <Link href="/blog/1">
                                    <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg w-full">
                                        Learn More
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
