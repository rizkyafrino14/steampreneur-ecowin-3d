# Catatan Bug Hunt: Kasir Kantin STEAM

**Nama tim:** Ecowin 3D (SMKN Tengaran)

Buat satu entri untuk setiap bug yang ditemukan. Simpan file ini di folder `bughunt-kasir/`.

Semua test ada di `bughunt-kasir/tes/aturan.test.js` dan dijalankan dengan `node --test` dari folder `bughunt-kasir`. Test tiap bug **gagal pada kode asli** (commit `bughunt: kode asli`) dan **lulus setelah perbaikan**. Hasil yang diharapkan dihitung manual dari aturan di `README.md`.

## Bug 1
- **Gejala** (apa yang terlihat salah): Menambahkan Es Teh 2, lalu menambah Es Teh 3 membuat jumlah di keranjang menjadi 23, bukan 5.
- **Langkah untuk memunculkan bug:** Pilih Es Teh, isi jumlah 2, klik Tambah. Pilih Es Teh lagi, isi jumlah 3, klik Tambah.
- **Aturan bisnis yang dilanggar** (nomor aturan di README): Aturan 2.
- **Penyebab** (file, fungsi, dan penjelasan): `kasir.js`, fungsi `tambahItem`. Nilai dari kotak jumlah di halaman selalu berupa teks (`"2"`, `"3"`), dan fungsi memakainya langsung pada `itemLama.qty += qty`. Karena `+` pada teks berarti menggabung, hasilnya `"23"`.
- **Perbaikan** (apa yang diubah): Jumlah diubah ke angka dengan `Number(qty)` sebelum dipakai, lalu variabel `jumlah` dipakai untuk menjumlahkan dan menyimpan.
- **Test yang membuktikan** (nama test): `Bug 1: jumlah dari formulir (teks) dijumlahkan sebagai angka, Es Teh 2 ditambah 3 menjadi 5`
- **Commit perbaikan** (pesan commit): `perbaikan: jumlah dari formulir berupa teks sehingga Es Teh 2 ditambah 3 menjadi 23, bukan 5`
- **Ditemukan oleh:** bersama (AI membaca kode terhadap aturan, lalu dibuktikan dengan test yang gagal pada kode asli)

## Bug 2
- **Gejala:** Jumlah nol, negatif, pecahan, kosong, atau lebih dari 99 diterima dan masuk ke keranjang.
- **Langkah untuk memunculkan bug:** Isi jumlah 0, atau -1, atau 1,5, atau 100, lalu klik Tambah.
- **Aturan bisnis yang dilanggar:** Aturan 1.
- **Penyebab:** `kasir.js`, fungsi `tambahItem`. Fungsi tidak memeriksa jumlah sama sekali, hanya mencari produk lalu menyimpannya.
- **Perbaikan:** Setelah jumlah diubah ke angka, fungsi menolak dengan `Error("Jumlah harus bilangan bulat dari 1 sampai 99")` bila jumlahnya bukan bilangan bulat atau di luar 1 sampai 99. Teks kosong dan teks bukan angka menjadi 0 atau `NaN` sehingga ikut ditolak.
- **Test yang membuktikan:** `Bug 2: jumlah selain bilangan bulat 1 sampai 99 ditolak dengan pesan` dan `Bug 2: jumlah 1 dan 99 (angka maupun teks) diterima`
- **Commit perbaikan:** `perbaikan: jumlah pesanan tidak divalidasi sehingga nol, negatif, pecahan, kosong, dan lebih dari 99 diterima`
- **Ditemukan oleh:** bersama (AI membaca kode terhadap aturan, lalu dibuktikan dengan test)

