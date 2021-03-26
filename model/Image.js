const mongoose = require("mongoose");


const Image = mongoose.model("Image", new mongoose.Schema({
    imageName: {
        type: String,
        required: true
    },
    actualName: {
        type: String,
        required: true,
    }
}))


module.exports = Image;