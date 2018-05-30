import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";

// Controllers (route handlers)
import * as homeController from "./controllers/home";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Primary app routes.
 */
app.get("/", homeController.index);


/**
 * API examples routes.
 */
// app.get("/api", apiController.getApi);
// app.get("/api/facebook", passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);



export default app;
