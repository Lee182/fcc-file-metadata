const express = require('express')
const app = express()
const multer = require('multer')
function human_filesize(bytes) {
  var i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B',
  'kB',
  'MB',
  'GB',
  'TB'][i]
}
const fs = require('fs')
const oneMB = 1000000
var port = process.env.PORT || 3000

var upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname)
    },
    filename: function (req, file, cb) {
      let rand = (Math.random()).toString().substr(2, 4)
      let ext = '.'+file.mimetype.split('image/')[1]
      let dat = Date.now()
      let filename = dat+'-'+rand+ext
      cb(null, filename)
    }
  }),
  limits: { fileSize: 200*oneMB }
})

var uploader = upload.single('file') // populates req.file

app.post('/uploadfile', function(req, res, next){
  uploader(req, res, function(err, file) {
    res.json({
      size: req.file.size,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      human_size: human_filesize(req.file.size)
    })

    fs.unlink(req.file.path, function(err, result){
      if (err) {return console.log('delete err:',err)}
      console.log('deleted:', req.file.filename)
    })
  })
})

app.use('/', express.static(__dirname + '/dist'))

app.listen(port, function(){
  console.log('server listening at http://localhost:'+port)
})
