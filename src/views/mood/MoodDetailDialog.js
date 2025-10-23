// src/components/mood/MoodDetailDialog.jsx

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import * as React from "react";

const getMoodEmoji = (category) => {
    switch (category) {
        case "Happy": return "😊";
        case "Sad": return "😞";
        case "Anxious": return "😟";
        case "Angry": return "😡";
        case "Bored": return "😒";
        case "Irritated": return "😤";
        case "Moody": return "😔";
        case "Sensitive": return "🥺";
        case "Tired": return "😴";
        case "Loved": return "😍";
        default: return "🙂";
    }
};

export function MoodDetailDialog({ isOpen, onOpenChange, moodDetails }) {
    if (!moodDetails) {
        return null;
    }

    const formattedDate = new Date(moodDetails.createdAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-secondary flex items-center gap-2">
                        <span className="text-3xl">{getMoodEmoji(moodDetails.category)}</span>
                        {moodDetails.category}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500 text-start">
                        {formattedDate}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <h4 className="font-semibold text-gray-700">Daily Feelings Journal:</h4>
                    <div className="p-3 border rounded-md bg-gray-50 max-h-60 overflow-y-auto whitespace-pre-wrap">
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {moodDetails.daily_feelings || "Tidak ada detail jurnal yang dicatat."}
                        </p>
                    </div>
                </div>
                <Button onClick={() => onOpenChange(false)} className="w-full mt-4">
                    Close
                </Button>
            </DialogContent>
        </Dialog>
    );
}