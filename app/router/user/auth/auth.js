// Importing the AuthController from the user/auth directory within controllers
const {AuthController} = require("../../../controllers/user/auth/Auth.Controller");

// Importing the expressValidatorMapper middleware for error handling
const {expressValidatorMapper} = require("../../../middleware/checkError");

// Importing the registerValidator and loginValidator functions from the user/auth directory within validation
const {registerValidator, loginValidator} = require("../../../validation/user/auth");



// Importing the Router module from Express.js
const router = require("express").Router();

// Define routes for user authentication

// Route for user registration
router.post("/register", registerValidator(), expressValidatorMapper, AuthController.register)
// Route for user login
router.post("/login", loginValidator(), expressValidatorMapper, AuthController.login);



// Exporting the router containing authentication routes
module.exports = {
    AuthRoutes : router
}