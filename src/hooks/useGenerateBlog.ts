import { useState } from "react";

export const useGenerateBlog = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generate = async (topic: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("/api", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Lỗi server");

            return data.content;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { generate, isLoading, error };
};