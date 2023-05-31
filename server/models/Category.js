const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: "This Field is Required"
    },
    image: {
        type: String,
        required: "This field is Required"
    },
    popularity: {
        type: Number,
        min: 0,
        max: 20
    }
});

module.exports = mongoose.model('Category', categorySchema);