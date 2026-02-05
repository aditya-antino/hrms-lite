# HRMS Lite

A lightweight Human Resource Management System (HRMS) designed to simplify employee management and attendance tracking.

## Deployed Application
**URL:** https://hrms-lite-three-eta.vercel.app/

## Features

- **Employee Management**:
  - Add new employees with detailed information.
  - View a comprehensive list of all employees.
  - Delete employee records.
  
- **Attendance System**:
  - Mark daily attendance (Present/Absent).
  - View historical attendance records for each employee.

- **Modern UI/UX**:
  - **Responsive**: Fully optimized for different screen sizes.
  - **Custom Components**: 
    - Smooth loading animations.
    - Custom, non-intrusive confirmation dialogs.
    - Minimalist navigation with backdrop blur effects.

## Technology Stack

### Frontend
- **Framework**: [React](https://react.dev/) (Vite)
- **Routing**: React Router DOM
- **HTTP Client**: Axios

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (via Mongoose)
- **Utilities**: Dotenv, Cors, Validator

## Project Structure

```
hrms-lite/
├── backend/            # Express.js API
│   ├── config/         # DB connection
│   ├── controllers/    # Request handlers
│   ├── models/         # Mongoose schemas
│   └── routes/         # API endpoints
│
└── frontend/           # React Application
    ├── src/
    │   ├── components/ # Reusable UI components (Loader, Dialogs)
    │   ├── pages/      # Application views
    │   └── services/   # API integration
```

## Getting Started

1.  **Backend**:
    ```bash
    cd backend
    npm install
    npm start
    ```

2.  **Frontend**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
