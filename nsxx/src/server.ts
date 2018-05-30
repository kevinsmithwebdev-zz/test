import errorHandler from "errorhandler";

import app from "./app";

app.use(errorHandler());

// start Express server

const server = app.listen(app.get("port"), () => {
  console.log(`\n\n*** App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode\n`);
});

export default server;
