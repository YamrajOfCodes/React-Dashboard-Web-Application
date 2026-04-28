React Dashboard Web Application

A modern Dashboard Web Application built using React.js, demonstrating real-world frontend engineering concepts like authentication, protected routing, centralized state management, CRUD operations, pagination, and responsive UI design.

This project was developed under a strict 2-hour time constraint, focusing on delivering core functionality with clean architecture and practical implementation.

Project Overview

This application simulates a real admin dashboard where users can manage Todos and Users with full CRUD capabilities, authentication flow, and role-based routing.

The main focus:

Scalable React architecture
Centralized state management
API handling using React Query
Clean and responsive UI

Authentication
Login implemented using DummyJSON API
Session token stored in localStorage
Protected routes for authenticated users
Redirect logic based on login state
Logout clears session and resets state

 Todo Management Module
View todos with pagination
Add, edit, delete todos
Search todos by title
Filter by status (All / Completed / Pending)

💡 Key Interaction
Clicking on a todo label/text toggles its completion status instantly, providing a smooth and minimal UX without extra UI elements like checkboxes.

 User Management Module
View users in table (desktop) and cards (mobile)
Add new users
Edit existing users
Delete users with confirmation modal
Search users by name/email
Filter users by gender
Pagination support

 State Management
Single global store using Context API + useReducer
Centralized handling of:
Auth state
Users data
Todos data
Loading & error states
React Query handles:
API requests
caching
auto refetch after mutations

UI / UX Highlights
Fully responsive design (mobile + desktop)
Table layout for desktop, card layout for mobile
Reusable modal system (Add/Edit/Delete)
Clean loading & empty states
Tailwind CSS based modern UI

🧩 Tech Stack
React.js
React Router DOM
Context API + useReducer
React Query (TanStack Query)
Axios
Tailwind CSS
React Hot Toast
📁 Folder Structure

Project is structured in a modular and scalable way:

components (UI & reusable parts)
pages (screens)
hooks (custom logic)
types (API layer)
routes (routing logic)


🚀 Project Setup Instructions

Follow these steps to run the project locally:

1️⃣ Clone the repository
Download or clone the project from GitHub
2️⃣ Install dependencies
Run package installation using npm or yarn
3️⃣ Start development server
Run the development server to start the app locally
4️⃣ Open in browser
Visit the local development URL shown in terminal

🔐 Login Credentials

Use the following credentials to access the dashboard:

Username: emilys
Password: emilyspass
⏱️ Time Constraint Note

This project was built under a 2-hour strict deadline, which influenced key decisions:

Focus on core features first
Avoided unnecessary complexity
Kept UI minimal but functional
Prioritized working CRUD + auth flow

Future Improvements
Role-based access control improvements
Advanced form validation
Infinite scrolling instead of pagination
Unit testing (Jest / RTL)
Dark mode support
UI animations
