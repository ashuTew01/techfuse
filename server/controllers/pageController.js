require("../models/database");
const Category = require("../models/Category");
// GET "/"
//Homepage


exports.homepage = async(req, res) => {
    try {
        const limNum = 3;
        const categories = await Category.find({}).limit(limNum);

        res.render("index", { title: "TechFuse - New Techs & Gadgets", categories });
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