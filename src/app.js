// Menghubungkan formulir setoran (index.html) dengan fungsi di logika.js.
// File ini hanya mengurus tampilan dan kejadian; semua rumus dan aturan
// validasi dipanggil dari logika.js supaya tidak ada dua versi aturan yang sama.

(function () {
  // app.js juga dimuat oleh rekap.html yang tidak punya formulir ini.
  // Tanpa pemeriksaan ini, halaman rekap akan error di konsol.
  var form = document.getElementById("form-setoran");
  if (!form) return;

  var pilihNasabah = document.getElementById("nasabah");
  var pilihJenis = document.getElementById("jenis");
  var pilihKondisi = document.getElementById("kondisi");
  var isianBerat = document.getElementById("berat");
  var areaNilai = document.getElementById("nilai");
  var pesanSukses = document.getElementById("pesan-sukses");

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
    // Mencegah halaman dimuat ulang; pada langkah ini belum ada yang disimpan.
    kejadian.preventDefault();
    pesanSukses.textContent = "";

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
    pesanSukses.textContent = "Data valid. Penyimpanan dibuat di langkah berikutnya.";
  });

  isiPilihanNasabah();
  isiPilihanJenis();
  perbaruiPilihanKondisi();
  perbaruiNilai();
})();
