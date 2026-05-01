# A Team — Student Team Members Management Application

A full-stack web application to manage student team members. Built with **React.js** for the frontend and **Node.js + Express + MongoDB** for the backend.

## Features

- **Home Page** — Welcome page with team introduction and navigation
- **Add Member** — Form to add new team members with image upload
- **View Members** — Grid display of all team members with profile cards
- **Member Details** — Detailed view of individual member information

## Tech Stack

| Layer    | Technology                        |
| -------- | --------------------------------- |
| Frontend | React.js, React Router, Axios     |
| Backend  | Node.js, Express.js               |
| Database | MongoDB, Mongoose                 |
| Uploads  | Multer (saves to `uploads/` folder) |

## Project Structure

```
├── backend/
│   ├── models/
│   │   └── Member.js           # Mongoose schema
│   ├── routes/
│   │   └── memberRoutes.js     # Express REST API routes
│   ├── uploads/                # Uploaded member images
│   ├── server.js               # Express server entry point
│   ├── .env                    # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx      # Navigation header
│   │   │   └── MemberForm.jsx  # Reusable member form
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Landing page
│   │   │   ├── AddMember.jsx   # Add member form page
│   │   │   ├── ViewMembers.jsx # Members list page
│   │   │   └── MemberDetails.jsx # Member detail page
│   │   ├── App.jsx             # React Router setup
│   │   ├── App.css             # All styles
│   │   └── main.jsx            # Entry point
│   └── package.json
├── .gitignore
└── README.md
```

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or MongoDB Atlas)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) (optional — GUI to view data)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/a-team.git
cd a-team
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder (if not already present):

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/a-team-members
```

Start the backend server:

```bash
npm start
```

The server will run on `http://localhost:5000`.

### 3. Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`.

### 4. Open the App

Visit **http://localhost:5173** in your browser.

## API Endpoints

All API routes are prefixed with `/api/members`.

| Method | Endpoint            | Description                | Request Body                         |
| ------ | ------------------- | -------------------------- | ------------------------------------ |
| GET    | `/api/members`      | Retrieve all team members  | —                                    |
| GET    | `/api/members/:id`  | Retrieve a single member   | —                                    |
| POST   | `/api/members`      | Add a new team member      | `name`, `role`, `email`, `image` (file) |

### Testing API in Browser

- Open `http://localhost:5000/api/members` to see all members (JSON)
- Open `http://localhost:5000/api/members/<id>` to see a specific member (replace `<id>` with actual MongoDB ObjectId)

## How to Run the App

1. Make sure **MongoDB** is running (`mongod` service or MongoDB Compass)
2. Start the **backend**: `cd backend && npm start`
3. Start the **frontend**: `cd frontend && npm run dev`
4. Open **http://localhost:5173** in your browser

## Team

**A Team** — Student Team Members Management Application
