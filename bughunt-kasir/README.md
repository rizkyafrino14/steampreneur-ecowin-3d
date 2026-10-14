# Bug Hunt: Kasir Kantin STEAM

Aplikasi ini adalah kasir sederhana untuk kantin sekolah. Aplikasinya bisa dibuka dan dipakai, tetapi **ada beberapa bug** di dalamnya. Jumlah bug sengaja tidak diberitahukan.

Tugas tim kalian: temukan bug, perbaiki, buktikan dengan pengujian, dan jelaskan setiap perbaikan. AI boleh dipakai, tetapi ingat bahwa AI juga bisa melewatkan bug atau "memperbaiki" hal yang sebenarnya tidak rusak.

## Cara menjalankan

1. Buka file `index.html` di browser (klik dua kali sudah cukup).
2. Untuk menjalankan pengujian, buka terminal di folder ini lalu ketik:
   ```
   node --test
   ```
   Node.js (versi 18 atau lebih baru) otomatis menjalankan semua file yang namanya berakhiran `.test.js`, jadi beri nama file test kalian dengan pola itu.

## Isi folder

| File | Isi |
|---|---|
| `index.html` | Halaman kasir |
| `app.js` | Kode tampilan: menghubungkan halaman dengan logika |
| `kasir.js` | Seluruh aturan bisnis: keranjang, diskon, PPN, total, kembalian |
| `tes/contoh.test.js` | Contoh format pengujian |

## Aturan bisnis (spesifikasi resmi)

Aplikasi yang benar **harus** memenuhi aturan berikut. Jika perilaku aplikasi berbeda dari aturan ini, itu adalah bug.

1. **Jumlah pesanan** per produk harus bilangan bulat dari 1 sampai 99. Jumlah kosong, nol, negatif, atau pecahan harus ditolak dengan pesan kesalahan.
2. Jika produk yang **sudah ada** di keranjang ditambahkan lagi, jumlahnya dijumlahkan. Contoh: Es Teh 2, lalu tambah Es Teh 3, maka di keranjang tertulis Es Teh 5. Total jumlah per produk tetap tidak boleh lebih dari 99.
3. **Subtotal** = jumlah dari (harga x jumlah) semua produk di keranjang.
4. **Diskon** (tidak boleh digabung, hanya satu yang berlaku):
   - Pelanggan **member** mendapat diskon **10%** dari subtotal.
   - Pelanggan **bukan member** dengan subtotal **minimal Rp100.000** mendapat diskon **5%** dari subtotal.
   - Selain itu, tidak ada diskon.
   - Nilai diskon dibulatkan ke rupiah terdekat.
5. **PPN 11%** dihitung dari (subtotal dikurangi diskon), lalu **dibulatkan ke rupiah terdekat** (0,5 ke atas dibulatkan naik).
6. **Total** = subtotal - diskon + PPN.
7. **Pembayaran**: jika uang yang dibayar kurang dari total, transaksi ditolak dengan pesan "Uang pembayaran kurang". Jika cukup, kembalian = uang dibayar - total.

## Yang harus dikumpulkan

Semua hasil Bug Hunt disimpan di folder `bughunt-kasir/` di repositori GitHub tim kalian.

1. **Sebelum mengubah apa pun**, salin folder ini ke repositori, lalu commit dengan pesan `bughunt: kode asli` dan push. Commit ini menjadi pembanding bagi juri.
2. Perbaiki setiap bug dalam **commit terpisah**, dengan pesan berawalan `perbaikan:`. Contoh format: `perbaikan: <jelaskan bug yang diperbaiki>`.
3. Tambahkan test di folder `tes/` yang membuktikan setiap bug sudah diperbaiki. Test seharusnya **gagal** pada kode asli dan **lulus** pada kode yang sudah diperbaiki.
4. Isi `catatan-bug.md` (template ada di `template-dokumen.zip`) dan simpan di folder ini.
5. Waktu pengerjaan 60 menit dihitung sejak commit `bughunt: kode asli`. Commit di folder ini yang dibuat lebih dari 60 menit setelah commit tersebut tidak dinilai.
