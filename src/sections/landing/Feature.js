import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import React from 'react';

const featuresData = [
    {
        number: 1,
        title: "Daily Moods Feeling",
        description: "Follow your baby's amazing development week by week. Get personalized insights about your body and what to expect next."
    },
    {
        number: 2,
        title: "Find Your Community",
        description: "You're not alone. Dive into our community forum to share your unique pregnancy journey, exchange stories, and find support from other expecting mothers in a safe and welcoming space."
    },
    {
        number: 3,
        title: "Instant AI Assistant",
        description: "Have a quick question? Our AI-powered chatbot provides fast, helpful answers about nutrition, symptoms, and mental well-being, anytime you need it."
    },
    {
        number: 4,
        title: "Smart Nutrition Guide",
        description: "Eat well for two. Get guidance on essential nutrients, track your daily meals, and discover healthy recipes to support your and your baby's development."
    },
    {
        number: 5,
        title: "Guided Relaxation",
        description: "Find your calm. Explore guided meditations specially designed for expecting mothers to reduce stress and connect with your body and baby."
    },
];

const FeatureCard = ({ number, title, description, className = "" }) => (
    <Card className={`border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-none h-full ${className}`}>
        <CardContent className="p-6 sm:p-8 md:p-10">
            <div className="mb-4">
                <span className='text-4xl text-primary font-medium'>{number}.</span>
                <Separator className="w-12 border-2 border-primary my-4" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-800">{title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
                {description}
            </p>
        </CardContent>
    </Card>
);

export default function Feature() {
    return (
        <section id="features" className="py-12 sm:py-20 bg-gray-50">
            <div className="container mx-auto px-6 max-w-7xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-16 text-secondary">
                    Everything You Need for a Healthy, Happy Pregnancy
                </h2>

                <div className="grid md:grid-cols-3 gap-8 mb-0 sm:mb-8">
                    {featuresData.slice(0, 3).map(feature => (
                        <FeatureCard
                            key={feature.number}
                            number={feature.number}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>

                <div className="flex justify-center mt-8 sm:mt-0">
                    <div className="grid md:grid-cols-2 gap-8 w-full lg:max-w-4xl">
                        {featuresData.slice(3).map(feature => (
                            <FeatureCard
                                key={feature.number}
                                number={feature.number}
                                title={feature.title}
                                description={feature.description}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}