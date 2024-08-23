
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
  
    var dropdownOptions = document.querySelectorAll('.dropdown-option');
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
      const prompt = document.getElementById('prompt-text').value;
      const negativePrompt = document.getElementById('negative-prompt-text').value;
      const style = document.querySelector('.dropbtn').textContent;
  
      const data = {
        prompt: prompt,
        negative_prompt: negativePrompt,
        style: style
      };
  
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