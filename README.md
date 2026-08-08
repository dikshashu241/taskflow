# TaskFlow 🚀

A full-stack task management application built with the MERN stack to help users organize, track, and manage their daily tasks efficiently.

## ✨ Features

### 🔐 Authentication

* User Signup and Login
* JWT-based authentication
* Protected routes
* User profile management

### 📋 Task Management

* Create new tasks
* Edit existing tasks
* Delete tasks
* Mark tasks as completed
* Track pending and completed tasks

### 🎯 Task Organization

* Low, Medium, and High priority
* Due date management
* Task filtering
* Separate pending and completed task views

### 📊 Dashboard

* Total tasks
* Pending tasks
* Completed tasks
* Priority-based task statistics

### 👤 Profile

* User profile
* Manage account information

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Bootstrap / Tailwind CSS

### Backend

* Node.js
* Express.js
* REST APIs
* JWT Authentication

### Database

* MongoDB
* Mongoose

### Tools

* Git
* GitHub
* VS Code
* Thunder Client / Postman

## 📁 Project Structure

```text
TaskFlow/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── assets/
│       ├── App.jsx
│       └── main.jsx
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dikshashu241/taskflow.git
cd taskflow
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

## 🔒 Security

* Passwords are securely hashed
* JWT is used for authentication
* Protected API routes restrict unauthorized access
* Environment variables are used for sensitive configuration

## 📸 Screenshots

Screenshots of the application will be added here.

## 🌐 Live Demo

Coming soon.

## 👩‍💻 Author

**Diksha Sahu**

MERN Stack Developer

* GitHub: https://github.com/dikshashu241
* LinkedIn: https://www.linkedin.com/in/diksha-sahu-1a431b3b9/
