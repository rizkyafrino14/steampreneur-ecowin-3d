/*
 * Pengujian aturan bisnis Kasir Kantin STEAM.
 * Hasil yang diharapkan dihitung manual dari aturan di README.md.
 * Setiap test ditulis agar GAGAL pada kode asli dan LULUS setelah perbaikan.
 *
 * Jalankan dari folder bughunt-kasir: node --test
 */

const test = require("node:test");
const assert = require("node:assert");
const kasir = require("../kasir.js");

test("Bug 1: jumlah dari formulir (teks) dijumlahkan sebagai angka, Es Teh 2 ditambah 3 menjadi 5", () => {
  const keranjang = [];
  kasir.tambahItem(keranjang, "K04", "2");
  kasir.tambahItem(keranjang, "K04", "3");
  assert.strictEqual(keranjang.length, 1);
  assert.strictEqual(keranjang[0].qty, 5);
});

test("Bug 2: jumlah selain bilangan bulat 1 sampai 99 ditolak dengan pesan", () => {
  for (const salah of [0, -1, 1.5, "", "abc", "0", "-3", "2.5", 100, 101]) {
    assert.throws(
      () => kasir.tambahItem([], "K04", salah),
      /Jumlah harus bilangan bulat/,
      "harus ditolak: " + JSON.stringify(salah)
    );
  }
});

test("Bug 2: jumlah 1 dan 99 (angka maupun teks) diterima", () => {
  for (const benar of [1, 99, "1", "99", "50"]) {
    const keranjang = [];
    kasir.tambahItem(keranjang, "K04", benar);
    assert.strictEqual(keranjang[0].qty, Number(benar));
  }
});

test("Bug 3: total jumlah satu produk tidak boleh lebih dari 99 dan keranjang tidak berubah saat ditolak", () => {
  const keranjang = [];
  kasir.tambahItem(keranjang, "K04", 60);
  assert.throws(() => kasir.tambahItem(keranjang, "K04", 40), /99/);
  assert.strictEqual(keranjang[0].qty, 60);
  kasir.tambahItem(keranjang, "K04", 39);
  assert.strictEqual(keranjang[0].qty, 99);
});

test("Bug 4: bukan member dengan subtotal tepat Rp100.000 mendapat diskon 5%, Rp99.999 tidak", () => {
  assert.strictEqual(kasir.hitungDiskon(100000, false), 5000);
  assert.strictEqual(kasir.hitungDiskon(99999, false), 0);
});

test("Bug 5: diskon tidak digabung, member hanya 10% dan bukan member 5%", () => {
  assert.strictEqual(kasir.hitungDiskon(120000, true), 12000); // bukan 18000
  assert.strictEqual(kasir.hitungDiskon(120000, false), 6000);
  assert.strictEqual(kasir.hitungDiskon(50000, true), 5000);
  assert.strictEqual(kasir.hitungDiskon(50000, false), 0);
});

test("Bug 5: diskon member dibulatkan ke rupiah terdekat, 100,5 menjadi 101", () => {
  assert.strictEqual(kasir.hitungDiskon(1005, true), 101);
});
