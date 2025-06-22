# Cookies and JWTs to store user session information.

### API Documentation and About:

[API Documentation](https://documenter.getpostman.com/view/40182356/2sB2xBEqrP)


## How to Use the Application

### Run with Docker Compose (recommended if you have Docker, includes a Postgres service and works out of the box):
``` docker compose up --build ```



### Run integration test 
To ensure consistency run tests only in Docker.
``` docker compose run test ```

You can also test locally for speed. However, you need to set up a Postgres database locally. Make sure to set the correct environment variables under prisma/.env
``` npm run test ```


### Environment Configuration Overview
1. A "bootstrap.js" file is loaded automatically on startup to manage environment variables using dotenv.


2. config/{environment}.env is loaded based on process.env.ENVIRONMENT, which is set by the script in package.json (e.g., npm run dev_local sets ENVIRONMENT=dev).

3. config/shared.env holds variables common to all environments.

4. Inside of config/, MAKE SURE you rename any "example*....env" by removing the "example" part. 
         Example: example-shared.env -> shared.env

5. Also, MAKE SURE you set the required env variables in the -example files if they are not set

This setup keeps configuration modular and avoids duplication.

6. If using the docker-compose setup, docker will load env file for Prisma automatically (./prisma/docker.env).

7. IF USING A LOCAL SETUP: For Prisma to connect to DB , I placed the connection URL in ./prisma/.env
    
    Prisma Loads env automatically if they are in the root of the project or if they are under ./prisma/
