// Baca dan tulis setoran di localStorage.
// Dipisah dari app.js agar formulir (index.html) dan rekap (rekap.html)
// memakai satu kunci dan satu cara baca yang sama, sehingga tidak bisa berbeda.
// Berbeda dengan logika.js, file ini menyentuh localStorage, jadi tidak ikut dites
// dengan `node --test`.

const KUNCI_SETORAN = "ecowin_setoran";

// Membaca daftar setoran. localStorage bisa tidak tersedia (mode privat,
// diblokir) atau isinya rusak, jadi semua kegagalan dianggap "belum ada data"
// agar halaman tetap bisa dipakai, bukan berhenti dengan error.
function muatSetoran() {
  try {
    const teks = window.localStorage.getItem(KUNCI_SETORAN);
    if (!teks) return [];
    const daftar = JSON.parse(teks);
    return Array.isArray(daftar) ? daftar : [];
  } catch (galatBaca) {
    return [];
  }
}

// Mengembalikan true jika berhasil. Pemanggil harus memeriksa hasilnya agar
// tidak menampilkan "tersimpan" padahal penulisan gagal (mis. penyimpanan penuh).
function simpanSetoran(daftar) {
  try {
    window.localStorage.setItem(KUNCI_SETORAN, JSON.stringify(daftar));
    return true;
  } catch (galatTulis) {
    return false;
  }
}
