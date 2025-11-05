# 🏗️ Auralis – Architecture / Project Structure

This document explains the overall architecture and structure of the **Auralis** project.  
It’s designed to help contributors quickly understand how the system is organized, how different modules interact, and where to add new features or code.

---

## 🧩 1. System Overview

**Auralis** is a modern AI-powered note-taking and productivity platform built using **Next.js**, **Tailwind CSS**, **Appwrite**, and **Google Gemini API**.  
It allows users to create, edit, and manage notes while leveraging AI for smart insights and summaries.

**Core layers:**
- **Frontend (UI Layer):** Next.js + TypeScript + TailwindCSS for fast, reactive UI.
- **Backend / Platform Layer:** Appwrite for authentication, database, and API services.
- **AI Integration:** Google Gemini API for content analysis and summarization.
- **Hosting / Deployment:** Vercel for the frontend and Appwrite Cloud for backend services.

---

## 🧱 2. Directory Structure

Below is the structure of the Auralis project with a short explanation of each key directory and file.

Auralis/
│
├── app/ # Main Next.js application folder
│ ├── api/ # API routes (AI summarization, note analysis, etc.)
│ │ ├── insights/ # Endpoint for AI-driven insights
│ │ └── summarize/ # Endpoint for AI summaries
│ ├── dashboard/ # Dashboard pages (protected routes after login)
│ ├── login/ # Login page for user authentication
│ ├── signup/ # Signup page for new users
│ ├── layout.tsx # Root layout and wrappers (includes AuthProvider)
│ └── page.tsx # Landing page of the app
│
├── components/ # Reusable UI components
│ ├── ProtectedRoute.tsx # Guards routes for authenticated users
│ └── ...other components # Buttons, headers, modals, etc.
│
├── context/ # React Contexts
│ └── AuthContext.tsx # Provides user authentication state globally
│
├── lib/ # Core configuration and logic modules
│ ├── appwrite.ts # Appwrite client setup and service configuration
│ ├── notes.ts # CRUD operations for notes
│ └── gemini.ts # Google Gemini API integration
│
├── types/ # TypeScript type definitions
│ └── index.ts # Centralized type exports
│
├── public/ # Static assets (icons, images, logos)
│
├── .env.local # Environment variables (API keys, endpoints)
├── package.json # Project dependencies and scripts
├── tsconfig.json # TypeScript configuration
├── tailwind.config.js # Tailwind CSS setup
├── next.config.mjs # Next.js configuration
└── README.md # Main project documentation



---

## ⚙️ 3. Tech Stack Summary

| Layer | Technology |
|-------|-------------|
| Frontend | **Next.js 15**, **TypeScript**, **React 19** |
| Styling | **Tailwind CSS**, **Framer Motion** |
| Backend / Platform | **Appwrite** (Auth, DB, Storage, Functions) |
| AI Integration | **Google Gemini API** |
| Icons & UI | **Lucide React**, **ShadCN UI** |
| Deployment | **Vercel** (Frontend), **Appwrite Cloud** (Backend) |

---

## 🔄 4. Data Flow Diagram

```mermaid
flowchart TD
    User[User Interface] -->|Login / Create Notes| Frontend[Next.js Frontend]
    Frontend -->|Auth & DB Ops| Appwrite[Appwrite Backend]
    Frontend -->|AI Request| Gemini[Google Gemini API]
    Appwrite -->|Stores & Retrieves| Database[(Database)]
    Gemini -->|Returns Summaries & Tags| Frontend
    Frontend -->|Displays Results| User

## 🤝 5. Contributing
- Add new components in `components/`
- For new API routes, use the `app/api/` folder.
- Update types in `types/index.ts` when adding new data models.
- Ensure `.env.local` contains all required keys before running the project locally.

