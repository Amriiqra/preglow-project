import { Button } from '@/components/ui/button'
import { ChevronRight, Heart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function Header() {
  return (
    <section
      style={{
        backgroundImage: "url('/assets/images/background_hero.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white pb-16 ml-28">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Companion for Every Step of Motherhood
            </h1>
            <p className="text-lg mb-8 text-pink-50">
              Navigate pregnancy with confidence. Track your baby's growth, connect with a supportive community, and find trusted answers, all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-secondary px-8 py-6 text-lg rounded-full">
                Start For Free
              </Button>
            </div>
          </div>
          <div className="relative pt-16">
            <Image
              src="/assets/images/image-header.png"
              alt='image-header'
              width={700}
              height={700}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
