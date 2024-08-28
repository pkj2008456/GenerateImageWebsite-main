let image
function readURL(input) {
  if (input.files && input.files[0]) {

    var reader = new FileReader();

    reader.onload = function (e) {
      $('.image-upload-wrap').hide();
      image = e.target.result
      $('.file-upload-image').attr('src', e.target.result);
    
      let fileUploadImage = document.querySelector(".file-upload-image");
      fileUploadImage.dataset.hasImage = "true";

      $('.file-upload-content').show();

      $('.image-title').html(input.files[0].name);
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    removeUpload();
  }
}


function removeUpload() {
  $('.file-upload-input').replaceWith($('.file-upload-input').clone());
  $('.file-upload-content').hide();
  $('.image-upload-wrap').show();

  let fileUploadImage = document.querySelector(".file-upload-image");
  fileUploadImage.dataset.hasImage = "false";

}

$('.image-upload-wrap').bind('dragover', function () {
  $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
  $('.image-upload-wrap').removeClass('image-dropping');
});



