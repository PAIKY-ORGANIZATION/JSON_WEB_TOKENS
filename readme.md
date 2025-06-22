# Express Startup example.



### Install dependencies:

``` npm i ```


### Run with Docker Compose (recommended if you have Docker)

``` docker compose up --build ```

### Run the server locally (requires Node.js installed):

``` npm run dev ```


### Run the tests:

``` npm run test ```


### Environment Configuration Overview
1. A "bootstrap.js" file is loaded automatically on startup to manage environment variables using dotenv.


2. config/{environment}.env is loaded based on process.env.ENVIRONMENT, which is set by the script in package.json (e.g., npm run dev_local sets ENVIRONMENT=dev).

3. config/shared.env holds variables common to all environments.

4. Inside of config/, MAKE SURE you rename any "example*....env" by removing the "example" part. 
         Example: example-shared.env -> shared.env

5. Also, MAKE SURE you set the required env variables if they are not set

This setup keeps configuration modular and avoids duplication.



### API Documentation:

[API Documentation](http://localhost......)