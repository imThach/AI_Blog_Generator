import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { topic } = await req.json();

        if (!topic) {
            return NextResponse.json({ error: "Chủ đề không được để trống" }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("GEMINI_API_KEY is not set in the environment variables.");
            return NextResponse.json({ error: "API Key của Gemini chưa được cấu hình." }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Bạn là một chuyên gia viết blog chuyên nghiệp. 
        Hãy viết một bài blog chi tiết, hấp dẫn bằng tiếng Việt về chủ đề: "${topic}". 
        Yêu cầu: Định dạng bằng Markdown (Sử dụng H2, Bold, List), có mở đầu lôi cuốn và kết thúc kêu gọi hành động.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ content: text });
    } catch (error: any) {
        console.error("Gemini API Error:", error);

        return NextResponse.json(
            { error: error.message || "Lỗi tạo nội dung." },
            { status: 500 }
        );
    }
}