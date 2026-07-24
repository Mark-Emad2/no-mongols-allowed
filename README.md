# 📚 Za3bola Reads - Digital Library Management System

> A full-stack digital library platform enabling users to browse collections, borrow books, track reading histories, and manage library accounts through a secure RESTful architecture.

---

## 🌟 Overview

**Za3bola Reads** is an end-to-end web application built to streamline library operations and improve user reading experiences. The system provides role-based access for both readers and administrators: allowing users to search books and track borrowings in real-time, while giving administrators dedicated dashboard tools to control catalog inventories and manage active transactions.

---

## ✨ Key Features

- 📖 **Book Catalog & Search:** Browse, filter, and search the library database for available titles, genres, and author details.
- 🔄 **Borrowing Engine:** Request book loans with real-time status tracking (e.g., *Borrowed*, *Returned*, *Overdue*).
- 👤 **User Profiles & History:** Track personal borrowing logs, active loans, and account details over time.
- 🔐 **Secure Authentication:** JWT token-based authentication paired with password hashing for secure session handling.
- 🛠️ **Admin Dashboard:** Full collection management (CRUD operations on books, categories, and inventory counts) alongside active loan oversight.
- ⚡ **RESTful API Backend:** Cleanly separated backend endpoints powering web and client interactions.

---

## 🛠️ Tech Stack & Architecture

- **Backend:** Python (Django 6) & Django REST Framework (DRF)
- **Frontend:** JavaScript (ES6+), HTML5, CSS3
- **Database:** SQLite (Relational storage for users, books, and loan records)
- **Authentication:** JSON Web Tokens (JWT) & Django Auth Mechanics


---

## 🚀 Getting Started

### Prerequisites

- **Python 3.10+**
- **pip** (Python Package Installer)
- **virtualenv** (recommended)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone 
