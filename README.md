IEC2024058 
Digvijay Singh Rawat 

use .ENV key to fast access the DB 


# GeekHeaven

A full-stack MERN web application for coding practice and learning, featuring question categories, bookmarks, and user progress tracking.

## Project Structure

```
├── frontend/          # React-based frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── stores/       # State management stores
│   │   └── lib/          # Utility functions and configurations
│   
└── backend/           # Node.js backend application
    ├── src/
    │   ├── controllers/  # Request handlers
    │   ├── models/       # Database models
    │   ├── routes/       # API routes
    │   └── middleware/   # Custom middleware
```

## Features

- User authentication (Login/Register)
- Question categories and difficulty levels
- Bookmarking system
- Progress tracking
- Theme switcher (Light/Dark mode)
- Search functionality
- Rate limiting middleware

## Tech Stack

### Frontend
- React.js
- Vite
- TailwindCSS
- React Query - Server State Management
- Zustand (State Management)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (assumed based on model structure)
- JWT Authentication
- Rate Limiting - API Protection
- Bcrypt - to protect the password 

## Getting Started

### Prerequisites
- Node.js
- pnpm (Package Manager)  if pnpm is not installed. use npm i think it should work fine 😅
- MongoDB (local or remote instance or use my db key) 

### Installation


1. Clone the repository:
```bash
git clone https://github.com/Digvijay-x1/geekheaven.git
cd geekheaven
```

2. Install backend dependencies:
```bash
cd backend
pnpm install
```


3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
pnpm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
