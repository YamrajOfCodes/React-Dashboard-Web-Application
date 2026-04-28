# React Dashboard Web App

A modern, full-featured admin dashboard built with React.js, created under a strict **2-hour time constraint** while still delivering clean architecture, real-world patterns, and a polished UI.

---

## What Is This?

This is a simulation of a real admin dashboard where you can manage **Todos** and **Users** , complete with authentication, CRUD operations, search, filtering, and pagination. It was built to demonstrate practical frontend engineering without over-engineering things.

The goal was simple: ship something that *works well*, *looks good*, and *scales cleanly*.

---

## Features at a Glance

### Authentication
- Login powered by the [DummyJSON API](https://dummyjson.com/)
- Session token saved in `localStorage` so you stay logged in
- Protected routes that redirect unauthenticated users
- Clean logout that clears all state and session data

### Todo Management
- Browse todos with pagination
- Add, edit, and delete todos
- Search by title
- Filter by status: All / Completed / Pending
- **Bonus UX:** Click directly on a todo's text to toggle its completion,no checkboxes needed

### User Management
- Table view on desktop, card view on mobile (automatically switches)
- Add and edit users via modal forms
- Delete with a confirmation prompt (no accidental removals)
- Search by name or email
- Filter by gender
- Pagination support throughout

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React.js |
| Routing | React Router DOM |
| State Management | React Query  |
| Data Fetching | React Query (TanStack Query) |
| HTTP Client | Axios |
| Styling | Tailwind CSS |
| Notifications | React Hot Toast |

---

## How State Is Managed

- Auth state (logged in / logged out)
- Users and todos data
- Loading and error states across the app

On top of that, **React Query** takes care of all the API layer work — caching responses, auto-refetching after mutations, and keeping the UI in sync without manual effort.

---

## Folder Structure

The project follows a clean, modular structure that's easy to navigate and extend:

```
src/
├── components/    # Reusable UI pieces (modals, tables, cards, etc.)
├── pages/         # Full page screens (Login, Dashboard, Users, Todos)
├── hooks/         # Custom React hooks for shared logic
├── types/         # API layer and type definitions
└── routes/        # Route definitions and protection logic
```

---

## Getting Started

Follow these four steps to run the project locally:

**1. Clone the repository**
```bash
git clone <your-repo-url>
cd <project-folder>
```

**2. Install dependencies**
```bash
npm install
# or
yarn
```

**3. Start the dev server**
```bash
npm run dev
# or
yarn dev
```

**4. Open in your browser**

Visit the local URL shown in your terminal (usually `http://localhost:5173`).

---

## Login Credentials

Use these to access the dashboard:

```
Username: emilys
Password: emilyspass
```

---

## Design Decisions

A few things worth calling out about how the UI was approached:

- **Responsive by default** — tables on desktop, cards on mobile, no extra work needed
- **Reusable modal system** — the same modal shell handles Add, Edit, and Delete actions
- **Minimal but meaningful states** — empty states and loading indicators are handled everywhere
- **Click-to-toggle todos** — instead of a checkbox, clicking the todo text itself flips the status. It's small but makes the interaction feel much smoother.

---

## Built Under a 2-Hour Deadline

This project was made with a hard time limit, which shaped some decisions:

- Core features came first — auth, CRUD, pagination
- Complexity was kept intentional, not accidental
- UI is minimal but fully functional
- No shortcuts were taken on the architecture itself

---

## What's Next

If this were a longer project, here's what would come next:

- Role-based access control with proper permission checks
- Better form validation (error messages, field-level feedback)
- Unit and integration tests with Jest and React Testing Library
- Dark mode
- UI micro-animations and transitions
