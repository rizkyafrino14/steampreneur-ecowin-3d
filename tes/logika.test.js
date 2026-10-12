// Unit test logika.js. Jalankan dengan: node --test tes/
// Angka "hasil yang diharapkan" di bawah dihitung manual oleh tim dengan
// kalkulator (lihat docs/04-kasus-uji.md dan docs/bukti/hitung-manual/),
// bukan dihitung ulang oleh kode atau AI.

const test = require("node:test");
const assert = require("node:assert/strict");
const { HARGA } = require("../src/data.js");
const {
  cariHarga,
  validasiBerat,
  hitungNilai,
  validasiSetoran,
  hitungSaldo,
  buatSetoran,
} = require("../src/logika.js");

// ---- hitungNilai (U01-U06) ----

test("U01: PET bening Dipisah 2,5 kg = Rp11.250", () => {
  assert.equal(hitungNilai(4500, 2.5), 11250);
});

test("U02: PET bening Utuh 2,5 kg = Rp8.750", () => {
  assert.equal(hitungNilai(3500, 2.5), 8750);
});

test("U03: Kardus Kering 0,33 kg = 643,5 dibulatkan naik ke Rp644", () => {
  assert.equal(hitungNilai(1950, 0.33), 644);
});

test("U04: Kardus Basah 0,33 kg = 247,5 dibulatkan naik ke Rp248", () => {
  assert.equal(hitungNilai(750, 0.33), 248);
});

test("U05: batas bawah, Kaleng Dipenyet 0,1 kg = Rp1.200", () => {
  assert.equal(hitungNilai(12000, 0.1), 1200);
});

test("U06: batas atas, PET bening Dipisah 100 kg = Rp450.000", () => {
  assert.equal(hitungNilai(4500, 100), 450000);
});

// ---- validasiBerat (U05-U11, U13) ----

test("U05/U06: batas 0,1 dan 100 diterima", () => {
  assert.deepEqual(validasiBerat("0,1"), { valid: true, berat: 0.1, pesan: "" });
  assert.deepEqual(validasiBerat("100"), { valid: true, berat: 100, pesan: "" });
});

test("U07: 0,09 ditolak (di bawah batas)", () => {
  assert.equal(validasiBerat("0,09").valid, false);
});

test("U08: 100,01 ditolak (di atas batas)", () => {
  assert.equal(validasiBerat("100,01").valid, false);
});

test("U09: nol dan negatif ditolak", () => {
  assert.equal(validasiBerat("0").valid, false);
  assert.equal(validasiBerat("-2").valid, false);
});

test("U10: kosong dan huruf ditolak dengan pesan berbeda", () => {
  const kosong = validasiBerat("");
  const huruf = validasiBerat("abc");
  assert.equal(kosong.valid, false);
  assert.equal(huruf.valid, false);
  assert.notEqual(kosong.pesan, huruf.pesan);
  assert.notEqual(kosong.pesan, "");
  assert.notEqual(huruf.pesan, "");
});

test("U11: lebih dari 2 desimal ditolak", () => {
  const hasil = validasiBerat("1,234");
  assert.equal(hasil.valid, false);
  assert.match(hasil.pesan, /2 angka/);
});

test("U13: koma dan titik dianggap sama (2,5 kg)", () => {
  assert.equal(validasiBerat("2,5").berat, 2.5);
  assert.equal(validasiBerat("2.5").berat, 2.5);
});

test("format tidak wajar ditolak, bukan dibaca sebagian", () => {
  assert.equal(validasiBerat("1.5.5").valid, false);
  assert.equal(validasiBerat("1,,5").valid, false);
  assert.equal(validasiBerat("1e2").valid, false);
});

test("spasi di awal dan akhir diabaikan", () => {
  assert.equal(validasiBerat("  2,5 ").berat, 2.5);
});

// ---- cariHarga ----

test("cariHarga: kombinasi ada mengembalikan harga per kg", () => {
  assert.equal(cariHarga(HARGA, "Botol PET bening", "Dipisah"), 4500);
  assert.equal(cariHarga(HARGA, "Kardus", "Basah"), 750);
});

