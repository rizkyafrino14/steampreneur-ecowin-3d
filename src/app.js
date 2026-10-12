// Menghubungkan formulir setoran (index.html) dengan fungsi di logika.js.
// File ini hanya mengurus tampilan dan kejadian; semua rumus dan aturan
// validasi dipanggil dari logika.js supaya tidak ada dua versi aturan yang sama.

(function () {
  // Jaga-jaga jika file ini dimuat di halaman yang tidak punya formulir setoran
  // (rekap.html memakai rekap.js); tanpa ini akan muncul error di konsol.
  var form = document.getElementById("form-setoran");
  if (!form) return;

  var pilihNasabah = document.getElementById("nasabah");
  var pilihJenis = document.getElementById("jenis");
  var pilihKondisi = document.getElementById("kondisi");
  var isianBerat = document.getElementById("berat");
  var areaNilai = document.getElementById("nilai");
  var pesanSukses = document.getElementById("pesan-sukses");
  var areaSaldo = document.getElementById("saldo");

  var galat = {
    nasabah: document.getElementById("galat-nasabah"),
    jenis: document.getElementById("galat-jenis"),
    kondisi: document.getElementById("galat-kondisi"),
    berat: document.getElementById("galat-berat"),
  };

  // Membuat satu <option>. textContent dipakai (bukan innerHTML) agar teks
  // dari data tidak pernah ditafsirkan sebagai HTML.
  function buatOpsi(nilai, teks) {
    var opsi = document.createElement("option");
    opsi.value = nilai;
    opsi.textContent = teks;
    return opsi;
  }

  function isiPilihanNasabah() {
    NASABAH.forEach(function (n) {
      pilihNasabah.appendChild(buatOpsi(String(n.id), n.nama + " (RT " + n.rt + ")"));
    });
  }

  // Jenis diambil dari HARGA dan dibuat unik, karena satu jenis punya
  // beberapa baris (satu per kondisi). Urutan kemunculan dipertahankan.
  function isiPilihanJenis() {
    var sudah = {};
    HARGA.forEach(function (h) {
      if (!sudah[h.jenis]) {
        sudah[h.jenis] = true;
        pilihJenis.appendChild(buatOpsi(h.jenis, h.jenis));
      }
    });
  }

  // Kondisi bergantung pada jenis: tidak semua jenis punya kondisi yang sama
  // (mis. "Dipenyet" hanya untuk kaleng). Pilihan lama dibuang setiap jenis
  // berubah supaya tidak tersisa kondisi yang tidak berlaku untuk jenis baru.
  function perbaruiPilihanKondisi() {
    var jenis = pilihJenis.value;
    pilihKondisi.innerHTML = "";

    if (jenis === "") {
      pilihKondisi.appendChild(buatOpsi("", "Pilih jenis dulu"));
      pilihKondisi.disabled = true;
      return;
    }

    pilihKondisi.appendChild(buatOpsi("", "Pilih kondisi"));
    HARGA.forEach(function (h) {
      if (h.jenis === jenis) {
        pilihKondisi.appendChild(buatOpsi(h.kondisi, h.kondisi));
      }
    });
    pilihKondisi.disabled = false;
  }

  // Nilai hanya ditampilkan jika jenis, kondisi, dan berat semuanya valid.
  // Isian setengah jadi atau salah ditampilkan "-" agar tidak menyesatkan petugas.
  function perbaruiNilai() {
    var hasilBerat = validasiBerat(isianBerat.value);
    var harga = cariHarga(HARGA, pilihJenis.value, pilihKondisi.value);

    if (!hasilBerat.valid || harga === null) {
      areaNilai.textContent = "Nilai: -";
      return;
    }

    var nilai = hitungNilai(harga, hasilBerat.berat);
    areaNilai.textContent = "Nilai: Rp" + nilai.toLocaleString("id-ID");
  }

  // muatSetoran() dan simpanSetoran() berasal dari penyimpanan.js, yang harus
  // dimuat sebelum file ini.

  // Tanggal menurut jam lokal komputer, format YYYY-MM-DD. toISOString()
  // sengaja tidak dipakai karena memakai UTC: setoran pukul 06.00 WIB akan
  // tercatat sebagai hari sebelumnya.
  function tanggalHariIni() {
    var sekarang = new Date();
    var bulan = String(sekarang.getMonth() + 1).padStart(2, "0");
    var hari = String(sekarang.getDate()).padStart(2, "0");
    return sekarang.getFullYear() + "-" + bulan + "-" + hari;
  }

  function cariNasabah(idTeks) {
    var id = Number(idTeks);
    for (var i = 0; i < NASABAH.length; i++) {
      if (NASABAH[i].id === id) return NASABAH[i];
    }
    return null;
  }

  // Saldo selalu dihitung ulang dari setoran yang tersimpan dan tidak disimpan
  // terpisah, sehingga tidak pernah berbeda dari data setoran.
  function perbaruiSaldo() {
    var nasabah = cariNasabah(pilihNasabah.value);
    if (pilihNasabah.value === "" || nasabah === null) {
      areaSaldo.textContent = "Saldo: -";
      return;
    }
    var saldo = hitungSaldo(muatSetoran(), nasabah.id);
    areaSaldo.textContent = "Saldo: Rp" + saldo.toLocaleString("id-ID");
  }

  function bersihkanGalat() {
    Object.keys(galat).forEach(function (kunci) {
      galat[kunci].textContent = "";
    });
  }

  function tampilkanGalat(pesan) {
    Object.keys(galat).forEach(function (kunci) {
      galat[kunci].textContent = pesan[kunci] || "";
    });
  }

  // Pesan sukses dan galat isian itu dibersihkan saat isian diubah, karena
  // keduanya menjelaskan keadaan formulir sebelumnya yang sudah tidak berlaku.
  function saatIsianBerubah(kunciGalat) {
    galat[kunciGalat].textContent = "";
    pesanSukses.textContent = "";
    perbaruiNilai();
  }

  pilihNasabah.addEventListener("change", function () {
    saatIsianBerubah("nasabah");
    perbaruiSaldo();
  });

  pilihJenis.addEventListener("change", function () {
    perbaruiPilihanKondisi();
    galat.kondisi.textContent = "";
    saatIsianBerubah("jenis");
  });

  pilihKondisi.addEventListener("change", function () {
    saatIsianBerubah("kondisi");
  });

  isianBerat.addEventListener("input", function () {
    saatIsianBerubah("berat");
  });

  form.addEventListener("submit", function (kejadian) {
    // Mencegah halaman dimuat ulang oleh pengiriman formulir bawaan browser.
    kejadian.preventDefault();
    pesanSukses.textContent = "";
    pesanSukses.className = "sukses";

    var hasil = validasiSetoran({
      nasabah: pilihNasabah.value,
      jenis: pilihJenis.value,
      kondisi: pilihKondisi.value,
      berat: isianBerat.value,
    });

    if (!hasil.valid) {
      tampilkanGalat(hasil.pesan);
      return;
    }

    bersihkanGalat();

    // Nilai <select> selalu string, sedangkan id nasabah di data berupa angka
    // dan hitungSaldo membandingkan dengan ===. Karena itu id dicari lewat Number.
    var nasabah = cariNasabah(pilihNasabah.value);
    var harga = cariHarga(HARGA, pilihJenis.value, pilihKondisi.value);
    var setoran = buatSetoran(
      nasabah,
      pilihJenis.value,
      pilihKondisi.value,
      isianBerat.value,
      harga,
      tanggalHariIni()
    );

    // Data lama dibaca ulang tepat sebelum menulis, bukan memakai salinan di
    // memori, supaya setoran dari tab lain tidak tertimpa.
    var daftar = muatSetoran();
    daftar.push(setoran);

    if (!simpanSetoran(daftar)) {
      pesanSukses.className = "galat";
      pesanSukses.textContent = "Penyimpanan gagal. Data tidak tersimpan.";
      return;
    }

    pesanSukses.textContent =
      "Setoran tersimpan. Nilai: Rp" + setoran.nilai.toLocaleString("id-ID");

    // Nasabah dibiarkan terpilih karena petugas biasanya mencatat beberapa
    // jenis sampah untuk nasabah yang sama berturut-turut.
    pilihJenis.value = "";
    perbaruiPilihanKondisi();
    isianBerat.value = "";
    perbaruiNilai();
    perbaruiSaldo();
  });

  isiPilihanNasabah();
  isiPilihanJenis();
  perbaruiPilihanKondisi();
  perbaruiNilai();
  perbaruiSaldo();
})();
