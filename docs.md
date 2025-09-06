# Foodies Heaven Recipe App Documentation

## Overview
Foodies Heaven is a modern recipe sharing platform built with Next.js, Prisma, MongoDB, and NextAuth. It allows users to register, log in (via Google or credentials), and manage recipes with rich metadata and user roles.

## Features
- User authentication (Google & credentials)
- Recipe creation, editing, and viewing
- Admin role support
- Modal UI components
- Prisma ORM with MongoDB
- Next.js App Router

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
