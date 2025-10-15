"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export default function SaraAIView() {
    const userName = "Amri";

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-8"
            style={{
                backgroundImage: 'url("/assets/images/background_ai.png")',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
        >
            <div className="w-full max-w-4xl mx-auto pt-20 space-y-12">

                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold text-primary">
                        Hello, {userName}
                    </h1>
                    <p className="text-2xl text-primary">
                        Can I help you with anything?
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="outline" className="bg-white/90 text-primary border-[#FCD0CB] hover:text-secondary text-base py-6 px-6 shadow-md">
                        Mood Check-in
                    </Button>
                    <Button variant="outline" className="bg-white/90 text-primary border-[#FCD0CB] hover:text-secondary text-base py-6 px-6 shadow-md">
                        Write a Diary Entry
                    </Button>
                    <Button variant="outline" className="bg-white/90 text-primary border-[#FCD0CB] hover:text-secondary text-base py-6 px-6 shadow-md">
                        Set a Reminder
                    </Button>
                    <Button variant="outline" className="bg-white/90 text-primary border-[#FCD0CB] hover:text-secondary text-base py-6 px-6 shadow-md">
                        Learn Something New
                    </Button>
                </div>

                <div className="relative w-full shadow-lg rounded-xl bg-white/95">
                    <Textarea
                        placeholder="How does the mood tracker work?"
                        className="min-h-[150px] resize-none p-6 text-lg border-none focus-visible:ring-0 bg-transparent"
                    />

                    <Button
                        size="icon"
                        className="absolute bottom-5 right-5 w-10 h-10 bg-[#B55B77] hover:bg-[#A3516B] rounded-full shadow-md"
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}