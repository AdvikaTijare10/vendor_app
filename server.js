const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public')); // to serve index.html and script.js
app.use(bodyParser.json());

// DB connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'radhika#1382',  // or your password
  database: 'venmgmt'
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected!");
});

// gets vendor names form database
app.get('/get-vendors', (req, res) => {
  const sql = `SELECT DISTINCT VENCD, Vendor FROM vendorinfo ORDER BY Vendor ASC`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching vendors:', err);
      return res.status(500).json({ message: 'Error fetching vendors', error: err });
    }
    res.json(results);
  });
});

// Add Vendor
app.post('/add-vendor', (req, res) => {
const v = {
    ...req.body,
    vendorId: req.body.vendorId.trim().toUpperCase(),
    vendorName: req.body.vendorName.trim().toUpperCase(),
    materialSpecName: req.body.materialSpecName.trim().toUpperCase(),
    materialSpecNo: req.body.materialSpecNo?.trim().toUpperCase(),
    pmd: req.body.pmd?.trim().toUpperCase(),
    indentNo: req.body.indentNo?.trim().toUpperCase(),
    inddev: req.body.inddev?.trim().toUpperCase(),
    poNo: req.body.poNo?.trim().toUpperCase(),
    vendorsInPMD: req.body.vendorsInPMD?.trim().toUpperCase(),
    approvalStatus: req.body.approvalStatus?.trim().toUpperCase(),
    remark: req.body.remark?.trim().toUpperCase(),
    sampleDate: req.body.sampleDate,
    indentDate: req.body.indentDate,
    poDate: req.body.poDate,
    poVal: req.body.poVal,
    approxVolume: req.body.approxVolume
  };

  const checkSql = `
    SELECT * FROM vendorinfo 
    WHERE VENCD = ? AND Vendor = ? AND \`Material Specification Name\` = ?
  `;
  const checkValues = [v.vendorId, v.vendorName, v.materialSpecName];

  db.query(checkSql, checkValues, (checkErr, checkResult) => {
    if (checkErr) {
      console.error('\n❌ MySQL Duplicate Check Error:\n', checkErr);
      return res.status(500).json({ message: '❌ Error checking duplicates', error: checkErr.sqlMessage || checkErr.message || checkErr });
    }

    if (checkResult.length > 0) {
      // Duplicate exists
      return res.status(400).json({ message: '⚠️ Vendor entry already exists for this VENCD, Vendor, and Material Specification Name.' });
    }

    // No duplicate found — proceed to insert
    const sql = `
      INSERT INTO vendorinfo (
        \`VENCD\`, \`Vendor\`, \`Sample Submission Date\`, 
        \`Material Specification Number\`, \`Material Specification Name\`, \`PMD\`,
        \`Indent No\`, \`Indent Date\`, \`INDDEV\`, \`PO No.\`, \`PO Date\`, \`PO-VAL(Rs.Lacs)\`, 
        \`Approx Business Volume per annum in Rs.Lacs(As on 18.12.2024)\`, 
        \`Vendor already in PMD(1V/2V/3V)\`, \`Vendor development/Approval Status\`, \`Remark\`
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      v.vendorId,
      v.vendorName,
      v.sampleDate,
      v.materialSpecNo,
      v.materialSpecName,
      v.pmd,
      v.indentNo,
      v.indentDate,
      v.inddev,
      v.poNo,
      v.poDate,
      v.poVal,
      v.approxVolume,
      v.vendorsInPMD,
      v.approvalStatus,
      v.remark
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('\n❌ MySQL Insert Error:\n', err);
        console.error('\n🧪 SQL:\n', sql);
        console.error('\n📦 Values:\n', values);
        return res.status(500).json({ message: '❌ Error adding vendor', error: err.sqlMessage || err.message || err });
      }
      res.json({ message: '✅ Vendor added successfully!' });
    });
  });
});









// Delete Vendor
app.delete('/delete-all-vendor/:vendorName', (req, res) => {
  const vendorName = req.params.vendorName.toUpperCase();
  const sql = 'DELETE FROM vendorinfo WHERE UPPER(Vendor) = ?';
  db.query(sql, [vendorName], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: `✅ Deleted ${result.affectedRows} entries for ${vendorName}` });
  });
});

app.get('/vendor-entries/:vendorName', (req, res) => {
  const vendor = req.params.vendorName.toUpperCase();
  const sql = 'SELECT * FROM vendorinfo WHERE UPPER(Vendor) = ?';
  db.query(sql, [vendor], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

app.delete('/delete-entry', (req, res) => {
  const { vendorName, materialName } = req.body;
  const sql = `DELETE FROM vendorinfo 
               WHERE UPPER(Vendor) = ? AND UPPER(\`Material Specification Name\`) = ?`;
  db.query(sql, [vendorName.toUpperCase(), materialName.toUpperCase()], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '⚠️ No such entry found.' });
    }
    res.json({ message: '✅ Entry deleted successfully!' });
  });
});

