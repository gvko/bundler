# Bundler

## Getting started

Install the npm packages

```bash
$ pnpm install
```

Set up env vars:

1. create a file `.env` in the same level as `.env.example`
2. copy the contents of `.env.example` into `.env`
3. Change the values accordingly
4. Run the app as described in the next section

## Running the app

```bash
# watch mode (local nodejs process)
$ npm run start:dev

# production mode (inside docker container)
$ npm run start:prod
```

The latter will build a Docker image and start the app in a docker container.
