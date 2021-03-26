const express = require("express")
const mongoose = require("mongoose")
const app = express();
const album = require("./router/albumRoutes")
const connection = require("./connection")
const cors = require("cors")


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('multer/my-uploads'))
//using products route
app.use("/album", album) 

app.listen(4000, () => {
    console.log("The server is running on port 4000")
})      