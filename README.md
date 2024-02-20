# Local Development

**First time runner:**

1. Copy the environment file.

   ```bash
   cp env-example-relational .env
   ```

2. Run migrations.

   ```bash
   npm run migration:run
   ```

3. Install dependencies.

   ```bash
   npm install
   ```

**Running for development:**

1. Start required services using Docker.

   ```bash
   docker compose up -d mysql adminer maildev
   ```

2. Run the application in development mode.

   ```bash
   npm run start:dev
   ```

3. Open your browser and go to: [http://localhost:3000](http://localhost:3000)

------

# Quick run using Docker

If it's your first time:

1. Copy the environment file.

   ```bash
   cp env-example-relational .env
   ```

2. Start the application using Docker.

   ```bash
   docker compose up -d
   ```

3. Open your browser and go to: [http://localhost:3000](http://localhost:3000)

----

# Stopping containers

To stop containers:

```bash
docker compose down
```
 
