# Auth Boilerplate with Passport-Local and Create-React-App Using JWT_SECRET
## Express Server

This is a boilerplate I created for myself. It is going to be used at the TVC meetup.

The goal was to have the client completely separate from the server. This created difficulties with using session/cookies to persist the login so I went with JSON web token solution.

The default port is 8080.

### What You'll Need

You'll need the following installed on your system:

1. [Node](https://nodejs.org/en/)
2. [NPM](https://www.npmjs.com/)
3. [MongoDB](https://www.mongodb.com/)

With that, you should be able to get it running. After going to your *server* folder, install the dependencies with `npm install` and then `npm start`. (Make sure your Mongo service is running.) The server will try to log spin up the express server and mongoDB. If it is successful, you will see a screen like this:

```
server listening on port: 8080
mongo opened: mongodb://localhost/tvcpptut

*** Server and DB now running. You can confirm it by checking url:
```
If you put the URL in the browser (e.g., *http://localhost:8080*), it should tell you that the server and database are running and give you a list of routes.

Available routes should be:
```
http://localhost:8080

http://localhost:8080/auth/register
http://localhost:8080/auth/login
http://localhost:8080/auth/logout
http://localhost:8080/auth/checkjwt

http://localhost:8080/data/unprotected
http://localhost:8080/data/protected
```
Going to the test route will get a response similar to:
```
{
  "message": "Server up and running!",
  "runningExpress": true,
  "runningMongo": true
}
```

In the *client* folder, install the dependencies with `npm install` and then `npm start` to see the simple React client.

### TVC Meetup

If you will be following along in the TVC meetup, you may want the following additions:

1. [Yarn](https://yarnpkg.com/en/) - A common substitute for NPM, a little faster and a little easier.
2. [Compass](https://www.mongodb.com/products/compass) - A nice GUI for dealing with Mongo - for those of us that find the command line cumbersome.
3. [Postman](https://www.getpostman.com/) - A convenient tool for testing API endpoints. You can set the the body and headers and see what is returned.
4. A good editor. Obviously you'll need a good editor. We use [Atom](https://atom.io/) a lot in our group, but any good editor will work.

### API Endpoints

You can POST to the *auth/register* endpoint - it expects a *username* and *password*  in a JSON object in the body. If the *username* is unused, it will create the user in the DB. The client will receive an object with the user information is login is successful.

To POST to *auth/login*, *username* and *password* are sent in a JSON object in the body. If the login is successful, the user will receive a JWT.

The GET *data/unprotected* endpoint is available at anytime, whether logged in or not.

The GET *data/unprotected* endpoint is only available with a valid JWT. The client must put the JWT in the headers - the *key* is "Authorization" and the JWT must be prepended with "JWT ". (The space is important!) For example, if your JWT is
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYTk2YTkyZGIyZGI3NzRjZmE5MDJkO127ImV4cCI6MTUyMTA1MzUy4SwiaWF0IjoxNTIxMDUyOTI1fQ.R2fr4QXAMy3VgYgLpBO3GLoS_Ok5v_qJd5nsuaBP3J0
```
then your *value* in the *Authorization* header must be:
```
JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYTk2YTkyZGIyZGI3NzRjZmE5MDJkO127ImV4cCI6MTUyMTA1MzUy4SwiaWF0IjoxNTIxMDUyOTI1fQ.R2fr4QXAMy3VgYgLpBO3GLoS_Ok5v_qJd5nsuaBP3J0
```

The expiration for the JWT can be set in the environment variables, *JWT_EXP* as a duration in seconds. It is important to set an expiration for JWTs as they are a free pass and will persist even after the server is restarted. There are ways to invalidate JWTs, but it takes some work.
