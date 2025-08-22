import React, { useMemo, useState } from "react";

// Dashboard: list user feedback (React JS version)
export default function FeedbackPage() {
  // ---- seed users (replace with API data later) ----
  const users = [
    { id: 5, name: "Bui Quang", email: "buiquang@gmail.com", status: "Active" },
    { id: 6, name: "Bui Thanh Thao", email: "thaobui.thanh@gmail.com", status: "Active" },
    { id: 7, name: "Cao Bá Long", email: "ba_long_cao@gmail.com", status: "Active" },
    { id: 8, name: "Cao Dũng", email: "dungcvse173194@fpt.edu.vn", status: "Active" },
    { id: 9, name: "Dang Dung", email: "dangdung@gmail.com", status: "Active" },
    { id: 10, name: "Dang Hung", email: "danghung@gmail.com", status: "Active" },
    { id: 11, name: "Dang Khanh", email: "dangkhanh@gmail.com", status: "Active" },
    { id: 12, name: "Dang Minh", email: "dangminh@gmail.com", status: "Active" },
    { id: 13, name: "Do Chi", email: "dochi@gmail.com", status: "Active" },
    { id: 14, name: "Do Huynh Van", email: "huynhvan123@gmail.com", status: "Active" },
    { id: 15, name: "Do Van Minh", email: "yeumx2@gmail.com", status: "Active" },
    { id: 16, name: "Do Vy", email: "dovy@gmail.com", status: "Active" },
    { id: 17, name: "Dung", email: "caodung832003@gmail.com", status: "Active" },
    { id: 18, name: "dunglmse171016", email: "dunglmse171016@fpt.edu.vn", status: "Active" },
    { id: 19, name: "Duong An", email: "duongan@gmail.com", status: "Active" },
    { id: 20, name: "Duong Thao", email: "duongthao@gmail.com", status: "Active" },
    { id: 21, name: "DUy", email: "duyhbxm@gmail.com", status: "Active" },
    { id: 22, name: "duyên", email: "duyenlkss170142@fpt.edu.vn", status: "Active" },
    { id: 23, name: "Đào Ngọc Yến Nhi", email: "nhidnywork25@gmail.com", status: "Active" },
    { id: 24, name: "Đặng Duy Khâm", email: "khamkhokhao@gmail.com", status: "Active" },
    { id: 25, name: "Đặng Ngọc Anh", email: "ngoc_anh_dang@gmail.com", status: "Active" },
    { id: 26, name: "Đặng Thị Kiều Mai", email: "maidtkss170524@fpt.edu.vn", status: "Active" },
    { id: 27, name: "Đặng Việt Anh", email: "vietdang0407@gmail.com", status: "Active" },
    { id: 28, name: "Đỗ Anh Tuấn", email: "tuan.doan@gmail.com", status: "Active" },
    { id: 29, name: "Đỗ Phạm Thúy Anh", email: "adophamthuy@gmail.com", status: "Active" },
    { id: 30, name: "emCiara", email: "shuaix912@gmail.com", status: "Active" },
    { id: 31, name: "guest123", email: "haison121203@gmail.com", status: "Active" },
    { id: 32, name: "Hai nguyen", email: "nguyenthsse179441@fpt.edu.vn", status: "Active" },
    { id: 33, name: "Ho An", email: "hoan@gmail.com", status: "Active" },
    { id: 34, name: "Ho Phuc", email: "hophuc@gmail.com", status: "Active" },
    { id: 35, name: "Hoàng Phạm Thùy Tiên", email: "hoangphamthuytien8080@gmail.com", status: "Active" },
    { id: 36, name: "Hoàng Thị Vân Anh", email: "van_anh_hoang@gmail.com", status: "Active" },
    { id: 37, name: "Hoang Tu", email: "hoangtu@gmail.com", status: "Active" },
    { id: 38, name: "Hoang Vy", email: "hoangvy@gmail.com", status: "Active" },
    { id: 39, name: "Hoang Vy", email: "hoangvy@gmail.com", status: "Active" },
    { id: 40, name: "hoangvandung214122004@gmail.com", email: "hoangvandung214122004@gmail.com", status: "Active" },
    { id: 41, name: "Hồ Thị Minh", email: "minh.ho@gmail.com", status: "Active" },
    { id: 42, name: "Nguyen Minh Phuc", email: "ngminhphuc@gmail.com", status: "Active" },
    { id: 43, name: "Nguyen Nhat Anh", email: "nhatanh@gmail.com", status: "Active" },
    { id: 44, name: "Nguyen Quang Huy", email: "quanghuy@gmail.com", status: "Active" },
    { id: 45, name: "Nguyen Thi Lan", email: "lan.nguyen@gmail.com", status: "Active" },
    { id: 46, name: "Nguyen Bao Chau", email: "bao.chau@gmail.com", status: "Active" },
    { id: 47, name: "Nguyen Ngoc Anh", email: "ngocanh@gmail.com", status: "Active" },
    { id: 48, name: "Nguyen Tuan Anh", email: "tuananh@gmail.com", status: "Active" },
    { id: 49, name: "Nguyen Hoang Long", email: "hoanglong@gmail.com", status: "Active" },
    { id: 50, name: "Nguyen Thanh Tung", email: "thanhtung@gmail.com", status: "Active" },
    { id: 51, name: "Nguyen Van Khoa", email: "vankhoa@gmail.com", status: "Active" },
    { id: 52, name: "Nguyen Gia Bao", email: "giabao@gmail.com", status: "Active" },
    { id: 53, name: "Pham Thanh Dat", email: "dat.pham@gmail.com", status: "Active" },
    { id: 54, name: "Pham Thi Huong", email: "huong.pham@gmail.com", status: "Active" },
    { id: 55, name: "Phan Anh Khoa", email: "phan.anhkhoa@gmail.com", status: "Active" },
    { id: 56, name: "Tran Thi Thu", email: "tran.thu@gmail.com", status: "Active" },
    { id: 57, name: "Tran Minh Tri", email: "minhtri@gmail.com", status: "Active" },
    { id: 58, name: "Le Thi Hong", email: "le.hong@gmail.com", status: "Active" },
    { id: 59, name: "Le Nguyen Khanh", email: "lenkhanh@gmail.com", status: "Active" },
    { id: 60, name: "Vo Hoai Nam", email: "hoainam@gmail.com", status: "Active" },
    { id: 61, name: "Vu Thanh Son", email: "vuthanhson@gmail.com", status: "Active" },
    // 4 người có feedback chi tiết ban đầu
    { id: 101, name: "Tran Le Huu Hien", email: "hien.tran@example.com", status: "Active" },
    { id: 102, name: "Tran Van Lam", email: "lam.tran@example.com", status: "Active" },
    { id: 103, name: "Le Duc Trong", email: "trong.le@example.com", status: "Active" },
    { id: 104, name: "Do Van Minh", email: "yeumx2@gmail.com", status: "Active" },
  ];

  // feedback mapping (others will use a generated fallback so everyone has feedback)
  const feedbackByName = {
    "Tran Le Huu Hien": {
      content:
        "Trải nghiệm thử đồ AR mượt, căn chỉnh dáng khá chính xác. Giao diện rõ ràng, thao tác nhanh. Nếu có thêm gợi ý mix&match theo phong cách thì tuyệt!",
      date: "2025-08-20",
    },
    "Do Van Minh": {
      content:
        "MyFit giúp mình chọn size chuẩn hơn trước khi đặt. Ảnh render ổn nhưng đôi lúc load hơi chậm trên 4G. Mong có chế độ tải nhẹ cho máy yếu.",
      date: "2025-08-19",
    },
    "Tran Van Lam": {
      content:
        "Khá ấn tượng với tính năng xoay 360°. UI hiện đại, dễ dùng. Nên thêm so sánh trước/sau khi thử và lưu outfit yêu thích.",
      date: "2025-08-18",
    },
    "Le Duc Trong": {
      content:
        "Website gọn, thao tác nhanh. AR bám khung người tốt trong phòng đủ sáng. Mong có hướng dẫn setup ánh sáng ngay trên màn hình thử.",
      date: "2025-08-17",
    },
  };

  // ------ local UI state ------
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [detail, setDetail] = useState(null); // { name, content, date }

  // generate fallback feedback so EVERY user has one
  function makeFallbackFeedback(name, idx) {
    const templates = [
      "Dùng ổn, giao diện rõ ràng. AR bám người khá chính xác.",
      "Tốc độ xử lý tốt. Mình thích phần xem trước 360°.",
      "Trải nghiệm mượt, đôi lúc cần tối ưu thêm khi mạng yếu.",
      "Tính năng lưu outfit hữu ích. Đề xuất size hợp lý.",
      "Dễ dùng, onboarding nhanh. Sẽ tiếp tục sử dụng.",
    ];
    const content = templates[idx % templates.length];
    // tạo ngày trong tháng 8/2025 xoay vòng
    const day = (idx % 27) + 1;
    const date = new Date(2025, 7, day).toISOString().slice(0, 10);
    return { content, date };
  }

  const allRows = useMemo(() => {
    return users.map((u, i) => ({
      ...u,
      feedback: feedbackByName[u.name] || makeFallbackFeedback(u.name, i),
    }));
  }, [users]);

  const filtered = useMemo(() => {
    if (!q) return allRows;
    const k = q.toLowerCase();
    return allRows.filter((r) => (r.name + r.email).toLowerCase().includes(k));
  }, [allRows, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const start = (pageSafe - 1) * pageSize;
  const end = start + pageSize;
  const pageRows = filtered.slice(start, end);

  function goto(p) {
    setPage(Math.min(Math.max(1, p), totalPages));
  }

  return (
    <section className="p-4 md:p-6 lg:p-8">
      <header className="mb-4 md:mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">User Feedback</h1>
        <div className="flex items-center gap-2 md:gap-3">
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
            placeholder="Tìm theo tên hoặc email..."
            className="w-72 max-w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm"
            title="Rows per page"
          >
            <option value={10}>10 hàng</option>
            <option value={20}>20 hàng</option>
            <option value={50}>50 hàng</option>
          </select>
        </div>
      </header>

      <div className="overflow-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-[900px] w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-600">
              <Th>#</Th>
              <Th>Người dùng</Th>
              <Th>Email</Th>
              <Th>Status</Th>
              <Th>Feedback</Th>
              <Th>Ngày</Th>
              <Th align="right">Action</Th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500">
                  Không có dữ liệu
                </td>
              </tr>
            )}

            {pageRows.map((r, idx) => (
              <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50/50">
                <Td>{start + idx + 1}</Td>
                <Td>
                  <div className="flex items-center gap-3">
                    <Avatar name={r.name} />
                    <div>
                      <div className="font-medium text-slate-800">{r.name}</div>
                    </div>
                  </div>
                </Td>
                <Td className="text-slate-600">{r.email}</Td>
                <Td>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">{r.status}</span>
                </Td>
                <Td className="max-w-[520px]">
                  <div className="text-slate-700 line-clamp-2">{r.feedback.content}</div>
                </Td>
                <Td className="whitespace-nowrap text-slate-600">
                  {formatDate(r.feedback.date)}
                </Td>
                <Td align="right">
                  <button
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    onClick={() => setDetail({ name: r.name, ...r.feedback })}
                  >
                    View
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div className="mt-3 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-slate-600">
        <div>
          Hiển thị <span className="font-medium">{start + 1}</span>–
          <span className="font-medium">{Math.min(end, filtered.length)}</span> trong
          <span className="font-medium"> {filtered.length}</span> kết quả
        </div>
        <div className="inline-flex items-center gap-1">
          <button className="px-2 py-1 rounded-md border border-slate-200 bg-white disabled:opacity-50" disabled={pageSafe === 1} onClick={() => goto(1)}>
            «
          </button>
          <button className="px-2 py-1 rounded-md border border-slate-200 bg-white disabled:opacity-50" disabled={pageSafe === 1} onClick={() => goto(pageSafe - 1)}>
            Prev
          </button>
          <span className="px-2">Page {pageSafe} / {totalPages}</span>
          <button className="px-2 py-1 rounded-md border border-slate-200 bg-white disabled:opacity-50" disabled={pageSafe === totalPages} onClick={() => goto(pageSafe + 1)}>
            Next
          </button>
          <button className="px-2 py-1 rounded-md border border-slate-200 bg-white disabled:opacity-50" disabled={pageSafe === totalPages} onClick={() => goto(totalPages)}>
            »
          </button>
        </div>
      </div>

      {/* detail modal */}
      {detail && (
        <Modal onClose={() => setDetail(null)}>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">{detail.name}</h3>
            <div className="text-sm text-slate-500">{formatDate(detail.date)}</div>
            <p className="text-slate-700 leading-relaxed">{detail.content}</p>
          </div>
        </Modal>
      )}
    </section>
  );
}

function Th({ children, align }) {
  return (
    <th className={`px-3 py-3 ${align === "right" ? "text-right" : "text-left"} font-semibold`}>{children}</th>
  );
}
function Td({ children, align, className = "" }) {
  return (
    <td className={`px-3 py-3 align-top ${align === "right" ? "text-right" : "text-left"} ${className}`}>{children}</td>
  );
}

function Avatar({ name }) {
  const palette = avatarPalette(name);
  const initialsText = initials(name);
  return (
    <div className={`h-8 w-8 rounded-full ${palette.bg} ${palette.text} flex items-center justify-center text-xs font-semibold`} title={name}>
      {initialsText}
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-xl bg-white p-5 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
}

// -------- Helpers --------
function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
function avatarPalette(name) {
  const palettes = [
    { bg: "bg-indigo-100", text: "text-indigo-600" },
    { bg: "bg-emerald-100", text: "text-emerald-600" },
    { bg: "bg-amber-100", text: "text-amber-600" },
    { bg: "bg-rose-100", text: "text-rose-600" },
    { bg: "bg-sky-100", text: "text-sky-600" },
    { bg: "bg-fuchsia-100", text: "text-fuchsia-600" },
  ];
  let sum = 0;
  for (const ch of name) sum += ch.charCodeAt(0);
  return palettes[sum % palettes.length];
}
function formatDate(input) {
  try {
    const d = new Date(input);
    return d.toLocaleDateString("vi-VN", { year: "numeric", month: "short", day: "2-digit" });
  } catch {
    return input;
  }
}
