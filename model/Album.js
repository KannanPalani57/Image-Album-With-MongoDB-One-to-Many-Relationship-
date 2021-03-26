const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Album = mongoose.model("Album", new Schema({
    albumName: {
        type: String,
    },
    albumImage: {
        type: String,
    },
    images: [
        {
            type: Schema.Types.ObjectId,
            ref: "Image"
        }
    ]
}))

module.exports = Album;