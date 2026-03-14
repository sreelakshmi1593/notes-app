# Notes App — Full Stack CRUD Application

A full stack web application built with **React.js**, **Node.js**, **Express.js**, **SQLite**, and **Python**.

## Live Demo
- Frontend: [your-app.vercel.app](#)
- Backend API: [your-api.onrender.com](#)

---

## Tech Stack

| Layer     | Technology                     |
|-----------|-------------------------------|
| Frontend  | React.js, Bootstrap 5         |
| Backend   | Node.js, Express.js           |
| Database  | SQLite (via better-sqlite3)   |
| Scripting | Python 3 (seed script)        |
| Hosting   | Vercel (FE), Render.com (BE)  |

## Features
- Create, Read, Update, Delete (CRUD) notes
- Real-time search across title and content
- Loading and error states handled
- Responsive design — works on mobile and desktop
- Python script to seed sample data into the database

---

## How to Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/notes-app.git
cd notes-app
```

### 2. Start the backend
```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:5000
```

### 3. (Optional) Seed data using Python
```bash
cd backend
python3 seed.py
```

### 4. Start the frontend
```bash
cd frontend
npm install
npm start
# App opens at http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint      | Description         |
|--------|---------------|---------------------|
| GET    | /notes        | Get all notes       |
| GET    | /notes/:id    | Get one note        |
| POST   | /notes        | Create a new note   |
| PUT    | /notes/:id    | Update a note       |
| DELETE | /notes/:id    | Delete a note       |

---

## Deployment

### Backend → Render.com
1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo → select `backend/` folder
4. Set Start Command: `node server.js`
5. Deploy — copy the live URL

### Frontend → Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Connect your GitHub repo → set Root Directory to `frontend/`
3. In `App.js`, replace `http://localhost:5000` with your Render URL
4. Deploy

---

## Project Structure
```
notes-app/
├── backend/
│   ├── server.js       # Express API with all CRUD routes
│   ├── seed.py         # Python script to insert sample data
│   ├── notes.db        # SQLite database (auto-created)
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.js               # Main component, state & API calls
    │   ├── components/
    │   │   ├── NoteForm.js      # Create & edit form
    │   │   ├── NoteList.js      # Renders list of notes
    │   │   ├── NoteCard.js      # Individual note card
    │   │   └── SearchBar.js     # Search input
    │   └── index.css            # Global styles
    └── public/index.html
```

---

Built by **Sreelakshmi Chowdam** — [LinkedIn](https://linkedin.com/in/sreelakshmichowdam)
