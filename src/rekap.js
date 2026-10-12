// Menampilkan semua setoran tersimpan di tabel rekap (rekap.html).
// Hanya mengurus tampilan: data dibaca lewat penyimpanan.js dan urutannya
// ditentukan oleh urutkanSetoran di logika.js.

(function () {
  var badan = document.querySelector("#tabel-rekap tbody");
  var jumlah = document.getElementById("jumlah-setoran");
  if (!badan) return;

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

  function tampilkan() {
    var daftar = urutkanSetoran(muatSetoran());
    badan.innerHTML = "";

    if (jumlah) jumlah.textContent = daftar.length + " setoran";

    if (daftar.length === 0) {
      var barisKosong = document.createElement("tr");
      var selKosong = buatSel("Belum ada setoran", "kosong");
      selKosong.colSpan = 7;
      barisKosong.appendChild(selKosong);
      badan.appendChild(barisKosong);
      return;
    }

    daftar.forEach(function (setoran) {
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

  tampilkan();
})();
