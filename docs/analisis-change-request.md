# Analisis Change Request

**Change request:** pencarian, filter, dan ekspor CSV (lihat Tugas 3 di lembar challenge).

**Kriteria penerimaan yang akan dipenuhi dan cara kami memenuhinya:**

1. **Kotak pencarian di halaman rekap.** Daftar tersaring langsung saat teks diketik, tanpa membedakan huruf besar dan kecil. Teks dicocokkan dengan kolom nasabah, jenis, kondisi, dan kategori. Cara: kejadian `input` pada kotak cari memanggil fungsi saring, lalu tabel digambar ulang.
2. **Satu filter berdasarkan jenis sampah** (pilihan dropdown/bergulir kebawah berisi "Semua jenis" dan jenis dari data harga). Pencarian dan filter bisa dipakai bersamaan: fungsi saring menerapkan keduanya sekaligus.
3. **Pesan "Data tidak ditemukan"** tampil jika tidak ada baris yang cocok. Pesan "Belum ada setoran" tetap dipakai hanya jika memang belum ada data sama sekali, sehingga keduanya tidak tertukar.
4. **Tombol Unduh CSV** mengunduh baris yang sedang tampil (sesuai pencarian dan filter yang aktif). Baris pertama berisi nama kolom, sama dengan kolom di rekap.
5. **Angka di CSV tanpa format.** Nilai ditulis tanpa `Rp` dan tanpa pemisah ribuan (contoh `8750`, bukan `Rp8.750`), berat ditulis dengan titik desimal (contoh `2.5`), dan tanggal tetap `YYYY-MM-DD`. File dibuat sebagai teks UTF-8 agar bisa dibuka di Excel.
6. **Semua kasus uji lama (U01 sampai U16) tetap lulus**, dan semua unit test lama tidak diubah.

## 1. Dampak
| Bagian yang terdampak | File / fungsi | Perubahan yang diperlukan |
|---|---|---|
| Spesifikasi | `docs/01-spesifikasi.md` bagian 4, 5, dan 8 | Pindahkan "pencarian, filter, dan ekspor CSV" dari "Di luar cakupan" menjadi fitur wajib, lalu tambah kriteria selesai untuk cari, filter, dan CSV |
| Kode: tampilan | `src/rekap.html` | Tambah kotak cari, dropdown filter jenis, tombol Unduh CSV, dan tempat pesan "Data tidak ditemukan" |
| Kode: perilaku halaman | `src/rekap.js` | Hubungkan kotak cari, filter, dan tombol ke fungsi di `logika.js`; gambar ulang tabel dan jumlah setoran dari hasil saringan; buat file unduhan |
| Kode: logika | `src/logika.js` | Tambah fungsi murni tanpa DOM (nama usulan: `saringSetoran` dan `buatCsv`). Fungsi yang sudah ada tidak diubah |
| Kode yang tidak berubah | `src/penyimpanan.js`, `src/app.js`, `src/data.js`, `src/index.html` | Tidak ada. Data yang tersimpan tidak berubah bentuknya |
| Kasus uji / test | `tes/logika.test.js` dan `docs/04-kasus-uji.md` | Tambah test untuk fungsi baru dan kasus uji C01 sampai C11. Test dan kasus uji lama tidak diubah |
| README | `README.md` | Tambah fitur cari, filter, dan CSV di daftar fitur, perbarui jumlah test, dan tambah tangkapan layar hasil change request |

Risiko yang sudah dipertimbangkan:
- **Pemisah kolom di Excel.** Excel dengan pengaturan wilayah Indonesia kadang memakai titik koma, bukan koma, sehingga isi CSV bisa menyatu dalam satu kolom. Cara memeriksa: file hasil unduhan dibuka sendiri di Excel. Jika menyatu, ganti pemisah menjadi titik koma dan catat di README.
- **Teks diawali `=`, `+`, `-`, atau `@`** bisa dibaca Excel sebagai rumus. Nilai di data kami berasal dari pilihan tetap, jadi risikonya rendah, tetapi fungsi pembuat CSV tetap memberi tanda kutip pada nilai yang mengandung koma atau tanda kutip.
- **Rekap harus tetap tampil benar** saat data kosong, rusak, atau hanya satu baris.

## 2. Kasus uji baru
Data uji (disimpan lebih dulu lewat formulir, dari localStorage yang kosong):
S1 Bu Sari, Botol PET bening, Dipisah, 2,5 kg = Rp11.250; S2 Bu Sari, Botol PET bening, Utuh, 2,5 kg = Rp8.750; S3 Pak Budi, Kardus, Kering, 2 kg = Rp3.900; S4 Bu Ani, Gelas plastik, Bersih, 1,5 kg = Rp4.500.

| ID | Langkah / input | Hasil yang diharapkan |
|---|---|---|
| C01 | Ketik `kardus` di kotak cari | Hanya S3 yang tampil |
| C02 | Ketik `KARDUS` (huruf besar) | Hasil sama dengan C01 |
| C03 | Ketik `sari` | S1 dan S2 tampil |
| C04 | Ketik `xyz` | Tabel kosong dan tampil "Data tidak ditemukan" |
| C05 | Pilih filter jenis "Botol PET bening" | S1 dan S2 tampil |
| C06 | Filter "Botol PET bening", lalu ketik `utuh` | Hanya S2 tampil |
| C07 | Hapus kata pencarian dan pilih "Semua jenis" | S1 sampai S4 tampil lagi |
| C08 | Klik Unduh CSV tanpa pencarian dan filter | File berisi baris nama kolom dan 4 baris data |
| C09 | Lakukan C06, lalu klik Unduh CSV | File berisi baris nama kolom dan 1 baris data (S2) |
| C10 | Buka file CSV di Excel | Kolom terpisah dengan benar, nilai ditulis `8750` (bukan `Rp8.750`), berat `2.5` |
| C11 | Jalankan ulang U01 sampai U16 dan `node --test tes/` | Semua kasus uji lama dan semua test lama tetap lulus |

## 3. Setelah selesai
- [ ] Kasus uji lama tetap lulus
- [ ] Kasus uji baru lulus
- [ ] Spesifikasi diperbarui
- [ ] README diperbarui