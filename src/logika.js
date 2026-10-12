// Fungsi hitung dan validasi EcoWin.
// Sengaja tidak menyentuh DOM maupun localStorage, supaya bisa dites langsung
// di Node.js dengan `node --test tes/`.

// Mengambil harga per kg untuk kombinasi jenis dan kondisi.
// Mengembalikan null (bukan 0) jika kombinasi tidak ada, supaya pemanggil bisa
// membedakan "tidak ditemukan" dari "harga nol".
function cariHarga(daftarHarga, jenis, kondisi) {
  for (const item of daftarHarga) {
    if (item.jenis === jenis && item.kondisi === kondisi) {
      return item.hargaPerKg;
    }
  }
  return null;
}

// Memeriksa isian berat (teks dari kotak input).
// Aturan: 0,1 sampai 100 kg termasuk batas, maksimal 2 angka di belakang koma,
// koma atau titik diterima sebagai pemisah desimal.
function validasiBerat(teks) {
  const mentah = teks === undefined || teks === null ? "" : String(teks);
  const bersih = mentah.trim();

  if (bersih === "") {
    return { valid: false, berat: null, pesan: "Berat wajib diisi" };
  }

  // Koma diubah ke titik. Hanya satu pemisah yang diperbolehkan; teks seperti
  // "1.5.5", "abc", atau "1e2" ditolak oleh pola di bawah, bukan dibaca sebagian.
  const angka = bersih.replace(",", ".");
  if (!/^-?\d+(\.\d+)?$/.test(angka)) {
    return { valid: false, berat: null, pesan: "Berat harus berupa angka" };
  }

  // Jumlah desimal dicek pada teks, bukan pada angka, karena 1,50 dan 1,5
  // adalah angka yang sama tetapi tulisannya berbeda.
  const bagianDesimal = angka.includes(".") ? angka.split(".")[1] : "";
  if (bagianDesimal.length > 2) {
    return {
      valid: false,
      berat: null,
      pesan: "Berat maksimal 2 angka di belakang koma",
    };
  }

  const berat = Number(angka);
  if (berat < 0.1 || berat > 100) {
    return {
      valid: false,
      berat: null,
      pesan: "Berat harus antara 0,1 dan 100 kg",
    };
  }

  return { valid: true, berat: berat, pesan: "" };
}

// Menghitung nilai setoran dalam rupiah: harga per kg x berat, dibulatkan ke
// rupiah terdekat (0,5 ke atas dibulatkan naik).
// Dihitung dengan bilangan bulat: berat dijadikan "per 0,01 kg" (berat x 100),
// karena perkalian pecahan di JavaScript bisa meleset tipis (contoh: 0,1 + 0,2).
// Fungsi ini mengasumsikan berat sudah lolos validasiBerat.
function hitungNilai(hargaPerKg, berat) {
  const beratPerSenKg = Math.round(berat * 100);
  const totalDikaliSeratus = hargaPerKg * beratPerSenKg;
  // +50 sebelum dibagi 100 = pembulatan setengah ke atas pada bilangan bulat.
  return Math.floor((totalDikaliSeratus + 50) / 100);
}

// Memeriksa seluruh isian formulir setoran.
// Mengembalikan pesan per isian (string kosong jika isian itu benar) supaya
// antarmuka bisa menampilkan pesan di samping isian yang bermasalah.
function validasiSetoran(data) {
  const pesan = { nasabah: "", jenis: "", kondisi: "", berat: "" };

  if (!data || !data.nasabah) pesan.nasabah = "Nasabah wajib dipilih";
  if (!data || !data.jenis) pesan.jenis = "Jenis wajib dipilih";
  if (!data || !data.kondisi) pesan.kondisi = "Kondisi wajib dipilih";

  const hasilBerat = validasiBerat(data ? data.berat : "");
  if (!hasilBerat.valid) pesan.berat = hasilBerat.pesan;

  const valid =
    pesan.nasabah === "" &&
    pesan.jenis === "" &&
    pesan.kondisi === "" &&
    pesan.berat === "";

  return { valid: valid, pesan: pesan };
}

// Agar file yang sama bisa dites di Node.js. Di browser, baris ini dilewati
// karena `module` tidak ada.
if (typeof module !== "undefined") {
  module.exports = { cariHarga, validasiBerat, hitungNilai, validasiSetoran };
}
