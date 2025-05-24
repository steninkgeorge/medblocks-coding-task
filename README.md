# Patient Admin Dashboard

A fully client-side admin dashboard for managing patient records, executing raw SQL queries, and viewing query logs. Built with React, Ant Design, and Pglite, all data is stored locally in the browser using IndexedDB.

## Features

- Register new patients using a form with validation
- Dashboard showing:
  - Total number of registered patients
  - Query logs with timestamps
- Run raw SQL queries directly in the browser
- Export query results as CSV
- Copy query results as JSON
- Use query templates for quick query execution
- Persistent data storage using IndexedDB (via Pglite)
- No backend or server required

## Tech Stack

- React
- Ant Design (UI components)
- Pglite (WebAssembly-based SQLite)
- IndexedDB (for local data persistence)
- React Hook Form + Zod (for form validation)


