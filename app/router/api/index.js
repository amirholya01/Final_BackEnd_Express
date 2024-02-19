/**
 * Router configuration for API endpoints related to the home page.
 * @module IndexRoutes
 * @requires HomeController
 * @requires express.Router
 */

// Import the HomeController for handling home page requests
const {HomeController} = require("../../controllers/api/Home.Controller");


// Import the express Router module
const router = require("express").Router();


// Define routes for the home page
router.get("/", HomeController.indexPage);


// Export an object containing the router configuration
module.exports = {
    IndexRoutes : router
}