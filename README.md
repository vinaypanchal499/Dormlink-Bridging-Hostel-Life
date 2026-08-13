# Dormlink-Bridging-Hostel-Life

# DormLink – Bridging Hostel Life

A **MERN Stack Hostel Management and Student Community Platform** designed to simplify hostel management and improve communication between students and hostel administrators.

## 🚀 Live Project

* **GitHub Repository:** [DormLink – Bridging Hostel Life](https://github.com/vinaypanchal499/Dormlink-Bridging-Hostel-Life)

## 📌 Overview

**DormLink – Bridging Hostel Life** is a full-stack web application developed using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.

The platform provides a centralized system for hostel students and administrators to manage hostel-related activities such as complaints, mess-offs, fees, rooms, events, suggestions, and student information.

It also provides a platform for students to share and borrow useful items within the hostel community.

## 🎯 Objectives

* Digitize hostel management activities.
* Reduce manual paperwork and administrative work.
* Provide students with an easy-to-use hostel management portal.
* Improve communication between students and administrators.
* Manage complaints, suggestions, rooms, fees, and mess-off requests efficiently.
* Provide a community-based resource-sharing system.

## ✨ Features

### 👨‍🎓 Student Features

* Student registration and login
* Secure authentication
* Student dashboard
* View hostel-related information
* Submit complaints
* Submit suggestions
* Request mess-off
* View fee information
* View hostel events
* Resource sharing
* Borrow and lend items within the hostel community

### 👨‍💼 Admin Features

* Admin authentication
* Admin dashboard
* Add and manage students
* Manage hostel rooms
* Manage student fees
* Manage mess-off requests
* Manage complaints
* Manage suggestions
* Manage hostel events
* Monitor hostel activities

## 🛠️ Technology Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* REST API

### Database

* MongoDB
* MongoDB Atlas / MongoDB Compass

### Authentication & Security

* JWT Authentication
* Password encryption
* Protected routes
* Role-based access control

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Postman
* npm

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    │ Student / Admin     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │ Tailwind CSS / UI   │
                    └──────────┬──────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express.js API    │
                    │     Node.js         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      MongoDB        │
                    │      Database       │
                    └─────────────────────┘
```

## 📂 Project Structure

```text
Dormlink-Bridging-Hostel-Life/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── assets/
│       └── App.jsx
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/vinaypanchal499/Dormlink-Bridging-Hostel-Life.git
```

```bash
cd Dormlink-Bridging-Hostel-Life
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace the values with your MongoDB connection string and JWT secret.

### 5. Start the Backend

```bash
cd server
npm start
```

Or, if using nodemon:

```bash
npm run dev
```

### 6. Start the Frontend

Open another terminal:

```bash
cd client
npm start
```

The application will run locally on the configured frontend and backend ports.

## 🔄 Application Workflow

```text
Student / Admin
       │
       ▼
   Login / Register
       │
       ▼
 Authentication
       │
       ▼
   Dashboard
       │
       ├── Student
       │    ├── Fees
       │    ├── Mess-Off
       │    ├── Complaints
       │    ├── Suggestions
       │    ├── Events
       │    └── Resource Sharing
       │
       └── Admin
            ├── Students
            ├── Fees
            ├── Rooms
            ├── Mess-Offs
            ├── Complaints
            └── Events
```

## 🔐 Security

The application implements security mechanisms such as:

* JWT-based authentication
* Protected API routes
* Role-based authorization
* Password hashing
* Environment variables for sensitive configuration
* Server-side validation

## 📊 Database

MongoDB is used as the primary database.

Example collections include:

```text
Users
Students
Rooms
Fees
Complaints
Suggestions
MessOffs
Events
Resources
```

## 🌟 Key Benefits

* Centralized hostel management
* Faster complaint and request processing
* Reduced paperwork
* Better student-admin communication
* Easy access to hostel information
* Community-based resource sharing
* Scalable MERN architecture
* Responsive and user-friendly interface

## 🔮 Future Enhancements

* Online fee payment integration
* Email and SMS notifications
* Push notifications
* QR-based attendance
* Online room allocation
* Advanced admin analytics
* Mobile application
* AI-powered complaint categorization
* Hostel maintenance tracking

## 👨‍💻 Developer

**Vinay Panchal**

Computer Science and Engineering Graduate

* GitHub: [vinaypanchal499](https://github.com/vinaypanchal499)

## 📄 License

This project is developed for **educational and academic purposes**.

---

⭐ If you find this project useful, consider giving the repository a **star** on GitHub.
