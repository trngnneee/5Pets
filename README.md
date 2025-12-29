Here is the comprehensive, professional version of your **5Pets Development Guide**, written entirely in English. You can use this directly in your `README.md` file.

---

# 🐾 5Pets - Local Development Guide

Welcome to the **5Pets** project documentation. This guide provides a comprehensive overview of the system architecture, environment prerequisites, and step-by-step instructions for setting up the development environment on a local machine.

## 📋 Table of Contents

1.  [Project Structure](#-project-structure)
2.  [Prerequisites](#-prerequisites)
3.  [Frontend Setup (Next.js)](#-frontend-nextjs)
4.  [Backend Setup (Flask)](#-backend-flask)
5.  [AI Module Setup](#-ai-pet-consultant)
6.  [Running the Application](#-running-the-application)
7.  [Troubleshooting & Notes](#-troubleshooting--notes)

---

## 📁 Project Structure

The project follows a Monorepo-style structure to manage the Frontend, Backend, and Data resources efficiently.

```ini
project-root/
│
├── data/                  # 🗄️ Raw and processed data (crawls, datasets)
├── design/                # 🎨 UI/UX resources, mockups, and assets
├── pa/                    # 📄 Project Architecture & Proposals
├── docs/                  # 📚 Supplemental documentation (API specs, manuals)
│
├── src/                   # 💻 Core Source Code
│   ├── client/            # ⚛️ Frontend Application (Next.js)
│   ├── server/            # 🐍 Backend API Service (Flask)
│   └── ai_pet_consultant/ # 🤖 AI Chatbot & Logic Module
│
└── README.md              # 📖 Main entry point documentation
```

---

## ⚙️ Prerequisites

Ensure your development environment meets the following requirements before proceeding:

| Tool | Version | Purpose |
| :--- | :--- | :--- |
| **Node.js** | `≥ 18.x` | Runtime environment for the Frontend. |
| **npm** | `Latest` | Package manager for Node.js. |
| **Python** | `≥ 3.10` | Runtime for Backend and AI services. |
| **pip** | `Latest` | Package installer for Python. |
| **Git** | `Latest` | Version control system. |

---

## 🖥️ Frontend (Next.js)

**Location:** `src/client`

The frontend is built with **Next.js**. It communicates with the Flask backend via RESTful APIs.

### 1. Environment Configuration

Create a `.env` file in the `src/client` directory to store environment variables.

```bash
cd src/client
# Create the file (if it doesn't exist)
touch .env
```

Add the following configuration to `.env`:

```env
# API Endpoint for the Flask Backend
NEXT_PUBLIC_API_URL=http://localhost:10000/api
```

### 2. Installation & Execution

```bash
# Install dependencies defined in package.json
npm install

# Start the development server
npm run dev
```

> 🌐 **Access:** The frontend will be available at [http://localhost:3000](http://localhost:3000).

---

## ⚙️ Backend (Flask)

**Location:** `src/server`

The backend is built with **Flask**, serving as the API layer and data processor.

### 1. Virtual Environment Setup

It is highly recommended to use a virtual environment to manage Python dependencies locally.

```bash
cd src/server

# Create a virtual environment named '.env.bin'
python -m venv .env.bin
```

**Activate the environment:**

*   **macOS / Linux:**
    ```bash
    source .env.bin/bin/activate
    ```
*   **Windows (Cmd/PowerShell):**
    ```bash
    .env.bin\Scripts\activate
    ```

### 2. Installation & Execution

```bash
# Install required Python packages
pip install -r requirements.txt

# Start the Flask server
python app.py
```

> 🔌 **API Server:** The backend will run on [http://localhost:10000](http://localhost:10000).

---

## 🤖 AI Pet Consultant

**Location:** `src/ai_pet_consultant`

This module contains the logic for the AI chatbot. Depending on your implementation, this may run as a standalone service or be imported by the Backend.

If it requires standalone setup:

```bash
cd src/ai_pet_consultant

# Optional: Create a separate venv
python -m venv venv
source venv/bin/activate

# Install AI dependencies
pip install -r requirements.txt
```

---

## 🚀 Running the Application

To run the full stack, you need to execute the services concurrently in separate terminal sessions.

### Step 1: Start the Backend
1.  Open **Terminal 1**.
2.  Navigate to `src/server`.
3.  Activate the virtual environment.
4.  Run `python app.py`.

### Step 2: Start the Frontend
1.  Open **Terminal 2**.
2.  Navigate to `src/client`.
3.  Run `npm run dev`.

### Step 3: Verify
Open your browser and navigate to **http://localhost:3000**. Ensure the application loads and can fetch data from the backend (check the Network tab in Developer Tools).

---

## 🧩 Troubleshooting & Notes

### Port Conflicts
*   **Port 3000** is used by Next.js.
*   **Port 10000** is used by Flask.
*   *Solution:* If these ports are in use, identify the process using them or change the port configuration in `package.json` (Frontend) or `app.py` (Backend) and update the `.env` file accordingly.

### Environment Variables
*   If you modify `.env` files, you must **restart the server** (Ctrl+C and run again) for changes to take effect.

### CORS Errors
*   If the frontend cannot communicate with the backend due to CORS (Cross-Origin Resource Sharing) errors, ensure `flask-cors` is installed and configured in your `app.py` to accept requests from `http://localhost:3000`.

---
*Maintained by the 5Pets Development Team.*