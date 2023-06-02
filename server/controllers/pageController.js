require("../models/database");
const Category = require("../models/Category");
const Article = require("../models/Article");

// GET "/"
//Homepage
exports.homepage = async(req, res) => {
    try {
        const limNum = 3;
        const latestArticles = await Article.find({}).sort({ time: -1 }).limit(5);
        const categories = await Category.find({}).limit(limNum);
        const allArticles = [latestArticles];

          async function fetchArticles() {
            for (const category of categories) {
              const articles = await Article.find({ categoryID: category._id })
                .sort({ time: -1 })
                .limit(5);

              allArticles.push(articles);
            }
          }
          
          await fetchArticles();

        res.render("index", { title: "TechFuse - New Techs & Gadgets", categories, allArticles });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

// GET "/categories/all"
//Categories
exports.allCategories = async(req, res) => {
    try {
        const limNum = 50;
        const categories = await Category.find({}).limit(limNum);

        res.render("categories", { title: "TechFuse - All Categories", categories });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

//GET "/articles/all"
//Category Page
exports.allArticles = async(req, res) => {
    try {
        const limNum = 30;
        const articles = await Article.find({}).sort({ time: -1 }).limit(limNum);

        res.render("allArticles", { title: "TechFuse - All Articles", articles});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

//GET "/article/:id"
//Article Page
exports.articlePage = async(req, res) => {
    try {
        let articleId = req.params.id;
        
        const article = await Article.findById(articleId);
         let truncatedTitle = article.title;
         truncatedTitle = truncatedTitle.substring(0, 100).trim() + "...";

         const formattedDate = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'Asia/Kolkata' // Assuming IST time zone
          }).format(article.time);

        res.render("article", { title: "TechFuse - " + truncatedTitle, article, truncatedTitle, formattedDate});
    } catch (error) {
        console.log(error);
    }
}

//GET "/category/:id"
//Category Page
exports.categoryPage = async(req, res) => {
    try {
        let categoryId = req.params.id;
        const currCat = await Category.findById(categoryId);
        const catArticles = await Article.find({'categoryID': categoryId}).limit(30);
        res.render("categoryPage", { title: "TechFuse - " + currCat.name, currCat, catArticles});
    } catch (error) {
        console.log(error);
    }
}

//POST "/search"
//Search
exports.searchArticle = async(req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        let results = await Article.find({ $text: { $search: searchTerm, $diacriticSensitive: true } } );
        // res.json(results);
        res.render("search", {title: "TechFuse - Search", results});
        
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured."});
    }
}

//GET "/submit/articles/public"
//Submit Article Public
exports.submitArticlePublic = async(req, res) => {
    const infoErrorsObj = req.flash("infoErrors");
    const infoSubmitObj = req.flash("infoSubmit");
    const categories = await Category.find({}).limit(300);
    res.render("submitArticlePublic", {title: "TechFuse - Submit Article", categories, infoErrorsObj, infoSubmitObj});
}

//POST "/submit/articles/public"
//Submit Article Public POST
exports.submitArticlePublicPOST = async(req, res) => {

    try {

        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files || Object.keys(req.files).length === 0){
            console.log("No Files were Uploaded");
        } else {
            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;
            uploadPath = require("path").resolve("./") + "/public/uploads/" + newImageName;

            imageUploadFile.mv(uploadPath, function(err){
                if(err) return res.status(500).send(err);
            })
        }

        const catID = req.body.categoryID;
        const category = await Category.findById(catID);

        const newArticle = new Article({
            "type": "Public",
            "title": req.body.title,
            "content": req.body.content,
            "catName": category.name,
            "categoryID": category._id,
            "image": newImageName

        })
        await newArticle.save();

        req.flash("infoSubmit", "Article Published!");
        res.redirect("/submit/articles/public"); 
    } catch (error) {
        // res.json(error);
        req.flash("infoErrors", error);
        res.redirect("/submit/articles/public");
        
    }


}

//GET "/about"
//About page
exports.aboutPage = async(req, res) => {
    res.render("about", {title: "About TechFuse"});
}

//GET "/contact"
//Contact Page (Not fully made just a coming soon page.)
exports.contactPage = async(req, res) => {
    res.render("contact", {title: "Contact"});
}