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
        const allArticles = {latestArticles};
        // categories.forEach((category, index) => {
            
        // });



        res.render("index", { title: "TechFuse - New Techs & Gadgets", categories, allArticles });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}


// GET "/categories"
//Categories


exports.exploreCategories = async(req, res) => {
    try {
        const limNum = 50;
        const categories = await Category.find({}).limit(limNum);

        res.render("categories", { title: "TechFuse - All Categories", categories });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

// // Dont Touch this until you want to insert an article.
//   async function insertArticle(){
//     try {  
//         const articleData = {
//             'type': 'Public',
//             'categoryID': '6475dc0c7957b26c694f8a9d',
//             'title': 'The Evolution of Smartphones',
//             'image': 'phone-art-01.jpg',
//             'content': `In recent years, smartphones have become an integral part of our daily lives. These powerful handheld devices have transformed the way we communicate, work, and stay connected.
        
//         Gone are the days when phones were primarily used for making calls and sending text messages. Today's smartphones are more like mini-computers, offering a wide range of features and capabilities. From high-resolution touchscreens to powerful processors, smartphones have come a long way in terms of technology and design.
        
//         One of the key advancements in smartphone technology is the introduction of mobile applications or apps. App stores provide users with access to a vast ecosystem of apps that can enhance productivity, entertainment, and much more. From social media apps to fitness trackers, there seems to be an app for almost everything.
        
//         Moreover, smartphones have revolutionized the way we consume media. With high-quality cameras, we can capture stunning photos and videos right from our phones. Streaming services allow us to enjoy movies, TV shows, and music on the go. Gaming has also found a new platform on smartphones, with an array of immersive and addictive games available at our fingertips.
        
//         As smartphones have become more prevalent, they have also become more affordable and accessible. Today, you can find a smartphone to fit any budget, offering a range of features and specifications. This accessibility has contributed to the widespread adoption of smartphones worldwide.
        
//         Looking ahead, the future of smartphones appears to be even more exciting. We can expect further advancements in areas such as artificial intelligence, augmented reality, and 5G connectivity. These innovations will continue to push the boundaries of what smartphones can do and how they integrate into our lives.
        
//         In conclusion, smartphones have undergone a remarkable evolution, transforming from simple communication devices to powerful and versatile companions. With their ever-expanding capabilities and the constant influx of new technologies, smartphones have become indispensable tools that shape our daily routines and connect us to the world like never before.`,
//         };

//         await Article.insertMany(articleData);
//     } catch (error) {
//         console.log('err', + error);
//     }
// }

// insertArticle();



//Don't Touch this unless you want to add categories.

// async function insertCategories(){
//     try {
//         await Category.insertMany([
//             {
//                 "name": "Smartphones",
//                 "image": "cat-smartphones.jpg"
//             },
//             {
//                 "name": "Laptops",
//                 "image": "cat-laptops.jpg"
//             },
//             {
//                 "name": "AIs",
//                 "image": "cat-ais.jpg"
//             },
//             {
//                 "name": "Others",
//                 "image": "cat-others.jpg"
//             }
//         ]);
//     } catch (error) {
//         console.log('err', + error);
//     }
// }

// insertCategories();      //NOTE:: KEEP THIS COMMENTED UNLESS YOU WANT TO INSERT SOME CATEGORY.