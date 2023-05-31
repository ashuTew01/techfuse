const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

//App routes
router.get("/", pageController.homepage);
router.get("/categories/all", pageController.exploreCategories);


module.exports = router;