"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import * as API from "@/core/services/api";
import { replyValidationSchema } from "./ValidationSchema";

export default function ReplyForm({ commentId, onCancel, onSuccess, isReplyOfReply = false }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            content: ""
        },
        validationSchema: replyValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            if (!commentId) {
                toast.error("Comment ID tidak ditemukan");
                return;
            }

            setIsSubmitting(true);

            const apiCall = isReplyOfReply
                ? API.Forum.createReplyOfReply(commentId, { content: values.content })
                : API.Forum.createReply(commentId, { content: values.content });

            const replyPromise = apiCall.then((response) => {
                if (response) {
                    resetForm();
                    if (onSuccess) onSuccess();
                    return response;
                }
                throw new Error("Gagal menambahkan balasan");
            });

            toast.promise(replyPromise, {
                loading: "Mengirim balasan...",
                success: "Balasan berhasil ditambahkan!",
                error: (err) => err?.message || "Gagal menambahkan balasan",
                finally: () => {
                    setIsSubmitting(false);
                }
            });
        }
    });

    return (
        <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <form onSubmit={formik.handleSubmit}>
                <textarea
                    name="content"
                    placeholder="Tulis balasan Anda..."
                    className={`w-full p-2 text-sm border rounded-md resize-none focus:ring-0 focus:border-primary ${formik.touched.content && formik.errors.content
                        ? 'border-red-500'
                        : 'border-gray-300'
                        }`}
                    rows="2"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isSubmitting}
                />
                {formik.touched.content && formik.errors.content && (
                    <p className="text-red-500 text-xs mt-1">
                        {formik.errors.content}
                    </p>
                )}
                <div className="flex justify-end gap-2 mt-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 rounded"
                        disabled={isSubmitting}
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="bg-primary text-white text-sm px-3 py-1 rounded hover:bg-[#A3516B] disabled:bg-primary/40 disabled:cursor-not-allowed"
                        disabled={isSubmitting || !formik.isValid}
                    >
                        {isSubmitting ? 'Mengirim...' : 'Kirim'}
                    </button>
                </div>
            </form>
        </div>
    );
}