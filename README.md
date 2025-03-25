# 🚀 Simple Task Management API

Simple REST API untuk mengelola daftar tugas (**To-Do List**) menggunakan **Node.js + Express.js**.  
Proyek ini juga mengimplementasikan **middleware logging, error handling, dan rate limiting sederhana**.

---

## 📌 Fitur Utama

✅ **CRUD Task** → Buat, baca, update, dan hapus task.  
✅ **Custom Middleware** → Logging request pakai **Morgan** atau **Winston**.  
✅ **Global Error Handling** → Pakai **try-catch** dan middleware khusus error.  
✅ **Rate Limiting Dummy** → Middleware sederhana untuk membatasi request per menit.

---

## 🚀 API Endpoints

| **Method** | **Endpoint** | **Deskripsi**     |
| ---------- | ------------ | ----------------- |
| `POST`     | `/tasks`     | Tambah task baru  |
| `GET`      | `/tasks`     | Lihat semua task  |
| `GET`      | `/tasks/:id` | Lihat detail task |
| `PUT`      | `/tasks/:id` | Update task       |
| `DELETE`   | `/tasks/:id` | Hapus task        |

---

## 🛠️ Teknologi yang Digunakan

- **Express.js** → Framework backend.
- **Winston/Pino** → Logging request.
- **Express Middleware** → Buat middleware sendiri untuk logging, error, dan rate limit.

## 🔧 Cara Menjalankan Proyek

### **1️⃣ Clone Repository**

```sh
git clone https://github.com/username/task-api.git
cd task-api
```
