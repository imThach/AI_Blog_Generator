"use client";

import { useState } from "react";
import { Copy, Download, Loader2, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function EditorPage() {
    const [topic, setTopic] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { addItem } = useLocalStorage("blog_history");

    const handleGenerate = async () => {
        if (!topic.trim()) return;
        setIsLoading(true);
        try {
            const response = await fetch("/api", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic }),
            });
            const data = await response.json();
            if (response.ok) {
                setContent(data.content);
                addItem({
                    id: Date.now(),
                    title: topic,
                    content: data.content,
                    date: new Date().toISOString()
                });
            } else {
                alert(data.error || "Có lỗi xảy ra trong quá trình tạo nội dung.");
            }
        } catch (error) {
            alert("Lỗi kết nối server");
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (!content) return;
        navigator.clipboard.writeText(content);
        toast.success("Blog content copied to clipboard!", { position: 'top-right' });
    };

    const downloadAsTxt = () => {
        if (!content) return;
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${topic ? topic.replace(/\s+/g, '-').toLowerCase() : 'blog-content'}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 transition-colors duration-300">
            <h1 className="text-3xl font-bold mb-8 dark:text-white">Blog Editor</h1>

            {/* Input Section */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm mb-8 transition-colors duration-300">
                <label className="block text-2xl font-bold mb-4 dark:text-white">Chủ đề Blog</label>
                <div className="flex gap-2 sm:gap-4">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleGenerate();
                            }
                        }}
                        placeholder="Nhập chủ đề blog của bạn (ví dụ: Lợi ích của thiền định)"
                        className="bg-white dark:bg-zinc-900 dark:text-white flex-1 max-w-[180px] sm:max-w-none px-4 py-2 border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-black dark:focus:border-white transition-colors duration-300"
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !topic.trim()}
                        className="bg-black dark:bg-white text-white dark:text-black text-sm px-4 py-2 rounded-xl font-medium hover:opacity-90 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-300 whitespace-nowrap"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        Tạo Nội Dung
                    </button>
                </div>
                <h6 className="text-sm text-white/70 mt-4">AI sẽ tạo ra nội dung blog dựa trên chủ đề bạn nhập</h6>
            </div>

            {/* Editor/Preview Section */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden flex flex-col transition-colors duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 border-b border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 transition-colors duration-300">
                    <h2 className="font-bold text-2xl dark:text-white">Xem trước & Xuất</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={copyToClipboard}
                            disabled={!content}
                            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 dark:text-white font-medium disabled:cursor-not-allowed transition-colors duration-300"
                        >
                            <Copy className="w-4 h-4" /> Sao chép
                        </button>
                        <button
                            onClick={downloadAsTxt}
                            disabled={!content}
                            className="flex items-center gap-2 px-4 py-2 text-sm bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90 font-medium disabled:cursor-not-allowed transition-colors duration-300"
                        >
                            <Download className="w-4 h-4" /> Tải xuống
                        </button>
                    </div>
                </div>

                <div className="p-8 flex-1 custom-scrollbar">
                    {content ? (
                        <div className="prose dark:prose-invert max-w-none text-black dark:text-gray-200">
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 pb-20">
                            <p className="text-md">Chưa có nội dung để hiển thị.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}