# Transaction App (Test Project)

Simple full-stack app to register a transaction with:

- Transaction Description
- Transaction Amount

The frontend sends the data to the backend, and the submitted transaction is shown on screen.

## Project structure

- `frontend` (React + Vite)
- `backend` (Node.js + Express)

## Run frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Run frontend test

```bash
cd frontend
npm test
```

## Run backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:3001`.

## Backend endpoints

- `POST /transactions` → saves a transaction
- `GET /transactions` → returns saved transactions (in-memory)

## Run backend test

```bash
cd backend
npm test
```
