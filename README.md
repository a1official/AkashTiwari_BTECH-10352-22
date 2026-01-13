# Task Management System (Kanban Based)

A premium, full-stack Task Management application featuring a dynamic Kanban board, user authentication, and responsive design. Built with React and Node.js.

## 🚀 Tech Stack

- **Frontend**: React (Vite), @hello-pangea/dnd (Drag & Drop), Framer Motion, Lucide Icons, Vanilla CSS
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Auth**: JSON Web Tokens (JWT), bcryptjs
- **Styling**: Premium Glassmorphism UI with a custom design system

## ✨ Features

- **Authentication**: Secure Signup, Login, and Protected Routes.
- **Kanban Board**: Drag and drop tasks between Pending, In Progress, and Completed columns.
- **Task CRUD**: Create, Read, Update, and Delete tasks with real-time feedback.
- **Task Filtering**: Filter tasks by status (Pending, In Progress, Completed) using the API.
- **User Specific**: Each user can only see and manage their own tasks.
- **Profile Management**: Update user details and delete account functionality.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## 🛠 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (Local or Atlas)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with your MongoDB URI and JWT Secret.
5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📁 Repository Structure

```text
akash_10352/
├── backend/                # Express API
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth & Error handling
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API endpoints
│   │   └── server.js       # Entry point
├── frontend/               # React App
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── context/        # State management
│   │   ├── pages/          # Application pages
│   │   └── styles/         # CSS design system
└── README.md
```

## 🔒 Environment Variables

### Backend
- `PORT`: Port number for the server (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `NODE_ENV`: development or production

## 📝 API Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and get token |
| GET | `/api/users/me` | Get current user profile |
| PUT | `/api/users/me` | Update user profile |
| GET | `/api/tasks` | Get all user-specific tasks |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update task (status/title/etc) |
| DELETE | `/api/tasks/:id` | Delete a task |

---
*Created by Akash - SDE Assignment Submission*
