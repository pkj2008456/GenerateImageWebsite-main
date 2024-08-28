
 function uploadFile() {
  const imageInput = document.getElementById('image-box');
  const src = imageInput.src;

  if (src) {
    const base64 = src.split(',')[1];
    console.log("this is base64 :" ,base64)
    return  base64;
  } else {
    alert('Please select an image first.');
  }
}