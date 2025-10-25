import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

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

export const MoodHistoryItem = ({ item, onClick, deleteDialog, setDeleteDialog, handleConfirmDelete }) => {
    const truncatedText = item.daily_feelings.length > 200
        ? item.daily_feelings.slice(0, 200) + "..."
        : item.daily_feelings;

    const date = new Date(item.createdAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return (
        <Card className="p-4 shadow-none border border-primary h-full gap-2 mb-2 cursor-pointer flex items-center flex-row justify-between">
            <div
                onClick={() => onClick(item)}
                className="flex-1 space-y-2"
            >
                <p className="text-2xl font-bold text-gray-800">{date}</p>
                <p className="text-sm font-semibold text-primary flex items-center gap-1">
                    <span className="text-lg">{getMoodEmoji(item.category)}</span> {item.category}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                    {truncatedText}
                </p>
            </div>

            <Dialog
                open={deleteDialog.open && deleteDialog.id === item._id}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteDialog({ open: false, id: null });
                    }
                }}
            >
                <DialogTrigger asChild>
                    <div
                        className="bg-red-200 p-2 rounded-full hover:bg-red-300 transition-colors cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setDeleteDialog({ open: true, id: item._id });
                        }}
                    >
                        <Trash2 className="text-red-500" size={18} />
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete Mood and Journal</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this mood and journal entry? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            variant="destructive"
                            onClick={handleConfirmDelete}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
};
