# 5Pets - Local Development Guide

## 📁 Project Structure

```ini
project-root/
│
├── pa/               # Contains proposals
├── docs/             # Contains related documentation
├── src/
│   ├── client/       # Frontend - Next.js
│   └── server/       # Backend - Flask
│
└── README.md

```

---

## ⚙️ Environment Setup

### 1️⃣ Requirements

- **Node.js** ≥ 18
- **Python** ≥ 3.10
- **pip** and **venv** (or equivalent virtual environment manager)
- **Git** (for cloning the repository)

---

## 🖥️ Frontend (Next.js)

### Environment Configuration

Create a `.env` file inside `src/client` and add necessary environment variables, for example:

```env
NEXT_PUBLIC_API_URL=http://localhost:10000/api

```

### Install Dependencies & Run

```bash
cd src/client
npm install        # Install dependencies from package.json
npm run dev        # Start the frontend on port 3000

```

The frontend will be available at **http://localhost:3000**

---

## ⚙️ Backend (Flask)

### Create Virtual Environment

```bash
cd src/server
python -m venv .env.bin
source .env.bin/bin/activate  # On macOS/Linux
.env.bin\Scripts\activate   # On Windows

```

### Install Dependencies & Run

```bash
pip install -r requirements.txt
python app.py

```

The backend will run on **http://localhost:10000**

---

## 🚀 Combined Setup

1. Start the backend (Flask) server first.
2. Then start the frontend (Next.js) app.
3. Both will communicate via the API URL defined in the `.env` file.

---

## 🧩 Notes

- Ensure both ports (3000 and 10000) are available.
- If you make changes in `.env`, restart both servers to apply new configs.