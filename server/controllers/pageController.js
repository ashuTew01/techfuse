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

// Dont Touch this until you want to insert an article.
  async function insertArticles(){
    try {  
        const articlesData = [
            {
              type: 'Public',
              image: 'cat-laptops.jpg',
              categoryID: '6475dc0c7957b26c694f8a9e',
              catName: 'Laptops',
              title: 'The Best Laptops for Productivity',
              content: 'In today\'s fast-paced world, having a reliable laptop is essential for productivity. Whether you\'re a student, a professional, or a casual user, choosing the right laptop can greatly impact your efficiency. This article explores the top laptops known for their performance, durability, and features that enhance productivity.',
            },
            {
              type: 'Public',
              image: 'cat-ais.jpg',
              categoryID: '6475dc0c7957b26c694f8a9f',
              catName: 'AIs',
              title: 'Artificial Intelligence: Revolutionizing Industries',
              content: 'Artificial Intelligence (AI) is reshaping various industries, bringing about significant advancements and revolutionizing the way we live and work. From healthcare and finance to transportation and entertainment, this article dives into the transformative power of AI and explores real-world examples of how it is changing the landscape of different sectors.',
            },
            {
              type: 'Public',
              image: 'cat-smartphones.jpg',
              categoryID: '6475dc0c7957b26c694f8a9d',
              catName: 'Smartphones',
              title: 'The Latest Innovations in Smartphone Technology',
              content: 'Smartphones have become an integral part of our lives, and the technology behind them continues to evolve rapidly. This article highlights the latest innovations in smartphone technology, from enhanced camera capabilities and 5G connectivity to foldable displays and advanced security features. Discover the cutting-edge features that make today\'s smartphones more powerful and versatile than ever.',
            },
            {
                type: 'Public',
                image: 'cat-laptops.jpg',
                categoryID: '6475dc0c7957b26c694f8a9e',
                catName: 'Laptops',
                title: 'Choosing the Right Laptop for Gaming Enthusiasts',
                content: 'Gaming laptops are designed to deliver immersive gaming experiences with powerful hardware and stunning visuals. This article guides gaming enthusiasts in choosing the right laptop that meets their specific requirements, including graphics performance, display refresh rates, cooling systems, and keyboard ergonomics. Explore the top gaming laptops on the market and unleash the full potential of your gaming adventures.',
              },
              {
                type: 'Public',
                image: 'cat-ais.jpg',
                categoryID: '6475dc0c7957b26c694f8a9f',
                catName: 'AIs',
                title: 'The Ethics of Artificial Intelligence',
                content: 'As artificial intelligence becomes more integrated into our daily lives, ethical considerations become increasingly important. This article explores the ethical implications of AI, including privacy concerns, bias in algorithms, and the impact on jobs and society. Discover the ongoing debates surrounding AI ethics and the approaches being taken to ensure responsible and fair use of this powerful technology.',
              },
              {
                type: 'Public',
                image: 'cat-smartphones.jpg',
                categoryID: '6475dc0c7957b26c694f8a9d',
                catName: 'Smartphones',
                title: 'Tips and Tricks to Maximize Your Smartphone Battery Life',
                content: 'Battery life is a crucial aspect of any smartphone user experience. This article provides valuable tips and tricks to extend your smartphone battery life, including optimizing settings, managing background apps, and utilizing power-saving features. Discover how to make the most out of your device without worrying about running out of battery during the day.',
              },
          ];

        await Article.insertMany(articlesData);
    } catch (error) {
        console.log('err', + error);
    }
}

// insertArticles();



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