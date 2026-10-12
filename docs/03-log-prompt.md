# Log Prompt

**Alat AI yang dipakai:** Claude (Claude Code)

Catat prompt penting saja, tidak perlu semuanya. Yang wajib dicatat: prompt yang menghasilkan kode utama, prompt yang hasilnya ditolak atau diperbaiki, dan prompt untuk debugging.

| No | Waktu | Langkah ke- | Prompt (ringkas) | Hasil dari AI | Keputusan tim (diterima / diubah / ditolak) dan alasannya |
|---|---|---|---|---|---|
| 1 | 12 Okt 2026 | Persiapan (sebelum Tahap 1) | Minta panduan mengerjakan lembar challenge PDF tanpa mengubah struktur template dokumen, dan diberi tahu jika ada yang diubah | AI membaca PDF dan template, lalu memberi urutan kerja, aturan commit, dan catatan bahwa `bughunt-kasir.zip` belum ada di Downloads | Diterima sebagai panduan. Isinya dicocokkan dengan lembar challenge |
| 2 | 12 Okt 2026 | Tahap 1–2 | Memberi konsep produk EcoWin (alur inti, aturan nilai, penyimpanan, rekap) dan meminta draf spesifikasi serta kasus uji | AI membuat draf `01-spesifikasi.md` dan `04-kasus-uji.md` (U01–U16) dengan harga contoh dan batas berat 0,1–100 kg | Fadil menghitung ulang U01–U06 dan U14 dengan kalkulator: semua cocok. Bukti: tangkapan layar kalkulator di `docs/bukti/hitung-manual/` (U01–U06 dan U14) |
| 3 | 12 Okt 2026 | Tahap 3 | Memberi nama anggota, peran, dan pilihan teknologi (HTML/CSS/JS biasa, localStorage, `node --test`), lalu meminta rencana kerja | AI mengisi `02-rencana.md` dengan 7 langkah beserta estimasi waktu | Diterima. Dua baris ditambahkan ke tabel rencana karena langkah kerja lebih dari lima |
| 4 | 12 Okt 2026, [10:30] | 1 (Scaffolding) | Minta kerangka src/ saja: index.html, rekap.html, style.css, data.js, logika.js, app.js. HTML/CSS/JS biasa, <script> biasa bukan module, tanpa logika, tanpa library | AI membuat 6 file kerangka. logika.js hanya komentar dan baris ekspor module.exports = {}, data.js dan app.js hanya komentar | Diterima. Dibuka di browser tanpa error di console, tidak ada type="module", dan tidak ada logika di luar kerangka. Isi module.exports baru diisi di langkah 2 |