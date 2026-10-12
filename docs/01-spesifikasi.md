# Spesifikasi Produk

**Nama tim:** Ecowin 3D (SMKN Tengaran)
**Nama produk:** EcoWin
**Alur inti yang dibangun:** Petugas bank sampah RT/RW mencatat setoran sampah anorganik seorang nasabah, melihat nilai rupiahnya yang dihitung otomatis, lalu menyimpannya sehingga saldo nasabah bertambah dan setoran tampil di halaman rekap.

## 1. Masalah

Bank sampah di tingkat RT/RW masih mencatat setoran secara manual di buku tabungan. Padahal harga sampah anorganik berbeda-beda menurut jenis dan kondisinya (contoh: botol PET bening yang tutup dan labelnya sudah dilepas dihargai lebih tinggi daripada yang masih utuh). Akibatnya petugas harus menghitung harga satu per satu dengan tangan, perhitungan rawan salah, dan riwayat setoran sulit dicari kembali. Yang mengalami masalah ini adalah petugas bank sampah dan nasabah (warga) yang setorannya dicatat.

## 2. Pengguna

- **Petugas bank sampah** (pengguna utama): perlu mencatat setoran dengan cepat, nilai rupiah yang benar tanpa hitung manual, dan melihat kembali riwayat setoran.
- **Nasabah (warga)**: perlu tahu setorannya dihargai berapa dan berapa saldonya.

## 3. Hasil wawancara calon pengguna

**Narasumber:** Petugas bank sampah  
**Cara wawancara:** Wawancara langsung dengan petugas bank sampah  
**Tanggal:** 11 Oktober 2026

| No. | Pertanyaan kami | Jawaban narasumber |
|---|---|---|
| 1 | Bagaimana proses penerimaan setoran sampah saat ini? | Nasabah datang membawa sampah, lalu petugas memeriksa, memilah, dan menimbangnya. |
| 2 | Siapa yang mencatat setoran dari nasabah? | Petugas bank sampah yang sedang bertugas. |
| 3 | Data apa saja yang dicatat saat nasabah menyetor sampah? | Nama atau kartu nasabah, jenis sampah, berat, harga, nilai setoran, dan tanggal transaksi. |
| 4 | Apakah nasabah membawa kartu atau identitas tertentu? | Nasabah membawa kartu nasabah. Jika tidak membawa, petugas mencari data berdasarkan nama di buku. |
| 5 | Jenis sampah apa saja yang diterima? | Sampah anorganik sesuai jenis yang diterima bank sampah. |
| 6 | Bagaimana sampah ditimbang? | Sampah ditimbang sesuai kategori menggunakan timbangan yang tersedia di bank sampah. |
| 7 | Satuan berat apa yang digunakan? | Berat dicatat dalam satuan kilogram. |
| 8 | Bagaimana harga setiap jenis sampah ditentukan? | Harga ditentukan oleh pengelola bank sampah dan dapat berbeda berdasarkan jenis sampah. |
| 9 | Bagaimana nilai setoran dihitung? | Nilai setoran dihitung dari berat sampah dikalikan harga per kilogram jenis sampah tersebut. |
| 10 | Apakah harga sampah dapat berubah dan seberapa sering? | Harga dapat berubah mengikuti keputusan pengelola dan kondisi harga jual sampah. |
| 11 | Perangkat apa yang digunakan petugas? | Petugas biasanya menggunakan ponsel untuk menghitung dengan kalkulator. |
| 12 | Apakah lokasi bank sampah memiliki koneksi internet yang stabil? | Koneksi internet di lokasi cukup baik. |

Jika tidak memungkinkan wawancara, tulis persona pengguna dan dasar asumsi kalian di sini.


## 4. Fitur wajib (hanya untuk alur inti)
1. **Pilih nasabah** dari daftar data contoh; saldo nasabah yang dipilih ditampilkan di formulir.
2. **Isi formulir setoran**: kategori (Anorganik), jenis, kondisi, dan berat (kg), dengan validasi dan pesan kesalahan yang jelas.
3. **Hitung nilai otomatis** dari harga per kg (sesuai kombinasi jenis dan kondisi) × berat, lalu tampilkan sebelum disimpan.
4. **Simpan setoran** ke localStorage; saldo nasabah bertambah dan data tetap ada setelah halaman dimuat ulang.
5. **Halaman rekap** yang menampilkan semua setoran tersimpan dengan kolom tanggal, nasabah, kategori, jenis, kondisi, berat, dan nilai.
6. **Pencarian** di halaman rekap: tersaring langsung, tanpa membedakan huruf besar dan kecil.
7. **Filter jenis** yang bisa dipakai bersamaan dengan pencarian. Pesan "Data tidak ditemukan" jika tidak ada yang cocok.
8. **Unduh CSV** (`ecowin-rekap.csv`) untuk baris yang sedang tampil. Baris pertama berisi nama kolom, nilai ditulis tanpa Rp dan tanpa pemisah ribuan (contoh `8750`), dan berat memakai titik desimal (contoh `2.5`).

