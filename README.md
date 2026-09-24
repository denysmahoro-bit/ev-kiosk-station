# SELAVOLT

SELAVOLT is a modern EV charging network platform for Rwanda. This project provides a scalable foundation for public charging, customer dashboards, admin operations, pricing, and future OCPP integrations.

## Overview

- Public website and charging discovery experience
- Customer dashboard and charging history
- Admin operations dashboard for stations and network performance
- Prisma schema for PostgreSQL
- Demo-mode data for development and stakeholder review
- Extensible architecture for OCPP, payment providers, and map integrations

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- Zod validation
- Lucide icons

## Quick start

1. Copy `.env.example` to `.env` and fill in the required values.
2. Install dependencies:
   npm install
3. Run the database setup:
   npx prisma generate
4. Start the app in development mode:
   npm run dev

## Environment variables

- `DATABASE_URL`: PostgreSQL connection string
- `AUTH_SECRET`: secure secret for authentication
- `NEXTAUTH_URL`: base URL for the application
- `MAP_API_KEY`: map provider key when enabled
- `PAYMENT_API_KEY`: payment provider key placeholder
- `OCPP_SECRET`: OCPP shared secret placeholder

## Demo data notice

This project includes mocked network and client data for development use only. It is clearly staged as demo data and should not be treated as production operational data.

## Roadmap

- Authentication and RBAC
- Prisma migrations and real data persistence
- OCPP simulator and charger status monitoring
- Payment provider abstraction and Rwanda integration
- Advanced analytics and export workflows

## Security reminder

Never commit `.env` files or any credentials to GitHub. Always store production secrets in a secure environment manager or hosting secret configuration.
