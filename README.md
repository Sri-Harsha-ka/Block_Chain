# Blockchain Simulator Web App

## 📌 Project Overview
This is a **simple blockchain simulation** built with:
- **Frontend:** React.js
- **Backend:** Node.js (Express.js)
- **Blockchain Logic:** SHA-256 hashing, block validation, and linked blocks.

Users can:
✅ View the blockchain
✅ Add new blocks (transactions)
✅ Validate the blockchain

---
## 🚀 Installation Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/blockchain-simulator.git
cd blockchain-simulator
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
node index.js
```
🔹 Runs the backend on **http://localhost:5000**

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm start
```
🔹 Opens **http://localhost:3000**

---
## 📡 API Endpoints

### ➤ Get Blockchain
**GET /get_chain**
- **URL:** `http://localhost:5000/get_chain`
- **Response:**
```json
{
  "chain": [
    {
      "index": 0,
      "transactions": "Genesis Block",
      "previous_hash": "0",
      "hash": "abcd1234"
    }
  ]
}
```

### ➤ Add a New Block
**POST /add_block**
- **URL:** `http://localhost:5000/add_block`
- **Body (JSON):**
```json
{
  "transactions": "Alice pays Bob 10 BTC"
}
```
- **Response:**
```json
{
  "message": "Block added successfully!",
  "block": {
    "index": 1,
    "transactions": "Alice pays Bob 10 BTC",
    "previous_hash": "abcd1234",
    "hash": "efgh5678"
  }
}
```

### ➤ Validate Blockchain
**GET /is_valid**
- **URL:** `http://localhost:5000/is_valid`
- **Response:**
```json
{
  "valid": true
}
```

---
## 🎯 Next Steps
🔹 **Dockerize** the app for deployment.
🔹 **Connect to a database** (MongoDB) for persistence.
🔹 **Improve UI with Material UI or TailwindCSS.

---
## 🛠️ Troubleshooting
- **Backend not running?** Use `node index.js` in the `backend` folder.
- **CORS error?** Restart backend and frontend.
- **Network error?** Ensure ports `5000` (backend) & `3000` (frontend) are open.

---
## 📜 License
This project is open-source and available under the **MIT License**.

---
**Made with ❤️ by Your Harsha**

