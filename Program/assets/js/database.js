const express = require('express');
const mysql = require('mysql');
const app = express();

// Koneksi ke database
const connection = mysql.createConnection({
  host: 'localhost', // Ganti dengan host database Anda
  user: 'rastomi', // Ganti dengan username database Anda
  password: 'rastomi07', // Ganti dengan password database Anda
  database: 'MenuWarmaskin' // Ganti dengan nama database Anda
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to database');
});

// Endpoint untuk pencarian data
app.get('/search', (req, res) => {
  const { keyword } = req.query;

  const query = `
    SELECT * FROM (
      SELECT 'tbl_kopi' AS 'Nama Menu', NamaKopi FROM tbl_kopi WHERE NamaKopi LIKE '%${keyword}%'
      UNION
      SELECT 'tbl_coffe' AS 'Nama Menu', NamaCoffe FROM tbl_coffe WHERE NamaCoffe LIKE '%${keyword}%'
      UNION
      SELECT 'tbl_noncoffe' AS 'Nama Menu', NamaMenu FROM tbl_noncoffe WHERE NamaMenu LIKE '%${keyword}%'
      UNION
      SELECT 'tbl_special' AS 'Nama Menu', NamaMenuSpecial FROM tbl_special WHERE NamaMenuSpecial LIKE '%${keyword}%'
    ) AS all_tables
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Menu Tidak Diitemukan');
      return;
    }
    res.json(results);
  });
});

// Port server
const port = 3000; // Anda bisa menggunakan port yang lain jika 3000 sudah digunakan

// Mulai server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
