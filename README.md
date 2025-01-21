## Gitohub
Gitohub is a simple API that allows you to get a list of GitHub users.

![image](https://github.com/user-attachments/assets/7c17c0fc-68de-418a-8ab7-1704c590b659)

![image](https://github.com/user-attachments/assets/4e0a0ff2-10d5-4820-bc63-f469c423e032)



## Installation
```bash
pnpm install
```

## Environment Variables
```bash
cp .env.example .env
```
Replace the values in the .env file with your own values.

#### GitHub Personal Access Token
You need to create a GitHub personal access token with the following permissions:
- `user`

Check out this [link](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token) to learn how to create a GitHub personal access token.

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
![image](https://github.com/user-attachments/assets/75a3a903-6a46-413d-92da-40f0201cb22a)

## Docker Compose
You can also use Docker Compose to run the app and redis server
Make sure you have docker and docker-compose installed on your machine and then run the following command
```bash
docker-compose up -d
```

## Packages used 
This project uses the following packages:
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

