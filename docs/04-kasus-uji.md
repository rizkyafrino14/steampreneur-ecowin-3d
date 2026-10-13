# Kasus Uji

Bagian A diisi **sebelum** mulai membangun. Hasil yang diharapkan dihitung sendiri oleh tim (boleh dengan kalkulator), bukan oleh AI.
Bagian B diisi setelah aplikasi diuji.

Hasil yang diharapkan U01–U06 dan U14 sudah dihitung ulang tim dengan kalkulator (bukti: `docs/bukti/hitung-manual/`). Kolom "Hasil sebenarnya", "Lulus?", dan "Bukti" baru diisi setelah aplikasi dijalankan.

| ID | Kriteria yang diuji | Langkah / input | Hasil yang diharapkan | Hasil sebenarnya | Lulus? | Bukti (nama file tangkapan layar) |
|---|---|---|---|---|---|---|
| U01 | Nilai sesuai jenis dan kondisi | Botol PET bening, Dipisah, 2,5 kg | 4.500 × 2,5 = Rp11.250 | Nilai Rp11.250 | Ya | U01.png |
| U02 | Kondisi memengaruhi harga | Botol PET bening, Utuh, 2,5 kg | 3.500 × 2,5 = Rp8.750 (lebih rendah dari U01) | Nilai Rp8.750 | Ya | U02.png |
| U03 | Pembulatan 0,5 ke atas | Kardus, Kering, 0,33 kg | 1.950 × 0,33 = 643,5 → Rp644 | Nilai Rp644 | Ya | U03.png |
| U04 | Pembulatan 0,5 ke atas (kondisi lain) | Kardus, Basah, 0,33 kg | 750 × 0,33 = 247,5 → Rp248 | Nilai Rp248 | Ya | U04.png |
| U05 | **Batas bawah** berat diterima | Kaleng aluminium, Dipenyet, 0,1 kg | 12.000 × 0,1 = Rp1.200, tersimpan | Nilai Rp1.200 | Ya | U05.png |
| U06 | **Batas atas** berat diterima | Botol PET bening, Dipisah, 100 kg | 4.500 × 100 = Rp450.000, tersimpan | Nilai Rp450.000 | Ya | U06.png |
| U07 | **Di bawah batas** ditolak | Berat 0,09 kg | Ditolak, pesan kesalahan berat; tidak tersimpan | Pesan merah di bawah berat | Ya | U07.png |
| U08 | **Di atas batas** ditolak | Berat 100,01 kg | Ditolak, pesan kesalahan berat; tidak tersimpan | Pesan merah | Ya | U08.png |
| U09 | **Input salah**: nol dan negatif | Berat 0, lalu berat −2 | Keduanya ditolak dengan pesan yang jelas | Pesan merah, 2 foto | Ya | U09-a.png, U09-b.png |
| U10 | **Input salah**: kosong dan huruf | Berat dikosongkan, lalu berat "abc" | Keduanya ditolak dengan pesan yang jelas | Pesan merah, 2 foto | Ya | U10-a.png, U10-b.png |
| U11 | **Input salah**: lebih dari 2 desimal | Berat 1,234 kg | Ditolak, pesan maksimal 2 angka desimal | Pesan "maksimal 2 angka..." | Ya | U11.png |
| U12 | Pilihan wajib diisi | Nasabah belum dipilih; kemudian jenis atau kondisi belum dipilih | Ditolak dengan pesan pilihan wajib; tidak tersimpan | Pesan wajib dipilih, 2 foto | Ya | U12-a.png, U12-b.png |
| U13 | Pemisah desimal koma dan titik | Berat "2,5" dan berat "2.5" (jenis sama) | Keduanya dianggap 2,5 kg dan bernilai sama | Nilai sama, 2 foto | Ya | U13-a.png, U13-b.png |
| U14 | Saldo bertambah | Bu Sari (saldo Rp0) menyetor U01 lalu U02 | Saldo Rp11.250, lalu Rp20.000 | Saldo berhasil ditambahkan | Ya | U14.png |
| U15 | Data tetap ada setelah reload | Simpan setoran U01, muat ulang halaman | Setoran U01 tetap ada di rekap, dan saldo Bu Sari tetap Rp11.250 saat dipilih di formulir | Setoran tetap ada di rekap  | Ya | U15-a.png, U15-b.png |
| U16 | Rekap menampilkan semua kolom | Buka halaman rekap setelah U01 dan U02 | Tampil 2 baris dengan kolom tanggal, nasabah, kategori, jenis, kondisi, berat, nilai | Rekap menampilkan 2 baris dengan 7 kolom | Ya | U16-a.png, U16-b.png |

