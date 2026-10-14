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
