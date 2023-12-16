const express = require("express");
const router = express.Router();
const db = require("../models/db");

// GET /mahasiswa
router.get("/", (req, res) => {
  db.query("SELECT * FROM mahasiswa", (error, results) => {
    if (error) {
      console.error("Error fetching mahasiswa:", error);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// GET /mahasiswa/:nim
router.get("/:nim", (req, res) => {
  const mahasiswaId = req.params.nim;
  db.query("SELECT * FROM mahasiswa WHERE nim = ?", [mahasiswaId], (error, results) => {
    if (error) {
      consosle.error("Error fetching mahasiswa:", error);
      res.status(500).json({ message: "Internal Server Error" });
    } else if (results.length === 0) {
      res.status(404).json({ message: "Mahasiswa not found" });
    } else {
      res.json(results[0]);
    }
  });
});

// PUT /mahasiswa/:nim
router.put("/:nim", (req, res) => {
  const mahasiswaNim = req.params.nim;
  const { nama, gender, prodi, alamat } = req.body;
  db.query("UPDATE mahasiswa SET nama = ?, gender = ?, prodi = ?, alamat = ? WHERE nim = ?", [nama, gender, prodi, alamat, mahasiswaNim], (error) => {
    if (error) {
      console.error("Error updating mahasiswa:", error);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.json("Updating mahasiswa Successfully");
    }
  });
});

// POST: Menambahkan mahasiswa baru
router.post("/", (req, res) => {
  const { nama } = req.body;

  // Validasi input
  if (!nama) {
    return res.status(400).json({ message: "Nama mahasiswa harus diisi" });
  }

  // Membuat ID baru
  const newMahasiswa = {
    id: mahasiswaData.length + 1,
    nama: nama,
  };

  mahasiswaData.push(newMahasiswa);

  res.status(201).json(newMahasiswa);
});

// DELETE: Menghapus mahasiswa berdasarkan ID
router.delete("/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id);
  mahasiswaData = mahasiswaData.filter((m) => m.id !== idToDelete);

  res.json({ message: "Mahasiswa berhasil dihapus" });
});

module.exports = router;
