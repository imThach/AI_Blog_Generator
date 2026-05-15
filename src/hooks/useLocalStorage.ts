import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const useLocalStorage = <T extends { id: number }>(key: string) => {
    const [data, setData] = useState<T[]>([]);

    // Lấy dữ liệu khi vào trang
    useEffect(() => {
        try {
            const saved = localStorage.getItem(key);
            if (saved) setData(JSON.parse(saved));
        } catch (error) {
            console.error("Lỗi parse JSON từ localStorage:", error);
            toast.error("Dữ liệu lịch sử bị lỗi. Đã đặt lại danh sách.");
            localStorage.removeItem(key);
        }
    }, [key]);

    // Hàm thêm mới bài viết
    const addItem = (item: T) => {
        try {
            const newData = [item, ...data];
            localStorage.setItem(key, JSON.stringify(newData));
            setData(newData);
        } catch (error) {
            console.error("Lỗi lưu localStorage (có thể bị đầy):", error);
            toast.error("Không thể lưu bài viết. Bộ nhớ trình duyệt có thể đã đầy!");
        }
    };

    // Hàm xóa bài viết
    const removeItem = (id: number) => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
        localStorage.setItem(key, JSON.stringify(newData));
    };

    return { data, addItem, removeItem };
};