## 5. Di luar cakupan (tidak dikerjakan dalam challenge ini)
- Produk fisik BioporiPrint (pipa biopori cetak 3D); tidak dibangun karena produk challenge tidak boleh melibatkan perangkat keras.
- Sampah organik dan estimasi kompos (berat × 0,5): baru ditambahkan **hanya jika** kelima kriteria minimum sudah tuntas.
- Login dan manajemen akun, penarikan saldo, edit atau hapus setoran, laporan per RT/RW, dan server atau database online.
- Filter selain jenis sampah (nasabah, tanggal) dan penyimpanan berkas CSV ke server.
- Data warga sungguhan; semua nama dan harga adalah data contoh.

## 6. Aturan bisnis dan perhitungan
- Nilai setoran = harga per kg (sesuai kombinasi jenis dan kondisi) × berat (kg), **dibulatkan ke rupiah terdekat** (0,5 ke atas dibulatkan naik).
- Dasar aturan: wawancara (no. 8–10) menyatakan harga ditentukan pengelola bank sampah, berbeda menurut jenis sampah, dan dapat berubah. **Pembedaan harga menurut kondisi sampah dan batas berat 0,1–100 kg adalah asumsi produk tim**, belum dikonfirmasi narasumber. Karena harga bisa berubah, tabel harga disimpan di satu berkas data agar mudah diganti tanpa mengubah rumus.
- Harga per kg (data contoh, bukan harga resmi bank sampah mana pun):

  | Jenis | Kondisi | Harga per kg |
  |---|---|---|
  | Botol PET bening | Dipisah (tutup dan label dilepas) | Rp4.500 |
  | Botol PET bening | Utuh | Rp3.500 |
  | Gelas plastik | Bersih | Rp3.000 |
  | Gelas plastik | Kotor | Rp1.500 |
  | Kardus | Kering | Rp1.950 |
  | Kardus | Basah | Rp750 |
  | Kaleng aluminium | Dipenyet | Rp12.000 |
  | Kaleng aluminium | Utuh | Rp10.000 |

- Berat harus **angka dari 0,1 sampai 100 kg (termasuk batas)**, dengan paling banyak 2 angka di belakang koma. Koma atau titik diterima sebagai pemisah desimal.
- Nasabah, kategori, jenis, dan kondisi **wajib dipilih**. Pilihan kondisi mengikuti jenis yang dipilih.
- Saldo nasabah = jumlah nilai semua setoran nasabah tersebut. Saldo awal setiap nasabah contoh adalah Rp0.
- Tanggal setoran diisi otomatis dengan tanggal hari ini.

## 7. Data yang disimpan
| Data | Contoh isi | Disimpan di mana |
|---|---|---|
| Setoran (tanggal, nasabah, kategori, jenis, kondisi, berat, nilai) | 2026-10-12, Bu Sari, Anorganik, Botol PET bening, Dipisah, 2,5 kg, Rp11.250 | localStorage browser (kunci `ecowin_setoran`) |
| Daftar nasabah contoh | Bu Sari (RT 01) | Berkas data di kode (`src/`), bukan data warga sungguhan |
| Tabel harga per kg | Botol PET bening, Dipisah, 4500 | Berkas data di kode (`src/`) |
| Saldo nasabah | Rp20.000 | Tidak disimpan terpisah; dihitung dari jumlah setoran agar selalu konsisten |

## 8. Kriteria "selesai"
Setiap kriteria harus bisa diuji (bisa dijawab ya atau tidak).
- [x] Petugas dapat menyelesaikan empat langkah alur inti (...) sampai setoran muncul di rekap.
- [x] Formulir menolak nasabah/jenis/kondisi yang belum dipilih dengan pesan kesalahan yang jelas.
- [x] Formulir menolak berat kosong, huruf, nol, negatif, ...
- [x] Nilai setoran sesuai tabel harga × berat dan dibulatkan ke rupiah terdekat ...
- [x] Kondisi memengaruhi harga ...
- [x] Saldo nasabah bertambah sebesar nilai setiap setoran yang disimpan.
- [x] Setoran dan saldo tetap ada setelah halaman dimuat ulang.
- [x] Halaman rekap menampilkan kolom tanggal, nasabah, kategori, jenis, kondisi, berat, dan nilai ...
- [x] Semua unit test lulus dengan `node --test`.
- [ ] README dapat diikuti dari clone sampai website berjalan.
- [x] Kotak cari menyaring rekap langsung saat mengetik ...
- [x] Filter jenis bisa dipakai bersamaan dengan pencarian ...
- [x] Jika ada data tetapi tidak ada yang cocok, tampil "Data tidak ditemukan" ...
- [x] Unduh CSV memuat baris yang sedang tampil ...