Wajib ada:
- minimal satu kasus dengan **input yang salah** (kosong, negatif, huruf di kolom angka),
- minimal satu kasus **di batas aturan** (contoh: tepat Rp50.000 jika aturannya "minimal Rp50.000").

## Unit test otomatis (jika ada)
Nama file test: `tes/logika.test.js` (dijalankan dengan `node --test tes/logika.test.js`)
Jumlah test: 43 lulus dari 43 (40 test awal ditambah 3 test pencegahan formula injection pada CSV)

Cakupan: U01–U06 (hitung nilai), U07–U11 dan U13 (validasi berat), U12 (pilihan wajib). U14–U16 membutuhkan aplikasi dan diuji di browser.

Pembuktian bahwa test efektif: baris pembulatan `+ 50` di `hitungNilai` sengaja diubah menjadi `+ 0`. Hasilnya U03 (643 ≠ 644) dan U04 (247 ≠ 248) gagal, sedangkan 18 test lain tetap lulus. Kode lalu dikembalikan dan 20 test lulus kembali.

## Kasus uji change request (cari, filter, unduh CSV)

Data uji (disimpan lebih dulu lewat formulir, dari localStorage yang kosong):

| Setoran | Nasabah | Jenis | Kondisi | Berat | Nilai (dihitung manual) |
|---|---|---|---|---|---|
| S1 | Bu Sari | Botol PET bening | Dipisah | 2,5 kg | 4.500 × 2,5 = Rp11.250 |
| S2 | Bu Sari | Botol PET bening | Utuh | 2,5 kg | 3.500 × 2,5 = Rp8.750 |
| S3 | Pak Budi | Kardus | Kering | 2 kg | 1.950 × 2 = Rp3.900 |
| S4 | Bu Ani | Gelas plastik | Bersih | 1,5 kg | 3.000 × 1,5 = Rp4.500 |

| ID | Kriteria yang diuji | Langkah / input | Hasil yang diharapkan | Hasil sebenarnya | Lulus? | Bukti (nama file tangkapan layar) |
|---|---|---|---|---|---|---|
| C01 | Pencarian | Ketik `kardus` di kotak cari | Hanya S3 yang tampil | Menampilkan S3 | Ya | C01.png |
| C02 | Tanpa membedakan huruf | Ketik `KARDUS` | Hasil sama dengan C01 | Menampilkan S3 | Ya | C02.png |
| C03 | Pencarian nasabah | Ketik `sari` | S1 dan S2 tampil | Menampilkan hasil 'sari' | Ya | C03.png |
| C04 | Tidak ada yang cocok | Ketik `xyz` | Tabel kosong dan tampil "Data tidak ditemukan" | Data tidak ditemukan | Ya | C04.png |
| C05 | Filter jenis | Pilih filter "Botol PET bening" | S1 dan S2 tampil | Menampilkan S1 dan S2 | Ya | C05.png |
| C06 | Pencarian dan filter bersamaan | Filter "Botol PET bening", lalu ketik `utuh` | Hanya S2 tampil | Menampilkan S2 | Ya | C06.png |
| C07 | Kembali ke semua data | Hapus kata pencarian, pilih "Semua jenis" | S1 sampai S4 tampil | Menampilkan S1 - S4 | Ya | C07.png |
| C08 | Unduh CSV tanpa saringan | Klik Unduh CSV | Baris nama kolom dan 4 baris data | Menampilkan baris nama dan 4 baris data | Ya | C08.png |
| C09 | Unduh CSV mengikuti saringan | Lakukan C06, klik Unduh CSV | Baris nama kolom dan 1 baris data (S2) | Menampilkan baris data S2 | Ya | C09.png |
| C10 | Format angka di CSV | Buka file CSV di Excel | Kolom terpisah, nilai `8750` (bukan `Rp8.750`), berat `2.5` | Menampilkan S2 | Ya | C10.png |
| C11 | Kasus lama tidak rusak | Jalankan ulang U01 sampai U16 dan `node --test tes/logika.test.js` | Semua tetap lulus | Menampilkan data yang lulus | Ya |  |


Uji clone README pada komputer bersih (Windows, Node.js v24.18.0), 13 Okt 2026: clone berhasil, perintah node --test tes/logika.test.js menghasilkan 40 lulus dari 40. Perintah lama node --test tes/ gagal (MODULE_NOT_FOUND), sehingga README diperbaiki.

Pengujian ulang setelah perubahan hasil review kode (13 Okt 2026): U01 sampai U15 dan C01 sampai C10 dijalankan ulang di browser dan sesuai hasil yang diharapkan, dengan data uji S1 sampai S4. node --test tes/logika.test.js: 43 lulus dari 43. Pembukaan CSV langsung di Excel belum diulang setelah perubahan.
