# STYLE GUIDE - InterviewReady

Pedoman gaya penulisan kode, penataan komponen React/Next.js, serta gaya bahasa evaluasi pada platform **InterviewReady**.

---

## 💻 Style Guide Pemrograman

1. **TypeScript Strictness**:
   - Selalu berikan tipe eksplisit pada props, state, dan data return function.
   - Hindari penggunaan tipe `any`. Gunakan `unknown` atau buat interface spesifik di `src/lib/types.ts`.
2. **Component Architecture**:
   - Pisahkan logika berat atau data fetching dari UI visual murni.
   - Komponen reusabel disimpan di `src/components/ui/` dan `src/components/simulation/`.
   - Nama komponen menggunakan PascalCase (`QuestionCard.tsx`, `AudioRecorder.tsx`).
3. **Naming Conventions**:
   - File & Folder route Next.js: lowercase / kebab-case.
   - Constant & Enums: UPPER_SNAKE_CASE.
   - Variable & Functions: camelCase.

---

## 🗣️ Style Guide Bahasa & Feedback Evaluasi

- **Empatis & Edukatif**: Gunakan nada bicara yang memberikan dorongan percaya diri, santun, dan objektif.
- **Konstruktif**: Hindari kata-kata merendahkan. Ubah kata seperti *"Jawaban jelek"* menjadi *"Jawaban sudah baik, namun akan lebih kuat jika ditambahkan data kuantitatif."*
- **Sesuai Konteks Indonesia & Inggris**: Sediakan opsi feedback dalam Bahasa Indonesia dan Bahasa Inggris sesuai pilihan bahasa simulasi user.
