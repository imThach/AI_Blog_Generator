"use client";

import { useEffect, useState } from "react";
import { Copy, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

interface BlogModalProps {
    isOpen: boolean;
    onClose: () => void;
    blog: {
        title: string;
        content: string;
    } | null;
}

export default function BlogModal({ isOpen, onClose, blog }: BlogModalProps) {
    const [show, setShow] = useState(false);
    const [renderBlog, setRenderBlog] = useState(blog);

    useEffect(() => {
        if (isOpen && blog) {
            setRenderBlog(blog);
            const timer = setTimeout(() => setShow(true), 10);
            return () => clearTimeout(timer);
        } else {
            setShow(false);
        }
    }, [isOpen, blog]);

    useEffect(() => {
        if (!show) {
            const timer = setTimeout(() => setRenderBlog(null), 300);
            return () => clearTimeout(timer);
        }
    }, [show]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!renderBlog) return null;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(renderBlog.content);
        toast.success("Blog content copied to clipboard!", { position: 'top-right' });
    };

    return (
        <div 
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 transition-opacity duration-300 ease-in-out ${show ? 'opacity-100' : 'opacity-0'}`}
            onClick={onClose}
        >
            <div 
                className={`bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 w-full max-w-[calc(100%-2rem)] sm:max-w-full lg:max-w-3xl max-h-[80vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl transition-all duration-300 ease-in-out ${show ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}`}
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors duration-300">
                    <h2 className="font-bold text-2xl text-black dark:text-white">Xem trước & Xuất</h2>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 text-black dark:text-white transition-colors"
                        >
                            <Copy className="w-4 h-4" /> Sao chép
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 text-sm bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90 font-medium transition-all">
                            <Download className="w-4 h-4" /> Tải xuống
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto flex-1 custom-scrollbar bg-white dark:bg-zinc-900 transition-colors duration-300">
                    <div className="prose dark:prose-invert max-w-none text-black dark:text-gray-200">
                        <ReactMarkdown>{renderBlog.content}</ReactMarkdown>
                    </div>
                </div>

            </div>
        </div>
    );
}