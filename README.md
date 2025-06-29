🧾 Vendor Management System

A web-based application for managing vendor records including adding, deleting, updating, and searching vendors by material specifications. This system connects to a MySQL database and is built using HTML, JavaScript (frontend), and Node.js with Express (backend).

---

## 🌐 Features

- 📥 Add new vendors with detailed info.
- ❌ Delete all entries for a vendor or specific material entries.
- 🔍 Search vendors by material specification name.
- ✏️ Update vendor details.
- 🗂 View entries in a styled, responsive table.

---

## 💻 Tech Stack

| Layer      | Technology                 |
|------------|----------------------------|
| Frontend   | HTML5, CSS, Bootstrap, JavaScript |
| Backend    | Node.js, Express.js        |
| Database   | MySQL                      |

---

## 🏗️ Project Structure

project-folder/
│
├── public/
│ ├── index.html # Main HTML interface
│ └── script.js # Frontend logic (add/delete/update/search)
│
├── server.js # Node.js server with all API routes
├── package.json # Dependencies and scripts
└── README.md # This file

sql
Copy
Edit

---

## 🔌 API Endpoints

| Method | Endpoint                          | Description                                 |
|--------|-----------------------------------|---------------------------------------------|
| GET    | `/get-vendors`                    | Get all distinct vendors                    |
| POST   | `/add-vendor`                     | Add a new vendor entry                      |
| DELETE | `/delete-all-vendor/:vendorName`  | Delete all entries for a vendor             |
| DELETE | `/delete-entry`                   | Delete a specific vendor-material entry     |
| GET    | `/vendor-entries/:vendorName`     | Get all entries for a specific vendor       |
| GET    | `/materials-for-vendor/:vendor`   | Get materials linked to a vendor            |
| GET    | `/vendors-by-material/:material`  | Get all vendors who supply a given material |
| GET    | `/get-material-names`             | Get all distinct material specification names |
| POST   | `/update-vendor-details`          | Update details of a specific entry          |

---

## ⚙️ Setup Instructions

### 1. Clone the repository
git clone https://github.com/your-username/vendor-management-system.git
cd vendor-management-system

### 2. Install dependencies
bash
Copy
Edit
npm install

### 3. Configure MySQL Database
Create a MySQL database named venmgmt

Create a table vendorinfo with appropriate columns as used in server.js

Update DB credentials in server.js if needed:

js
Copy
Edit
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your-password',
  database: 'venmgmt'
});

### 4. Run the server
bash
Copy
Edit
node server.js

### 5. Open your browser and visit:
👉 http://localhost:3000
