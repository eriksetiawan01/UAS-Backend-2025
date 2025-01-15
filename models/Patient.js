// import database
const db = require("../config/database");

// membuat class Patient
class Patient {
  // Method untuk mendapatkan semua patients
  static all() {
    const query = "SELECT * FROM patients";

    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) {
          reject(err); // Jika ada error, reject Promise
        } else {
          resolve(results); // Jika berhasil, resolve dengan hasil query
        }
      });
    });
  }

  // Method untuk mencari pasien berdasarkan status
  static findByStatus(status) {
    const query = "SELECT * FROM patients WHERE status = ?";

    return new Promise((resolve, reject) => {
      db.query(query, [status], (err, results) => {
        if (err) {
          return reject(err); // Tangani error
        }
        resolve(results); // Mengembalikan hasil pencarian berdasarkan status
      });
    });
  }

  // Method untuk mencari pasien berdasarkan nama
  static search(name) {
    const query = "SELECT * FROM patients WHERE name LIKE ?";

    return new Promise((resolve, reject) => {
      db.query(query, [`%${name}%`], (err, results) => {
        if (err) {
          return reject(err); // Tangani error
        }
        resolve(results); // Mengembalikan hasil pencarian
      });
    });
  }

  // Method untuk menambahkan patient baru
  static async create(data) {
    // Melakukan insert data ke database
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO patients SET ?";
      db.query(sql, data, (err, results) => {
        if (err) {
          return reject(err); // Tangani error
        }
        resolve(results.insertId); // Kembalikan id hasil insert
      });
    });

    // Cari data patient berdasarkan id
    const patients = await this.find(id);
    return patients;
  }

  // Method untuk mencari patient berdasarkan id
  static find(id) {
    const query = "SELECT * FROM patients WHERE id = ?";

    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) {
          return reject(err); // Tangani error
        }
        resolve(results[0]); // Mengembalikan data pertama (karena id unik)
      });
    });
  }

  static async update(id, data) {
    await new Promise((resolve, reject) => {
        const sql = "UPDATE patients SET ? WHERE id = ?";
        db.query(sql, [data, id], (err, results) => {
            resolve(results);
        });
    });

    // mencari data yang baru di update
    const patients = await this.find(id);
    return patients;
  }

  static delete(id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM patients WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) {
        reject(err); // Tangani error
      } else {
        resolve(results.affectedRows); // Mengembalikan jumlah baris yang dihapus
      }
    });
  });
  }

}

// export class Patient
module.exports = Patient;
