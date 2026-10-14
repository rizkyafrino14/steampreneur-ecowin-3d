# Catatan Bug Hunt: Kasir Kantin STEAM

**Nama tim:** Ecowin 3D (SMKN Tengaran)

Satu entri ditulis untuk setiap bug yang ditemukan. File ini disimpan di dalam folder `bughunt-kasir/`.

Pengujian tersimpan di file `tes/aturan.test.js` dan dijalankan menggunakan perintah `node --test` langsung dari direktori `bughunt-kasir`. Setiap kasus uji dipastikan gagal pada kode lama, lalu berhasil (lulus) sesudah ditangani. Target kalkulasi yang benar dihitung secara manual mengacu pada aturan di `README.md`.

## Bug 1
- **Gejala** (apa yang terlihat salah): Menambahkan 2 Es Teh kemudian 3 Es Teh menghasilkan angka 23, bukannya 5.
- **Langkah untuk memunculkan bug:** Masukkan Es Teh sejumlah 2, dilanjutkan dengan memasukkan Es Teh sejumlah 3.
- **Aturan bisnis yang dilanggar** (nomor aturan di README): Aturan 2.
- **Penyebab** (file, fungsi, dan penjelasan): Berada di `kasir.js` pada fungsi `tambahItem`. Input kuantitas yang diambil dari form masih bertipe string ("2" dan "3"), sehingga operasi penambahan justru melakukan penggabungan string menjadi "23".
- **Perbaikan** (apa yang diubah): Mengonversi nilai input kuantitas menjadi tipe numerik memakai `Number()` sebelum diproses lebih lanjut.
- **Test yang membuktikan** (nama test): `Bug 1: jumlah dari formulir (teks) dijumlahkan sebagai angka, Es Teh 2 ditambah 3 menjadi 5`
- **Commit perbaikan** (pesan commit): `perbaikan: jumlah dari formulir berupa teks sehingga Es Teh 2 ditambah 3 menjadi 23, bukan 5`
- **Ditemukan oleh:** bersama (AI membaca kode, dibuktikan dengan test)

## Bug 2
- **Gejala:** Sistem tetap memproses input jumlah yang bernilai 0, angka negatif, bilangan desimal, kolom kosong, maupun kuantitas di atas 99.
- **Langkah untuk memunculkan bug:** Input jumlah dengan angka 0, -1, 1,5, atau 100, lalu tekan tombol Tambah.
- **Aturan bisnis yang dilanggar:** Aturan 1.
- **Penyebab:** Berada di `kasir.js` pada fungsi `tambahItem`. Kuantitas masukan sama sekali belum melewati tahap validasi.
- **Perbaikan:** Menambahkan pengecekan agar sistem menolak input dan memunculkan pesan "Jumlah harus bilangan bulat dari 1 sampai 99" apabila nilai tidak memenuhi kriteria bilangan bulat 1 sampai 99.
- **Test yang membuktikan:** `Bug 2: jumlah selain bilangan bulat 1 sampai 99 ditolak dengan pesan`
- **Commit perbaikan:** `perbaikan: jumlah pesanan tidak divalidasi sehingga nol, negatif, pecahan, kosong, dan lebih dari 99 diterima`
- **Ditemukan oleh:** bersama (AI membaca kode, dibuktikan dengan test)

## Bug 3
- **Gejala:** Penambahan 60 Es Teh disusul 40 Es Teh menghasilkan angka 100 pada keranjang belanja.
- **Langkah untuk memunculkan bug:** Masukkan Es Teh sebanyak 60, lalu tambahkan lagi Es Teh sebanyak 40.
- **Aturan bisnis yang dilanggar:** Aturan 2 (jumlah akumulasi per produk tidak boleh melewati 99).
- **Penyebab:** Berada di `kasir.js` pada fungsi `tambahItem`. Nilai kuantitas baru langsung ditambahkan ke produk yang sudah ada tanpa memeriksa batas maksimum terlebih dahulu.
- **Perbaikan:** Menambahkan kondisi sebelum penjumlahan: jika total kuantitas lama dan baru melebihi 99, penambahan ditolak dan isi keranjang dipertahankan seperti semula.
- **Test yang membuktikan:** `Bug 3: total jumlah satu produk tidak boleh lebih dari 99 dan keranjang tidak berubah saat ditolak`
- **Commit perbaikan:** `perbaikan: jumlah produk yang sama bisa melebihi 99 setelah dijumlahkan`
- **Ditemukan oleh:** bersama (AI membaca kode, dibuktikan dengan test)

