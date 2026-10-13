# Refleksi Tim

1. Apa yang berjalan baik dalam cara kami bekerja dengan AI?

**Jawaban (Rizky):** Yang paling berjalan baik adalah mengerjakan satu langkah per prompt dan menguji hasilnya sebelum lanjut. Angka hasil yang diharapkan kami hitung dulu sendiri dengan kalkulator (misalnya 1.950 × 0,33 = 643,5 menjadi 644), baru AI diminta menulis kodenya. Karena itu 40 unit test langsung bisa dipakai sebagai patokan, dan saat tim sengaja mengubah `+ 50` menjadi `+ 0`, test U03 dan U04 langsung gagal. AI menulis sebagian besar kode, tetapi keputusan terima atau tolak tetap ada di tim.

2. Kapan AI paling membantu? Kapan AI justru menyulitkan?

**Jawaban (Rizky):** AI paling membantu saat menulis fungsi yang aturannya sudah jelas, seperti validasiBerat, hitungNilai, dan buatCsv, serta membuat kerangka halaman dan test dari spesifikasi yang sudah kami tulis. Pekerjaan yang biasanya lama menjadi cepat, dan kami bisa fokus memeriksa hasilnya.

**Jawaban (Fadil):** AI menyulitkan saat jawabannya terlihat meyakinkan tetapi tidak cocok dengan keadaan kami. Contohnya perintah Git yang memakai `&&` tidak jalan di PowerShell, perintah `node --test tes/` gagal di Node v24 di laptop saya, dan draf kasus uji U15 menulis saldo ada di rekap padahal rekap tidak punya kolom saldo. Semuanya baru ketahuan setelah dijalankan atau dicocokkan dengan spesifikasi, jadi hasil AI harus selalu dicoba.

3. Kesalahan terbesar yang hampir lolos, dan bagaimana kami menemukannya?

**Jawaban (Fadil):** Kesalahan terbesar adalah hasil uji yang saya isi sebelum aplikasinya ada. Kolom "Hasil sebenarnya" dan "Lulus?" untuk U01 sampai U06 dan U14 sempat saya isi dengan foto kalkulator, seolah-olah itu hasil dari aplikasi. Itu ketahuan saat tim mencocokkan isi `04-kasus-uji.md` dengan kenyataan bahwa saat itu belum ada kode website, lalu kolomnya dikosongkan lagi dan baru diisi setelah aplikasi benar-benar diuji di browser. Hampir lolos juga foto U13 yang memakai jenis berbeda sehingga tidak membuktikan nilai sama, dan itu ketahuan setelah membuka gambarnya satu per satu.

4. Apa yang akan kami lakukan berbeda jika mengulang challenge ini?

**Jawaban (Rofiqi):** Pertama, kami akan memeriksa lokasi folder Git dan aturan nama repositori sejak awal, karena sempat ada README yang masuk ke subfolder dan nama repo yang salah. Kedua, file yang diedit banyak orang seperti `08-penjelasan-kode.md` akan dikerjakan bergiliran dan selalu `git pull` dulu, karena pernah tulisan satu orang hilang saat konflik diselesaikan. Ketiga, jam di log prompt akan dicatat saat prompt dikirim, bukan belakangan, supaya sesuai dengan jam commit.

5. Bagaimana kami mengatur waktu? Langkah mana yang jauh lebih lama dari estimasi, dan kenapa?

**Jawaban (Rofiqi):** Kami memecah pekerjaan menjadi tujuh langkah dengan estimasi di `02-rencana.md`, lalu mencatat waktu sebenarnya. Langkah kode selesai sesuai atau lebih cepat dari estimasi: scaffolding 25 dari 30 menit, data dan logika 45 dari 60, formulir 40 dari 60, simpan dan saldo 45 dari 45, rekap 40 dari 45, dan uji menyeluruh 42 dari 45 menit. Yang memakan waktu di luar rencana bukan menulis kode, tetapi urusan Git (push ditolak, konflik, repo salah folder) dan merapikan dokumen seperti log prompt dan bukti uji. Di akhir pengerjaan laptop saya mati dan tidak bisa dinyalakan, sehingga bagian dokumen saya ditulis dan di-commit dari komputer Rizky. Kalau mengulang, pekerjaan akan saya kirim ke GitHub lebih sering supaya tidak bergantung pada satu laptop.

6. Bagian mana dari kode yang masih belum kami pahami sepenuhnya? (Jawab dengan jujur.)

**Jawaban (Rizky):** Saya paham cara kerja `hitungNilai`, tetapi bagian yang belum sepenuhnya saya pahami adalah cara Git menggabungkan perubahan saat dua orang mengedit file yang sama. Saya sempat menyelesaikan konflik di `08-penjelasan-kode.md` dengan cara yang membuang tulisan Fadil tanpa sadar, dan baru paham sebabnya setelah membandingkan riwayat commit.

**Jawaban (Fadil):** Saya paham urutan pemeriksaan di `validasiBerat`, tetapi saya belum sepenuhnya paham pola `/^-?\d+(\.\d+)?$/` yang dipakai. Saya hanya tahu hasilnya dari mencoba nilai seperti `"1,234"`, `"-2"`, dan `"1.5.5"`, belum bisa menyusun pola serupa sendiri. Saya juga belum paham kenapa file CSV diberi tanda BOM di depan agar Excel membacanya benar.

**Jawaban (Rofiqi):** Saya masih belum sepenuhnya paham `saringSetoran`, terutama bagian `some` dan `includes` yang mencocokkan kata di beberapa kolom sekaligus. Saya mengerti hasilnya, yaitu baris yang tampil harus cocok dengan kata dan jenis, tetapi belum bisa menjelaskan cara kerjanya baris demi baris tanpa melihat kode.
