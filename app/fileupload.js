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