## Bug 3
- **Gejala:** Es Teh 60 lalu ditambah 40 menjadi 100 di keranjang, padahal batas jumlah per produk 99.
- **Langkah untuk memunculkan bug:** Tambah Es Teh 60, lalu tambah Es Teh 40.
- **Aturan bisnis yang dilanggar:** Aturan 2 (total jumlah per produk tetap tidak boleh lebih dari 99).
- **Penyebab:** `kasir.js`, fungsi `tambahItem`, cabang `if (itemLama)`. Jumlah baru dijumlahkan ke jumlah lama tanpa memeriksa hasil penjumlahannya.
- **Perbaikan:** Sebelum menambah, periksa `itemLama.qty + jumlah > 99`. Jika ya, lempar `Error("Total jumlah per produk tidak boleh lebih dari 99")` sebelum keranjang diubah, sehingga jumlah lama tetap 60.
- **Test yang membuktikan:** `Bug 3: total jumlah satu produk tidak boleh lebih dari 99 dan keranjang tidak berubah saat ditolak`
- **Commit perbaikan:** `perbaikan: jumlah produk yang sama bisa melebihi 99 setelah dijumlahkan`
- **Ditemukan oleh:** bersama (AI membaca kode terhadap aturan, lalu dibuktikan dengan test)

## Bug 4
- **Gejala:** Pelanggan bukan member dengan subtotal tepat Rp100.000 tidak mendapat diskon 5%.
- **Langkah untuk memunculkan bug:** Tambah Es Teh 25 (25 x 4.000 = 100.000), jangan centang member. Diskon tampil Rp0.
- **Aturan bisnis yang dilanggar:** Aturan 4 (bukan member dengan subtotal minimal Rp100.000 mendapat diskon 5%).
- **Penyebab:** `kasir.js`, fungsi `hitungDiskon`. Syaratnya ditulis `subtotal > 100000` (lebih dari), padahal aturannya minimal, yaitu sama dengan atau lebih dari 100.000.
- **Perbaikan:** Pembanding diganti menjadi `subtotal >= 100000`.
- **Test yang membuktikan:** `Bug 4: bukan member dengan subtotal tepat Rp100.000 mendapat diskon 5%, Rp99.999 tidak`
- **Commit perbaikan:** `perbaikan: subtotal tepat Rp100.000 tidak mendapat diskon 5% karena batas memakai lebih dari, bukan minimal`
- **Ditemukan oleh:** bersama (AI membaca kode terhadap aturan, lalu dibuktikan dengan test)

## Bug 5
- **Gejala:** Pelanggan member dengan subtotal Rp120.000 mendapat diskon Rp18.000 (15%), bukan Rp12.000 (10%).
- **Langkah untuk memunculkan bug:** Tambah Nasi Goreng 8 (8 x 15.000 = 120.000), centang member.
- **Aturan bisnis yang dilanggar:** Aturan 4 (diskon tidak boleh digabung, hanya satu yang berlaku).
- **Penyebab:** `kasir.js`, fungsi `hitungDiskon`. Ada dua `if` yang berdiri sendiri dan sama-sama menambah ke variabel `diskon`, sehingga diskon 5% dan diskon member 10% terjumlah untuk member.
- **Perbaikan:** Struktur diganti menjadi `if (member) ... else if (subtotal >= 100000) ...`, sehingga member hanya mendapat 10% dan bukan member hanya 5%.
- **Test yang membuktikan:** `Bug 5: diskon tidak digabung, member hanya 10% dan bukan member 5%`
- **Commit perbaikan:** `perbaikan: diskon belanja 5% dan diskon member 10% digabung sehingga member dengan subtotal besar dapat 15%`
- **Ditemukan oleh:** bersama (AI membaca kode terhadap aturan, lalu dibuktikan dengan test)

