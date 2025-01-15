// import PatientController
const PatientController = require("../controllers/PatientController");

// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello Covid API Express");
});

// Membuat routing patient
router.get("/patients", PatientController.index);  // Menampilkan semua data students
router.get("/patients/:id", PatientController.show);  // Menampilkan satu data students berdasarkan id yang di pilih
router.post("/patients", PatientController.store);  // Menambahkan data student baru
router.put("/patients/:id", PatientController.update);  // Mengupdate data student
router.delete("/patients/:id", PatientController.destroy);  // Menghapus data student
router.get("/patients/search/:name", PatientController.search); // Pencarian pasien berdasarkan nama
router.get("/patients/status/:status", PatientController.statusByStatus); // Menampilkan pasien dengan status positive



// export router
module.exports = router;
