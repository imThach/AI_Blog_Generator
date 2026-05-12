"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sun } from "lucide-react";

export default function Header() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDark(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDark(true);
        }
    };

    return (
        <header className="flex items-center justify-between max-w mx-auto px-4 md:px-34 py-4 border-b border-gray-200 transition-colors dark:border-gray-800">
            <Link href="/" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pen-tool h-5 w-5 sm:h-6 sm:w-6 text-black dark:text-white">
                    <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"></path>
                    <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"></path>
                    <path d="m2.3 2.3 7.286 7.286"></path>
                    <circle cx="11" cy="11" r="2"></circle>
                </svg>
                <span className="hidden sm:block text-2xl font-bold text-black dark:text-white">AI Blog Generator</span>
            </Link>
            <nav className="flex items-center gap-7">
                <Link href="/edit" className="text-sm font-medium hover:underline transition-colors">Editor</Link>
                <Link href="/history" className="text-sm font-medium hover:underline transition-colors">History</Link>
                <button onClick={toggleTheme} className="p-2 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity">
                    <Sun className="w-5 h-5" />
                </button>
            </nav>
        </header>
    );
}