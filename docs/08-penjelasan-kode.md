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

### Penjelasan 3
- **Ditulis oleh:** Muhammad Fadil Ismunawar
- **File dan fungsi:** tes/logika.test.js, test buatCsv: koma dan tanda kutip di dalam field dibungkus kutip ganda (baris 294 sampai 298).
- **Apa yang dilakukan:** Test ini membuat nama nasabah yang aneh, yaitu Bu "Sari", RT 1, lalu memanggil buatCsv. Hasilnya dipecah perbaris dan dan diperiksa, apakah sudah memuat "Bu ""Sari"", RT 1".
- **Kenapa dibuat seperti ini:** Nama yang mengandung tanda koma akan dibaca kolom baru oleh Excel dan menggeser semu kolom sesudahnya. Aturan CSV seharusnya file seperti itu dibungkus dengan tanda kutip ganda dan tanda kutip di dalamnya digandakan. Test ini bertujuan agar aturan tidak hilang saat kutipFieldCsv  diubah
- **Contoh:** Jika nama nasabahnya adalah Bu "Sari", RT 1, maka baris CSV akan memuat "Bu ""Sari"", RT 1" sehingga tetap menjadi satu kolom.
- **Jika input salah atau kosong:** Test ini akan gagal jika kutipFieldCsv tak membungkus field tersebut. Misal, saat pengecekan /[",\r\n]/ dihapus. Untuk nilai yang kosong, test yang lain (daftar kosong) akan memastikan hanya baris nama kolom yang akan keluar.

### Penjelasan 4
- **Ditulis oleh:** Muhammad Fadil Ismunawar
- **File dan fungsi:** src/logika/test.js, fungsi validasiBerat (baris 20 sampai 56).
- **Apa yang dilakukan:** Fungsi ini akan menerima teks dari kotak input berat lalu memeriksanya dalam empat tahap secara berurutan. Saat satu tahap gagal, fungsi akan langsung berhenti dan tahap berikutnya tidak dijalankan.
Pemeriksaan 1: input undefined atau null diubah menjadi string kosong, lalu spasi di tepi dibuang dengan trim(). Kalau hasilnya kosong, pesannya “Berat wajib diisi”.
Pemeriksaan 2: tanda koma diganti dengan tanda titik, lalu teks dicocokkan dengan pola /^-?\d+(\.\d+)?$/. Kalau tidak cocok, maka pesannya “Berat harus berupa angka”.
Pemeriksaan 3: bagian setelah titik dihitung panjangnya. Jika lebih dari 2 digit, pesannya “Berat maksimal 2 angka di belakang koma”.
Pemeriksaan 4: teks diubah jadi angka dengan Number(). Jika kurang dari 0,1 atau lebih dari 100, pesannya “Berat harus antara 0,1 dan 100 kg”.
- **Kenapa dibuat seperti ini:** Desimal dicek dari teks. Angka 1,5 dan 1,50 nilainya sama, jadi jumlah digit di belakang koma tidak bisa dilihat dari angkanya. Yang bisa dihitung hanya tulisannya. Batas 2 desimal ini juga penting untuk hitungNilai, karena fungsi itu menghitung berat dalam satuan 0,01 kg (Math.round(berat * 100)). Kalau ada desimal ketiga, angkanya akan dibulatkan.
Tanda koma akan diubah menjadi tanda titik. petugas di Indonesia biasa mengetik “2,5”, tetapi Number("2,5") di JavaScript menghasilkan NaN. JavaScript hanya mengenal titik sebagai pemisah desimal.
Pola menolak “1.5.5”: fungsi seperti parseFloat("1.5.5") akan membaca sebagian saja dan menghasilkan 1,5 tanpa memberi tahu. Akibatnya data yang salah ketik bisa tersimpan seolah benar. Dengan pola ini, seluruh teks harus berbentuk angka yang sah. Kalau tidak, petugas akan langsung diberi tahu untuk memperbaikinya.
- **Contoh:** Input "1,234" menghasilkan valid: false, berat: null, pesan “Berat maksimal 2 angka di belakang koma”. Teks ini lolos cek 1 dan cek 2 (setelah jadi “1.234”), tetapi gagal di cek 3 karena bagian desimalnya “234” ada 3 digit.
Input "-2" menghasilkan valid: false, pesan “Berat harus antara 0,1 dan 100 kg”. Pola di cek 2 memperbolehkan tanda minus, jadi teks ini baru ditolak di cek 4 karena -2 lebih kecil dari 0,1.
Input "2,5" menghasilkan valid: true, berat: 2.5, pesan "", karena lolos keempat cek.
- **Jika input salah atau kosong:** Karakter kosong seperti spasi akan ditolak di cek 1 dengan pesan “Berat wajib diisi”.
null dan undefined lebih dulu diubah jadi "", jadi tidak membuat error dan juga ditolak di cek 1 dengan pesan yang sama.
"abc" ditolak di cek 2 dengan pesan “Berat harus berupa angka”. Hal yang sama berlaku untuk "1e2": walaupun Number("1e2") bernilai 100, pola hanya menerima digit, titik, dan minus.

### Penjelasan 5
- **Ditulis oleh:** Muhammad Fadil Ismunawar
- **File dan fungsi:** tes/logika.test.js, test U11 (baris 77 sampai 81)
- **Apa yang dilakukan:** Test ini memanggil validasiBerat("1,234"), yaitu berat dengan 3 angka di belakang koma. Hasilnya diperiksa dua kali:
valid harus false, pesan harus cocok dengan pola /2 angka/.
Artinya, test ini memastikan berat dengan lebih dari 2 desimal ditolak oleh aturan desimal, bukan oleh aturan lain.
- **Kenapa dibuat seperti ini:** Kalau test hanya memeriksa valid: false, test bisa lulus walaupun penolakannya terjadi karena alasan yang salah. Misalnya:
Jika koma tidak diubah ke titik, “1,234” ditolak di cek 2 dengan pesan “Berat harus berupa angka”. valid tetap false, tetapi aturan desimalnya sebenarnya tidak pernah dijalankan.
Pemeriksaan pesan memastikan yang menolak benar-benar cek 3. Pesannya dicocokkan dengan pola /2 angka/, bukan dengan kalimat lengkap. Dengan begitu, kalau susunan kalimat sedikit diubah, test tidak ikut rusak, selama inti aturannya (2 angka) tetap disebut.
- **Contoh:** Jika inputnya “1,234”, maka prosesnya:
Lolos cek 1, karena tidak kosong.
Diubah jadi “1.234” dan lolos cek 2, karena bentuknya angka.
Gagal di cek 3, karena bagian desimalnya “234” ada 3 digit.
Hasilnya { valid: false, berat: null, pesan: "Berat maksimal 2 angka di belakang koma" }. Test lulus karena valid bernilai false dan pesannya mengandung “2 angka”.
- **Jika input salah atau kosong:** Test ini akan gagal dalam beberapa kondisi:
Cek 3 dihapus atau batasnya dilonggarkan (misalnya > 2 diubah jadi > 3): “1.234” lolos sampai cek 4. Karena 1,234 berada di antara 0,1 dan 100, hasilnya valid: true, sehingga pemeriksaan pertama gagal.
Baris replace(",", ".") dihapus: “1,234” ditolak di cek 2. valid tetap false, tetapi pesannya “Berat harus berupa angka”, jadi pemeriksaan kedua gagal.
Pesan cek 3 diganti sehingga tidak lagi memuat “2 angka”: pemeriksaan kedua gagal.
Cara membuktikannya:
Ubah sementara bagianDesimal.length > 2 menjadi > 3 di src/logika.js.
Jalankan node --test tes/, lalu lihat U11 gagal di pemeriksaan valid.
Kembalikan kodenya, jalankan lagi, dan pastikan semua test lulus.

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

## Bagian B: Pertanyaan yang dijawab bersama

1. Jika aturan bisnis utama di spesifikasi berubah (tuliskan contoh perubahannya), file dan fungsi mana yang harus diubah? Jelaskan alasannya.

**Jawaban (Rizky):** Saya ambil contoh perubahan pada: harga Kardus Kering naik dari Rp1.950 menjadi Rp2.100 per kg. Yang diubah hanya satu angka di `src/data.js`, pada baris ini `{ jenis: "Kardus", kondisi: "Kering", hargaPerKg: 1950 }` menjadi `2100`. Rumus di `hitungNilai` (`src/logika.js` pada baris 63 sampai 68) tidak perlu disentuh, karena fungsi itu hanya menerima harga yang dikirim `cariHarga`. Satu-satunya yang ikut berubah adalah test yang memakai angka 1950, yaitu U03 di `tes/logika.test.js` (hitungNilai(1950, 0.33) = 644), dan tabel harga di `docs/01-spesifikasi.md` bagian 6. Alasannya, harga sengaja dipisah dari rumus di `data.js`, karena harga bisa berubah mengikuti keputusan pengelola bank sampah, sedangkan cara menghitungnya tetap.

Contoh lain: kalau batas berat maksimal naik dari 100 kg menjadi 200 kg, yang diubah hanya `validasiBerat` di `src/logika.js` (pengecekan `berat > 100` dan teks pesan "antara 0,1 dan 100 kg"), lalu test U06 dan U08 serta spesifikasi bagian 6. `app.js` tidak perlu diubah karena ia hanya memanggil `validasiSetoran` dan menampilkan pesannya.

2. Bagaimana data mengalir dari saat pengguna mengisi form sampai hasilnya tampil di layar? Sebutkan file dan fungsi yang dilewati secara berurutan.

**Jawaban (Rizky):** Alurnya dimulai dari formulir `index.html` (`form-setoran`). Saat Simpan diklik, handler klik `submit` di `src/app.js` lalu akan berjalan. Urutannya:

1. `app.js` memanggil `validasiSetoran` di `src/logika.js`, yang dipanggil adalah `validasiBerat` untuk memeriksa berat.
2. Kalau valid, `app.js` memanggil `cariNasabah`, lalu `cariHarga` di `logika.js` untuk mendapatkan harga per kg.
3. `buatSetoran` di `logika.js` membuat catatan setoran dan memanggil `hitungNilai` untuk nilainya.
4. `app.js` memanggil `muatSetoran` dan `simpanSetoran` di `src/penyimpanan.js`, yang menulis ke `localStorage` dengan kunci `ecowin_setoran`.
5. `app.js` memanggil `perbaruiSaldo`, yang memakai `hitungSaldo` di `logika.js`, lalu saldo tampil di formulir.
6. Di halaman rekap, `src/rekap.js` fungsi `tampilkan` memanggil `muatSetoran`, lalu `urutkanSetoran` dan `saringSetoran` di `logika.js`, dan hasilnya digambar menjadi baris tabel.

Contohnya, Bu Sari memilih Botol PET bening, Dipisah, berat `2,5`: `hitungNilai(4500, 2.5)` menghasilkan `11250`, tersimpan di `localStorage`, saldo Bu Sari tampil `Rp11.250`, dan di rekap muncul satu baris dengan nilai `Rp11.250`.

3. Pilih satu unit test. Apa yang diuji, dan dalam kondisi apa test itu akan gagal?

**Jawaban (Fadil):** Test yang saya pilih adalah U11: lebih dari 2 desimal ditolak di `tes/logika.test.js` baris 77 sampai 81. Test ini memanggil `validasiBerat("1,234")` lalu memeriksa dua hal: `hasil.valid` harus `false`, dan `hasil.pesan` harus cocok dengan `/2 angka/`. Jadi yang diuji adalah aturan bahwa berat maksimal punya 2 angka di belakang koma, dan bahwa petugas diberi pesan yang menyebut batas itu.
Test ini akan gagal kalau fungsinya menerima `1,234` sebagai berat yang sah, atau kalau pesannya tidak lagi memuat kata `"2 angka"`. Contohnya, di `src/logika.js` baris 38 pengecekan `bagianDesimal.length` > 2 diubah menjadi > 3. Maka `"234"` yang panjangnya 3 lolos cek desimal, lalu angka `1,234` juga lolos cek batas 0,1 sampai 100, sehingga hasilnya `valid: true` dan test gagal. Test ini penting karena `hitungNilai` menghitung berat dalam satuan 0,01 kg; kalau ada desimal ketiga, angkanya akan terbulatkan diam-diam dan petugas tidak tahu.

4. Pilih satu saran AI yang kalian tolak. Apa sarannya dan kenapa kalian menolaknya?

**Jawaban (Rofiqi):** Saran AI yang kami tolak adalah isi draf kasus uji U15 yang menulis bahwa saldo Bu Sari "tetap ada di rekap". Kami menolaknya setelah mencocokkan `04-kasus-uji.md` dengan `01-spesifikasi.md` baris demi baris dan menemukan bahwa kolom rekap hanya tanggal, nasabah, kategori, jenis, kondisi, berat, dan nilai, tanpa saldo. Kalau draf itu dipakai, kasus uji U15 akan menguji hal yang tidak pernah dibuat. Tim memutuskan saldo ditampilkan di formulir saat nasabah dipilih, lalu spesifikasi bagian 4 dan kalimat U15 disesuaikan. Hasilnya, U15 sekarang berbunyi saldo Bu Sari tetap Rp11.250 saat dipilih di formulir, dan itu yang diuji di `U15-a.png`.

5. Bagian kode mana yang paling sulit dipahami, dan bagaimana kalian akhirnya memahaminya?

**Jawaban (Rizky):** Bagian yang paling sulit saya pahami adalah pembulatan di fungsi `hitungNilai` (`src/logika.js` baris 63 sampai 68). Awalnya saya bingung kenapa memakai `+ 50` dan bukan langsung `Math.round(harga * berat)`, apalagi test U03 (`hitungNilai(1950, 0.33)` harus 644). Saya akhirnya paham setelah menghitung sendiri menggunakan kalkulator, langkah demi langkah dengan angka itu: berat 0,33 dikali 100 jadi 33, dikali 1950 jadi 64350, ditambah 50 jadi 64400, lalu dibagi 100 jadi 644. Saya juga melihat bahwa test U03 dan U04 sengaja diuji dengan mengubah `+ 50` menjadi `+ 0`, dan hasilnya jadi 643 dan 247 sehingga kedua test gagal. Sekarang saya bisa menjelaskan bahwa `+ 50` membuat pecahan 0,5 ke atas dibulatkan naik memakai bilangan bulat, sehingga aturan spesifikasi terpenuhi dan hasilnya tidak bergantung pada pecahan desimal komputer.

**Jawaban (Fadil):** Yang paling sulit saya mengerti adalah validasiBerat di `src/logika.js`. Sebelumnya saya kira angka `-2` ditolak karena dianggap bukan angka. Ternyata tidak: tanda minus masih dianggap bentuk angka yang boleh, jadi `-2` baru ditolak di pengecekan terakhir karena lebih kecil dari `0,1`. Karena itu pesannya "Berat harus antara `0,1` dan `100 kg`", bukan "harus berupa angka". Hal lain yang membuat saya bingung adalah cara menghitung angka di belakang koma. Itu tidak dilihat dari angkanya, karena `1,5` dan `1,50` sama nilainya, tapi dari panjang tulisannya setelah titik. Saya mulai paham setelah mencoba sendiri `"1,234"`, `"-2"`, dan `"2,5"` satu per satu di Console, lalu mencocokkannya dengan test `U09` dan `U11`. Intinya, fungsi ini memeriksa berurutan dan langsung berhenti di pengecekan pertama yang gagal, jadi pesan yang muncul adalah masalah yang paling awal ketemu.

**Jawaban (Rofiqi):** Yang paling sulit buat saya adalah menjelaskan kode dengan kata-kata sendiri. Tulisan pertama saya di `08-penjelasan-kode.md` untuk fungsi `hitungSaldo` dan `cariHarga` ternyata terlalu mirip dengan contoh yang diberikan, dan ada bagian yang kalimatnya tidak jelas, misalnya soal fungsi yang "tidak dapat mengambil isi halaman web". Setelah itu saya sadar bahwa saya belum benar-benar paham, hanya menyusun ulang kalimat. Jadi saya buka `src/logika.js`, membaca `validasiSetoran` dan `saringSetoran` baris demi baris, lalu mencoba sendiri di halaman rekap: mengetik `sari`, mengganti filter jenis, dan memilih "Semua jenis". Dari situ saya mulai mengerti bahwa `validasiSetoran` mengembalikan pesan untuk tiap isian supaya layar bisa menampilkannya di bawah isian yang salah, dan `saringSetoran` menggabungkan kata pencarian dengan jenis sehingga baris yang tampil harus memenuhi dua-duanya. Sekarang saya tahu bahwa kalau saya bisa menjelaskan sebuah fungsi dengan contoh nilainya sendiri, berarti saya paham. Kalau hanya mengubah kalimat orang lain, itu belum paham.