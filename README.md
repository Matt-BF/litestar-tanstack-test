# Litestar, Tanstack Router + Query, and pnpm Example

This project demonstrates a basic setup using Litestar for the backend, and Tanstack Router + Query with pnpm for the frontend.

## Project Structure

- `backend/`: Contains the Litestar backend application.
- `frontend/`: Contains the frontend application built with Tanstack Router + Query.

## Prerequisites

- [uv](https://github.com/astral-sh/uv)
- [pnpm](https://pnpm.io/)

## How to Run

1. **Start the Backend:**
   Navigate to the `backend` directory and run the Litestar application using `uv`:

   ```bash
   cd backend
   uv run uvicorn app.main:app --reload
   ```

   This will start the backend server, typically on `http://127.0.0.1:8000`.

2. **Start the Frontend:**
   Navigate to the `frontend` directory and start the development server using pnpm:

   ```bash
   cd frontend
   pnpm install # Install dependencies if you haven't already
   pnpm run dev
   ```

   This will start the frontend development server, typically on `http://localhost:5173` (or another available port).

Open your browser to the frontend address to interact with the application.