## Bug 4
- **Gejala:** Pembeli yang bukan member dan belanja tepat Rp100.000 tidak mendapat diskon 5%, padahal seharusnya dapat.
- **Langkah untuk memunculkan bug:** Masukkan 25 Es Teh (25 × Rp4.000 = Rp100.000) dan jangan centang pilihan member. Diskon yang muncul Rp0.
- **Aturan bisnis yang dilanggar:** Aturan 4.
- **Penyebab:** Ada di fungsi `hitungDiskon` dalam file `kasir.js`. Kodenya memakai `subtotal > 100000`, yang artinya "lebih dari Rp100.000". Akibatnya, belanja tepat Rp100.000 tidak dihitung, padahal aturannya "minimal Rp100.000", yang berarti Rp100.000 juga harus dapat diskon.
- **Perbaikan:** Tanda `>` diganti menjadi `>=`, sehingga kodenya menjadi `subtotal >= 100000` dan belanja tepat Rp100.000 ikut mendapat diskon.
- **Test yang membuktikan:** `Bug 4: bukan member dengan subtotal tepat Rp100.000 mendapat diskon 5%, Rp99.999 tidak`
- **Commit perbaikan:** `perbaikan: subtotal tepat Rp100.000 tidak mendapat diskon 5% karena batas memakai lebih dari, bukan minimal`
- **Ditemukan oleh:** Bersama. AI membaca kodenya, lalu kami membuktikannya dengan test.
## Bug 5
- **Gejala:** Member yang belanja Rp120.000 mendapat diskon Rp18.000 (15%), padahal seharusnya hanya Rp12.000 (10%).
- **Langkah untuk memunculkan bug:** Masukkan 8 Nasi Goreng (8 × Rp15.000 = Rp120.000), lalu centang pilihan member. Diskon yang muncul Rp18.000.
- **Aturan bisnis yang dilanggar:** Aturan 4 (diskon tidak boleh digabung).
- **Penyebab:** Ada di fungsi `hitungDiskon` dalam file `kasir.js`. Pengecekan diskon 5% dan diskon member 10% ditulis dalam dua `if` yang terpisah. Akibatnya, member yang belanja minimal Rp100.000 lolos di kedua pengecekan dan mendapat dua diskon sekaligus (5% + 10% = 15%).
- **Perbaikan:** Kedua pengecekan disambung menjadi `if (member) ... else if (subtotal >= 100000)`. Sekarang hanya satu diskon yang berlaku: member mendapat 10%, sedangkan bukan member yang belanja minimal Rp100.000 mendapat 5%.
- **Test yang membuktikan:** `Bug 5: diskon tidak digabung, member hanya 10% dan bukan member 5%`
- **Commit perbaikan:** `perbaikan: diskon belanja 5% dan diskon member 10% digabung sehingga member dengan subtotal besar dapat 15%`
- **Ditemukan oleh:** Bersama. AI membaca kodenya, lalu kami membuktikannya dengan test.
## Bug 6
- **Gejala:** Perhitungan PPN dari nilai 4,95 menampilkan angka 4 (padahal 4,95 seharusnya dibulatkan naik ke 5). PPN 500,5 juga tercetak 500, bukannya 501.
- **Langkah untuk memunculkan bug:** Lakukan transaksi yang menghasilkan PPN berdesimal, lalu cermati nilai PPN pada ringkasan.
- **Aturan bisnis yang dilanggar:** Aturan 5.
- **Penyebab:** Berada di berkas `kasir.js` pada fungsi `hitungPPN`. Penggunaan `Math.floor` secara otomatis memangkas seluruh pecahan ke bawah.
- **Perbaikan:** Mengganti fungsi pembulatan menjadi `Math.round` (pembulatan ke nilai terdekat, pecahan 0,5 ke atas dibulatkan naik).
- **Test yang membuktikan:** `Bug 6: PPN dibulatkan ke rupiah terdekat, 0,5 ke atas naik`
- **Commit perbaikan:** `perbaikan: PPN dibulatkan ke bawah sehingga 4,95 menjadi 4 dan 500,5 menjadi 500`
- **Ditemukan oleh:** Bersama (AI membaca kode, dibuktikan dengan test)

## Bug 7
- **Gejala:** Nominal pembayaran yang kurang dari total belanja tetap lolos dengan status "Pembayaran berhasil" dan kembalian bernilai negatif.
- **Langkah untuk memunculkan bug:** Masukkan produk ke keranjang, isikan nominal bayar yang lebih kecil dari total, lalu klik Bayar.
- **Aturan bisnis yang dilanggar:** Aturan 7.
- **Penyebab:** Berada di berkas `kasir.js` pada fungsi `hitungKembalian`. Fungsi langsung menghitung `bayar - total` tanpa memeriksa kecukupan uang tunai.
- **Perbaikan:** Menambahkan pemeriksaan `bayar < total` yang melempar `Error("Uang pembayaran kurang")`. Pesan kesalahan ini sudah ditampilkan oleh `app.js`, sehingga berkas `app.js` tidak perlu diubah.
- **Test yang membuktikan:** `Bug 7: uang pembayaran kurang ditolak, pas menghasilkan kembalian 0, lebih menghasilkan selisih`
- **Commit perbaikan:** `perbaikan: uang pembayaran kurang dari total tidak ditolak dan kembalian bernilai negatif`
- **Ditemukan oleh:** Bersama (AI membaca kode, dibuktikan dengan test)


## Bagian yang diperiksa dan sengaja tidak diubah

Sesuai peringatan README bahwa AI bisa memperbaiki hal yang sebenarnya tidak rusak, modul berikut diperiksa dan dipastikan sudah sesuai aturan sehingga sengaja dipertahankan: `hitungSubtotal`, `cariProduk`, `hapusItem`, pembulatan diskon, `hitungRingkasan`, serta `app.js`.

## Hasil akhir

Pada kode asli, 10 dari 12 kasus uji di `aturan.test.js` gagal (2 test yang lulus adalah pengaman yang memang sudah benar pada kode asli). Setelah perbaikan, seluruh 13 test di folder ini lulus saat dijalankan dengan `node --test`.
