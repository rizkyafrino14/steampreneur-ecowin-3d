/*
 * Contoh pengujian untuk kasir.js
 *
 * Cara menjalankan dari folder bughunt-kasir (butuh Node.js 18 atau lebih baru):
 *   node --test
 *
 * Node.js otomatis menjalankan semua file berakhiran .test.js.
 * Ini hanya contoh format. Tambahkan test kalian sendiri untuk setiap
 * aturan bisnis dan setiap bug yang kalian perbaiki.
 */

const test = require("node:test");
const assert = require("node:assert");
const kasir = require("../kasir.js");

test("subtotal dua produk berbeda dihitung dari harga x jumlah", () => {
  const keranjang = [];
  kasir.tambahItem(keranjang, "K04", 2); // Es Teh 2 x 4.000
  kasir.tambahItem(keranjang, "K07", 1); // Air Mineral 1 x 3.500
  assert.strictEqual(kasir.hitungSubtotal(keranjang), 11500);
});
