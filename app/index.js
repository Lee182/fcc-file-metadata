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

  var req = fileupload({
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
