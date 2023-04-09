// multer middleware to upload images
const multer  = require('multer')
const storage = multer.diskStorage({ // images will be stored in local server
    destination: function (req, file, cb) { //destination of images will be in public/images folder
      cb(null, './public/images/')
    },
    filename: function (req, file, cb) { // we will keep the original filename
      cb(null, file.originalname )
    }
  })
  
const upload = multer({ storage: storage })

module.exports = upload;