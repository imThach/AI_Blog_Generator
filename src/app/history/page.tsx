"use client";

import { useEffect, useState } from "react";
import { Eye, Trash2, X } from "lucide-react";
import BlogModal from "../../components/BlogModal";
import LottieAnimation from "../../components/LottieAnimation";

export default function HistoryPage() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("blog_history") || "[]");
        setHistory(saved);
    }, []);

    const deleteItem = (id: number) => {
        const updated = history.filter((item: any) => item.id !== id);
        setHistory(updated);
        localStorage.setItem("blog_history", JSON.stringify(updated));
    };
    const [selectedBlog, setSelectedBlog] = useState<any>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
    const [showDelete, setShowDelete] = useState(false);
    const [renderDeleteId, setRenderDeleteId] = useState<number | null>(null);

    useEffect(() => {
        if (deleteConfirmId !== null) {
            setRenderDeleteId(deleteConfirmId);
            const timer = setTimeout(() => setShowDelete(true), 10);
            return () => clearTimeout(timer);
        } else {
            setShowDelete(false);
        }
    }, [deleteConfirmId]);

    useEffect(() => {
        if (!showDelete) {
            const timer = setTimeout(() => setRenderDeleteId(null), 300);
            return () => clearTimeout(timer);
        }
    }, [showDelete]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 transition-colors duration-300">
            <h1 className="text-3xl font-bold mb-5 dark:text-white">Hi, here is your history</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {history.map((item: any) => (
                    <div key={item.id} className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
                        <h3 className="text-2xl font-bold mb-3 capitalize font-geist dark:text-white">{item.title}</h3>
                        <p className="line-clamp-3 mb-5 text-sm leading-relaxed dark:text-gray-300">
                            {item.content}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSelectedBlog(item)}
                                className="p-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-zinc-800 dark:hover:bg-gray-200 transition-colors"
                            >
                                <Eye className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setDeleteConfirmId(item.id)}
                                className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {history.length === 0 && (
                    <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-20 text-center">
                        <LottieAnimation src="/animation/Not Found (1).lottie" className="w-64 h-64 opacity-50" />
                        <p className="text-gray-500 mt-4 text-lg">No history found</p>
                    </div>
                )}
            </div>

            <BlogModal
                isOpen={!!selectedBlog}
                onClose={() => setSelectedBlog(null)}
                blog={selectedBlog}
            />

            {/* Delete Confirmation Modal */}
            {renderDeleteId !== null && (
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 transition-opacity duration-300 ease-in-out ${showDelete ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setDeleteConfirmId(null)}
                >
                    <div
                        className={`bg-white dark:bg-zinc-900 rounded-xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center text-center relative transition-all duration-300 ease-in-out ${showDelete ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={() => setDeleteConfirmId(null)} className="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                        <LottieAnimation src="/animation/Taking out the trash.lottie" className="w-48 h-48 mb-4" />
                        <h3 className="text-2xl font-bold mb-2 dark:text-white">Confirm Delete</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Are you sure you want to delete this item? This action cannot be undone.</p>
                        <div className="flex gap-4 w-full">
                            <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-2 px-4 border border-gray-200 dark:border-zinc-700 rounded-xl font-medium text-black dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                                Cancel
                            </button>
                            <button onClick={() => { if (renderDeleteId !== null) deleteItem(renderDeleteId); setDeleteConfirmId(null); }} className="flex-1 py-2 px-4 bg-[#e60000] text-white rounded-xl font-medium hover:bg-red-700 transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}