app.get('/materials-for-vendor/:vendorName', (req, res) => {
  const vendor = req.params.vendorName.toUpperCase();
  const sql = `SELECT DISTINCT \`Material Specification Name\` FROM vendorinfo WHERE UPPER(Vendor) = ?`;
  db.query(sql, [vendor], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});





//for searching using material name
app.get('/get-material-names', (req, res) => {
  
  const sql = 'SELECT DISTINCT `Material Specification Name` FROM vendorinfo ORDER BY `Material Specification Name` ASC';
const vendor = req.query.vendor;  // ✅ declare the variable here

  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching material names:', err);
      return res.status(500).json({ message: 'Error fetching material names', error: err });
    }

    res.json(results); // sends array of objects with "Material Specification Name"
  });
});
app.get('/vendors-by-material/:materialName', (req, res) => {
  const materialName = decodeURIComponent(req.params.materialName);

  const sql = 'SELECT * FROM vendorinfo WHERE LOWER(TRIM(`Material Specification Name`)) = LOWER(TRIM(?))';
  db.query(sql, [materialName], (err, results) => {
    if (err) {
      console.error('❌ Error fetching vendors for material:', err);
      return res.status(500).json({ message: 'Error fetching vendor data', error: err });
    }

    res.json(results); // returns all vendors matching that material
  });
});













// Search by Material
// app.get('/search-material', (req, res) => {
//   const material = req.query.material;
//   const sql = 'SELECT * FROM vendorinfo WHERE `Material Specification Name` LIKE ?';
//   db.query(sql, [`%${material}%`], (err, results) => {
//     if (err) return res.status(500).send([]);
//     res.json(results);
//   });
// });

// // Get all unique vendors
// app.get('/vendors', (req, res) => {
//   db.query('SELECT DISTINCT Vendor FROM vendorinfo', (err, result) => {
//     if (err) {
//       res.status(500).send('Database error');
//     } else {
//       const vendors = result.map(row => row.Vendor);
//       res.json(vendors);
//     }
//   });
// });

// // Search entries by vendor name
// app.get('/search', (req, res) => {
//   const name = req.query.vendor_name;
//   db.query('SELECT * FROM vendorinfo WHERE Vendor = ?', [name], (err, results) => {
//     if (err) {
//       res.status(500).send('Error fetching entries');
//     } else {
//       res.json(results);
//     }
//   });
// });


app.get('/get-materials-by-vendor', (req, res) => {
  const vendor = req.query.vendor;
  console.log("Vendor received:", vendor);
  const sql = 'SELECT DISTINCT `Material Specification Name` FROM vendorinfo WHERE Vendor = ?';
  db.query(sql, [vendor], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.get('/get-vendor-material-details', (req, res) => {
  const { vendor, material } = req.query;
  const sql = 'SELECT * FROM vendorinfo WHERE Vendor = ? AND `Material Specification Name` = ? LIMIT 1';
  db.query(sql, [vendor, material], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Not found' });
    res.json(results[0]);
  });
});


app.post('/update-vendor-details', (req, res) => {
  console.log("Incoming request body:", req.body);
  const data = req.body;

  const sql = `
    UPDATE vendorinfo SET 
      \`Sample Submission Date\` = ?,
      \`Material Specification Number\` = ?,
      \`PMD\` = ?,
      \`Indent No\` = ?,
      \`Indent Date\` = ?,
      \`INDDEV\` = ?,
      \`PO No.\` = ?,
      \`PO Date\` = ?,
      \`PO-VAL(Rs.Lacs)\` = ?,
      \`Approx Business Volume per annum in Rs.Lacs(As on 18.12.2024)\` = ?,
      \`Vendor already in PMD(1V/2V/3V)\` = ?,
      \`Vendor Development/Approval Status\` = ?,
      \`Remark\` = ?
    WHERE Vendor = ? AND \`Material Specification Name\` = ?
  `;

  const rawValues = [
  data.sampleDate,
  data.materialSpecNumber,
  data.pmd,
  data.indentNo,
  data.indentDate,
  data.inddev,
  data.poNo,
  data.poDate,
  data.poVal,
  data.businessVolume,
  data.vendorsInPMD,
  data.approvalStatus,
  data.remark,
  data.vendor,
  data.material
];

const values = rawValues.map(v => v === undefined ? null : v); // 🛡️ Sanitize

console.log("📦 Incoming request body:", req.body);
console.log("🧾 SQL values about to send:", values);
  db.query(sql, values, (err, result) => {
    if (err) {
    console.error('❌ Full database error:', err);
    return res.status(500).json({ error: err.message || err.sqlMessage || 'Unknown database error' });
  }


    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'No matching record found to update' });
    }

    res.json({ message: 'Vendor details updated successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
