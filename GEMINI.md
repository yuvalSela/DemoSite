# DemoSite

## Project Overview

DemoSite is a full-stack web application. It consists of a Python-based backend API and a React-based frontend application. The application appears to be a mock Human Resources platform called "TalentSync HR API", featuring functionality like employee listing and mocked payroll execution.

### Architecture
*   **Backend:** A Python API built with [FastAPI](https://fastapi.tiangolo.com/) and served via Uvicorn. It handles employee data and simulates a payroll pipeline.
*   **Frontend:** A modern web client built with [React 19](https://react.dev/) and bundled using [Vite](https://vitejs.dev/). It utilizes `lucide-react` for iconography.

## Directory Structure

*   `/backend/`: Contains the Python FastAPI application.
    *   `main.py`: The entry point for the FastAPI application, defining API routes.
    *   `requirements.txt`: Python dependencies (`fastapi`, `uvicorn[standard]`).
    *   `venv/`: The local Python virtual environment.
*   `/frontend/`: Contains the React/Vite application.
    *   `package.json`: Node.js dependencies and NPM scripts.
    *   `vite.config.js`: Configuration for the Vite bundler.
    *   `src/`: Contains the React source code (`App.jsx`, `main.jsx`, CSS).

## Building and Running

### Backend

The backend utilizes a Python virtual environment.

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Activate the virtual environment:
    ```bash
    source venv/bin/activate
    ```
3.  Install dependencies (if not already installed):
    ```bash
    pip install -r requirements.txt
    ```
4.  Run the development server:
    ```bash
    uvicorn main:app --reload
    ```
    The API will typically be available at `http://127.0.0.1:8000`.

### Frontend

The frontend uses standard Node.js/NPM tooling.

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Build for production:
    ```bash
    npm run build
    ```

## Development Conventions

*   **Backend (Python):**
    *   Uses **FastAPI** for routing and **Pydantic** (`BaseModel`) for request/response validation.
    *   Endpoints are asynchronous (`async def`).
    *   CORS is currently configured to allow all origins (`allow_origins=["*"]`), which is convenient for development but should be restricted in production.
*   **Frontend (JavaScript/React):**
    *   Uses **React 19** features.
    *   Uses **Vite** for fast development and building.
    *   Code style is enforced via **ESLint** (`npm run lint`).
