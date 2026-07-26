# Property Marketplace — Agent Guide

## What is this project
A property sale and rental platform with real-time
chat and voice/video calls.
Built to learn backend (NestJS) and iOS (SwiftUI).

## Stack
- Backend: NestJS + TypeScript
- Database: PostgreSQL via Prisma ORM
- Cache / Realtime: Redis + Socket.IO (Phase 3)
- Voice/Video: LiveKit (Phase 4)
- iOS: SwiftUI + Combine

## Rules — read these before helping

| Area | Rule file |
|---|---|
| General project context | .cursor/rules/project-context.mdc |
| NestJS backend | .cursor/rules/backend-nest.mdc |
| Database / Prisma | .cursor/rules/backend-db.mdc |
| WebSockets / Chat | .cursor/rules/backend-websocket.mdc |
| iOS / SwiftUI | .cursor/rules/ios-swiftui.mdc |

## Folder map
```
project-root/
├── backend/        → NestJS API
├── ios/            → SwiftUI app
├── contracts/      → API shape examples
├── docs/adr/       → Architecture decisions
└── docker-compose.yml
```
