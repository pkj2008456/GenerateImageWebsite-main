
let testImageJson = {
    "testImageJson": [
      {
        "base64": "./images/LibraryAll1.png"
      },
      {
        "base64": "./images/LibraryAll2.png"
      },
      {
        "base64": "./images/LibraryAll1.png"
      },
      {
        "base64": "./images/LibraryAll1.png"
      }
    ]
  }
  
  installGenImage(testImageJson.testImageJson);
    function installGenImage(imagePath){
      const imageBox = document.getElementById("imageBox");
      imagePath.forEach((path)=>{
        imageBox.innerHTML += `<div class="image-card"><img src="${path.base64}" alt=""></div> `;
      })
    }
    
  
  
    function goToHome() {
      window.location.href = '/mainpage';
    }
  
    function dropdown(id) {
      document.getElementById(id).classList.toggle("show");
    }
  
  
    // Add this function to update the dropbtn text
    function updateDropbtnText(text) {
      document.querySelector('.dropbtn').textContent = text;
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
        updateDropbtnText(optionText, this.closest('.image-dropdown '));
        this.parentNode.classList.remove('show'); // Close dropdown when option is selected
      });
    });
  
    function updateDropbtnText(text, dropdown) {
      const button = dropdown.querySelector('.dropbtn');
      button.textContent = text; // Update the button text
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
      let style = document.querySelector('.dropbtn').textContent;
      let size = document.querySelector('input[name="options"]:checked');
      let width = size.dataset.width;
      let height = size.dataset.height;

  
      const payload = {
        "prompt": prompt,
        "negative_prompt": negativePrompt,
        "seed": '-1',
        "steps": 25,
        "width": width,
        "height": height,
        "cfg_scale": 2,
        "sampler_name": 'DPM++ 2M',
        "n_iter": 1,
        "batch_size": 1,
        "override_settings": {
          "sd_model_checkpoint": 'realisticVisionV60B1_v51HyperVAE',
          "sd_vae": 'Karras'
        }
      };

      const able_controlnet = { "able_controlnet": true }
      const control_pose = {"control_pose": "5.png"};


      const data = {able_controlnet , payload , control_pose, password: '9WUCV45bUUnZ4s%xy*gaN@GZuUZrwK%uv#uf-kYR4Xs6p$4mBH#2E3K=dG85u!Ax'}
      console.log("test :" ,JSON.stringify(data));


      fetch('/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          const imgElement = document.getElementById('generated-image');
          imgElement.src = 'data:image/png;base64,' + data.images[0];
          imgElement.style.display = 'block';
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Image generation failed.');
        });
    });