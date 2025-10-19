import Image from 'next/image'
import React from 'react'

export default function Footer() {
    return (
        <footer id='footer' className="bg-white text-black py-16">
            <div className="container px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12">
                    <div className='col-span-2'>
                        <Image
                            src="/assets/logo.svg"
                            alt="Preplow Logo"
                            width={150}
                            height={50}
                            className="mb-4"
                        />
                        <p className="text-black mb-6">
                            Jl. Raya Kalirungkut, Surabaya <br />
                            Jawa Timur 60293 <br />
                            Telp: +62 8124-5678
                        </p>
                        <div className="flex gap-4">
                            <div className="flex items-center justify-center cursor-pointer">
                                <Image
                                    src="/assets/icons/tiktok.svg"
                                    alt="TikTok"
                                    width={24}
                                    height={24}
                                />
                            </div>
                            <div className="flex items-center justify-center cursor-pointer">
                                <Image
                                    src="/assets/icons/instagram.svg"
                                    alt="Instagram"
                                    width={28}
                                    height={28}
                                />
                            </div>
                            <div className="flex items-center justify-center cursor-pointer">
                                <Image
                                    src="/assets/icons/facebook.svg"
                                    alt="Facebook"
                                    width={28}
                                    height={28}
                                />
                            </div>
                            <div className="flex items-center justify-center cursor-pointer">
                                <Image
                                    src="/assets/icons/youtube.svg"
                                    alt="Youtube"
                                    width={28}
                                    height={28}
                                />
                            </div>
                            <div className="flex items-center justify-center cursor-pointer">
                                <Image
                                    src="/assets/icons/linkedin.svg"
                                    alt="LinkedIn"
                                    width={28}
                                    height={28}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-lg">NAVIGATION</h4>
                        <ul className="space-y-3 text-black">
                            <li><a href="#features" className="hover:text-pink-400 transition">Features</a></li>
                            <li><a href="#blog" className="hover:text-pink-400 transition">Article & Education</a></li>
                            <li><a href="#" className="hover:text-pink-400 transition">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-lg">LEGAL</h4>
                        <ul className="space-y-3 text-black">
                            <li><a href="#" className="hover:text-pink-400 transition">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-pink-400 transition">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-black">
                    <p>&copy; 2025 Preglow. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
