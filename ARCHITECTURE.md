# 🏗️ Auralis – Architecture & Project Structure

This document explains the overall architecture and structure of **Auralis**.  
It’s designed to help contributors and maintainers quickly understand how the system is organised, how different modules interact, and where to add new features or code.

---

## 🧩 1 System Overview

**Auralis** is a modern AI‑powered note‑taking and productivity platform built using [**Next.js**](https://nextjs.org/), [**Tailwind CSS**](https://tailwindcss.com/), [**Appwrite**](https://appwrite.io/), and the [**Google Gemini API**](https://developers.google.com/).  
It enables users to create, edit, and manage notes while leveraging AI for smart summaries and insights.

**Core layers:**

- **Frontend (UI Layer):** Next.js + TypeScript + Tailwind CSS for a fast, reactive UI.  
- **Backend / Platform Layer:** Appwrite for authentication, database, and API services.  
- **AI Integration:** Google Gemini API for content analysis and summarisation.  
- **Hosting / Deployment:** Vercel for the frontend, Appwrite Cloud for backend services.

---

## 🧱 2 Directory Structure

Below is the structure of the Auralis project with a short explanation of each key directory and file:

Auralis/
│
├── app/ # Main Next.js application folder
│ ├── api/ # API routes (AI summarisation, note analysis, etc.)
│ │ ├── insights/ # Endpoint(s) for AI‑driven insights
│ │ └── summarize/ # Endpoint(s) for AI summarisation
│ ├── dashboard/ # Dashboard pages (protected routes after login)
│ ├── login/ # Login page for user authentication
│ ├── signup/ # Signup page for new users
│ ├── layout.tsx # Root layout & wrappers (includes AuthProvider)
│ └── page.tsx # Landing / home page of the app
│
├── components/ # Reusable UI components
│ ├── ProtectedRoute.tsx # Guards routes for authenticated users
│ └── ...other components # Buttons, headers, modals, etc.
│
├── context/ # React Contexts
│ └── AuthContext.tsx # Provides user authentication state globally
│
├── lib/ # Core configuration and logic modules
│ ├── appwrite.ts # Appwrite client setup and service config
│ ├── notes.ts # CRUD operations for notes
│ └── gemini.ts # Google Gemini API integration
│
├── types/ # TypeScript type definitions
│ └── index.ts # Centralised type exports
│
├── public/ # Static assets (icons, images, logos)
├── .env.local # Environment variables (API keys, endpoints) – not committed
├── package.json # Project dependencies & scripts
├── tsconfig.json # TypeScript configuration
├── tailwind.config.js # Tailwind CSS setup
├── next.config.mjs # Next.js configuration
└── README.md # Main project documentation


---

## ⚙️ 3 Tech Stack Summary

| Layer            | Technology                                      | Links |
|------------------|------------------------------------------------|-------|
| Frontend         | Next.js 15 · TypeScript · React 19              | [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [React](https://reactjs.org/) |
| Styling & UI     | Tailwind CSS · Framer Motion                    | [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) |
| Backend / Platform | Appwrite (Auth, DB, Storage, Functions)       | [Appwrite Docs](https://appwrite.io/docs) |
| AI Integration   | Google Gemini API                               | [Gemini API](https://developers.google.com/) |
| Icons & UI       | Lucide React · shadcn UI                        | [Lucide React](https://lucide.dev/), [shadcn UI](https://ui.shadcn.com/) |
| Deployment       | Vercel (Frontend) · Appwrite Cloud (Backend)    | [Vercel](https://vercel.com/) |

---

## 🔄 4 Data Flow Diagram

```mermaid
flowchart TD
    User[User Interface] -->|Login / Create Notes| Frontend[Next.js Frontend]
    Frontend -->|Auth & DB Ops| Appwrite[Appwrite Backend]
    Frontend -->|AI Request| Gemini[Google Gemini API]
    Appwrite -->|Stores & Retrieves| Database[(Database)]
    Gemini -->|Returns Summaries & Tags| Frontend
    Frontend -->|Displays Results| User

🤝 5 Contributing

Add new UI components in components/.

For new API endpoints, use the app/api/ folder.

Update types in types/index.ts when you add new data models or services.

Ensure .env.local contains all the required environment variables before running locally.

Follow Appwrite best practices
 for backend integration.

Refer to Next.js documentation
 when adding pages/layouts.

Run linter, tests (if applicable), and maintain code style consistency before submitting a Pull Request.

✅ This document is designed to give new contributors a clear, actionable overview of the Auralis architecture and help them become productive quickly.