# Foodies Heaven Recipe App Documentation

## Overview

Foodies Heaven is a modern recipe sharing platform built with Next.js, Prisma, MongoDB, and NextAuth. It allows users to register, log in (via Google or credentials), and manage recipes with rich metadata and user roles.

## Features

### All Features

- **User Authentication:**

  - Sign up and log in using Google OAuth or email/password credentials.
  - Secure JWT-based sessions managed by NextAuth.js.
  - Passwords are securely hashed and stored.

- **Recipe Management:**

  - Create, edit, and delete recipes with rich metadata (title, description, category, region, type, thumbnail, tags, notes).
  - Add ingredients (name and quantity) and step-by-step instructions.
  - Rate recipes, set difficulty, prep/cook time, and more.
  - Recipes are linked to user accounts.

- **Admin Role Support:**

  - Admin users can access additional features (e.g., manage users, moderate recipes).
  - Admin status is stored in the user model and session.

- **Modal UI Components:**

  - Custom modal for dialogs, forms, and notifications.
  - Built with React and styled using Tailwind CSS.

- **Prisma ORM with MongoDB:**

  - Prisma provides type-safe database access and migrations.
  - Models for User, Account, Session, Recipe, with relations.

- **Next.js App Router:**

  - File-based routing for pages and API endpoints.
  - Server-side and client-side rendering support.

- **Session Management:**

  - SessionProvider wraps the app for client-side session access.
  - Custom callbacks to enrich session and JWT with user data.

- **UI & Styling:**

  - Tailwind CSS for rapid, responsive design.
  - React Icons for visual elements.

- **Environment Configuration:**

  - Uses environment variables for secrets and database connections.

- **Extensible Architecture:**
  - Modular codebase for easy feature addition and maintenance.

## Tech Stack

- **Frontend:** Next.js (React)
- **Backend:** Next.js API routes
- **Database:** MongoDB (via Prisma)
- **Authentication:** NextAuth.js
- **UI:** Tailwind CSS, React Icons

## Folder Structure

```
prisma/                # Prisma schema and migrations
src/
  app/
    api/auth/          # NextAuth API route
    generated/prisma/  # Generated Prisma client
    lib/               # Auth and Prisma helpers
    utils/             # Custom UI components
```

## Authentication

- Uses NextAuth.js with Google and credentials providers
- JWT-based sessions
- Prisma adapter for MongoDB
- Custom session and JWT callbacks for user roles

## Recipe Model

- Title, description, thumbnail, category, region, type
- Ingredients (array of name/quantity)
- Steps (array of step descriptions)
- Prep/cook time, rating, difficulty, tags, notes

## Usage

1. Clone the repo
2. Install dependencies: `npm install`
3. Set up environment variables in `.env`
4. Run Prisma migrations: `npx prisma generate`
5. Start the app: `npm run dev`

## Environment Variables

- `DATABASE_URL`: MongoDB connection string
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: Google OAuth
- `NEXTAUTH_SECRET`: NextAuth secret

## Contributing

Pull requests are welcome. For major changes, open an issue first.

## License

MIT
