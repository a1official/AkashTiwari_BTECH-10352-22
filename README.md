# 📋 Ozi Task Management System

A premium, full-stack Task Management application featuring a dynamic **Kanban board**, secure **user authentication**, and **responsive design**. Built with React and Node.js.

## 🌐 Live Demo

**[https://akashtiwari-btech-10352-22.onrender.com](https://akashtiwari-btech-10352-22.onrender.com)**

---

## 📌 Project Overview

This application allows users to manage their tasks efficiently using a Kanban-style board with three columns: **Pending**, **In Progress**, and **Completed**. Users can drag and drop tasks between columns, create/edit/delete tasks, and filter by status. Each user has their own private task space with secure authentication.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 (Vite), @hello-pangea/dnd (Drag & Drop), Lucide Icons |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | JSON Web Tokens (JWT), bcryptjs |
| **Validation** | express-validator |
| **Testing** | Jest, Supertest |
| **Styling** | Vanilla CSS with Glassmorphism Design |

---

## ✨ Features

- ✅ **User Authentication** - Secure Signup, Login with JWT tokens
- ✅ **Protected Routes** - All task operations require authentication
- ✅ **Kanban Board** - Drag and drop tasks between status columns
- ✅ **Task CRUD** - Create, Read, Update, and Delete tasks
- ✅ **Task Filtering** - Filter tasks by status via API query params
- ✅ **User-Specific Data** - Each user can only access their own tasks
- ✅ **Profile Management** - Update profile and delete account
- ✅ **Input Validation** - Server-side validation with meaningful errors
- ✅ **Responsive Design** - Mobile-first, works on all screen sizes
- ✅ **Error Handling** - Proper HTTP status codes and error messages

---

## 🛠 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (Local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure your `.env` file:**
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/task_management
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

---

## 🔒 Environment Variables

### Backend (`.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/task_management` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key` |
| `NODE_ENV` | Environment mode | `development` or `production` |

> ⚠️ **Note**: A `.env.example` file is provided in the backend directory with all required keys.

---

## 📁 Project Structure

```
ozi_task_management/
├── backend/                    # Express.js API Server
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── controllers/       # Route handlers (auth, task, user)
│   │   ├── middleware/        # Auth & Error handling middleware
│   │   ├── models/            # Mongoose schemas (User, Task)
│   │   ├── routes/            # API route definitions
│   │   ├── tests/             # Jest unit tests
│   │   ├── app.js             # Express app configuration
│   │   └── server.js          # Entry point
│   ├── .env.example           # Environment variables template
│   ├── jest.config.js         # Jest configuration
│   └── package.json
│
├── frontend/                   # React Application (Vite)
│   ├── public/                # Static assets (logo, favicon)
│   ├── src/
│   │   ├── api/               # Axios API configuration
│   │   ├── components/        # Reusable components (Navbar, KanbanBoard)
│   │   ├── context/           # React Context (AuthContext)
│   │   ├── pages/             # Application pages (Dashboard, Login, etc.)
│   │   ├── App.jsx            # Main app with routing
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Global styles & design tokens
│   └── package.json
│
├── .gitignore                 # Git ignore rules
└── README.md                  # This documentation
```

---

## 📝 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/signup` | Register a new user | No |
| `POST` | `/api/auth/login` | Login and receive JWT token | No |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/users/me` | Get current user profile | Yes |
| `PUT` | `/api/users/me` | Update user profile | Yes |
| `DELETE` | `/api/users/me` | Delete user account | Yes |

### Task Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/tasks` | Get all tasks for logged-in user | Yes |
| `GET` | `/api/tasks?status=pending` | Filter tasks by status | Yes |
| `GET` | `/api/tasks/:id` | Get a single task by ID | Yes |
| `POST` | `/api/tasks` | Create a new task | Yes |
| `PUT` | `/api/tasks/:id` | Update a task | Yes |
| `DELETE` | `/api/tasks/:id` | Delete a task | Yes |

### Request/Response Examples

**Create Task (POST /api/tasks)**
```json
// Request Body
{
  "title": "Complete project",
  "description": "Finish the SDE assignment",
  "due_date": "2026-01-20",
  "status": "pending"
}

// Response (201 Created)
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Complete project",
    "description": "Finish the SDE assignment",
    "due_date": "2026-01-20T00:00:00.000Z",
    "status": "pending",
    "userId": "...",
    "created_at": "..."
  }
}
```

---

## 🧪 Testing

The project includes unit tests using **Jest** and **Supertest**.

### Running Tests

```bash
cd backend
npm test
```

### Test Coverage
- ✅ API Health Check
- ✅ User Model Validation

---

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Passwords are hashed using bcryptjs (salt rounds: 10)
- **Protected Routes**: Middleware verifies JWT before accessing resources
- **User Data Isolation**: Users can only access their own tasks
- **Input Validation**: Server-side validation using express-validator
- **Error Handling**: Centralized error middleware with proper HTTP status codes

---

## 📱 Screenshots

### Dashboard (Kanban Board)
The main dashboard features a beautiful Kanban board with drag-and-drop functionality.

![Dashboard Screenshot](./screenshots/dashboard.png)

### Key UI Features
- 🎨 **White & Dark Pink Theme** - Premium glassmorphism design
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- ✨ **Smooth Animations** - Drag-and-drop with visual feedback
- 🔍 **Status Filtering** - Quick filter by task status

---

## 📊 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, min 6 chars),
  created_at: Date (default: now)
}
```

### Task Model
```javascript
{
  title: String (required, max 100 chars),
  description: String (required, max 500 chars),
  status: String (enum: ['pending', 'in-progress', 'completed']),
  due_date: Date (required),
  userId: ObjectId (ref: User),
  created_at: Date (default: now)
}
```

---

## 🚀 Deployment (Optional)

The application can be deployed to:
- **Frontend**: Vercel, Netlify
- **Backend**: Render, Railway, Heroku
- **Database**: MongoDB Atlas

---

## 📋 Submission Checklist

- [x] Single Git repository with frontend and backend
- [x] Meaningful commit messages
- [x] No unnecessary files committed (node_modules, .env)
- [x] Incremental commits showing development progress
- [x] Complete README documentation
- [x] Environment variables configuration with .env.example
- [x] MongoDB database integration
- [x] JWT authentication with protected routes
- [x] Input validation and error handling
- [x] Unit tests included
- [x] Responsive design

---

## 👤 Author

**Akash Tiwari**  
Roll Number: BTECH-10352-22

---

*Created for SDE Assignment Submission*
