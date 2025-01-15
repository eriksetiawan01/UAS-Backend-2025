// import Model Patient
const Patient = require("../models/Patient");
// import database
const db = require("../config/database");

// buat class PatientController
class PatientController {
  // buat fungsi
  async index(req, res) {
    const patients = await Patient.all();

    // data array lebih dari o
    if (patients.length > 0) {
      const data = {
        message: "Menampilkan semua data pasien",
        data: patients,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: "Patients is empty",
      };

      res.status(200).json(data);
    };
  }

  async show(req, res) {
    const { id } = req.params;
    
    const patients = await Patient.find(id);

    if (patients) {
      const data = {
        message : `Menampilkan detail Pasien`,
        data: patients,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Student not found`,
      };

      res.status(404).json(data);
    }
  }

  // Menambahkan data student baru
  async store(req, res) {
    const { name, phone, address, status, in_date_at, out_date_at } = req.body;

    if (!name || !phone || !address || !status || !in_date_at || !out_date_at) {
        const data = {
          message: "Semua data harus dikirim",
        };

        return res.status(422).json(data);
    }

    // else
    const patients = await Patient.create(req.body);

    const data = {
      message: "Menambahkan data Pasien",
      data: patients,
    };

    return res.status(201).json(data);
  }

  async update(req, res) {
    const { id } = req.params;

    const patients = await Patient.find(id);

    if (patients) {
      const patients = await Patient.update(id, req.body);
      const data = {
        message : `Mengedit data Pasien`,
        data : patients,
      };
      res.json(data);
    } else {
      const data = {
        message: `Pasien not found`,
      };
      res.status(404).json(data);
    }
  }

  async destroy(req, res) {
    const { id } = req.params; // Ambil ID dari URL
  
    try {
      // Periksa apakah pasien dengan ID tersebut ada
      const patient = await Patient.find(id);
  
      if (!patient) {
        // Jika pasien tidak ditemukan
        return res.status(404).json({
          message: "Pasien not found",
        });
      }
  
      // Lakukan penghapusan
      const affectedRows = await Patient.delete(id);
  
      if (affectedRows > 0) {
        // Jika penghapusan berhasil
        return res.status(200).json({
          message: "Menghapus data pasien berhasil",
        });
      } else {
        // Jika penghapusan gagal (seharusnya tidak terjadi karena find sebelumnya)
        return res.status(400).json({
          message: "Gagal menghapus data pasien",
        });
      }
    } catch (error) {
      // Tangani error server
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // Fungsi pencarian pasien berdasarkan nama
  async search(req, res) {
    const { name } = req.params; // Ambil nama dari parameter URL
    const query = `SELECT * FROM patients WHERE name LIKE ?`; // Query untuk mencari nama pasien
    
    try {
      // Cari pasien berdasarkan nama dengan LIKE
      const results = await new Promise((resolve, reject) => {
        db.query(query, [`%${name}%`], (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        });
      });

      if (results.length > 0) {
        const data = {
          message: `Menampilkan pasien dengan nama yang mengandung '${name}'`,
          data: results,
        };
        res.status(200).json(data);
      } else {
        const data = {
          message: `Tidak ada pasien yang ditemukan dengan nama yang mengandung '${name}'`,
        };
        res.status(404).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message: "Terjadi kesalahan pada server",
        error: error.message,
      });
    }
  }

  // Fungsi untuk menampilkan pasien dengan status 'positive'
async statusPositive(req, res) {
  try {
    const patients = await Patient.findByStatus('positive'); // Mencari pasien dengan status 'positive'

    if (patients.length > 0) {
      const data = {
        message: "Menampilkan pasien dengan status positive",
        data: patients,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: "Tidak ada pasien dengan status positive",
      };
      res.status(404).json(data);
    }
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
}


  
}


// membuat object PatientController
const object = new PatientController();

// export object PatientController
module.exports = object;
