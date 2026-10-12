# Kasus Uji

Bagian A diisi **sebelum** mulai membangun. Hasil yang diharapkan dihitung sendiri oleh tim (boleh dengan kalkulator), bukan oleh AI.
Bagian B diisi setelah aplikasi diuji.

Hasil yang diharapkan U01–U06 dan U14 sudah dihitung ulang tim dengan kalkulator (bukti: `docs/bukti/hitung-manual/`). Kolom "Hasil sebenarnya", "Lulus?", dan "Bukti" baru diisi setelah aplikasi dijalankan.

| ID | Kriteria yang diuji | Langkah / input | Hasil yang diharapkan | Hasil sebenarnya | Lulus? | Bukti (nama file tangkapan layar) |
|---|---|---|---|---|---|---|
| U01 | Nilai sesuai jenis dan kondisi | Botol PET bening, Dipisah, 2,5 kg | 4.500 × 2,5 = Rp11.250 | | | |
| U02 | Kondisi memengaruhi harga | Botol PET bening, Utuh, 2,5 kg | 3.500 × 2,5 = Rp8.750 (lebih rendah dari U01) | | | |
| U03 | Pembulatan 0,5 ke atas | Kardus, Kering, 0,33 kg | 1.950 × 0,33 = 643,5 → Rp644 | | | |
| U04 | Pembulatan 0,5 ke atas (kondisi lain) | Kardus, Basah, 0,33 kg | 750 × 0,33 = 247,5 → Rp248 | | | |
| U05 | **Batas bawah** berat diterima | Kaleng aluminium, Dipenyet, 0,1 kg | 12.000 × 0,1 = Rp1.200, tersimpan | | | |
| U06 | **Batas atas** berat diterima | Botol PET bening, Dipisah, 100 kg | 4.500 × 100 = Rp450.000, tersimpan | | | |
| U07 | **Di bawah batas** ditolak | Berat 0,09 kg | Ditolak, pesan kesalahan berat; tidak tersimpan | | | |
| U08 | **Di atas batas** ditolak | Berat 100,01 kg | Ditolak, pesan kesalahan berat; tidak tersimpan | | | |
| U09 | **Input salah**: nol dan negatif | Berat 0, lalu berat −2 | Keduanya ditolak dengan pesan yang jelas | | | |
| U10 | **Input salah**: kosong dan huruf | Berat dikosongkan, lalu berat "abc" | Keduanya ditolak dengan pesan yang jelas | | | |
| U11 | **Input salah**: lebih dari 2 desimal | Berat 1,234 kg | Ditolak, pesan maksimal 2 angka desimal | | | |
| U12 | Pilihan wajib diisi | Nasabah belum dipilih; kemudian jenis atau kondisi belum dipilih | Ditolak dengan pesan pilihan wajib; tidak tersimpan | | | |
| U13 | Pemisah desimal koma dan titik | Berat "2,5" dan berat "2.5" (jenis sama) | Keduanya dianggap 2,5 kg dan bernilai sama | | | |
| U14 | Saldo bertambah | Bu Sari (saldo Rp0) menyetor U01 lalu U02 | Saldo Rp11.250, lalu Rp20.000 | | | |
| U15 | Data tetap ada setelah reload | Simpan setoran U01, muat ulang halaman | Setoran U01 tetap ada di rekap, dan saldo Bu Sari tetap Rp11.250 saat dipilih di formulir | | | |
| U16 | Rekap menampilkan semua kolom | Buka halaman rekap setelah U01 dan U02 | Tampil 2 baris dengan kolom tanggal, nasabah, kategori, jenis, kondisi, berat, nilai | | | |

Wajib ada:
- minimal satu kasus dengan **input yang salah** (kosong, negatif, huruf di kolom angka),
- minimal satu kasus **di batas aturan** (contoh: tepat Rp50.000 jika aturannya "minimal Rp50.000").

## Unit test otomatis (jika ada)
Nama file test: ...
Jumlah test: ... lulus dari ...
