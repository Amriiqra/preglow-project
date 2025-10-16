"use client";

import { useState } from "react";
import ReplyForm from "./ReplyForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CommentThread({ comment }) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showHiddenReplies, setShowHiddenReplies] = useState(false);

    const hasReplies = comment.replies && comment.replies.length > 0;
    const replyButtonText = showHiddenReplies ? "Hide Replies" : (comment.hiddenReplies > 0 ? `${comment.hiddenReplies} Replies` : `${comment.replies.length} Replies`);

    return (
        <div className="border-b border-gray-100 py-4 last:border-b-0">
            <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback>AN</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                        {comment.user}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed mt-1">
                        {comment.text}
                    </p>

                    <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">{comment.time}</span>

                        <button
                            onClick={() => setShowReplyForm(true)}
                            className="text-xs text-primary hover:text-[#A3516B] font-medium"
                        >
                            Reply
                        </button>

                        {hasReplies && (
                            <button
                                onClick={() => setShowHiddenReplies(prev => !prev)}
                                className="text-xs text-primary hover:underline font-medium"
                            >
                                {replyButtonText}
                            </button>
                        )}

                    </div>
                </div>
            </div>

            {showHiddenReplies && comment.replies.map((reply, index) => (
                <div key={index} className="pl-10 mt-2">
                    <CommentThread comment={reply} />
                </div>
            ))}

            {showReplyForm && <ReplyForm onCancel={() => setShowReplyForm(false)} />}
        </div>
    );
};