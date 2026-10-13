# Penjelasan Kode

Tidak ada sesi presentasi, jadi dokumen ini adalah bukti utama bahwa tim memahami kode yang dihasilkan AI.

Aturan:
- Setiap anggota menjelaskan **minimal dua bagian kode yang berbeda**. Bagian yang dijelaskan tidak boleh sama dengan anggota lain.
- Tulis dengan bahasa sendiri. Boleh bertanya ke AI untuk memahami, tetapi jangan menyalin jawabannya.
- Sebut nama file dan fungsi yang nyata, serta contoh nilai yang nyata.
- Jika memungkinkan, setiap anggota meng-commit bagiannya sendiri dari akun GitHub masing-masing.

---

## Bagian A: Penjelasan per anggota

### Penjelasan 1
- **Ditulis ole- **Ditulis oleh:** Rofiqi Adyata Faizin
- **File dan fungsi:** 'src/logika.js',fungsi 'hitungSaldo' (baris ke 96 sampai 104)
- **Apa yang dilakukan:** Pada fungsi ini mengambil dan menerima daftar setoran id nasabah pada bank sampah ecowin. Yang menjumlahkan kolom baris nilai dari setoran yang nasabahId-nya sama dengan id tersebut lalu mengembalikan dan mengambil total transaksi sebagai saldo
- **Kenapa dibuat seperti ini:** Agar saldo tidak disimpan sendiri di localStorage tetapi dihitung dari seluruh daftar setoran yang dibutuhkan. Jadi saldo tidak bisa berbeda dari isi rekap. Apabila saldo disimpan terpisah, bisa saja angkanya lupa diperbarui dan fungsinya tidak dapat mengambl isi halaman web sehingga dites dengan "node --test"
- **Contoh:** jika inputnya berisi 2 setoran Bu Sari (nasabahId: 1), hasilnya bernilai 11250 dan 8750 ketika dijumlahkan menghasilkan 20000, karena setoran memiliki id yang sama ketika dijumlahkan .
- **Jika input salah atau kosong:** Jika daftar kosong, hasilnya 0. Dan jika id nasabah tidak ada di daftar maka hasilnya juga 0. 

### Penjelasan 2
- **Ditulis oleh:** Rofiqi Adyata Faizin
- **File dan fungsi:** 'src/logika.js', memiliki fungsi "cari harga" (baris ke 8 sampai 15).
- **Apa yang dilakukan:** Pada fungsi ini memiliki fungsi untuk menerima dan mengambil data daftar harga, nama jenis, nama kondisi, dengan cara memeriksa daftar 1 per 1 dan mengembalikan "harga/kg" jika data tidak cocok maka mengembalikan nilai null.
- **Kenapa dibuat seperti ini:** Karena harga ditentukan oleh kondisi dan jenis, contoh botol PET bening yang dipisah dan yang utuh harganya berbeda. Ketika data tidak ditemukan mengembalikan nilai null dan bukan 0 hal ini dibuat agar membedakan "kombinasi tidak ada" dari harga 0
- **Contoh:** Jika input "cari harga (harga botol PET bening yang dipisah)" hasilnya 4500 karena masing-masing data harga ada ditabel.
- **Jika input salah atau kosong:** Maka akan menghasilkan nilai null, dalam kondisi ini baris tidak diketahui dan dikenal oleh "test/logika.js".

