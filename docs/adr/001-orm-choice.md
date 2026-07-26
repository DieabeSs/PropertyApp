# ADR 001 — ORM Choice: Prisma

## Date
2026-04-07

## Status
Accepted

## Context
Building a NestJS backend with PostgreSQL for a 
property marketplace. Need an ORM that handles:
- Schema definition and migrations
- Type-safe database queries in TypeScript
- Clear relationship modeling (users, listings, chats)
- Good NestJS integration
- Low friction for someone new to backend

Two main options evaluated: Prisma and TypeORM.

## Decision
**Prisma**

## Reasons

**Schema-first approach**
Prisma defines all models in one dedicated 
schema.prisma file. Single source of truth.
TypeORM scatters table definitions across 
decorator-heavy TypeScript classes.

**Type safety**
Prisma auto-generates a fully typed client 
from the schema. TypeScript always knows the 
exact shape of every query result.
TypeORM types require more manual work.

**Flutter parallel**
Schema-first feels like defining models 
before writing UI — contract first, 
implementation second. Familiar thinking.

**Migrations**
Prisma migrations are explicit files you 
can read and review.
TypeORM's sync mode can silently alter 
production tables — dangerous habit to learn.

**Documentation and maintenance**
Prisma has better maintained docs and more 
active development in 2024-2026.

## Consequences
- Models are defined in prisma/schema.prisma
  not as TypeScript classes with decorators
- Run npx prisma migrate dev to apply changes
- Run npx prisma generate after schema changes
  to update the typed client
- Cannot easily switch to TypeORM later
  without rewriting all models and queries
- Team must learn Prisma Schema Language (PSL)
  which is simple but is a new syntax