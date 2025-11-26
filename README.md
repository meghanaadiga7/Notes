Notes – Task Manager

A full-stack task & noteset manager where a user can:

Sign up or log in

Create note sets for different tasks (ex: Groceries, Workout, Studies)

Inside each note set, list multiple tasks related to that note set

Manage (rename, delete, add) both note sets and tasks

🚀 Features
🔐 Authentication

User sign-up and login

Secure & protected routes using JWT

Each user sees and manages only their own note sets

🗂 Note Sets

Create multiple note sets for different areas

Rename existing note sets

Delete note sets

✅ Tasks inside Note Sets

Add tasks within each note set

Delete tasks

Organized UI for task listing

🎨 Responsive & Clean UI

Front-end built in React (Vite)

📁 Folder Structure
.
├── server/                # Node / Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routers/
│   ├── utils/
│   ├── server.js
│   └── package.json
└── views/                # React frontend (Vite)
    ├── src/
    │   ├── components/
    │   │   ├── Account/
    │   │   ├── NoteSetPage/
    │   │   └── Signup/
    │   ├── App.jsx
    │   └── index.jsx / main.jsx
    └── package.json

⚙️ Setup & Installation
1️⃣ Clone the repository
git clone <your-repo-link>.git
cd <project-folder>

2️⃣ Backend Setup
npm install


Create a .env file inside server/:

PORT=8087
MONGO_URI=<your-mongo-connection-string>
JWT_SECRET=<your-jwt-secret>
CLIENT_URL=http://localhost:5173

Run the backend:

nodemon server.js
# or
npm start

Expected console output:

Connected to DB
Listening on port 8087

3️⃣ Frontend Setup
cd views
npm install
npm run dev

Frontend will run on: http://localhost:5173

🧠 How It Works

Sign Up with email/username and password

Login to access note sets

Create a new Note Set using + button/card

Click a note set to open its task list

Add related tasks inside the note set

Delete or rename note sets and tasks

Logout when done


📌 Sample Scripts
server/package.json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}

client/package.json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}

<img width="1899" height="993" alt="Screenshot 2025-11-25 223941" src="https://github.com/user-attachments/assets/40825cbf-7d9d-4619-a980-5da064516bd5" />
<img width="1907" height="984" alt="Screenshot 2025-11-25 224025" src="https://github.com/user-attachments/assets/151a2056-76ea-48c8-9ce3-057531c65208" />
<img width="1893" height="997" alt="Screenshot 2025-11-25 224107" src="https://github.com/user-attachments/assets/b3f93249-5772-4c9e-ae86-c0cfaab33a0b" />
<img width="1913" height="987" alt="Screenshot 2025-11-25 224213" src="https://github.com/user-attachments/assets/f21473ac-61a9-4a72-ae90-1e2fedc4e2d0" />
<img width="1876" height="997" alt="Screenshot 2025-11-25 224330" src="https://github.com/user-attachments/assets/09a72cac-f745-432f-9869-7c2ef177d858" />
