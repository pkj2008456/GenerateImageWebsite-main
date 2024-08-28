    let sizeCss = "image-card-two2three";
    function installGenImage(data){
      const imageBox = document.getElementById("imageBox");
      data.images.forEach((imageData) => {
        imageBox.innerHTML += `<div class="image-card ${sizeCss}"><img src="data:image/png;base64,${imageData}" ></div> `;
      })
    };
    
    //when user click gen button that will remove before generate image
    function removeGenImage (){
      const imageBox = document.getElementById("imageBox");
      imageBox.innerHTML = "";
    }

    function setGenImageMeassage(resolution,style,dismension){
      const msgResolution= document.getElementById("msgResolution");
      const msgStyle= document.getElementById("msgStyle");
      const msgDismension= document.getElementById("msgDismension");
      msgResolution.textContent = resolution;
      msgStyle.textContent = style;
      msgDismension.textContent = dismension;

    }
  
    function goToHome() {
      window.location.href = '/mainpage';
    }
  
    function dropdown(id) {
      document.getElementById(id).classList.toggle("show");
    }
  
  
  
    const dimensionsDropdownTrigger = document.getElementById('dimensionsDropdownTrigger');
  
    dimensionsDropdownTrigger.addEventListener('click', function () {
      toggleDropdown('dimensionsDropdown');
    });
  
    function toggleDropdown(dropdownId) {
      const dropdowns = document.getElementsByClassName("dropdown-content");
      for (let dropdown of dropdowns) {
        if (dropdown.id === dropdownId) {
          dropdown.classList.toggle('show');
        } else {
          dropdown.classList.remove('show');
        }
      }
    }
  
    let dropdownOptions = document.querySelectorAll('.dropdown-option');
    dropdownOptions.forEach(function (option) {
      option.addEventListener('click', function (event) {
        event.preventDefault();
        const optionText = this.textContent;
        const checkpoint = this.dataset.checkpoint;
        updateDropbtnText(checkpoint,optionText, this.closest('.image-dropdown '));
        this.parentNode.classList.remove('show'); // Close dropdown when option is selected
      });
    });
  
    function updateDropbtnText(checkpoint,text, dropdown) {
      const button = dropdown.querySelector('.dropbtn');
      button.textContent = text; // Update the button text
      button.dataset.checkpoint = checkpoint;
    }
  
    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
      if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let dropdown of dropdowns) {
          dropdown.classList.remove('show');
        }
      }
    }
  
  
    document.getElementById('generate-button').addEventListener('click', function () {
      let prompt = document.getElementById('prompt-text').value;
      let negativePrompt = document.getElementById('negative-prompt-text').value;
      let styleCheckpoint = document.querySelector('.dropbtn').dataset.checkpoint;
      let styleName = document.querySelector('.dropbtn').textContent;
      let batch =  document.querySelector('input[name="batchs"]:checked').dataset.batch;
      let size = document.querySelector('input[name="options"]:checked');
      let width = size.dataset.width;
      let height = size.dataset.height;
      let proportion = document.getElementById("dimensionsButton").textContent;
      const userPrompt = document.getElementById("image-prompt")
      userPrompt.innerHTML ="";

      const payload = {
        "prompt": prompt,
        "negative_prompt": `nsfw,${negativePrompt}`,
        "seed": '-1',
        "steps": 25,
        "width": width,
        "height": height,
        "cfg_scale": 2,
        "sampler_name": 'DPM++ 2M',
        "n_iter": 1,
        "batch_size": batch,
        "override_settings": {
          "sd_model_checkpoint": styleCheckpoint? styleCheckpoint: 'realisticVisionV60B1_v51HyperVAE',
          "sd_vae": 'Karras'
        }
      };

      const able_controlnet = { "able_controlnet": false }
      const control_pose = {"control_pose": "5.png"};

      const data = {able_controlnet , payload , control_pose, password: '9WUCV45bUUnZ4s%xy*gaN@GZuUZrwK%uv#uf-kYR4Xs6p$4mBH#2E3K=dG85u!Ax'}
      console.log("test :" ,JSON.stringify(data));
      showImageWaiting();  


      // reminder that if want to using the apiController.js must add "/api" to the path , the setting is based on app.js
      // send request to routes , which will be send to apiController
      fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Image generation failed.');
          }
        })
        .then(data => {
          hiddenImageWaiting();
          removeGenImage();
          installGenImage(data)
          setGenImageMeassage(`${width}x${height}`, styleName ,proportion)
          userPrompt.innerHTML = prompt;
        })
        .catch(error => {
          hiddenImageWaiting();
          console.error('Error:', error);
          alert(error.message);
        });
    });

    function showImageWaiting(){
      const waitingBox =document.getElementById("waiting-box");
      waitingBox.classList.add("show")
    }

    function hiddenImageWaiting(){
      const waitingBox =document.getElementById("waiting-box");
      waitingBox.classList.remove("show")
    }