### Penjelasan 6
- **Ditulis oleh:** Rizky Mustafa Afrino
- **File dan fungsi:** `src/logika.js`, fungsi `hitungNilai` (baris 63 sampai 68)
- **Apa yang dilakukan:** Fungsi ini menerima harga per kilo dan berat, lalu mengembalikan nilai pada setoran dalam rupiah yang bulat. Caranya ada tiga langkah: berat dikali 100 supaya jadi bilangan bulat, dikalikan harga per kilo, lalu hasilnya ditambah 50 dan dibagi 100 dengan `Math.floor`.
- **Kenapa dibuat seperti ini:** Perkalian pecahan di JavaScript bisa meleset sedikit, jadi berat diubah dulu ke bilangan bulat (per 0,01 kg) sebelum dikalikan. Tambah 50 sebelum dibagi 100 dipakai supaya pecahan 0,5 ke atas dibulatkan naik sesuai aturan spesifikasi. Kalau langsung `Math.round(harga * berat)`, hasilnya bergantung pada pecahan desimal komputer. Tim pernah mengubah `+ 50` menjadi `+ 0` dan test U03 serta U04 langsung gagal (hasil 643 dan 247), jadi baris ini memang yang mengatur pembulatan.
- **Contoh:** jika inputnya `hitungNilai(1950, 0.33)`, hasilnya `644`. Berat `0.33` dikali 100 jadi `33`. Lalu `1950 × 33 = 64350`. Ditambah 50 jadi `64400`, dibagi 100 jadi `644`. Tanpa tambah 50, hasilnya 643,5 dipotong jadi 643, padahal aturannya naik ke 644.
- **Jika input salah atau kosong:** Fungsi ini tidak memeriksa masukannya sendiri. Berat yang salah seperti `abc` atau `0,09` sudah ditolak lebih dulu oleh `validasiBerat` di formulir, dan nilai ditampilkan `Nilai: -`, sehingga `hitungNilai` tidak pernah menerima berat yang salah.

### Penjelasan 7
- **Ditulis oleh:** Rizky Mustafa Afrino
- **File dan fungsi:** `src/app.js`, handler `submit` pada `form-setoran` (baris 162 sampai 216)
- **Apa yang dilakukan:** Handler ini berjalan saat tombol Simpan diklik. Pertama ia menahan halaman agar tidak dimuat ulang. Lalu ia memanggil `validasiSetoran`. Kalau ada yang salah, pesan kesalahan ditampilkan dan proses berhenti. Kalau valid, ia mencari nasabah dan harga, membuat setoran dengan `buatSetoran`, membaca daftar lama dari `localStorage`, menambahkan setoran baru, lalu menyimpannya dengan `simpanSetoran`. Terakhir ia mengosongkan jenis, kondisi, dan berat, lalu memperbarui nilai dan saldo.
- **Kenapa dibuat seperti ini:** Validasi dan rumus dipanggil dari `logika.js`, tidak ditulis ulang di `app.js`, supaya aturannya hanya ada di satu tempat dan bisa dites dengan `node --test`. Daftar setoran dibaca ulang tepat sebelum disimpan, supaya data dari tab lain tidak tertimpa. Nasabah dibiarkan terpilih karena petugas biasanya mencatat beberapa jenis sampah untuk orang yang sama berturut-turut.
- **Contoh:** jika Bu Sari memilih Botol PET bening, kondisi Dipisah, berat `2,5`, lalu klik Simpan, setoran bernilai `11250` tersimpan dengan tanggal hari ini, tampil pesan "Setoran tersimpan. Nilai: Rp11.250", saldo Bu Sari jadi `Rp11.250`, dan isian jenis, kondisi, serta berat dikosongkan.
- **Jika input salah atau kosong:** Kalau berat diisi `abc`, `validasiSetoran` mengembalikan `valid: false`, pesan "Berat harus berupa angka" tampil di bawah isian, dan handler berhenti sebelum menyentuh `localStorage`, jadi tidak ada yang tersimpan. Kalau penyimpanan gagal, tampil "Penyimpanan gagal. Data tidak tersimpan."

Bagian B: Pertanyaan yang dijawab bersama

1. Jika aturan bisnis utama di spesifikasi berubah (tuliskan contoh perubahannya), file dan fungsi mana yang harus diubah? Jelaskan alasannya.

2. Bagaimana data mengalir dari saat pengguna mengisi form sampai hasilnya tampil di layar? Sebutkan file dan fungsi yang dilewati secara berurutan.

3. Pilih satu unit test. Apa yang diuji, dan dalam kondisi apa test itu akan gagal?

4. Pilih satu saran AI yang kalian tolak. Apa sarannya dan kenapa kalian menolaknya?

5. Bagian kode mana yang paling sulit dipahami, dan bagaimana kalian akhirnya memahaminya?
