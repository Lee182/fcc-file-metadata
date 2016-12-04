(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// form#uploadfile
//   input(type='file', name='uploadFile')

// form = document.querySelector('#uploadfile')
// form.addEventListener('change', function(e){
//   e.preventDefault()
//   var file = e.target.files[0]
//   if (typeof file !== 'object') return false
//   upload(file, function(res) {
//     console.log(res)
//   })
// })

function upload({file, cb, errcb, progresscb, cookies, url}) {
  var formData = new FormData()
  formData.append('file', file)
  var req = new XMLHttpRequest()
  req.onreadystatechange = function (e) {
    if (req.readyState === 4) {
      cb(req.response)
    }
  }
  req.onerror = errcb
  req.addEventListener('progress', function(e){
    console.log('progress',  Math.ceil(e.loaded/e.total) * 100 + '%')
    if (typeof progresscb === 'function') {
      progresscb(e)
    }
  }, false)
  req.withCredentials = Boolean(cookies)
  req.open('POST', url)
  // req.setRequestHeader('Content-Type', 'multipart/form-data')
  req.send(formData)
  return req
}

function fileSize(bytes) {
  var i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B',
  'kB',
  'MB',
  'GB',
  'TB'][i]
}

module.exports = {
  fileSize: fileSize,
  upload: upload
}

},{}],2:[function(require,module,exports){
window.fileupload = require('./fileupload.js')
$form = document.querySelector('.fileupload-form')
$input = document.querySelector('.fileupload-input')
$fileinfo = document.querySelector('.fileinfo')

$form.reset()

$form.addEventListener('submit', function(e){
  e.preventDefault()
  console.log('here?')
  var file = $input.files[0]
  console.log(file)
  if (typeof file !== 'object') return false

  var req = fileupload.upload({
    url: '/uploadfile',
    file: file,
    cb: function(res) {
      res = JSON.parse(res)
      window.res = res
      $fileinfo.textContent = JSON.stringify(res, null, 2)
    },
    errcb: function(err){
      console.log('errcb',err)
    }
  })

})

},{"./fileupload.js":1}]},{},[2]);
