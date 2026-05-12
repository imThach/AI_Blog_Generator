### AI Blog Generator Challenge – Next.js + Tailwind CSS

## Giới thiệu

Xây dựng và hoàn thiện một **AI Blog Generator Application** bằng **Next.js** và **Tailwind CSS**.

Ứng dụng cho phép người dùng nhập chủ đề, tạo nội dung blog bằng AI, chỉnh sửa trực tiếp và xem trước bài viết.

---

## Mục tiêu

Xây dựng một ứng dụng tạo nội dung blog hoàn chỉnh theo kiến trúc hiện tại của project:

- Người dùng có thể nhập chủ đề và tạo bài blog bằng AI
- Có editor để chỉnh sửa nội dung Markdown
- Có trang preview để xem kết quả cuối
- Giao diện hiện đại, responsive trên nhiều kích thước màn hình

---

## Yêu cầu chức năng

### 1. Generate Blog Content

- Người dùng nhập chủ đề blog vào ô input
- Thực hiện tạo nội dung khi click nút **Tạo nội dung**
- Không gọi API nếu input rỗng hoặc chỉ chứa khoảng trắng

---

### 2. Fetch dữ liệu từ API

- Sử dụng API route nội bộ: `/api/generate-content`
- API gọi tới mô hình sinh nội dung (Gemini) qua biến môi trường `GEMINI_API_KEY`
- Xử lý các trạng thái:
    - Loading
    - Success
    - Error (network error hoặc API error)
- Nếu không có API key hoặc API lỗi, hệ thống fallback bằng mock content

---

### 3. Hiển thị và chỉnh sửa nội dung

- Sau khi generate, hiển thị nội dung vào editor
- Editor hỗ trợ format cơ bản:
    - Bold
    - Italic
    - Heading 1 / Heading 2
    - Unordered list / Ordered list
- Hiển thị số ký tự theo thời gian thực
- Có nút **Xóa tất cả** để reset nội dung

---

### 4. Preview bài viết

- Cho phép chuyển sang trang preview khi nội dung hợp lệ
- Truyền dữ liệu qua `localStorage` (topic + content)
- Hiển thị nội dung đúng định dạng đọc bài viết

---

### 5. Responsive UI

- Ứng dụng phải responsive trên:
    - Mobile
    - Tablet
    - Desktop
- Bố cục editor và preview phải dễ đọc, khoảng cách hợp lý

---

## Yêu cầu kỹ thuật

### Tech Stack

- **React** (functional components + hooks)
- **Tailwind CSS**

---

### Thư viện khuyến nghị

> Mục này giúp định hướng, **không bắt buộc cài toàn bộ**.
> 
- **Bắt buộc (nên có):**
    - `tailwindcss` (styling)
- **Khuyến khích:**
    - `react-markdown` (render nội dung Markdown ở trang preview)
    - `remark-gfm` (hỗ trợ markdown nâng cao: table, task list, strikethrough)
    - `sonner` hoặc `react-hot-toast` (hiển thị toast cho success/error)

---

### Yêu cầu về code

### 1. Component Structure

- Tách component rõ ràng (Header, Editor, Preview blocks, UI components)
- Sử dụng **functional components**
- Có typing đầy đủ với TypeScript cho props/state/hàm async

---

### 2. State Management

- Sử dụng:
    - `useState`
    - (Tuỳ chọn) `useEffect` khi cần đồng bộ dữ liệu
- Tách logic generate content thành hàm riêng hoặc custom hook (bonus)

---

### 3. Styling

- Sử dụng **Tailwind CSS utility classes**
- Mobile-first approach
- Bám sát spacing và hierarchy rõ ràng
- Có hover/focus state cho các action chính

---

### 4. Best Practices

- Code sạch, dễ đọc, tách biệt UI và business logic
- Handle edge cases:
    - Topic rỗng
    - API trả lỗi
    - Nội dung rỗng khi preview
- Tránh gọi API không cần thiết
- Không hardcode API key trong source code

---

## API Support

- Khai báo biến môi trường trong `.env`:

```
GEMINI_API_KEY=your_key_here
```

> **Lưu ý:** Không commit API key trực tiếp lên GitHub.
>
