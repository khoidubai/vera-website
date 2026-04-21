# Hướng dẫn cài đặt & chạy VEra Studio Website

## Bước 1: Cài Node.js

1. Truy cập **https://nodejs.org**
2. Tải bản **LTS** (nút màu xanh lá bên trái)
3. Mở file vừa tải → bấm **Next** liên tục → **Install** → **Finish**
4. Kiểm tra: mở **Terminal** (hoặc **Command Prompt**), gõ:
   ```
   node -v
   ```
   Nếu hiện số phiên bản (VD: `v18.20.0`) là thành công.

> **Mở Terminal trên Windows:**
> Nhấn phím `Windows`, gõ `cmd`, bấm Enter.

---

## Bước 2: Tải source code

Nếu nhận qua **file nén (.zip)**:
1. Giải nén ra một thư mục (VD: `D:\VEra_Project\vera-website`)

Nếu nhận qua **GitHub**:
1. Cài Git tại https://git-scm.com (nếu chưa có)
2. Mở Terminal, gõ:
   ```
   git clone <link-repo> vera-website
   ```

---

## Bước 3: Cài đặt project

Mở Terminal, chạy lần lượt:

```
cd D:\VEra_Project\vera-website
npm install
```

Đợi khoảng 1–3 phút cho đến khi hoàn tất (không có dòng `ERR!` màu đỏ là OK).

---

## Bước 4: Chạy website

```
npm run dev
```

Khi thấy dòng:
```
▲ Next.js 14.x.x
- Local: http://localhost:3000
```

→ Mở trình duyệt (Chrome, Edge...), nhập vào thanh địa chỉ:

```
http://localhost:3000
```

Website sẽ hiện lên.

---

## Tắt website

Quay lại Terminal, nhấn `Ctrl + C` → gõ `Y` → Enter.

---

## Chạy lại lần sau

Chỉ cần 2 lệnh (không cần cài lại):

```
cd D:\VEra_Project\vera-website
npm run dev
```

Rồi mở `http://localhost:3000` trên trình duyệt.

---

## Gặp lỗi?

| Vấn đề | Cách xử lý |
|---|---|
| `'node' is not recognized` | Cài lại Node.js (Bước 1), khởi động lại Terminal |
| `npm ERR!` khi install | Xóa thư mục `node_modules`, chạy lại `npm install` |
| Trang trắng / lỗi khi mở | Tắt server (`Ctrl+C`), chạy lại `npm run dev` |
| Port 3000 đã dùng | Chạy `npm run dev -- -p 3001` rồi mở `http://localhost:3001` |
