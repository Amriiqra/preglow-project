"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { ArrowRight } from 'lucide-react';

// --- Data Dummy Artikel Terkait (Untuk bagian 'Read Our Latest Articles') ---
const relatedArticles = [
    { title: "Essential Nutrients: What to Eat, Do, and Expect", image: "/assets/images/image_blog.jpg" },
    { title: "Managing Morning Sickness Comfortably", image: "/assets/images/image_blog.jpg" },
    { title: "Your Body is Ready: Getting Help from Experts", image: "/assets/images/image_blog.jpg" },
];

const RelatedArticleCard = ({ title, image }) => (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <Link href="#">
            <div className="relative w-full h-40">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>
            <CardContent className="p-4">
                <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {title}
                </p>
                <button className="text-xs text-[#B55B77] hover:underline mt-2">
                    Lanjutkan Membaca
                </button>
            </CardContent>
        </Link>
    </Card>
);

// --- KOMPONEN UTAMA ---
export default function DetailBlog() {
    return (
        <div className="bg-white min-h-screen">
            {/* Header placeholder (Biasanya menggunakan Navbar fixed) */}
            <div className="h-[80px]"></div>

            {/* Konten Utama Blog */}
            <div className="container mx-auto px-6 max-w-4xl py-12">

                {/* Judul Utama */}
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center">
                    The Ultimate Guide to Your First Trimester: What to Eat, Do, and Expect
                </h1>

                {/* Gambar Utama dan Info */}
                <Card className="shadow-lg border-none mb-12">
                    <CardContent className="p-0">
                        <div className="relative w-full h-80 sm:h-96">
                            {/* Ganti '/assets/images/blog_main.jpg' dengan gambar yang sesuai */}
                            <Image
                                src="/assets/images/image_blog.jpg"
                                alt="Panduan Trimester Pertama"
                                fill
                                className="object-cover rounded-t-lg"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Teks Deskripsi Panjang */}
                <div className="text-lg leading-relaxed text-gray-700 space-y-6 text-justify">
                    <p>
                        The first trimester of pregnancy, spanning the initial 12 to 13 weeks, is a period of incredible transformation and rapid development for both the mother and the baby. This time of profound and invisible change often brings with it a host of new physical and emotional experiences. This crucial phase lays the groundwork for your baby’s journey.
                    </p>
                    <p>
                        Getting informed about what to expect, how to nourish your body, and what lifestyle adjustments to make is key. Essential for preventing anemia and supporting the baby's blood development. This guide is designed to be your calm and steady companion, helping you navigate these foundational first few months with confidence and peace of mind.
                    </p>
                    <h2 className="text-2xl font-bold text-gray-800 pt-4">Focus Area: Physical and Emotional Changes</h2>
                    <p>
                        What to Expect: Physical and Emotional Changes During the First Trimester. A period often filled with a mix of excitement, anticipation, and perhaps a little uncertainty. Common symptoms include fatigue, nausea, and morning sickness, which can ironically occur at any time of day, overwhelming many expectant parents. Think of them as a digital encyclopedia and community hub for everything related to pregnancy and early parenthood.
                    </p>
                    <h2 className="text-2xl font-bold text-gray-800 pt-4">Focus Area: First Trimester Nutrition</h2>
                    <p>
                        Proper nutrition during the first trimester lays the foundation for a healthy pregnancy. Focus on nutrients like folic acid, iron, calcium, vitamin and minerals. Folic acid is especially vital for preventing neural tube defects, while iron is important for maintaining sufficient blood cell levels. Vitamins and Vitamin D are vital for the baby's bone and tooth development, and calcium ensures adequate stores during block the way. Expectant parents should prioritize fruits, vegetables, lean protein, and whole grains. Foods rich in vitamin D, essential fatty acids, fish, organic/naturally produced foods, high nutrient fats, and 15 vital nutrients play a key role in ensuring your baby starts with the best possible start.
                    </p>
                    <p>
                        Embracing the Journey: Combined with gentle exercise, meditation provides your baby with the best possible start. Embracing this journey with confidence allows you to lay a strong foundation for the exciting months to come.
                    </p>
                </div>
            </div>

            {/* Bagian Artikel Terkait */}
            <div className="container mx-auto px-6 max-w-7xl py-12">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            Read Our Latest Articles
                        </h2>
                        <Separator className="border-2 border-secondary mt-3 mb-0" />
                    </div>
                    <Button variant="link" className="text-[#B55B77] hover:text-[#A3516B] text-sm p-0 h-auto">
                        See more
                        <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedArticles.map((article, index) => (
                        <RelatedArticleCard
                            key={index}
                            title={article.title}
                            image={article.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}