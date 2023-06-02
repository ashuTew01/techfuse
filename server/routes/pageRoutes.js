const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

//App routes
router.get("/", pageController.homepage);
router.get("/articles/all", pageController.allArticles);
router.get("/articles/:id", pageController.articlePage);
router.get("/categories/all", pageController.allCategories);
router.get("/categories/:id", pageController.categoryPage);

router.post("/search", pageController.searchArticle);
router.get("/submit/articles/public", pageController.submitArticlePublic);
router.post("/submit/articles/public", pageController.submitArticlePublicPOST);


router.get("/about", pageController.aboutPage);
router.get("/contact", pageController.contactPage);




module.exports = router;