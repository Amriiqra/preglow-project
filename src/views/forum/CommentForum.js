"use client";

import { useState } from "react";
import ReplyForm from "./ReplyForm";
import { IoPersonCircle } from "react-icons/io5";
import moment from "moment";
import useSWR from "swr";
import * as API from "@/core/services/api";

function ReplyOfReply({ reply, onReplySuccess }) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showNestedReplies, setShowNestedReplies] = useState(false);

    const { data: nestedRepliesData, isLoading: isLoadingNested, mutate: mutateNested } = useSWR(
        reply?._id ? ["replyOfReply", reply._id] : null,
        async () => {
            if (!reply?._id) return null;
            return API.Forum.allReplyOfReply(reply._id);
        },
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
        }
    );

    const nestedRepliesCount = nestedRepliesData?.length || 0;
    const hasNestedReplies = nestedRepliesCount > 0;

    return (
        <div className="border-l-2 border-gray-200 pl-3 mt-2">
            <div className="flex items-start gap-2">
                <IoPersonCircle size={24} className="flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800">
                        Anonymous
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                        {reply?.content}
                    </p>

                    <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500">
                            {moment.utc(reply?.createdAt).local().fromNow()}
                        </span>

                        <button
                            onClick={() => setShowReplyForm(!showReplyForm)}
                            className="text-xs text-primary hover:text-[#A3516B] font-medium"
                        >
                            {showReplyForm ? "Cancel" : "Reply"}
                        </button>

                        {hasNestedReplies && (
                            <button
                                onClick={() => setShowNestedReplies(!showNestedReplies)}
                                className="text-xs text-primary hover:underline font-medium"
                            >
                                {showNestedReplies ? "Hide" : `${nestedRepliesCount} ${nestedRepliesCount === 1 ? 'Reply' : 'Replies'}`}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {showReplyForm && (
                <div className="pl-7 mt-2">
                    <ReplyForm
                        commentId={reply?._id}
                        isReplyOfReply={true}
                        onCancel={() => setShowReplyForm(false)}
                        onSuccess={() => {
                            setShowReplyForm(false);
                            mutateNested();
                            setShowNestedReplies(true);
                            if (onReplySuccess) onReplySuccess();
                        }}
                    />
                </div>
            )}

            {showNestedReplies && (
                <div className="pl-7 mt-2 space-y-2">
                    {isLoadingNested ? (
                        <p className="text-xs text-gray-500">Loading replies...</p>
                    ) : nestedRepliesData && nestedRepliesData.length > 0 ? (
                        nestedRepliesData.map((nestedReply) => (
                            <div key={nestedReply._id} className="border-l-2 border-gray-100 pl-2">
                                <div className="flex items-start gap-2">
                                    <IoPersonCircle size={20} className="flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-gray-800">
                                            Anonymous
                                        </p>
                                        <p className="text-xs text-gray-600 mt-1">
                                            {nestedReply?.content}
                                        </p>
                                        <span className="text-xs text-gray-500 mt-1 inline-block">
                                            {moment.utc(nestedReply?.createdAt).local().fromNow()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-xs text-gray-500">No replies yet.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default function CommentThread({ comment }) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showReplies, setShowReplies] = useState(false);

    const { data: repliesData, isLoading: isLoadingReplies, mutate: mutateReplies } = useSWR(
        showReplies && comment?._id ? ["commentReplies", comment._id] : null,
        async () => {
            if (!comment?._id) return null;
            return API.Forum.allReply(comment._id);
        },
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
        }
    );

    const hasReplies = comment?.totalReplies > 0;
    const repliesCount = comment?.totalReplies || 0;

    const handleShowReplies = () => {
        setShowReplies(!showReplies);
    };

    return (
        <div className="border-b border-gray-100 py-4 last:border-b-0">
            <div className="flex items-start gap-3">
                <IoPersonCircle size={32} className="flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                        Anonymous
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed mt-1">
                        {comment?.content}
                    </p>

                    <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">
                            {moment.utc(comment?.createdAt).local().fromNow()}
                        </span>

                        <button
                            onClick={() => setShowReplyForm(!showReplyForm)}
                            className="text-xs text-primary hover:text-[#A3516B] font-medium"
                        >
                            {showReplyForm ? "Cancel Reply" : "Reply"}
                        </button>

                        {hasReplies && (
                            <button
                                onClick={handleShowReplies}
                                className="text-xs text-primary hover:underline font-medium"
                            >
                                {showReplies ? "Hide Replies" : `${repliesCount} ${repliesCount === 1 ? 'Reply' : 'Replies'}`}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {showReplyForm && (
                <div className="pl-10 mt-3">
                    <ReplyForm
                        commentId={comment?._id}
                        isReplyOfReply={false}
                        onCancel={() => setShowReplyForm(false)}
                        onSuccess={() => {
                            setShowReplyForm(false);
                            mutateReplies();
                            setShowReplies(true);
                        }}
                    />
                </div>
            )}

            {showReplies && (
                <div className="pl-10 mt-3 space-y-2">
                    {isLoadingReplies ? (
                        <p className="text-xs text-gray-500">Loading replies...</p>
                    ) : repliesData && repliesData.length > 0 ? (
                        repliesData.map((reply) => (
                            <ReplyOfReply
                                key={reply._id}
                                reply={reply}
                                onReplySuccess={() => mutateReplies()}
                            />
                        ))
                    ) : (
                        <p className="text-xs text-gray-500">No replies yet.</p>
                    )}
                </div>
            )}
        </div>
    );
}