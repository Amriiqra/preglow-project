"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const SaraBubble = ({ text }) => (
    <div className="flex justify-start mb-4">
        <Card className="max-w-xs sm:max-w-lg p-3 rounded-xl rounded-tl-none bg-[#FBFBFB87] shadow-md text-sm text-gray-700">
            {text}
        </Card>
    </div>
);

const UserBubble = ({ text }) => (
    <div className="flex justify-end mb-4">
        <Card className="max-w-xs sm:max-w-lg p-3 rounded-xl rounded-tr-none bg-[#FBFBFBBD] shadow-md text-sm text-gray-800">
            {text}
        </Card>
    </div>
);

export default function SaraAIView() {
    const userName = "Amri";

    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState("");

    const isSessionActive = messages.length > 0;

    const messagesEndRef = React.useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(scrollToBottom, [messages]);

    const handleSendMessage = () => {
        if (input.trim() === "") return;

        const userMessage = { sender: 'user', text: input.trim() };

        const saraReplyText = input.toLowerCase().includes("mood")
            ? "Saya dapat melacak emosi harian Anda dan menganalisis tren mood mingguan Anda. Apakah Anda ingin mencoba check-in mood sekarang?"
            : `Terima kasih, ${userName}. Itu pertanyaan yang bagus! Sebagai asisten AI, saya dapat membantu dengan pertanyaan umum tentang kehamilan, nutrisi, atau relaksasi.`;

        const saraReply = { sender: 'ai', text: saraReplyText };

        setMessages(prev => [...prev, userMessage]);
        setInput("");

        setTimeout(() => {
            setMessages(prev => [...prev, saraReply]);
        }, 800);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const triggerShortcut = (text) => {
        setInput(text);
        handleSendMessage();
    };


    const renderChatContent = () => {
        if (isSessionActive) {
            return (
                <div className="w-full max-w-4xl mx-auto space-y-4 pt-4">
                    <h1 className="text-4xl font-bold text-center text-primary mb-8">SARA AI</h1>

                    <ScrollArea className="h-[calc(100vh-250px)] pr-3">
                        {messages.map((msg, index) => (
                            msg.sender === 'user'
                                ? <UserBubble key={index} text={msg.text} />
                                : <SaraBubble key={index} text={msg.text} />
                        ))}
                        <div ref={messagesEndRef} />
                    </ScrollArea>
                </div>
            );
        } else {
            return (
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
                        <Button
                            variant="outline"
                            onClick={() => triggerShortcut("Tolong jelaskan cara kerja mood tracker.")}
                            className="bg-white/90 text-primary border-[#FCD0CB] hover:text-secondary text-base py-6 px-6 shadow-md"
                        >
                            Learn Something New
                        </Button>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="flex flex-col min-h-screen p-8"
            style={{
                backgroundImage: 'url("/assets/images/background_ai.png")',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
        >
            {renderChatContent()}

            <div className="relative w-full max-w-4xl mx-auto mt-auto mb-8 shadow-lg rounded-xl bg-white/95">
                <Textarea
                    placeholder={isSessionActive ? "Ketik pesan di sini..." : "Tanya Sara AI..."}
                    className="min-h-[60px] max-h-[150px] resize-none pr-16 p-4 text-lg border-none focus-visible:ring-0 bg-transparent"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={input.trim() === ""}
                    className="absolute bottom-3 right-3 w-10 h-10 bg-[#B55B77] hover:bg-[#A3516B] rounded-full shadow-md"
                >
                    <Send className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}