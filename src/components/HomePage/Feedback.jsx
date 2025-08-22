import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Feedback() {
  const items = [
    {
      name: "Tran Le Huu Hien",
      content:
        "Trải nghiệm thử đồ AR mượt, căn chỉnh dáng khá chính xác. Giao diện rõ ràng, thao tác nhanh. Nếu có thêm gợi ý mix&match theo phong cách thì tuyệt!",
      rating: 5,
      date: "2025-08-20",
    },
    {
      name: "Do Van Minh",
      content:
        "MyFit giúp mình chọn size chuẩn hơn trước khi đặt. Ảnh render ổn nhưng đôi lúc load hơi chậm trên 4G. Mong có chế độ tải nhẹ cho máy yếu.",
      rating: 4,
      date: "2025-08-19",
    },
    {
      name: "Tran Van Lam",
      content:
        "Khá ấn tượng với tính năng xoay 360°. UI hiện đại, dễ dùng. Nên thêm so sánh trước/sau khi thử và lưu outfit yêu thích.",
      rating: 5,
      date: "2025-08-18",
    },
    {
      name: "Le Duc Trong",
      content:
        "Website gọn, thao tác nhanh. AR bám khung người tốt trong phòng đủ sáng. Mong có hướng dẫn setup ánh sáng ngay trên màn hình thử.",
      rating: 4,
      date: "2025-08-17",
    },
  ];

  // Sort once, newest first (no filters)
  const list = [...items].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <section className="w-full">
      {/* Background gradient with subtle orbs */}
      <div className="relative isolate bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* soft orbs */}
        <div className="pointer-events-none absolute -top-16 right-10 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-10 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="mx-auto mb-20 max-w-7xl px-5 pt-12 md:pt-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white text-center">
            What People Are Saying
          </h2>
        </div>

        {/* Grid */}
        <div className="-mt-8 md:-mt-10 pb-12 md:pb-16">
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              <AnimatePresence>
                {list.map((fb) => (
                  <motion.article
                    key={`${fb.name}-${fb.date}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="relative rounded-2xl bg-white shadow-[0_6px_18px_rgba(0,0,0,.08)] border border-slate-200 p-6 md:p-7 hover:shadow-[0_10px_28px_rgba(0,0,0,.12)] hover:-translate-y-0.5 transition"
                  >
                    {/* watermark quote */}
                    <svg
                      viewBox="0 0 24 24"
                      className="absolute right-4 top-4 h-6 w-6 fill-slate-200"
                      aria-hidden="true"
                    >
                      <path d="M9.5 6.5h-5a1 1 0 0 0-1 1v5.25a3.75 3.75 0 1 0 7.5 0V7.5a1 1 0 0 0-1-1Zm11 0h-5a1 1 0 0 0-1 1v5.25a3.75 3.75 0 1 0 7.5 0V7.5a1 1 0 0 0-1-1Z" />
                    </svg>

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar name={fb.name} />
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-slate-800 truncate">{fb.name}</h3>
                        <p className="text-xs text-slate-500 truncate">{formatDate(fb.date)}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <p className="text-base leading-relaxed text-slate-700">{fb.content}</p>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- UI Bits -------------------- */
function Avatar({ name }) {
  const palette = avatarPalette(name);
  return (
    <div
      className={`h-11 w-11 shrink-0 rounded-full ${palette.bg} ${palette.text} flex items-center justify-center font-semibold`}
      title={name}
    >
      {initials(name)}
    </div>
  );
}

/* -------------------- Helpers -------------------- */
function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function formatDate(input) {
  try {
    const d = new Date(input);
    return d.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return input;
  }
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