test("cariHarga: kombinasi tidak ada mengembalikan null", () => {
  assert.equal(cariHarga(HARGA, "Kardus", "Dipisah"), null);
  assert.equal(cariHarga(HARGA, "Kaca", "Utuh"), null);
});

// ---- validasiSetoran (U12) ----

test("U12: nasabah, jenis, atau kondisi kosong ditolak", () => {
  const penuh = { nasabah: 1, jenis: "Kardus", kondisi: "Kering", berat: "2,5" };

  const tanpaNasabah = validasiSetoran({ ...penuh, nasabah: "" });
  assert.equal(tanpaNasabah.valid, false);
  assert.notEqual(tanpaNasabah.pesan.nasabah, "");

  const tanpaJenis = validasiSetoran({ ...penuh, jenis: "" });
  assert.equal(tanpaJenis.valid, false);
  assert.notEqual(tanpaJenis.pesan.jenis, "");

  const tanpaKondisi = validasiSetoran({ ...penuh, kondisi: "" });
  assert.equal(tanpaKondisi.valid, false);
  assert.notEqual(tanpaKondisi.pesan.kondisi, "");
});

test("validasiSetoran: semua terisi dan berat 2,5 valid", () => {
  const hasil = validasiSetoran({
    nasabah: 1,
    jenis: "Botol PET bening",
    kondisi: "Dipisah",
    berat: "2,5",
  });
  assert.equal(hasil.valid, true);
});

test("validasiSetoran: berat salah ikut menolak formulir", () => {
  const hasil = validasiSetoran({
    nasabah: 1,
    jenis: "Kardus",
    kondisi: "Kering",
    berat: "abc",
  });
  assert.equal(hasil.valid, false);
  assert.notEqual(hasil.pesan.berat, "");
});

// ---- hitungSaldo dan buatSetoran (langkah 4) ----

test("hitungSaldo: daftar kosong = 0", () => {
  assert.equal(hitungSaldo([], 1), 0);
});

test("hitungSaldo: dua setoran nasabah 1 menjumlah menjadi 20000", () => {
  const pertama = [{ nasabahId: 1, nilai: 11250 }];
  const kedua = [...pertama, { nasabahId: 1, nilai: 8750 }];
  assert.equal(hitungSaldo(pertama, 1), 11250);
  assert.equal(hitungSaldo(kedua, 1), 20000);
});

test("hitungSaldo: saldo tiap nasabah terpisah, nasabah tanpa setoran = 0", () => {
  const daftar = [
    { nasabahId: 1, nilai: 11250 },
    { nasabahId: 2, nilai: 5000 },
  ];
  assert.equal(hitungSaldo(daftar, 1), 11250);
  assert.equal(hitungSaldo(daftar, 2), 5000);
  assert.equal(hitungSaldo(daftar, 3), 0);
});

test("buatSetoran: PET bening Dipisah 2,5 kg = berat 2.5, nilai 11250", () => {
  const setoran = buatSetoran(1, "Botol PET bening", "Dipisah", "2,5", 4500, "2026-10-12");
  assert.equal(setoran.berat, 2.5);
  assert.equal(setoran.nilai, 11250);
  assert.equal(setoran.kategori, "Anorganik");
  assert.equal(setoran.nasabahId, 1);
  assert.equal(setoran.tanggal, "2026-10-12");
  assert.equal(setoran.jenis, "Botol PET bening");
  assert.equal(setoran.kondisi, "Dipisah");
});

test("buatSetoran: objek nasabah mengisi nasabahId dan nama", () => {
  const setoran = buatSetoran(
    { id: 2, nama: "Pak Budi", rt: "02" },
    "Kardus",
    "Kering",
    "1",
    1950,
    "2026-10-12"
  );
  assert.equal(setoran.nasabahId, 2);
  assert.equal(setoran.nasabah, "Pak Budi");
});
