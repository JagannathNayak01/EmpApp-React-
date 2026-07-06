# EmpApp-React-

# 👥 Employee Management System

A full-stack web application for managing employee records with user authentication. Built with **React**, **Express**, and **MongoDB**.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Reference](#-api-reference)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- **User Authentication** — Secure signup & login with JWT tokens and bcrypt password hashing
- **Employee CRUD** — Create, read, update, and delete employee records
- **Form Validation** — Server-side validation for employee data (email uniqueness, age range, required fields)
- **Responsive UI** — Mobile-friendly design with Tailwind CSS and Bootstrap
- **Client-Side Routing** — Seamless navigation between Home, Employees, and About pages
- **RESTful API** — Clean, well-structured API endpoints

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **Vite** | Build tool & dev server |
| **React Router v7** | Client-side routing |
| **Tailwind CSS v4** | Utility-first CSS framework |
| **Bootstrap 5** | Component library |
| **Font Awesome / React Icons** | Icon sets |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express 5** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **dotenv** | Environment variable management |

---

## 📁 Project Structure

```
Employee Management System/
├── client/                    # React frontend
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── assets/            # Images & media
│   │   ├── pages/
│   │   │   ├── About.jsx      # About page
│   │   │   ├── Appbar.jsx     # Navigation bar
│   │   │   ├── Employees.jsx  # Employee management (CRUD)
│   │   │   ├── Footer.jsx     # Footer component
│   │   │   └── Home.jsx       # Landing / Home page
│   │   ├── styles/            # Additional stylesheets
│   │   ├── About.css          # About page styles
│   │   ├── App.css            # Global app styles
│   │   ├── App.jsx            # Root component with routes
│   │   └── main.jsx           # Entry point
│   ├── index.html             # HTML template
│   ├── vite.config.js         # Vite configuration
│   └── package.json
│
├── server/                    # Express backend
│   ├── middleware/
│   │   └── auth.js            # JWT auth middleware & token generation
│   ├── models/
│   │   └── User.js            # User model (signup/login)
│   ├── .env                   # Environment variables (not committed)
│   ├── index.js               # Server entry point & API routes
│   └── package.json
│
└── README.md
```

---

## 📌 Prerequisites

Make sure you have the following installed on your machine:

- [**Node.js**](https://nodejs.org/) (v18 or higher recommended)
- [**npm**](https://www.npmjs.com/) (comes with Node.js)
- [**MongoDB**](https://www.mongodb.com/) (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) cloud)
- **Git** (for cloning the repository)

---

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/amyansu/Employee-Management-System.git
   cd Employee-Management-System
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**

   ```bash
   cd ../client
   npm install
   ```

---

## 🔐 Environment Variables

Create a `.env` file inside the `server/` directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

| Variable | Description | Example |
|---|---|---|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/employeeDB` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `my_super_secret_key_123` |

> ⚠️ **Never commit your `.env` file to version control.** Make sure it's listed in your `.gitignore`.

---

## ▶️ Running the Application

### Start the Backend Server

```bash
cd server
node index.js
```

The server will start on **http://localhost:3000**

### Start the Frontend Dev Server

```bash
cd client
npm run dev
```

The client will start on **http://localhost:5173** (default Vite port)

> 💡 **Tip:** Use `nodemon` for auto-reloading the server during development:
> ```bash
> npx nodemon index.js
> ```

---

## 📡 API Reference

### Authentication

#### Sign Up
```http
POST /signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** `201 Created`
```json
{
  "user": {
    "id": "...",
    "username": "john_doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Login
```http
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** `200 OK` — Same structure as signup response.

---

### Employees

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/employees` | Get all employees |
| `POST` | `/employees` | Create a new employee |
| `PUT` | `/employees/:id` | Update an employee by ID |
| `DELETE` | `/employees/:id` | Delete an employee by ID |

#### Create Employee
```http
POST /employees
Content-Type: application/json

{
  "name": "Jane Smith",
  "gender": "Female",
  "email": "jane@example.com",
  "age": 28,
  "phone": "9876543210"
}
```

#### Employee Schema

| Field | Type | Required | Constraints |
|---|---|---|---|
| `name` | String | ✅ | Trimmed |
| `gender` | String | ✅ | `Male`, `Female`, or `Other` |
| `email` | String | ✅ | Unique, trimmed |
| `age` | Number | ✅ | Min: 18, Max: 100 |
| `phone` | String | ✅ | Trimmed |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

## 👤 Author

**Jagannath** — [GitHub Profile](https://github.com/JagannathNayak01)

---

<p align="center">
  Made with ❤️ using React & Express
</p>
