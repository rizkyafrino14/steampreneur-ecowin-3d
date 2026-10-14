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
