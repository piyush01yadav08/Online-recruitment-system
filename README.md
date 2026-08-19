# Online-recruitment-system




## Technology

- Frontend: React.js, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB Atlas through Mongoose

## Structure

```text
online-recruitment-system/
├── client/                         # React and Tailwind CSS frontend
│   ├── public/                     # Static public assets
│   └── src/
│       ├── assets/                 # Images, icons, fonts
│       ├── components/
│       │   ├── common/             # Shared application components
│       │   ├── layout/             # Header, sidebar, footer
│       │   └── ui/                 # Reusable UI primitives
│       ├── features/               # Feature-specific UI and logic
│       │   ├── admin/              # Admin dashboard features (under development)
│       │   ├── applicant/          # Applicant features (under development)
│       │   ├── applications/
│       │   ├── auth/
│       │   ├── candidates/
│       │   ├── employers/
│       │   └── jobs/
│       ├── hooks/                  # Custom React hooks
│       ├── lib/                    # Client libraries and setup
│       ├── pages/                  # Route page components
│       │   ├── admin/              # Admin pages (under development)
│       │   └── applicant/          # Applicant pages (under development)
│       ├── routes/                 # Route definitions and guards
│       ├── services/               # API client calls
│       ├── store/                  # Client state management
│       ├── styles/                 # Tailwind and global styles
│       └── utils/                  # Client utilities
├── server/                         # Express.js API
│   ├── src/
│   │   ├── config/                 # Environment and database configuration
│   │   ├── controllers/            # Request handlers
│   │   ├── middleware/             # Express middleware
│   │   ├── models/                 # Mongoose data models
│   │   ├── modules/
│   │   │   ├── admin/              # Admin API module (under development)
│   │   │   └── applicant/          # Applicant API module (under development)
│   │   ├── routes/                 # API routes
│   │   ├── services/               # Business logic
│   │   ├── utils/                  # Server utilities
│   │   └── validators/             # Request validation schemas
│   └── uploads/                    # User-uploaded files (not committed)
├── docs/                           # Project documentation
├── .env.example                    # Required environment-variable template
└── package.json                    # Workspace root
```

Copy `.env` and add your MongoDB Atlas connection string when backend development begins.

## Authentication setup

Authentication is available for applicant accounts.

1. Copy `.env`, then set `MONGODB_URI` to your MongoDB Atlas connection string and `JWT_SECRET` to a long random value.
2. Install and run the API: `npm --prefix server install`, then `npm --prefix server run dev`.
3. Install and run the frontend: `npm --prefix client install`, then `npm --prefix client run dev`.

The registration endpoint is `POST /api/auth/register`; existing users can log in through `POST /api/auth/login` using their email address or phone number. A valid signed-in session is available from `GET /api/auth/me` using a Bearer token.


