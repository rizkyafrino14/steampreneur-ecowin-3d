// Data contoh EcoWin. Semua nama dan harga adalah data contoh, bukan data warga
// atau harga resmi bank sampah mana pun.
// Harga dipisah dari rumus supaya mudah diganti ketika pengelola mengubah harga,
// tanpa menyentuh logika.js.

// Daftar nasabah contoh. Saldo tidak disimpan di sini: saldo dihitung dari
// jumlah setoran yang tersimpan, sehingga tidak bisa tidak sinkron.
const NASABAH = [
  { id: 1, nama: "Bu Sari", rt: "01" },
  { id: 2, nama: "Pak Budi", rt: "02" },
  { id: 3, nama: "Bu Ani", rt: "03" },
  { id: 4, nama: "Pak Joko", rt: "01" },
];

// Harga per kg menurut kombinasi jenis dan kondisi sampah anorganik.
const HARGA = [
  { jenis: "Botol PET bening", kondisi: "Dipisah", hargaPerKg: 4500 },
  { jenis: "Botol PET bening", kondisi: "Utuh", hargaPerKg: 3500 },
  { jenis: "Gelas plastik", kondisi: "Bersih", hargaPerKg: 3000 },
  { jenis: "Gelas plastik", kondisi: "Kotor", hargaPerKg: 1500 },
  { jenis: "Kardus", kondisi: "Kering", hargaPerKg: 1950 },
  { jenis: "Kardus", kondisi: "Basah", hargaPerKg: 750 },
  { jenis: "Kaleng aluminium", kondisi: "Dipenyet", hargaPerKg: 12000 },
  { jenis: "Kaleng aluminium", kondisi: "Utuh", hargaPerKg: 10000 },
];

// Agar file yang sama bisa dites di Node.js. Di browser, baris ini dilewati
// karena `module` tidak ada.
if (typeof module !== "undefined") module.exports = { NASABAH, HARGA };
