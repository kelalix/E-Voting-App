

# 🗳️ Ethio E-Voting Web App: Blockchain-Based

*A transparent and secure digital voting system built with React, Node.js, MongoDB, and Blockchain for the INSA Summer Camp.*

![Status](https://img.shields.io/badge/status-active-brightgreen)
![React](https://img.shields.io/badge/frontend-React-61DAFB?logo=react\&logoColor=white)
![Vite](https://img.shields.io/badge/build-Vite-646CFF?logo=vite\&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/style-TailwindCSS-38B2AC?logo=tailwindcss\&logoColor=white)
![Node.js](https://img.shields.io/badge/backend-Node.js-339933?logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/framework-Express-000000?logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/database-MongoDB-47A248?logo=mongodb\&logoColor=white)
![Blockchain](https://img.shields.io/badge/security-Blockchain-121D33?logo=bitcoin\&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-orange)

Enable citizens to **vote anytime, anywhere** with **Ethiopian National ID (FIDA) verification**, **phone OTP authentication**, and **blockchain-backed security**, ensuring one person = one vote.

---

## ✨ Features

* 🆔 **Ethiopian National ID (FIDA) Verification** – Ensures only registered citizens can access
* 📱 **Phone OTP Authentication** – Confirms voter identity via SMS code
* 🔗 **Blockchain Transparency** – Immutable, tamper-proof storage of votes
* 🗳️ **Simple Voting Flow** – Intuitive, step-by-step ballot casting
* 📊 **Real-Time Results** – Votes counted instantly with live dashboards
* 🛡️ **Fraud Prevention** – Blockchain ledger + duplicate detection prevents fake votes
* 🌐 **Web & Mobile Friendly** – Accessible on any device

---

## ⚙️ How It Works

1. **Voter Verification**

   * Voter enters their Ethiopian National ID (FIDA ID)
   * OTP is sent to their registered phone number

2. **Voting Access**

   * Successful authentication unlocks the digital ballot

3. **Casting Vote**

   * Voter selects candidate and confirms securely

4. **Blockchain Recording**

   * Vote is hashed and added to the blockchain ledger
   * Guarantees immutability and public auditability (without revealing identity)

5. **Secure Storage**

   * Encrypted vote data stored in MongoDB (backup)
   * Blockchain ensures tamper-proof audit trail

6. **Result Dashboard**

   * Real-time aggregation from blockchain + DB
   * Individual votes remain private, but totals are transparent

---

## 🛠️ Tech Stack

* **Frontend**: React + Vite + TailwindCSS
* **Backend**: Node.js + Express
* **Database**: MongoDB
* **Blockchain**: Ethereum / Hyperledger (smart contracts for vote storage)
* **Authentication**: Ethiopian National ID (FIDA API) + OTP (via SMS gateway)
* **Hosting**: Vercel (Frontend), Render/Heroku (Backend)

---

## 🔒 Security Enhancements

* ✅ Blockchain ledger prevents tampering
* ✅ All votes are encrypted before storage
* ✅ OTP + National ID ensures one-person-one-vote
* ✅ Smart contracts guarantee transparency
* ✅ Fraud attempts blocked automatically
* ✅ Brute-force login limits applied

---