## Bug 6
- **Gejala:** PPN dari dasar Rp45 tampil Rp4, padahal 11% dari 45 adalah 4,95 yang dibulatkan menjadi Rp5. Dari dasar Rp4.550, PPN 500,5 tampil Rp500, bukan Rp501.
- **Langkah untuk memunculkan bug:** Susun keranjang yang dasar pajaknya menghasilkan PPN berpecahan, misalnya 4.550, lalu lihat baris PPN.
- **Aturan bisnis yang dilanggar:** Aturan 5 (PPN dibulatkan ke rupiah terdekat, 0,5 ke atas dibulatkan naik).
- **Penyebab:** `kasir.js`, fungsi `hitungPPN` memakai `Math.floor`, yang selalu membuang pecahan ke bawah.
- **Perbaikan:** Diganti dengan `Math.round`, yang membulatkan ke terdekat dan 0,5 ke atas naik.
- **Test yang membuktikan:** `Bug 6: PPN dibulatkan ke rupiah terdekat, 0,5 ke atas naik`
- **Commit perbaikan:** `perbaikan: PPN dibulatkan ke bawah sehingga 4,95 menjadi 4 dan 500,5 menjadi 500`
- **Ditemukan oleh:** bersama (AI membaca kode terhadap aturan, lalu dibuktikan dengan test)

## Bug 7
- **Gejala:** Jika uang yang dibayar kurang dari total, aplikasi tetap menampilkan "Pembayaran berhasil" dengan kembalian bernilai negatif.
- **Langkah untuk memunculkan bug:** Tambah barang apa saja, isi uang bayar lebih kecil dari total, klik Bayar.
- **Aturan bisnis yang dilanggar:** Aturan 7 (jika kurang, transaksi ditolak dengan pesan "Uang pembayaran kurang").
- **Penyebab:** `kasir.js`, fungsi `hitungKembalian` hanya menghitung `bayar - total` tanpa memeriksa apakah uangnya cukup.
- **Perbaikan:** Jika `bayar < total`, fungsi melempar `Error("Uang pembayaran kurang")`. Pesan ini sudah ditampilkan oleh `app.js` lewat blok `catch`, sehingga `app.js` tidak diubah.
- **Test yang membuktikan:** `Bug 7: uang pembayaran kurang ditolak, pas menghasilkan kembalian 0, lebih menghasilkan selisih`
- **Commit perbaikan:** `perbaikan: uang pembayaran kurang dari total tidak ditolak dan kembalian bernilai negatif`
- **Ditemukan oleh:** bersama (AI membaca kode terhadap aturan, lalu dibuktikan dengan test)

## Bagian yang diperiksa dan sengaja tidak diubah

README memperingatkan bahwa AI bisa "memperbaiki" hal yang sebenarnya tidak rusak. Bagian berikut diperiksa dengan test kontrol dan hasilnya benar sesuai aturan, jadi tidak diubah:

| Bagian | Kenapa dianggap benar |
|---|---|
| `hitungSubtotal` | Subtotal 2 Es Teh dan 1 Air Mineral = 11.500, sesuai harga x jumlah |
| `cariProduk`, `hapusItem` | Mencari dan menghapus sesuai kode |
| Pembulatan diskon di `hitungDiskon` | `Math.round` sudah membulatkan 100,5 menjadi 101 |
| `hitungRingkasan` | Urutan subtotal, diskon, dasar pajak, PPN, total sesuai aturan 3 sampai 6 |
| `app.js` | Hanya menghubungkan tampilan, pesan kesalahan dari `kasir.js` sudah ditampilkan lewat `catch` |

Satu catatan: test `Bug 5: diskon member dibulatkan ke rupiah terdekat, 100,5 menjadi 101` lulus pada kode asli juga. Itu sengaja sebagai pengaman agar perbaikan diskon tidak merusak pembulatan yang sudah benar, bukan bukti adanya bug.

## Hasil akhir

Pada kode asli, 10 dari 12 test di `aturan.test.js` gagal. Dua yang lulus adalah pengaman yang memang benar pada kode asli (pembulatan diskon member 100,5 menjadi 101, dan ringkasan member Rp50.000). Setelah semua perbaikan, seluruh 13 test di folder ini (12 test di `aturan.test.js` ditambah 1 contoh dari panitia) lulus dengan `node --test`.
