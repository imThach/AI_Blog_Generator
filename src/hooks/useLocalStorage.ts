import { useState, useEffect } from "react";

export const useLocalStorage = (key: string) => {
    const [data, setData] = useState<any[]>([]);

    // Lấy dữ liệu khi vào trang
    useEffect(() => {
        const saved = localStorage.getItem(key);
        if (saved) setData(JSON.parse(saved));
    }, [key]);

    // Hàm thêm mới bài viết
    const addItem = (item: any) => {
        const newData = [item, ...data];
        setData(newData);
        localStorage.setItem(key, JSON.stringify(newData));
    };

    // Hàm xóa bài viết
    const removeItem = (id: number) => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
        localStorage.setItem(key, JSON.stringify(newData));
    };

    return { data, addItem, removeItem };
};