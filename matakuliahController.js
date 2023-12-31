// matakuliahController.js

const express = require("express");
const router = express.Router();

let matakuliahData = [
  { id: 1, nama: "Matematika Dasar", deskripsi: "Deskripsi Matematika Dasar" },
  { id: 2, nama: "Fisika Dasar", deskripsi: "Deskripsi Fisika Dasar" },
  // ...
];

// Endpoint untuk mendapatkan semua matakuliah
router.get("/", (req, res) => {
  res.json(matakuliahData);
});

// Endpoint untuk mendapatkan detail matakuliah berdasarkan ID
router.get("/:id", (req, res) => {
  const matakuliah = matakuliahData.find((m) => m.id === parseInt(req.params.id));
  if (!matakuliah) {
    return res.status(404).json({ message: "Matakuliah tidak ditemukan" });
  }
  res.json(matakuliah);
});

// Endpoint untuk menambahkan matakuliah baru
router.post("/", (req, res) => {
  const { nama, deskripsi } = req.body;

  // Validasi input
  if (!nama || !deskripsi) {
    return res.status(400).json({ message: "Nama dan deskripsi matakuliah harus diisi" });
  }

  // Membuat ID baru (contoh sederhana, seharusnya menggunakan database ID auto-increment)
  const newMatakuliah = {
    id: matakuliahData.length + 1,
    nama: nama,
    deskripsi: deskripsi,
  };

  matakuliahData.push(newMatakuliah);

  res.status(201).json(newMatakuliah);
});

// Endpoint untuk memperbarui informasi matakuliah berdasarkan ID
router.put("/:id", (req, res) => {
  const idToUpdate = parseInt(req.params.id);
  const matakuliahToUpdate = matakuliahData.find((m) => m.id === idToUpdate);

  if (!matakuliahToUpdate) {
    return res.status(404).json({ message: "Matakuliah tidak ditemukan" });
  }

  // Update informasi matakuliah
  matakuliahToUpdate.nama = req.body.nama || matakuliahToUpdate.nama;
  matakuliahToUpdate.deskripsi = req.body.deskripsi || matakuliahToUpdate.deskripsi;

  res.json(matakuliahToUpdate);
});

// Endpoint untuk menghapus matakuliah berdasarkan ID
router.delete("/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id);
  matakuliahData = matakuliahData.filter((m) => m.id !== idToDelete);

  res.json({ message: "Matakuliah berhasil dihapus" });
});

module.exports = router;
