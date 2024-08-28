fetch("/images/template")
  .then(response => response.json())
  .then(data => {
    // data should be an array of file paths
    const waterfallDiv = document.querySelector(".waterfall");
    // const imageFiles = data.match(/<a href="([^"]+\.(jpg|png|gif|bmp))"/g);
    const imageFiles = Object.values(data);
    imageFiles.map(file => {
      console.log(file)
      const div = document.createElement("div");
      const image = document.createElement('img');
      // const imagePath = file.match(/"([^"]+)"/)[1];
      const imagePath = file;
      div.classList.add("templateItem");
      image.src = imagePath;
      image.onclick = () => setImageToDisplay(image)
      div.appendChild(image)
      waterfallDiv.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Error fetching images:', error);
  });


// where click the template image that will be show 
document.querySelectorAll("[data-temp-image]").forEach((image) => {
  image.addEventListener("click", () => {
    setImageToDisplay(image);
    modalInstance.hide();
  });
});


function setImageToDisplay(image) {
  let aiImage = document.getElementById("aiImage");
  aiImage.src = image.src;
  aiImage.dataset.istemplate = true;
  aiImage.style.display = "block";
};

// set the function to send request , this method will called by generateButton.js , pls check the 107 line
async function img2img() {
  let img = document.getElementById("aiImage");
  let base64Image = await convertToBase64();
  let data = {
    "prompt": '', // not yet to text 
    "seed": -1,
    "steps": 25,
    "width": 1080,
    "height": 1080,
    "denoising_strength": 1,
    "override_settings": {
      "sd_model_checkpoint": "realisticVisionV60B1_v51HyperVAE"
    },
    "n_iter": 1,
    "init_images": base64Image ? [base64Image] : [],
    "batch_size": 1,
    "denoising_strength": 0.55,
 
  };

  fetch('https://ai-generation.innocorn.xyz//img2img', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    mode: 'cors'
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("waitingImg").style.display = "none";
      document.getElementById("aiImage").style.display = "block";
      waitOverlay.classList.remove('show');
 
      sessionStorage.setItem("id", data["file_path"])
      console.log("ths is id", sessionStorage.getItem("id"))
      promptOutput = "";
      nprompt = "";
      document.getElementById("aiImage").dataset["istemplate"] = "false";
      document.getElementById("waitingImg").style.display = "none";
      document.getElementById("aiImage").style.display = "block";
      document.getElementById("imageDoawnload").style.display = "block"
      document.getElementById("aiImage").src = "data:image/png;base64," + data['images'];
    })
    .catch(error => {
      console.error('Error:', error);
    });
}



function convertToBase64() {
  const imageUrl = document.getElementById('aiImage').src;

  return new Promise((resolve, reject) => {
    if (imageUrl) {
      fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
        .catch(error => {
          console.error('Error converting image to base64:', error);
          reject(error);
        });
    } else {
      resolve(null);
    }
  });
}

