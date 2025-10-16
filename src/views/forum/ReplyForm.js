import React from 'react'

export default function ReplyForm({ onCancel }) {
    return (
        <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <textarea
                placeholder="Tulis balasan Anda..."
                className="w-full p-2 text-sm border border-gray-300 rounded-md resize-none focus:ring-0 focus:border-primary"
                rows="2"
            />
            <div className="flex justify-end gap-2 mt-2">
                <button
                    onClick={onCancel}
                    className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 rounded"
                >
                    Batal
                </button>
                <button
                    className="bg-primary text-white text-sm px-3 py-1 rounded hover:bg-[#A3516B]"
                >
                    Kirim
                </button>
            </div>
        </div>
    )
}
