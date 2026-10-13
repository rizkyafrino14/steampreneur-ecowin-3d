# Refleksi Tim

1. Apa yang berjalan baik dalam cara kami bekerja dengan AI?

**Jawaban (Rizky):** Yang paling berjalan baik adalah mengerjakan satu langkah per prompt dan menguji hasilnya sebelum lanjut. Angka hasil yang diharapkan kami hitung dulu sendiri dengan kalkulator (misalnya 1.950 × 0,33 = 643,5 menjadi 644), baru AI diminta menulis kodenya. Karena itu 40 unit test langsung bisa dipakai sebagai patokan, dan saat tim sengaja mengubah `+ 50` menjadi `+ 0`, test U03 dan U04 langsung gagal. AI menulis sebagian besar kode, tetapi keputusan terima atau tolak tetap ada di tim.

2. Kapan AI paling membantu? Kapan AI justru menyulitkan?

**Jawaban (Rizky):** AI paling membantu saat menulis fungsi yang aturannya sudah jelas, seperti validasiBerat, hitungNilai, dan buatCsv, serta membuat kerangka halaman dan test dari spesifikasi yang sudah kami tulis. Pekerjaan yang biasanya lama menjadi cepat, dan kami bisa fokus memeriksa hasilnya.

3. Kesalahan terbesar yang hampir lolos, dan bagaimana kami menemukannya?

4. Apa yang akan kami lakukan berbeda jika mengulang challenge ini?

5. Bagaimana kami mengatur waktu? Langkah mana yang jauh lebih lama dari estimasi, dan kenapa?

6. Bagian mana dari kode yang masih belum kami pahami sepenuhnya? (Jawab dengan jujur.)

**Jawaban (Rizky):** Saya paham cara kerja `hitungNilai`, tetapi bagian yang belum sepenuhnya saya pahami adalah cara Git menggabungkan perubahan saat dua orang mengedit file yang sama. Saya sempat menyelesaikan konflik di `08-penjelasan-kode.md` dengan cara yang membuang tulisan Fadil tanpa sadar, dan baru paham sebabnya setelah membandingkan riwayat commit.
