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
Nama file test: `tes/logika.test.js` (dijalankan dengan `node --test tes/`)
Jumlah test: 20 lulus dari 20

Cakupan: U01–U06 (hitung nilai), U07–U11 dan U13 (validasi berat), U12 (pilihan wajib). U14–U16 membutuhkan aplikasi dan diuji di browser.

Pembuktian bahwa test efektif: baris pembulatan `+ 50` di `hitungNilai` sengaja diubah menjadi `+ 0`. Hasilnya U03 (643 ≠ 644) dan U04 (247 ≠ 248) gagal, sedangkan 18 test lain tetap lulus. Kode lalu dikembalikan dan 20 test lulus kembali.
