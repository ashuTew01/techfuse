const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
// const pathTest = require("../../")

const articleSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Public', 'Moderator'],
        default: 'Public', // Optional: Set a default value if needed
        required: "This is a required field"
    },
    uploadedBy: {
        type: ObjectId   //User ID 
    },
    image: {
        type: String    //Contains the Image Path.
    },
    categoryID: {
        type: ObjectId,
        required: "This is a required field"
    },
    catName: {
        type: String,
        maxLength: 30
    },
    title: {
        type: String,
        required: "This is a required field",
        maxLength: 120
    },
    content: {
        type: String,
        required: "This is a required field"
    },
    time : { 
        type : Date, 
        default: Date.now 
    }
});

articleSchema.index({title: "text", content: "text"});

//Wildcard Indexing
// articleSchema.index({"$**" : "text"});


module.exports = mongoose.model('Article', articleSchema);