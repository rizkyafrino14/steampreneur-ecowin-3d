# Catatan Code Review

Minta AI me-review kode kalian, lalu putuskan saran mana yang diterima.
Menolak saran AI dengan alasan yang jelas adalah hal yang baik.

**Prompt review yang dipakai:** Review src/logika.js, src/app.js, src/rekap.js, dan src/penyimpanan.js dari sisi kebenaran (bug dan kasus tepi), keterbacaan, dan keamanan, dengan mempertimbangkan aturan bisnis yang berlaku. Beri daftar saran bernomor beserta usulan perbaikan, tanpa mengubah kode.

| No | Saran dari AI | Diterima / ditolak | Alasan | Bagian kode yang berubah |
|---|---|---|---|---|
| 1 | Periksa hasil `cariNasabah` dan `cariHarga` sebelum `buatSetoran` | Diterima | Opsi dropdown bisa dimanipulasi sehingga setoran bernilai 0 tanpa nasabah tersimpan. Temuannya benar: baris 184–193 di `app.js` tidak memeriksa `null`. Perbaikannya kecil dan tidak mengubah alur normal | `src/app.js`, handler `submit` (pemeriksaan `null` sebelum `buatSetoran`) |
| 2 | `hitungNilai` menolak input `null` | Ditolak | Fungsi dipanggil setelah `validasiBerat` dan `cariHarga`, dan komentarnya menyebut mengasumsikan berat valid. Usulan perbaikan AI mengembalikan `0`, yaitu hasil yang sama dengan sekarang, jadi tidak memperbaiki apa pun. Pemeriksaan `null` yang benar ada di nomor 1 | Tidak ada |
| 3 | Normalisasi tipe ID di `hitungSaldo` | Ditolak | Risikonya ada secara teori, tetapi `app.js` sudah mengubah id dari dropdown memakai `Number` lewat `cariNasabah` (baris 104), dan id di data berupa angka. Perilakunya dijaga test `hitungSaldo` | Tidak ada |
| 4 | Nama kosong jika `buatSetoran` hanya diberi ID | Ditolak | `app.js` selalu mengirim objek nasabah, dan test `buatSetoran: objek nasabah mengisi nasabahId dan nama` menjaganya. Jalur yang hanya memakai ID tidak dipakai aplikasi | Tidak ada |
| 5 | `urutkanSetoran` aman terhadap tanggal kosong | Ditolak | Setiap setoran dibuat oleh `buatSetoran` dengan tanggal terisi. Kasus ini hanya muncul bila isi localStorage diedit manual | Tidak ada |
| 6 | Tunda `revokeObjectURL` agar unduhan tidak gagal | Diterima | Mencabut alamat segera (`setTimeout` 0) bisa membuat unduhan gagal di sebagian peramban. Perubahannya hanya satu angka dan tidak memengaruhi isi CSV | `src/rekap.js`, `unduhCsv` (jeda 0 menjadi 1000 ms) |
| 7 | Saring elemen `null` di `muatSetoran` | Ditolak untuk sekarang | Data hanya ditulis oleh aplikasi sendiri, sehingga elemen `null` tidak muncul kecuali localStorage diubah manual. Dicatat sebagai batasan | Tidak ada |
| 8 | Perbarui rekap otomatis antar-tab | Ditolak untuk sekarang | Tidak ada di spesifikasi, dan cukup memuat ulang halaman rekap | Tidak ada |
| 9 | Cegah CSV formula injection | Diterima | Nama atau jenis yang diawali `=`, `+`, `-`, `@`, tab, atau CR bisa dibaca Excel sebagai rumus. Datanya sekarang berasal dari daftar tetap, tetapi pencegahannya murah dan bisa dites tanpa memengaruhi data normal | `src/logika.js`, `kutipFieldCsv`, dan 3 test baru di `tes/logika.test.js` |
| 10 | Guard `NASABAH` dan `HARGA` di `app.js` | Ditolak untuk sekarang | `data.js` selalu dimuat sebelum `app.js` di `index.html`, dan pengujian di browser tidak menunjukkan masalah | Tidak ada |
| 11 | Ganti karakter BOM tak terlihat dengan `"﻿"` | Diterima | Karakter tak terlihat mudah terhapus editor atau formatter tanpa disadari, sedangkan `﻿` terlihat jelas dan perilakunya sama (panjang string tetap 1) | `src/rekap.js`, `unduhCsv` (literal diganti `"﻿"`, dan komentar) |
| 12 | Seragamkan `var` menjadi `const` dan `let` | Ditolak | Murni gaya penulisan. Mengubah puluhan baris di `app.js` dan `rekap.js` yang sudah lulus uji browser berisiko tanpa manfaat bagi pengguna | Tidak ada |
| 13 | Satukan `isiPilihanJenis` di satu fungsi | Ditolak untuk sekarang | Duplikasinya kecil dan keduanya sudah teruji. Dicatat sebagai pekerjaan lanjutan | Tidak ada |
| 14 | Pindahkan `cariNasabah` dan format rupiah ke `logika.js` | Ditolak untuk sekarang | Refactor tanpa perubahan perilaku, dan waktu yang tersisa dipakai untuk pengujian | Tidak ada |
| 15 | `aria-describedby` dan pindah fokus ke isian yang salah | Ditolak untuk sekarang | Peningkatan aksesibilitas yang baik, tetapi tidak ada di kriteria selesai. Dicatat sebagai batasan | Tidak ada |
| 16 | Samakan urutan `<script>` di dua halaman | Ditolak | Tidak menimbulkan galat karena `penyimpanan.js` dan `logika.js` tidak saling bergantung | Tidak ada |

Penjelasan kode ditulis terpisah di `08-penjelasan-kode.md`.
