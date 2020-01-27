# Back-end Boilerplate

A simple starter project for quickly building  production-ready RESTful APIs using *Node.js*, *Express*, and *MongoDB*.
Including features like authentication using JWT, sending files, sending emails, running background jobs, etc.

## Requeriments

To run the project, you need to install the following features:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [MongoDB](https://mongodb.com)
- [Redis](https://redis.io/)

## Setup

Configure your `.env` file and install dependencies with `yarn`.

## Available Scripts

Running locally (mode to watch the `src` files):
```
yarn dev
```

Running in production:
```
yarn prod
```

> In `package.json` the execution of the commands` yarn dev` and `yarn prod`, depend on the internal script` redis`, which may vary according to the installation in your environment, so check the command to start `redis` .

---

If documentation or environment variables are modified, the commands must be re-executed to start the project.
