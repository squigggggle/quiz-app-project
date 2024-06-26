# ID608001: Intermediate Application Development Concepts Project
### Quiz App:
https://quiz-app-squigggggle.onrender.com

### API:
https://s1-24-id608001-project-squigggggle.onrender.com

### Documentation:
https://quiz-api-doc-squigggggle.onrender.com

## Environment file setup
### Backend:
```
DATABASE_URL="external link to postgres database"
JWT_SECRET="secret password for jwt signing"
JWT_LIFETIME="time jwt token lasts before expiry"
```

### Frontend:
```
VITE_API_URL="link to API"
```

## Run react applications locally
Navigate into [project](/project) or [react-api](/react-api)
```
npm install
npm run dev
```
## Run End-to-end tests
Navigate into [project](/project)
```
npm run cypress:open
```

## Create and apply a migration
```
npx prisma migrate dev
```

## Reset database
```
npx prisma migrate reset
```

## Seed admin users
```
npx prisma db seed
```

## Open Prisma Studio
```
npx prisma studio
```

## Format code
Format staged code
```
npm run pretty-quick
```
Format all code
```
npx prettier --write .
```

## Lint code
```
npm run lint
```
