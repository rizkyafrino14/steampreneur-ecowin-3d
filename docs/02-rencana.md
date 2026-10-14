# Rencana Kerja

Pecah pekerjaan menjadi langkah kecil. Mulai dari versi paling sederhana yang berfungsi, lalu tambahkan sedikit demi sedikit.
Satu langkah sebaiknya bisa dikerjakan dan diperiksa dalam 30 sampai 60 menit.
Tidak ada jadwal per jam, jadi rencana ini adalah jadwal tim kalian sendiri.

**Waktu mulai:** 12 Oktober 2026
**Batas akhir pengumpulan:** 14 Oktober 2026

Teknologi: HTML, CSS, dan JavaScript biasa (tanpa framework), `<script>` biasa (bukan ES module) agar `index.html` bisa dibuka langsung dari `file://`, data di localStorage, test dengan `node --test` (Node.js 18 atau lebih baru). Fungsi hitung dan validasi ditaruh di `src/logika.js` tanpa menyentuh DOM agar bisa dites.

Peran: Rizky Mustafa Afrino (navigator utama), Muhammad Fadil Ismunawar (penguji dan analis kebutuhan), Rofiqi Adyata Faizin (dokumentator). Setiap anggota tetap wajib memahami dan menjelaskan kode.

| No | Langkah | Penanggung jawab | Cara memeriksa bahwa langkah ini selesai | Estimasi waktu | Waktu sebenarnya | Status |
|---|---|---|---|---|---|---|
| 1 | Scaffolding: buat struktur proyek | Rizky | Proyek bisa dibuka di browser | 30 menit | 25 menit | selesai |
| 2 | Data dan logika: `src/data.js` (nasabah dan tabel harga) serta `src/logika.js` (hitung nilai, validasi berat, validasi pilihan) beserta unit test di `tes/` | Rizky (kode), Fadil (hasil yang diharapkan dihitung manual) | `node --test` lulus untuk kasus U01–U13 | 60 menit | 45 menit | selesai |
| 3 | Formulir setoran: pilih nasabah, jenis dan kondisi (kondisi mengikuti jenis), input berat, nilai tampil otomatis, pesan kesalahan | Rizky | Kasus U07–U13 diuji di browser dan sesuai hasil yang diharapkan | 60 menit | 40 menit | selesai |
| 4 | Penyimpanan dan saldo: simpan setoran ke localStorage, saldo nasabah bertambah | Rizky | Kasus U14 dan U15 lulus (saldo benar, data tetap ada setelah reload) | 45 menit | 45 menit | selesai |
| 5 | Halaman rekap: tabel setoran dengan kolom tanggal, nasabah, kategori, jenis, kondisi, berat, nilai | Rizky | Kasus U16 lulus; dilanjutkan commit `checkpoint: versi pertama alur inti berjalan` | 45 menit | 40 menit | selesai |
| 6 | Uji menyeluruh dan catat kesalahan AI: jalankan U01–U16, isi bagian B kasus uji, tangkapan layar di `docs/bukti/` | Fadil | Semua kasus uji terisi hasil sebenarnya, Lulus?, dan bukti; `05-kesalahan-ai.md` terisi | 45 menit | 42 menit | Selesai |
| 7 | Review dan pahami kode: code review AI, putuskan saran diterima atau ditolak, tulis penjelasan kode masing-masing anggota | Rofiqi (catatan review), semua anggota (penjelasan kode) | `06-catatan-review.md` terisi; tiap anggota punya minimal 2 penjelasan di `08-penjelasan-kode.md` | 60 menit | 60 menit | Selesai |
| 8 | Bug Hunt | Semua anggota | Catatan bug dan test selesai | 60 menit | 3 menit | selesai |
| 9 | Change request | Rizky (kode), Fadil (kasus uji), Rofiqi (analisis dan dokumen) | Semua kasus uji lama dan baru lulus | 90 menit | 75 menit | selesai |
| 10 | Dokumentasi dan refleksi | Rofiqi (README), semua anggota (refleksi) | README bisa diikuti orang lain | 60 menit | 85 menit | selesai |
