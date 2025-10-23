"use client";

import * as React from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as API from "@/core/services/api";


const SaraBubble = ({ text }) => (
    <div className="flex justify-start mb-4">
        <Card className="max-w-xs sm:max-w-lg p-3 rounded-xl rounded-tl-none bg-[#FBFBFB87] shadow-md text-sm text-gray-700 whitespace-pre-line">
            {text}
        </Card>
    </div>
);

const UserBubble = ({ text }) => (
    <div className="flex justify-end mb-4">
        <Card className="max-w-xs sm:max-w-lg p-3 rounded-xl rounded-tr-none bg-[#FBFBFBBD] shadow-md text-sm text-gray-800 whitespace-pre-line">
            {text}
        </Card>
    </div>
);

const TypingBubble = () => (
    <div className="flex justify-start mb-4">
        <Card className="max-w-xs sm:max-w-lg p-3 rounded-xl rounded-tl-none bg-[#FBFBFB87] shadow-md text-sm text-gray-700 flex flex-row items-center gap-0">
            <Loader2 className="h-4 w-4 animate-spin inline mr-2 text-[#B55B77]" />
            Sara is typing...
        </Card>
    </div>
);


const formatHistory = (history) => {
    return history
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map(item => ({
            sender: item.role === 'bot' ? 'ai' : 'user',
            text: item.text,
        }));
};

const fetcher = async () => {
    const response = await API.SaraAI.getChatHistory();
    return response.data || response;
};


export default function SaraAIView() {
    const userName = localStorage.getItem('name');

    const [input, setInput] = React.useState("");
    const [localMessages, setLocalMessages] = React.useState([]);
    const [isTyping, setIsTyping] = React.useState(false);

    const { data: historyData, error, isLoading } = useSWR('/menu/chatbot/history', fetcher);

    const initialMessages = React.useMemo(() => {
        if (historyData) {
            return formatHistory(historyData);
        }
        return [];
    }, [historyData]);

    const messages = [...initialMessages, ...localMessages];
    const isSessionActive = messages.length > 0;

    const messagesEndRef = React.useRef(null);

    const scrollToBottom = React.useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    React.useEffect(scrollToBottom, [messages, isTyping, scrollToBottom]);

    const handleSendMessage = async () => {
        if (input.trim() === "") return;

        const userQuery = input.trim();
        const userMessage = { sender: 'user', text: userQuery };

        setLocalMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            const apiResponse = await API.SaraAI.createChat({
                message: userQuery
            });

            const saraReplyText = (apiResponse.reply && apiResponse.data?.reply) || apiResponse.reply;

            const saraReply = { sender: 'ai', text: saraReplyText || "Sorry, I didn't get that." };

            setLocalMessages(prev => [...prev, saraReply]);

        } catch (apiError) {
            console.error("Failed to send message to Sara AI:", apiError);
            const errorReply = { sender: 'ai', text: "Sorry, there was an error contacting the Sara AI server. Please try again. (Code: " + (apiError.status || "API Error") + ")" };
            setLocalMessages(prev => [...prev, errorReply]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const triggerShortcut = (text) => {
        setInput(text);
        setTimeout(handleSendMessage, 0);
    };


    const renderChatContent = () => {
        if (isLoading && messages.length === 0) {
            return (
                <div className="w-full max-w-4xl mx-auto pt-20 text-center text-primary">
                    <p className="text-xl">Loading chat history...</p>
                </div>
            );
        }

        if (error && messages.length === 0) {
            return (
                <div className="w-full max-w-4xl mx-auto pt-20 text-center text-red-600">
                    <p className="text-xl">Failed to load chat history.</p>
                </div>
            );
        }

        if (!isSessionActive && !isLoading) {
            return (
                <div className="w-full max-w-4xl mx-auto pt-20 space-y-12">
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl font-bold text-primary capitalize">
                            Hello, {userName}
                        </h1>
                        <p className="text-2xl text-primary">
                            Can I help you with anything?
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="outline" className="bg-white/90 text-primary border-[#FCD0CB] hover:text-secondary text-base py-6 px-6 shadow-md"
                            onClick={() => triggerShortcut("Mood check-in")}>
                            Mood Check-in
                        </Button>
                        <Button variant="outline" className="bg-white/90 text-primary border-[#FCD0CB] hover:text-secondary text-base py-6 px-6 shadow-md"
                            onClick={() => triggerShortcut("Tulis entri diari")}>
                            Write a Diary Entry
                        </Button>
                        <Button variant="outline" className="bg-white/90 text-primary border-[#FCD0CB] hover:text-secondary text-base py-6 px-6 shadow-md"
                            onClick={() => triggerShortcut("Atur pengingat")}>
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
        return (
            <div className="w-full max-w-4xl mx-auto space-y-4 pt-4">
                <h1 className="text-4xl font-bold text-center text-primary mb-8">SARA AI</h1>

                <ScrollArea className="h-[calc(100vh-250px)] pr-3">
                    {messages.map((msg, index) => (
                        <React.Fragment key={index}>
                            {msg.sender === 'user'
                                ? <UserBubble text={msg.text} />
                                : <SaraBubble text={msg.text} />
                            }
                        </React.Fragment>
                    ))}
                    {isTyping && <TypingBubble />}
                    <div ref={messagesEndRef} />
                </ScrollArea>
            </div>
        );
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
                    placeholder={isTyping ? "Sara is thinking..." : (isSessionActive ? "Type your message here..." : "Ask Sara AI...")}
                    className="min-h-[60px] max-h-[150px] resize-none pr-16 p-4 text-lg border-none focus-visible:ring-0 bg-transparent"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isTyping}
                />

                <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={input.trim() === "" || isTyping}
                    className="absolute bottom-3 right-3 w-10 h-10 bg-[#B55B77] hover:bg-[#A3516B] rounded-full shadow-md"
                >
                    {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </Button>
            </div>
        </div>
    );
}