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
  urutkanSetoran,
  saringSetoran,
  buatCsv,
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

// ---- urutkanSetoran (langkah 5) ----
// Hanya menguji urutan; nilai uang sengaja tidak dipakai di sini.

test("urutkanSetoran: daftar kosong tetap kosong", () => {
  assert.deepEqual(urutkanSetoran([]), []);
});

test("urutkanSetoran: terbaru dulu, tanggal sama -> yang disimpan akhir dulu", () => {
  const pertama = { tanggal: "2026-10-11", id: "pertama" };
  const kedua = { tanggal: "2026-10-12", id: "kedua" };
  const ketiga = { tanggal: "2026-10-12", id: "ketiga" };
  const hasil = urutkanSetoran([pertama, kedua, ketiga]);
  assert.deepEqual(
    hasil.map((s) => s.id),
    ["ketiga", "kedua", "pertama"]
  );
});

test("urutkanSetoran: array asli tidak berubah urutannya", () => {
  const asli = [
    { tanggal: "2026-10-11", id: "pertama" },
    { tanggal: "2026-10-12", id: "kedua" },
    { tanggal: "2026-10-12", id: "ketiga" },
  ];
  const hasil = urutkanSetoran(asli);
  assert.notEqual(hasil, asli);
  assert.deepEqual(
    asli.map((s) => s.id),
    ["pertama", "kedua", "ketiga"]
  );
});

// ---- saringSetoran dan buatCsv (change request: cari, filter, CSV) ----
// Data uji dan hasil yang diharapkan berasal dari docs/analisis-change-request.md.

const S1 = { tanggal: "2026-10-12", nasabahId: 1, nasabah: "Bu Sari", kategori: "Anorganik", jenis: "Botol PET bening", kondisi: "Dipisah", berat: 2.5, nilai: 11250 };
const S2 = { tanggal: "2026-10-12", nasabahId: 1, nasabah: "Bu Sari", kategori: "Anorganik", jenis: "Botol PET bening", kondisi: "Utuh", berat: 2.5, nilai: 8750 };
const S3 = { tanggal: "2026-10-12", nasabahId: 2, nasabah: "Pak Budi", kategori: "Anorganik", jenis: "Kardus", kondisi: "Kering", berat: 2, nilai: 3900 };
const S4 = { tanggal: "2026-10-12", nasabahId: 3, nasabah: "Bu Ani", kategori: "Anorganik", jenis: "Gelas plastik", kondisi: "Bersih", berat: 1.5, nilai: 4500 };
const SEMUA = [S1, S2, S3, S4];

test("saringSetoran: kata 'kardus' -> hanya S3", () => {
  assert.deepEqual(saringSetoran(SEMUA, { kata: "kardus", jenis: "" }), [S3]);
});

test("saringSetoran: huruf besar tidak berpengaruh ('KARDUS' -> S3)", () => {
  assert.deepEqual(saringSetoran(SEMUA, { kata: "KARDUS", jenis: "" }), [S3]);
});

test("saringSetoran: kata 'sari' -> S1 dan S2", () => {
  assert.deepEqual(saringSetoran(SEMUA, { kata: "sari", jenis: "" }), [S1, S2]);
});

test("saringSetoran: kata 'xyz' -> kosong", () => {
  assert.deepEqual(saringSetoran(SEMUA, { kata: "xyz", jenis: "" }), []);
});

test("saringSetoran: jenis 'Botol PET bening' -> S1 dan S2", () => {
  assert.deepEqual(
    saringSetoran(SEMUA, { kata: "", jenis: "Botol PET bening" }),
    [S1, S2]
  );
});

test("saringSetoran: jenis 'Botol PET bening' dan kata 'utuh' -> S2", () => {
  assert.deepEqual(
    saringSetoran(SEMUA, { kata: "utuh", jenis: "Botol PET bening" }),
    [S2]
  );
});

test("saringSetoran: kata dan jenis kosong -> semua, berupa salinan", () => {
  const hasil = saringSetoran(SEMUA, { kata: "", jenis: "" });
  assert.deepEqual(hasil, [S1, S2, S3, S4]);
  assert.notEqual(hasil, SEMUA);
});

test("saringSetoran: array asli tidak berubah", () => {
  const asli = [S1, S2, S3, S4];
  saringSetoran(asli, { kata: "kardus", jenis: "Kardus" });
  assert.deepEqual(asli, [S1, S2, S3, S4]);
});

test("buatCsv: satu setoran persis sesuai format", () => {
  assert.equal(
    buatCsv([S2]),
    "Tanggal,Nasabah,Kategori,Jenis,Kondisi,Berat (kg),Nilai (Rp)\r\n" +
      "2026-10-12,Bu Sari,Anorganik,Botol PET bening,Utuh,2.5,8750"
  );
});

test("buatCsv: daftar kosong hanya berisi baris nama kolom", () => {
  assert.equal(
    buatCsv([]),
    "Tanggal,Nasabah,Kategori,Jenis,Kondisi,Berat (kg),Nilai (Rp)"
  );
});

test("buatCsv: koma dan tanda kutip di dalam field dibungkus kutip ganda", () => {
  const khusus = { ...S2, nasabah: 'Bu "Sari", RT 1' };
  const baris = buatCsv([khusus]).split("\r\n")[1];
  assert.ok(baris.includes('"Bu ""Sari"", RT 1"'));
});

test("buatCsv: nilai tanpa 'Rp' dan tanpa titik ribuan", () => {
  const baris = buatCsv([S1]).split("\r\n")[1];
  assert.ok(!baris.includes("Rp"));
  assert.ok(baris.endsWith(",11250"));
  assert.ok(!baris.includes("11.250"));
});

// ---- buatCsv: pencegahan formula injection ----

test("buatCsv: field diawali rumus diberi tanda kutip tunggal di depan", () => {
  const rumus = { ...S2, nasabah: "=1+1" };
  const baris = buatCsv([rumus]).split("\r\n")[1];
  assert.ok(baris.includes(",'=1+1,"));
});

test("buatCsv: awalan +, -, dan @ juga dicegah", () => {
  for (const awal of ["+", "-", "@"]) {
    const khusus = { ...S2, nasabah: awal + "x" };
    const baris = buatCsv([khusus]).split("\r\n")[1];
    assert.ok(baris.includes(",'" + awal + "x,"), "awalan " + awal);
  }
});

test("buatCsv: nama biasa tidak diberi tanda kutip tunggal", () => {
  const baris = buatCsv([S2]).split("\r\n")[1];
  assert.ok(baris.includes(",Bu Sari,"));
  assert.ok(!baris.includes("'"));
});
