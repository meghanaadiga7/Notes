# 📝 Notes – Task & Noteset Manager

A full-stack task & note-set management application where users can organize tasks inside custom note sets after authentication.

---

## ✨ Features

### 🔐 User Authentication
- Sign up and log in
- JWT-protected routes
- Users can only access their own notes & note sets

### 🗂 Note Sets
- Create multiple note sets (e.g., *Groceries*, *Workout*, *Studies*)
- Rename note sets
- Delete note sets

### ✅ Tasks Within Each Note Set
- Add tasks related to that note set
- Delete individual tasks
- Structured task listing UI
---

## 🛠 Tech Stack

| Layer | Technologies |
|------|--------------|
| **Frontend** | React (Vite), React Router, Axios/Fetch, CSS/Custom Styling |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, JWT, dotenv |

---

## 📁 Project Structure

```bash
.
├── server/                # Node/Express backend
│   ├── controllers/
│   ├── models/
│   ├── routers/
│   ├── utils/
│   ├── server.js
│   └── package.json
└── views/                # React (Vite) frontend
    ├── src/
    │   ├── components/
    │   │   ├── Account/
    │   │   ├── NoteSetPage/
    │   │   └── Signup/
    │   ├── App.jsx
    │   └── main.jsx / index.jsx
    └── package.json
---
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone <your-repo-link>.git
cd <project-folder>

2️⃣ Backend Setup
npm install

Create .env 

PORT=8087
MONGO_URI=<your-mongo-connection-string>
JWT_SECRET=<your-jwt-secret>
CLIENT_URL=http://localhost:5173

Start the server:

nodemon server.js
# or
npm start

✅ Expected Console Output:

Connected to DB
Listening on port 8087

3️⃣ Frontend Setup
cd views
npm install
npm run dev


🌐 Frontend runs on:

http://localhost:5173

---
🧠 Usage Guide

Sign up with username/email and password

Login to access your note-set dashboard

Create a Note Set using the + button/card

Click on a note set to open and manage tasks

Add related Tasks inside the selected set

Click on the note to strike the finished task

Rename or delete note sets and tasks anytime

Click Logout when finished

---
### Images

<img width="1899" height="993" alt="Screenshot 2025-11-25 223941" src="https://github.com/user-attachments/assets/40825cbf-7d9d-4619-a980-5da064516bd5" />

<img width="1907" height="984" alt="Screenshot 2025-11-25 224025" src="https://github.com/user-attachments/assets/151a2056-76ea-48c8-9ce3-057531c65208" />

<img width="1893" height="997" alt="Screenshot 2025-11-25 224107" src="https://github.com/user-attachments/assets/b3f93249-5772-4c9e-ae86-c0cfaab33a0b" />

<img width="1913" height="987" alt="Screenshot 2025-11-25 224213" src="https://github.com/user-attachments/assets/f21473ac-61a9-4a72-ae90-1e2fedc4e2d0" />

<img width="1876" height="997" alt="Screenshot 2025-11-25 224330" src="https://github.com/user-attachments/assets/09a72cac-f745-432f-9869-7c2ef177d858" />

<img width="1847" height="994" alt="Screenshot 2025-11-26 101658" src="https://github.com/user-attachments/assets/8d0e2d8b-a59f-4546-8f40-565b1bf9f76e" />
