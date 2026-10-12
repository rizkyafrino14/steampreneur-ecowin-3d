// Menampilkan setoran tersimpan di tabel rekap (rekap.html), lengkap dengan
// pencarian, filter jenis, dan unduh CSV.
// Hanya mengurus tampilan: data dibaca lewat penyimpanan.js, sedangkan urutan,
// penyaringan, dan isi CSV ditentukan oleh fungsi di logika.js.

(function () {
  var badan = document.querySelector("#tabel-rekap tbody");
  var jumlah = document.getElementById("jumlah-setoran");
  var kotakCari = document.getElementById("cari");
  var pilihJenis = document.getElementById("filter-jenis");
  var tombolUnduh = document.getElementById("unduh-csv");
  if (!badan) return;

  // Baris yang sedang tampil. Disimpan agar unduhan CSV persis sama dengan
  // tabel di layar (sudah tersaring dan berurutan), bukan seluruh data.
  var barisTampil = [];

  // Berat disimpan sebagai angka (2.5) tetapi orang Indonesia menulis koma.
  function formatBerat(berat) {
    return Number(berat).toLocaleString("id-ID", { maximumFractionDigits: 2 });
  }

  function formatRupiah(nilai) {
    return "Rp" + Number(nilai).toLocaleString("id-ID");
  }

  // textContent dipakai (bukan innerHTML) karena nama dan jenis berasal dari
  // data yang tersimpan; teks itu tidak boleh ditafsirkan sebagai HTML.
  function buatSel(teks, kelas) {
    var sel = document.createElement("td");
    sel.textContent = teks;
    if (kelas) sel.className = kelas;
    return sel;
  }

  function tampilkanPesan(teks) {
    var baris = document.createElement("tr");
    var sel = buatSel(teks, "kosong");
    sel.colSpan = 7;
    baris.appendChild(sel);
    badan.appendChild(baris);
  }

  // Jenis diambil dari HARGA (sama dengan formulir), dibuat unik.
  function isiPilihanJenis() {
    if (!pilihJenis || typeof HARGA === "undefined") return;
    var sudah = {};
    HARGA.forEach(function (h) {
      if (!sudah[h.jenis]) {
        sudah[h.jenis] = true;
        var opsi = document.createElement("option");
        opsi.value = h.jenis;
        opsi.textContent = h.jenis;
        pilihJenis.appendChild(opsi);
      }
    });
  }

  function tampilkan() {
    // Urutan: baca -> urutkan -> saring, agar hasil saringan tetap terbaru dulu.
    var semua = urutkanSetoran(muatSetoran());
    barisTampil = saringSetoran(semua, {
      kata: kotakCari ? kotakCari.value : "",
      jenis: pilihJenis ? pilihJenis.value : "",
    });

    badan.innerHTML = "";
    if (jumlah) jumlah.textContent = barisTampil.length + " setoran";
    if (tombolUnduh) tombolUnduh.disabled = barisTampil.length === 0;

    if (semua.length === 0) {
      // Belum pernah ada setoran sama sekali.
      tampilkanPesan("Belum ada setoran");
      return;
    }
    if (barisTampil.length === 0) {
      // Ada data, tetapi tidak ada yang cocok dengan pencarian atau filter.
      // Pesannya dibedakan agar petugas tidak mengira datanya hilang.
      tampilkanPesan("Data tidak ditemukan");
      return;
    }

    barisTampil.forEach(function (setoran) {
      var baris = document.createElement("tr");
      baris.appendChild(buatSel(setoran.tanggal));
      baris.appendChild(buatSel(setoran.nasabah));
      baris.appendChild(buatSel(setoran.kategori));
      baris.appendChild(buatSel(setoran.jenis));
      baris.appendChild(buatSel(setoran.kondisi));
      baris.appendChild(buatSel(formatBerat(setoran.berat), "angka"));
      baris.appendChild(buatSel(formatRupiah(setoran.nilai), "angka"));
      badan.appendChild(baris);
    });
  }

  // Membuat file CSV di browser lalu memicu unduhan. Tidak perlu server,
  // sehingga bisa dipakai lewat file://.
  function unduhCsv() {
    if (barisTampil.length === 0) return;

    // BOM (﻿) di awal membuat Excel membaca file sebagai UTF-8,
    // bukan menampilkan karakter non-ASCII menjadi rusak.
    var isi = "﻿" + buatCsv(barisTampil);
    var berkas = new Blob([isi], { type: "text/csv;charset=utf-8" });
    var alamat = URL.createObjectURL(berkas);

    var tautan = document.createElement("a");
    tautan.href = alamat;
    tautan.download = "ecowin-rekap.csv";
    document.body.appendChild(tautan);
    tautan.click();
    document.body.removeChild(tautan);

    // Alamat sementara dilepas agar tidak menahan memori.
    setTimeout(function () {
      URL.revokeObjectURL(alamat);
    }, 0);
  }

  if (kotakCari) kotakCari.addEventListener("input", tampilkan);
  if (pilihJenis) pilihJenis.addEventListener("change", tampilkan);
  if (tombolUnduh) tombolUnduh.addEventListener("click", unduhCsv);

  isiPilihanJenis();
  tampilkan();
})();
