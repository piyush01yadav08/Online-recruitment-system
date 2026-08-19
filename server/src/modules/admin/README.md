# HireFlow Admin Module - Backend

The Admin Module provides security, operational, and analytics endpoints for site administrators to manage job posts, review candidate profiles, track applications, and view aggregate KPI reports.

## Features

- **Analytic Dashboard**: Provides total job counts, applicant counts, open positions, application status distributions, and charts data.
- **Job Posts Management**: CRUD endpoints with field validation, publication status toggles, and pagination.
- **Job Applications Management**: Review applicant cover letters, view mock resumes, transition states (e.g., Shortlisted, Interview, Hired, Rejected), and attach internal reviewer notes.
- **Candidate Account Management**: User directory listing with the capability to block or unblock applicant accounts dynamically.

## Authentication & Authorization

All admin endpoints are guarded by:
1. **JWT Verification (`authenticate` middleware)**: Extracts the authorization bearer token and mounts `req.user`.
2. **Admin Verification (`isAdmin` middleware)**: Confirms that `req.user.role === 'admin'`.

## REST API Endpoint Reference

All endpoints are prefixed with `/api/admin`.

| HTTP Method | Route | Description | Guards |
| :--- | :--- | :--- | :--- |
| **GET** | `/dashboard` | Returns analytical metrics and lists of recent jobs/applications | JWT, Admin |
| **GET** | `/jobs` | Retrieve paginated jobs list (supports title/skill search and status filter) | JWT, Admin |
| **GET** | `/jobs/:id` | Retrieve detailed job by ID | JWT, Admin |
| **POST** | `/jobs` | Create new job post | JWT, Admin |
| **PUT** | `/jobs/:id` | Update job post fields | JWT, Admin |
| **DELETE** | `/jobs/:id` | Delete job post | JWT, Admin |
| **GET** | `/applications` | List paginated applications (supports job ID and status filters) | JWT, Admin |
| **GET** | `/applications/:id` | View detailed candidate application with status timeline history | JWT, Admin |
| **PUT** | `/applications/:id/status` | Update application status and log to history timeline | JWT, Admin |
| **PUT** | `/applications/:id/notes` | Update internal administrator review notes | JWT, Admin |
| **GET** | `/applicants` | Directory of candidate profiles with search filters | JWT, Admin |
| **GET** | `/applicants/:id` | View detailed candidate profile and list of applied jobs | JWT, Admin |
| **PUT** | `/applicants/:id/toggle-status` | Toggle candidate account status (`isActive` active/blocked) | JWT, Admin |

## Seeding Demo Data

An automated database reset and demo data seeding script is provided. It flushes all existing vacancy/candidate data, preserves existing administrator logins, and populates the database with:
- 6 diverse job posts (open, closed, draft)
- 10 candidate user accounts
- 15 job applications with corresponding status logs and histories

To run the seeding script:
```bash
cd server
npm run seed
```

## Folder Structure

```
server/src/
├── app.js                         # Mounts adminRoutes
├── config/
│   └── database.js                # Database connection utility
├── middleware/
│   ├── authenticate.js            # JWT verification middleware
│   └── isAdmin.js                 # Admin authorization middleware
├── models/
│   ├── User.js                    # Modified schema with isActive
│   ├── JobPost.js                 # Compound unique indexed Job model
│   └── Application.js             # Application schema with status tracking
├── routes/
│   └── admin.routes.js            # Router mapping admin routes
├── controllers/
│   └── admin.controller.js        # Controller executing database actions
└── scripts/
    └── seedDemoData.js            # Database seeding utility
```
