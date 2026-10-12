# Log Prompt

**Alat AI yang dipakai:** Claude (Claude Code)

Catat prompt penting saja, tidak perlu semuanya. Yang wajib dicatat: prompt yang menghasilkan kode utama, prompt yang hasilnya ditolak atau diperbaiki, dan prompt untuk debugging.

| No | Waktu | Langkah ke- | Prompt (ringkas) | Hasil dari AI | Keputusan tim (diterima / diubah / ditolak) dan alasannya |
|---|---|---|---|---|---|
| 1 | 12 Okt 2026 | Persiapan (sebelum Tahap 1) | Minta panduan mengerjakan lembar challenge PDF tanpa mengubah struktur template dokumen, dan diberi tahu jika ada yang diubah | AI membaca PDF dan template, lalu memberi urutan kerja, aturan commit, dan catatan bahwa `bughunt-kasir.zip` belum ada di Downloads | Diterima sebagai panduan. Isinya dicocokkan dengan lembar challenge |
| 2 | 12 Okt 2026 | Tahap 1–2 | Memberi konsep produk EcoWin (alur inti, aturan nilai, penyimpanan, rekap) dan meminta draf spesifikasi serta kasus uji | AI membuat draf `01-spesifikasi.md` dan `04-kasus-uji.md` (U01–U16) dengan harga contoh dan batas berat 0,1–100 kg | Diterima sebagai draf. Wawancara diisi tim dari narasumber nyata. Hasil yang diharapkan wajib dihitung ulang tim secara manual [ISI TIM: tanggal dan hasil hitung ulang] |
| 3 | 12 Okt 2026 | Tahap 3 | Memberi nama anggota, peran, dan pilihan teknologi (HTML/CSS/JS biasa, localStorage, `node --test`), lalu meminta rencana kerja | AI mengisi `02-rencana.md` dengan 7 langkah beserta estimasi waktu | Diterima. Dua baris ditambahkan ke tabel rencana karena langkah kerja lebih dari lima |
