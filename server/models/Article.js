const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    uploadedBy: {
        type: String,
        enum: ['Public', 'Moderator'],
        default: 'Public', // Optional: Set a default value if needed
        required: "This is a required field"
    },
    category: {
        type: ObjectId,
        required: "This is a required field"
    },
    title: {
        type: String,
        required: "This is a required field"
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

module.exports = mongoose.model('Article', articleSchema);