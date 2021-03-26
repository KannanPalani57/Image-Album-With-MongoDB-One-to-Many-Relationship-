var express = require('express')
var router = express.Router()
const Album = require("../model/Album");
const Image =  require("../model/Image");
const multer = require("multer")
const path = require("path")


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'multer/my-uploads')
    },
    filename: function (req, file, cb) {
        cb(null,"img-" + Date.now() + path.extname(file.originalname));
    }
})


var albumUpload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      }
}).single("albumImage")

const uploadAlbumImage = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      }
})

// define the home page route
router.get('/', (req,res) => { 
  res.send("Home page route")
})

//get all albums

router.get("/get-albums", (req, res) => {
    Album.find().then(data => res.send(data)).catch(err => console.log(err))
})

router.post("/add-album", (req,res) => {
    
    albumUpload(req, res, async (err) => {
        const albumName = req.body.albumName;
      
        const album = await Album.findOne({albumName})
        console.log(album)
        if(album){
            res.json({
                "status": 400,
                "message": "album name already exist"
              })
        }
        if(err){
            res.json({
            "status": 400,    
            "message": "Try to upload appropriate image",
            err})
        }else{
            const albumName = req.body.albumName;
            const albumImageName = req.file.filename
            
            //checking whether the albumname already exist
            const album = await Album.findOne({albumName})
            console.log(album)
            

            
            const newAlbum = new Album();
            newAlbum.albumName = albumName;
            newAlbum.albumImage = albumImageName
        
            newAlbum.save();
            res.json(newAlbum)
        }
    })
    
  
})
                            

router.post("/add-image/:id", uploadAlbumImage.single('imageName'), (req, res) => {
    const imageName = req.file.filename
    const actualName = req.body.actualName;
    const { id } = req.params;

    
    const newImage = new Image();

    newImage.imageName = imageName;
    newImage.actualName = actualName;
    console.log(id, imageName, actualName)

    newImage.save()
        .then(result => {
            Album.findOne({
                "_id": id
            }, (err, album) => {
                if(album){
                    album.images.push(newImage)

                    album.save();
                    res.json({message: "Image added to the Album"})
                }else if(err){
                    res.json({"message": "Invalid request", err})
                }
            }             
            )
        })
})



router.get("/get-album-images/:id", (req,res) => {
    const id = req.params.id
    Album.findById({"_id": id}).populate("images").then(data => res.send(data)).catch(err => console.log(err))
})

module.exports = router