import { Button } from '@/components/ui/button'
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
      id='header'
    >
      <div className="container mx-auto max-w-7xl px-6 pt-30 lg:pt-30">
        <div className="grid md:grid-cols-2 lg:gap-12 gap-5 items-center">
          <div className="text-white pb-8 md:pb-16 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-tight">
              Your Companion for Every Step of Motherhood
            </h1>
            <p className="text-md sm:text-lg mb-8 text-pink-50 max-w-lg mx-auto md:mx-0">
              Navigate pregnancy with confidence. Track your baby's growth, connect with a supportive community, and find trusted answers, all in one place.
            </p>

            <div className="flex justify-center md:justify-start">
              <Button className="bg-secondary hover:bg-secondary/90 px-8 py-6 text-lg rounded-full lg:w-1/3 w-full max-w-xs sm:max-w-none">
                Start For Free
              </Button>
            </div>
          </div>
          <div className="relative lg:pt-16">
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
