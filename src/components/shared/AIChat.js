"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RiSparkling2Fill } from 'react-icons/ri';
import { X, Send, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useSWR from "swr";
import * as API from "@/core/services/api";

const formatHistory = (history) => {
    return history
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map(item => ({
            sender: item.role === 'bot' ? 'ai' : 'user',
            text: item.text,
        }));
};

const fetcher = async (url) => {
    const response = await API.SaraAI.getChatHistory();
    return response.data || response;
};

const TypingBubble = () => (
    <div className="flex justify-start mb-2 items-end">
        <Avatar className="w-6 h-6 mr-1 flex-shrink-0">
            <AvatarImage src="/assets/photo_sara.svg" alt="Sara" />
            <AvatarFallback>SA</AvatarFallback>
        </Avatar>
        <div className="max-w-[70%] p-2 rounded-xl rounded-tl-sm bg-primary shadow-sm text-xs text-white flex items-center">
            <Loader2 className="h-3 w-3 animate-spin inline mr-1" />
            Sara is typing...
        </div>
    </div>
);


const SaraBubble = ({ text }) => (
    <div className="flex justify-start mb-2 items-end">
        <Avatar className="w-6 h-6 mr-1 flex-shrink-0">
            <AvatarImage src="/assets/photo_sara.svg" alt="Sara" />
            <AvatarFallback>SA</AvatarFallback>
        </Avatar>
        <div className="max-w-[70%] p-2 rounded-xl rounded-tl-sm bg-primary shadow-sm text-xs text-white whitespace-pre-line">
            {text}
        </div>
    </div>
);

const UserBubble = ({ text }) => (
    <div className="flex justify-end mb-2">
        <div className="max-w-[70%] p-2 rounded-xl rounded-tr-sm bg-white shadow-sm text-xs text-secondary whitespace-pre-line">
            {text}
        </div>
    </div>
);

export default function AIChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [localMessages, setLocalMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const {
        data: historyData,
        isLoading,
        error,
    } = useSWR(isOpen ? '/menu/chatbot/history' : null, fetcher);

    const initialMessages = useMemo(() => {
        if (historyData) {
            return formatHistory(historyData);
        }
        return isOpen || isLoading || error ? [] : [{ sender: 'ai', text: "Hello! How can I help you today?" }];
    }, [historyData, isLoading, error, isOpen]);

    const messages = [...initialMessages, ...localMessages];

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(scrollToBottom, [messages, isTyping]);

    const handleSendMessage = async () => {
        if (input.trim() === "" || isTyping) return;

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
            const errorReply = { sender: 'ai', text: "Sorry, there was an error communicating with Sara AI. Please try again." };
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

    const renderChatMessages = () => {
        if (isLoading && initialMessages.length === 0 && localMessages.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-primary">
                    <Loader2 className="h-6 w-6 animate-spin mb-2" />
                    <span className="text-sm font-medium">Loading chat history...</span>
                </div>
            );
        }

        if (error && initialMessages.length === 0 && localMessages.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-red-500">
                    <X className="h-6 w-6 mb-2" />
                    <span className="text-sm font-medium text-center">Failed to load chat history. Try reopening.</span>
                </div>
            );
        }

        return (
            <>
                {messages.map((msg, index) => (
                    msg.sender === 'ai'
                        ? <SaraBubble key={index} text={msg.text} />
                        : <UserBubble key={index} text={msg.text} />
                ))}
                {isTyping && <TypingBubble />}
                <div ref={messagesEndRef} />
            </>
        );
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            {isOpen && (
                <Card className="absolute shadow-2xl w-80 h-[450px] flex flex-col rounded-xl overflow-hidden right-0 bottom-16 sm:bottom-20">
                    <div className="flex items-center justify-between p-3 bg-primary text-white flex-shrink-0">
                        <div className="flex items-center space-x-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="/assets/photo_sara.svg" alt="Sara" />
                                <AvatarFallback>SA</AvatarFallback>
                            </Avatar>
                            <span className="font-semibold text-sm">Sara</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:bg-primary h-6 w-6"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
                        {renderChatMessages()}
                    </div>

                    <div className="p-2 border-t bg-white flex-shrink-0">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder={isTyping ? "Sara is thinking..." : "Type a message..."}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full p-2 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                                disabled={isTyping}
                            />
                            <Button
                                onClick={handleSendMessage}
                                size="icon"
                                className="absolute right-0 h-8 w-8 bg-primary hover:bg-primary/90 rounded-lg p-0 mr-1"
                                disabled={input.trim() === "" || isTyping}
                            >
                                {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

            <Button
                onClick={() => setIsOpen(prev => !prev)}
                size="icon"
                className={`w-14 h-14 rounded-full shadow-xl transition-all duration-300 ${isOpen ? 'bg-primary rotate-90' : 'bg-primary hover:bg-primary/90'}`}
            >
                {isOpen ? <X className="h-6 w-6 text-white" /> : <RiSparkling2Fill className="h-6 w-6 text-white" />}
            </Button>
        </div>
    );
}