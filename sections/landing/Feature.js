import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import React from 'react'

export default function Feature() {
    return (
        <section id="features" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 max-w-7xl ">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
                    Everything You Need for a Healthy, Happy Pregnancy
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-none">
                        <CardContent className="p-10">
                            <div className="w-48 flex flex-col items-start justify-center mb-2">
                                <span className='text-5xl text-primary font-medium'>1.</span>
                                <Separator className="border-2 border-primary my-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">Daily Moods Feeling</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Follow your baby's amazing development week by week. Get personalized insights about your body and what to expect next.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-none">
                        <CardContent className="p-10">
                            <div className="w-48 flex flex-col items-start justify-center mb-2">
                                <span className='text-5xl text-primary font-medium'>2.</span>
                                <Separator className="border-2 border-primary my-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">Find Your Community</h3>
                            <p className="text-gray-600 leading-relaxed">
                                You're not alone. Join private discussion groups, share experiences, and find support from other expecting mothers in a safe and welcoming space.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-none">
                        <CardContent className="p-10">
                            <div className="w-48 flex flex-col items-start justify-center mb-2">
                                <span className='text-5xl text-primary font-medium'>3.</span>
                                <Separator className="border-2 border-primary my-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">Instant AI Assistant</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Have a quick question? Our AI-powered chatbot provides fast, helpful answers about nutrition, symptoms, and mental well-being, anytime you need it.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
