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
- **Ditulis oleh:** Rofiqi Adyata Faizin
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

(Tambahkan sampai setiap anggota punya minimal dua penjelasan.)

---

## Bagian B: Pertanyaan yang dijawab bersama

1. Jika aturan bisnis utama di spesifikasi berubah (tuliskan contoh perubahannya), file dan fungsi mana yang harus diubah? Jelaskan alasannya.

2. Bagaimana data mengalir dari saat pengguna mengisi form sampai hasilnya tampil di layar? Sebutkan file dan fungsi yang dilewati secara berurutan.

3. Pilih satu unit test. Apa yang diuji, dan dalam kondisi apa test itu akan gagal?

4. Pilih satu saran AI yang kalian tolak. Apa sarannya dan kenapa kalian menolaknya?

5. Bagian kode mana yang paling sulit dipahami, dan bagaimana kalian akhirnya memahaminya?
