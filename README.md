# Team TaskFlow

A modern, full-stack project management application built with the **Next.js App Router**. This platform enables teams to organize projects, assign tasks, and monitor progress with a robust role-based permission system.

---

## 🚀 Features

### 🔐 Authentication & Security

- **Secure Auth:** Full authentication flow using **NextAuth.js** and **BCrypt** password hashing.
- **Role-Based Access Control (RBAC):** \* **Admins:** Create projects, manage all tasks, and promote/demote users.
  - **Members:** View assigned tasks and update their personal progress.
- **Server-Side Protection:** All sensitive actions are protected at the database level using Next.js Server Actions.

### 📋 Project & Task Management

- **Project Explorer:** A master-detail view to browse projects and drill down into nested tasks.
- **Task Assignment:** Direct assignment of tasks to specific team members.
- **Interactive Status:** Cycle tasks through `TODO`, `IN_PROGRESS`, and `DONE` with zero page reloads.
- **Deadline Tracking:** Automatic visual alerts for tasks that are past their due date.

### 📊 Advanced Dashboard

- **Tabbed Interface:** Switch between a global task list, a project-specific explorer, and a filtered view of incomplete tasks.
- **User Management:** Admins can search the user database and manage team roles via a dedicated admin panel.
- **Real-time Updates:** Utilizes React's `useTransition` for optimistic UI updates.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL (via [Prisma ORM](https://www.prisma.io/))
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)

---

## 🏁 Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/AvinashS1192/Team-Task-Manager.git
cd Team-Task-Manager
npm install
```

### 2. Create .env file with

# Database Connection

# Production (PostgreSQL): "postgresql://user:password@host:port/dbname"

DATABASE_URL="your_database_url_here"

# NextAuth Configuration

# A secret string used to encrypt cookies. Generate one with: openssl rand -base64 32

NEXTAUTH_SECRET="your_secure_random_secret"

# The base URL of your application

# Local: "http://localhost:3000"

# Production: "https://your-app-name.railway.app"

NEXTAUTH_URL="your_app_url"

-m
