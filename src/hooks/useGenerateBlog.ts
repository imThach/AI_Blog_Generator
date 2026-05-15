import { useState } from "react";

export const useGenerateBlog = () => {
    const [isLoading, setIsLoading] = useState(false);

    const generate = async (topic: string) => {
        setIsLoading(true);

        const maxRetries = 2;
        let attempt = 0;

        while (attempt <= maxRetries) {
            try {
                const response = await fetch("/api", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ topic }),
                });

                const data = await response.json();

                if (response.ok) {
                    setIsLoading(false);
                    return { content: data.content, error: null };
                }

                const isRateLimitOrServerError = response.status === 429 || response.status === 500 || response.status === 504;

                if (isRateLimitOrServerError && attempt < maxRetries) {
                    const delay = Math.pow(2, attempt) * 1000;
                    await new Promise((resolve) => setTimeout(resolve, delay));
                    attempt++;
                    continue;
                }

                setIsLoading(false);
                return { content: null, error: data.error || "Có lỗi xảy ra trong quá trình tạo nội dung." };
            } catch (error: unknown) {
                if (attempt < maxRetries) {
                    const delay = Math.pow(2, attempt) * 1000;
                    await new Promise((resolve) => setTimeout(resolve, delay));
                    attempt++;
                    continue;
                }
                setIsLoading(false);
                return { content: null, error: "Lỗi kết nối server" };
            }
        }

        setIsLoading(false);
        return { content: null, error: "Lỗi không xác định" };
    };

    return { generate, isLoading };
};
