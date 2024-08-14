# Instagram Threads Clone

This project is an Instagram Threads clone built using modern web technologies. It aims to replicate the core functionality of Instagram Threads, including post creation, liking posts, and user authentication. The project is built with **Next.js**, **Tailwind CSS**, **Prisma**, **MongoDB**, and **NextAuth.js** for authentication.

## Features

- **User Authentication**: Sign up, log in, and manage user sessions using NextAuth.js.
- **Post Creation**: Create, edit, and delete threads.
- **Like Functionality**: Users can like and unlike threads.
- **Responsive Design**: Fully responsive UI using Tailwind CSS.
- **Database Management**: Prisma as the ORM for MongoDB.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB, managed with Prisma
- **Authentication**: NextAuth.js

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 14.x)
- npm or yarn
- MongoDB (Local or MongoDB Atlas)

---

## How It Works

### 1. User Authentication

- **NextAuth.js** is used to manage user authentication.
- Users can sign up and log in using their email or social media accounts (if configured).
- Once logged in, a session is created and managed using cookies.
- Protected routes ensure that only authenticated users can access certain pages or perform actions like creating and liking posts.

### 2. Creating Posts (Threads)

- Authenticated users can create new threads (posts) through a simple form.
- Posts are stored in a **MongoDB** database, managed by **Prisma** as the ORM (Object-Relational Mapping) tool.
- Users can also edit or delete their posts.

### 3. Liking Posts

- Users can like and unlike posts.
- The like count is updated in real-time and stored in the MongoDB database.
- The UI updates dynamically using React's state management, ensuring a smooth user experience.

### 4. Responsive Design

- The user interface is built with **Tailwind CSS**, ensuring that the application looks good on all screen sizes, from mobile devices to desktop computers.
- Components are styled to resemble the look and feel of Instagram Threads.

### 5. Data Management with Prisma and MongoDB

- **Prisma** is used to handle database operations, such as creating, updating, and querying data in MongoDB.
- The Prisma schema defines the structure of your data, including models for users, posts, and likes.
- Migrations are used to keep the database schema up-to-date as the application evolves.

### 6. API Routes

- **Next.js API Routes** handle backend logic for the application.
- Routes are created for tasks like handling authentication (via NextAuth.js), managing posts (CRUD operations), and managing likes.
- These routes interact with Prisma to read and write data to the MongoDB database.

### 7. Deployment

- The project can be deployed to platforms like **Vercel**, which is optimized for Next.js applications.
- Environment variables (e.g., database connection strings, NextAuth.js secrets) are managed securely during deployment.

## Conclusion

This Instagram Threads clone provides a basic social media experience with user authentication, post creation, and like functionality. It showcases modern web development practices, including the use of Next.js for both frontend and backend, Tailwind CSS for responsive design, and Prisma/MongoDB for data management.