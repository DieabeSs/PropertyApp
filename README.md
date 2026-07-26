# Property Marketplace

A property sale and rental marketplace with JWT auth, listings, real-time chat, and voice/video calls — NestJS API + SwiftUI iOS client.

> **Status:** Actively in development (Phase 1 — REST domain). Chat, calls, and geo search are planned next.

## Features

### Auth *(in progress)*
- Register and login with email + password
- JWT-protected routes
- Current-user endpoint (`GET /auth/me`)
- iOS: auth network layer, Keychain token storage, login ViewModel

### Listings *(in progress)*
- Create, update, list, get, and delete property listings
- Sale and rent listing types
- Filterable listing queries
- Ownership checks on update/delete
- Fields: price, currency, city, bedrooms, bathrooms, area, and more

### Planned
- **Listings UX** — browse, search, and manage listings in the iOS app
- **Images** — listing photo uploads and CDN-ready URLs
- **Geo search** — nearby / map-based discovery (PostGIS)
- **Real-time chat** — Socket.IO messaging between buyers and sellers
- **Voice / video calls** — LiveKit-powered calls from chat
- **Redis** — caching and realtime support

## API (current)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/auth/register` | — | Create account |
| `POST` | `/auth/login` | — | Sign in, receive JWT |
| `GET` | `/auth/me` | JWT | Current user |
| `POST` | `/listings` | JWT | Create listing |
| `GET` | `/listings` | — | List / filter listings |
| `GET` | `/listings/:id` | — | Listing detail |
| `PATCH` | `/listings/:id` | JWT | Update own listing |
| `DELETE` | `/listings/:id` | JWT | Delete own listing |

Example response shapes live under `contracts/`.

## Tech stack

- **Backend:** NestJS, TypeScript, Passport JWT
- **Database:** PostgreSQL via Prisma ORM
- **Cache / Realtime:** Redis + Socket.IO *(planned)*
- **Voice / Video:** LiveKit *(planned)*
- **iOS:** SwiftUI + Combine
- **IDs / dates:** UUID · ISO 8601 UTC
- **Package manager:** npm

```
project-root/
├── backend/          # NestJS API
│   ├── prisma/       # Schema & migrations
│   └── src/
│       ├── auth/     # Register, login, JWT
│       ├── listing/  # Property listings
│       └── prisma/   # Prisma service
├── ios/
│   └── PropertyApp/  # SwiftUI client
├── contracts/        # API shape examples
├── docs/adr/         # Architecture decisions
└── docker-compose.yml
```

## Getting started

### Prerequisites
- Node.js (npm)
- Docker (PostgreSQL)
- Xcode (iOS client)

### Database

```bash
docker compose up -d
```

Configure `DATABASE_URL` (and related secrets) in `backend/.env`, then from `backend/`:

```bash
npx prisma migrate dev
```

### Backend

```bash
cd backend
npm install
npm run start:dev
```

API runs with Nest watch mode (default Nest port, usually `http://localhost:3000`).

### iOS

1. Open `ios/PropertyApp/PropertyApp.xcodeproj` in Xcode
2. Set the API base URL in `NetworkConfig` to your machine (Simulator → `localhost`, device → your LAN IP)
3. Build & run on Simulator or device

## Development

```bash
# Backend
cd backend
npm run start:dev
npm run lint
npm test
npm run test:e2e

# Prisma
npx prisma migrate dev --name descriptive_name
npx prisma studio
```

## Author

**DieabeS** · eng.mhdaldebs@gmail.com

---

Built with NestJS & SwiftUI
