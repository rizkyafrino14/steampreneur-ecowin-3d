/*
 * Kasir Kantin STEAM: logika perhitungan
 *
 * File ini berisi seluruh aturan bisnis kasir (menu, keranjang, diskon,
 * PPN, total, dan kembalian). Tampilan ada di app.js.
 * Fungsi-fungsi di sini bisa diuji langsung dengan Node.js (lihat folder tes/).
 */

const MENU = [
  { kode: "K01", nama: "Nasi Goreng", harga: 15000 },
  { kode: "K02", nama: "Mie Ayam", harga: 13500 },
  { kode: "K03", nama: "Soto Ayam", harga: 14000 },
  { kode: "K04", nama: "Es Teh", harga: 4000 },
  { kode: "K05", nama: "Jus Jeruk", harga: 8500 },
  { kode: "K06", nama: "Roti Bakar", harga: 10500 },
  { kode: "K07", nama: "Air Mineral", harga: 3500 },
];

function cariProduk(kode) {
  return MENU.find((p) => p.kode === kode);
}

// Menambahkan produk ke keranjang.
// Jika produk sudah ada di keranjang, jumlahnya ditambahkan.
function tambahItem(keranjang, kode, qty) {
  const produk = cariProduk(kode);
  if (!produk) {
    throw new Error("Produk tidak ditemukan");
  }

  // Nilai dari kotak isian di halaman selalu berupa teks ("2"), sehingga harus
  // diubah ke angka dulu. Tanpa ini, "2" + "3" menjadi "23", bukan 5.
  const jumlah = Number(qty);

  // Aturan 1: bilangan bulat 1 sampai 99. Kosong, nol, negatif, pecahan, dan
  // teks bukan angka (hasil Number: 0 atau NaN) harus ditolak.
  if (!Number.isInteger(jumlah) || jumlah < 1 || jumlah > 99) {
    throw new Error("Jumlah harus bilangan bulat dari 1 sampai 99");
  }

  const itemLama = keranjang.find((i) => i.kode === kode);
  if (itemLama) {
    // Aturan 2: setelah dijumlahkan, jumlah per produk tetap maksimal 99.
    // Diperiksa sebelum diubah supaya keranjang tidak berubah saat ditolak.
    if (itemLama.qty + jumlah > 99) {
      throw new Error("Total jumlah per produk tidak boleh lebih dari 99");
    }
    itemLama.qty += jumlah;
  } else {
    keranjang.push({
      kode: produk.kode,
      nama: produk.nama,
      harga: produk.harga,
      qty: jumlah,
    });
  }
  return keranjang;
}

function hapusItem(keranjang, kode) {
  return keranjang.filter((i) => i.kode !== kode);
}

function hitungSubtotal(keranjang) {
  let subtotal = 0;
  for (const item of keranjang) {
    subtotal += item.harga * item.qty;
  }
  return subtotal;
}

// Diskon belanja dan diskon member.
// Aturan 4: diskon tidak boleh digabung, hanya satu yang berlaku.
// Member mendapat 10%. Bukan member dengan subtotal minimal Rp100.000
// mendapat 5%. Selain itu tidak ada diskon.
function hitungDiskon(subtotal, member) {
  let diskon = 0;
  if (member) {
    diskon = (subtotal * 10) / 100;
  } else if (subtotal >= 100000) {
    diskon = (subtotal * 5) / 100;
  }
  return Math.round(diskon);
}

// PPN 11% dari dasar pengenaan pajak (subtotal setelah diskon).
function hitungPPN(dasar) {
  // Aturan 5: dibulatkan ke rupiah terdekat, 0,5 ke atas naik.
  return Math.round((dasar * 11) / 100);
}

function hitungRingkasan(keranjang, member) {
  const subtotal = hitungSubtotal(keranjang);
  const diskon = hitungDiskon(subtotal, member);
  const dasarPajak = subtotal - diskon;
  const ppn = hitungPPN(dasarPajak);
  const total = dasarPajak + ppn;
  return { subtotal, diskon, ppn, total };
}

// Aturan 7: jika uang yang dibayar kurang dari total, transaksi ditolak.
function hitungKembalian(total, bayar) {
  if (bayar < total) {
    throw new Error("Uang pembayaran kurang");
  }
  return bayar - total;
}

// Agar bisa dipakai di Node.js untuk pengujian.
if (typeof module !== "undefined") {
  module.exports = {
    MENU,
    cariProduk,
    tambahItem,
    hapusItem,
    hitungSubtotal,
    hitungDiskon,
    hitungPPN,
    hitungRingkasan,
    hitungKembalian,
  };
}
