# NS8 Developer Test

### The Challenge Before You

For this test, your goal is to create a basic Express application. The application will be 1-2 page(s) with the purpose of consuming an API and presenting the resulting data through a simple template (supported by CSS & TypeScript). The application should include:

- Basic Express Server to, at minimum, render Template page(s)
- Landing Page
- Buttons or interfaces to make an API request
- Parsing & typing of API return data
- Presentation of data on the Landing page (async call)
- Clear & terse instructions for starting the application (or a well documented build script)
- Reasonable styling

The exact methods of presentation and implementation are left to your discretion. The purpose of this exercise is to gain insight into the participant's coding style, ability to learn new technologies, and core development competencies.

### What You Should Know

The frameworks, languages and packages below should be used to complete the challenge. As previously stated, it is left to your discretion to determine the best method of approach in using these technologies. 

- [Node](https://nodejs.org/en/)
- [TypeScript](http://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Pug](https://pugjs.org/api/getting-started.html)
- [API to Consume](https://jsonplaceholder.typicode.com/)

### The API
https://jsonplaceholder.typicode.com/

A test API service that has multiple endpoints available which return JSON formatted in the style of a user object, comment object, and more. For this challenge, please provide functionality that retrieves and renders data from at least two of the following endpoints:

- /posts/1
- /users/1
- /comments/1
- /photos/1

### Comments Regarding Typing

TypeScript is JavaScript with the added benefit of typing. Much of the syntax will be familiar, but with additional declarations to establish the type of the variable or the signature the function. Traditional JavaScript may be used for the Express Server file. However, the client-side JS & functions dealing with the API return should all be typed appropriately.

### Browser Compatibility

This test does not concern itself with legacy-browser support. Please consider the requirements to be modern browsers only (Chrome, Safari, FireFox, MS Edge).