# Kesalahan AI yang Kami Temukan

Catat setiap kali AI memberikan hasil yang salah, tidak sesuai spesifikasi, atau tidak perlu.
Ini bukan catatan kegagalan tim. Justru ini bukti bahwa tim memeriksa hasil AI.

| No | Apa yang diminta | Kesalahan AI | Bagaimana kami mengetahuinya | Perbaikan yang kami lakukan |
|---|---|---|---|---|
| 1 | Draf spesifikasi dan kasus uji | Kasus uji U15 menulis saldo "tetap ada di rekap", padahal kolom rekap di spesifikasi tidak memuat saldo dan tidak ada yang menyebut saldo ditampilkan di mana | Dicocokkan baris demi baris antara 04-kasus-uji.md dan 01-spesifikasi.md saat meninjau U07 sampai U16 | Tim memutuskan saldo ditampilkan di formulir saat nasabah dipilih, lalu spesifikasi dan U15 disesuaikan |
| 2 | Panduan perintah Git | AI memberi perintah memakai `&&` yang tidak dikenal PowerShell di komputer tim | Perintah dijalankan dan muncul ParserError: The token '&&' is not a valid statement separator | Perintah dijalankan satu per satu, panduan berikutnya memakai gaya PowerShell |
| 3 | Mengajari cara push ke GitHub | AI membuat commit sendiri dan menambahkan baris Co-Authored-By ke riwayat, padahal tim hanya meminta diajari | Terlihat di riwayat commit dan dikoreksi langsung oleh tim | Riwayat tidak ditulis ulang karena aturan melarang. Tim memutuskan AI hanya memberi perintah dan tidak menjalankan commit atau push tanpa diminta |
| 4 | Menulis cara menjalankan pengujian di README | AI menulis node --test tes/ yang gagal di Node v24 karena tes/ dibaca sebagai berkas, bukan folder | Uji clone di laptop Fadil: MODULE_NOT_FOUND | Perintah diganti node --test tes/logika.test.js dan diuji ulang di Node v24: 40 lulus dari 40 |