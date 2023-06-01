const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

//App routes
router.get("/", pageController.homepage);
router.get("/articles/:id", pageController.articlePage);
router.get("/categories/all", pageController.exploreCategories);
router.get("/categories/:id", pageController.categoryPage);

// router.post("/search", pageController.searchArticle);



module.exports = router;