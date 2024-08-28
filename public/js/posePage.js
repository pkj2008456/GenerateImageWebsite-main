readImageFileForLocal("/images/controlnet_pose/Adult/pose_adult_male")

const poseOptionItems = document.querySelectorAll('[name="poseOptionItem"]');

poseOptionItems.forEach(item => {
  item.addEventListener('change', () => {
    let age = document.getElementById("poseAge").value;
    let gender = document.getElementById("poseGender").value;
    console.log(age + "_" + gender)
    switch (age + "_" + gender) {
      case "Infant_Male":
        readImageFileForLocal()
        console.log("for test ")
        break;
      case "Infant_Female":
        readImageFileForLocal(url)
        console.log("for test ")
        break;
      case "Child_Male":
        readImageFileForLocal(url)
        console.log("for test ")
        break;
      case "Child_Female":
        readImageFileForLocal(url)
        break;
      case "Teenager_Male":
        removePose()
        readImageFileForLocal("/images/controlnet_pose/Teenager/Teenager_male")
        break;
      case "Teenager_Female":
        removePose()
        readImageFileForLocal("/images/controlnet_pose/Teenager/pose_teenager_female")
        break;
      case "Adult_Male":
        removePose()
        readImageFileForLocal("/images/controlnet_pose/Adult/pose_adult_male")
        break;
      case "Adult_Female":
        removePose()
        readImageFileForLocal("/images/controlnet_pose/Adult/pose_adult_female")
        break;
      default:
        removePose()
        readImageFileForLocal("/images/controlnet_pose/Adult/pose_adult_male")
        break;
    }
  });
});

function removePose() {
  const imageContainer = document.getElementById("imageContainer");
  while (imageContainer.firstChild) {
    imageContainer.removeChild(imageContainer.firstChild);
  }
}


function readImageFileForLocal(url) {
  const imageContainer = document.getElementById('imageContainer');
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const dataArray = Object.values(data);
      dataArray.forEach(file => {
        const img = document.createElement('img');

        // img.src = file.match(/"([^"]+)"/)[1];
        // console.log(file)
        img.src = file
        img.style.maxWidth = '200px';
        img.classList.add('col-3', 'my-2', 'controlnetPose');
        img.dataset.controlnetPose = "true";
        // let id = file.match(/"([^"]+)"/)[1];
        img.id = file.replace(`${url}`, '');


        img.onclick = function () {
          let alreadyClickId = "";
          if (document.querySelector(".selected-pose")) {
            alreadyClickId = document.querySelector(".selected-pose").id;
          }

          document.querySelectorAll("[data-controlnet-pose]").forEach((image) => {
            image.classList.remove("selected-pose");
          })


          let selectPose = img.id;
          document.getElementById(selectPose).classList.add("selected-pose");

          if (alreadyClickId === selectPose) {
            document.getElementById(selectPose).classList.remove("selected-pose");
          }
        }
        imageContainer.appendChild(img);
      })
    })
    .catch(error => {
      console.error('Error fetching images:', error);
    });
}


