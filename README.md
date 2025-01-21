## Gitohub
Gitohub is a simple API that allows you to get a list of GitHub users.

## Installation
```bash
pnpm install
```

## Set .env
```bash
cp .env.example .env
```
Replace the values in the .env file with your own values.

## Running the app
```bash
pnpm run dev
```

## Running the tests
```bash
pnpm run test
```

## Coverage
```bash
pnpm run coverage
```

Using Docker Compose to run the app and redis server
Make sure you have docker and docker-compose installed on your machine.
## Docker Compose
```bash
docker-compose up -d
```

## Packages used 
- [express](https://expressjs.com/) - web framework
- [express-rate-limit](https://github.com/nfriedly/express-rate-limit) - rate limiting
- [ioredis](https://github.com/luin/ioredis) - redis client
- [redis](https://redis.io/) - redis server
- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) - swagger ui
- [zod](https://zod.dev/) - data validation
- [jest](https://jestjs.io/) - testing framework
- [ts-jest](https://kulshekhar.github.io/ts-jest/) - jest for typescript
- [nodemon](https://nodemon.io/) - hot reloading
- [eslint](https://eslint.org/) - linting
- [eslint-plugin-perfectionist](https://github.com/perfect-square/eslint-plugin-perfectionist) - eslint plugin for perfectionist
- [@types/cors](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/cors) - cors types
- [@types/express](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/express) - express types
- [@types/swagger-ui-express](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/swagger-ui-express) - swagger-ui-express types

