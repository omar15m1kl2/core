# local dev

first time runner:

- `cp env-example-relational .env`
- `npm run migration:run`
- `npm install`

running for dev:

- `docker compose up -d mysql adminer maildev`
- `npm run start:dev`
- go to:  <http://localhost:3000>

------

# quick run using docker

if its your first time:

- `cp env-example-relational .env`
- `docker compose up -d`
- go to:  <http://localhost:3000>

----

# stopping containers

- `docker compose down mysql adminer maildev`

