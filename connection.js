const express = require("express")
const mongoose = require("mongoose")
const app = express();


mongoose.connect('mongodb://localhost:27017/Kannan', {useNewUrlParser: true,  useUnifiedTopology: true,   useFindAndModify: false
})
        .then(() => {
            console.log("The db has connected")
        }).catch(err => {
            console.log(err);
        })

module.exports.connection = mongoose