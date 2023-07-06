# CRM FULL STACK

A full stack client CRM created in node.js and react.js with Next, a mongo database with consults in GraphQL 


What do you need to run this project?
- node
- npm
- docker
- docker-compose

## BACKEND INSTRUCTIONS:

1. Change the .env.example file as .env and configure all environment variables

2. On the shell navigate inside backend directory: 
    ```shell 
    cd ../backend
    ```

3. Install node dependencies:
    ```shell
    npm install
    ```

4. Run docker-compose
    ```shell
    docker-compose up -d
    ```

Mongo-express should now be running on port http://localhost:8081/

5. Transpile typescript code to javascript code
    ```shell
    npm run build
    ```

6. Raise the server:
    ```shell
    npm run dev
    ```

The Apollo server should now be running on port: http://localhost:4000/


## FRONTEND INSTRUCTIONS:

1. Navigate inside backend directory in another shell: 
    ```shell 
    cd ../frontend
    ```

2. Install node dependencies:
    ```shell
    npm install
    ```

3. Raise the server:
    ```shell
    npm run dev
    ```

Next client should now be running on port: http://localhost:3000/

#### Technologies:

## BACKEND

- MONGO
- NODE.JS
- DOCKER
- GRAPHQL - APOLLO SERVER
- TYPESCRIPT

## FRONTEND

- REACT
- NEXT
- GRAPHQL - APOLLO CLIENT
- TYPESCRIPT
- RECHARTS
- FORMIK
- YUP
- SWEETALERT2
- REACT-SELECT
- TAILWINDCSS


