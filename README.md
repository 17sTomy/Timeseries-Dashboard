# Timeseries Dashboard

![Timeseries Dashboard](frontend/public/preview.gif)

A real-time timeseries dashboard with a FastAPI backend and a React + TypeScript frontend.

---

## 🚀 How to run

### Backend (FastAPI)

1️⃣ Navigate to the backend folder:
```sh
  cd backend
```
2️⃣ Create and activate the virtual environment:
```sh
  py -m venv .venv
  .venv\Scripts\activate
```
3️⃣ Install dependencies:
```sh
  pip install -r requirements.txt
``` 
4️⃣ Start the FastAPI server:
```sh
  uvicorn main:app --reload
``` 

### Frontend (React + TypeScript)

1️⃣ Navigate to the frontend folder:
```sh
cd frontend
```
2️⃣ Install dependencies:
```sh
  npm install
```
3️⃣ Set up environment variables; create a .env file in the root of the frontend directory and add:
```sh
  VITE_WEBSOCKET_URL=ws://127.0.0.1:8000/ws
``` 
4️⃣ Start the frontend server:
```sh
  npm run dev
``` 