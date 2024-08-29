let base64String = "";
const AUTH_PASSWORD = '9WUCV45bUUnZ4s%xy*gaN@GZuUZrwK%uv#uf-kYR4Xs6p$4mBH#2E3K=dG85u!Ax';

// This function takes a list as input and returns a random value from the list, excluding the "Not set" value
const seed = document.getElementById("seed").value;
const waitOverlay = document.getElementById('wait-overlay');
function getRandomValueFromList(list) {
    while (true) {
        // Randomly select an index within the length of the list   
        let text = list[Math.floor(Math.random() * list.length)]
        // If the selected value is not "Not set", return it
        if (text != "Not set") {
            return text;
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let generateButton = document.getElementById("generateButton");
    generateButton.addEventListener("click", function () {
        let promptOutput = "";
        let prompt = document.getElementById("prompt-bubble-area");
        let allSelection = prompt.querySelectorAll("select");
        // Create an object to store the randomly generated values for each characteristic
        let keyObject = {
            "Gender": getRandomValueFromList(genderList),
            "Age": getRandomValueFromList(ageList),
            "Skin Tone": getRandomValueFromList(skinToneList),
            "Ethnicity": getRandomValueFromList(ethnicityList),
            "Body Type": getRandomValueFromList(bodyList),
            "Clothing Style": getRandomValueFromList(styleList),
            "Clothing Color": getRandomValueFromList(colorList),
            "Clothing Top": getRandomValueFromList(topList),
            "Clothing Bottom": getRandomValueFromList(bottomList),
            "Underwear": getRandomValueFromList(underwearList),
            "Outerwear": getRandomValueFromList(outerwearList),
            "Footwear": getRandomValueFromList(footwearList),
            "Accessory": "nothings",
            "Hairstyle": getRandomValueFromList(hairStyleList),
            "HairColors": getRandomValueFromList(hairColoList),
        }
        allSelection.forEach((select) => {
            if (keyObject.hasOwnProperty(select.ariaLabel)) {
                // Check if the select element's aria-label property matches a key in the keyObject
                if (select.value) {
                    // If the select element has a value, update the corresponding value in the keyObject
                    keyObject[select.ariaLabel] = select.value;
                }
            }
        })

        // this prompt the " ${keyObject[...]} "  is a function which random the select  , if user have select that will place it 
        let promptText = `Extreme detail description , monochrome background , Highly detailed , Physically-based rendering ,Ultra-fine painting 
        ,a ${keyObject["Ethnicity"]} ${keyObject["Age"]} ${keyObject["Gender"]} with ${keyObject["Skin Tone"]} 
        skin tone and an ${keyObject["Body Type"]} body type,
        wearing a ${keyObject["Clothing Style"]} ${keyObject["Clothing Color"]} ${keyObject["Clothing Top"]} ${keyObject["Clothing Bottom"]}
         and white ${keyObject["Footwear"]}, ${keyObject["Hairstyle"]} hair , ${keyObject["HairColors"]} hair colors`
        promptOutput += promptText.toLowerCase();

        // this for append the text box text
        promptOutput += ", " + document.getElementById("promptInput").value;


        
        let promptOutputN = "";
        promptOutputN += ", " + document.getElementById("negativePromptInput").value;
        let nprompt = "(deformed iris,deformed pupils, foot don't grasp some things , semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime, mutated hands and fingers:1.4),(deformed, distorted, disfigured:1.3),poorly drawn,bad anatomy,wrong anatomy,extra limb,missing limb,floating limbs,disconnected limbs,mutation,mutated,ugly,disgusting,amputation,watermark text" + promptOutputN;
        //set checkpoint 
        let checkpoint = "realisticVisionV60B1_v51HyperVAE"

        let pose = ""
        if (document.querySelector(".selected-pose")) {
            link = document.querySelector(".selected-pose").src;
            pose = link.replace("http://52.163.70.189:3001/images/controlnet_pose/", "");
        } else {
            promptOutputN += "show the hands,standing pose , smaple background"
            nprompt += ", moving, <knees bending:10> , bending knees , hand carry somethings"
            pose = "5.png"
        }
        let control_pose = { "control_pose": pose }


        // get the Width and height
        let payloadWidth
        let payloadHeight
        document.querySelectorAll('[name="options"]').forEach((item) => {
            if (item.checked) {
                payloadWidth = item.dataset["width"];
                payloadHeight = item.dataset["height"];
            }
        })

        // I don't have use the document.querySelectorAll('[name="batchs"]:checked').dataset.batch; 
        // because I don't want that have default check it will effect UI, but I have set the default value , if you do care can change to 
        // let batchs = document.querySelectorAll('[name="batchs"]:checked').dataset.batch;
        let batch;
        document.querySelectorAll('[name="batchs"]').forEach((item) => {
            if (item.checked) {
                batch = item.dataset["batch"];
            }
        })

        // set the payload used to generate image settings
        let payload = {
            "prompt": promptOutput,
            "negative_prompt": nprompt,
            "seed": seed ? seed : "-1",
            "steps": 25,
            "width": payloadWidth ? payloadWidth : '620',
            "height": payloadHeight ? payloadHeight : '880',
            "cfg_scale": 2,
            "sampler_name": "DPM++ 2M",
            // "sampler_index": "Karras",
            "n_iter": 1,
            "batch_size": batch ? batch : 1,
            "override_settings": {
                'sd_model_checkpoint': checkpoint,
                "sd_vae": "Karras" //this can use to switch sd model waiREALCN_v70 or realisticVisionV60B1_v51HyperVAE
            }
        };

        // set the controlnet is work , false is mean not use to controlnet , pls don't remove control_pose , just change to false
        let able_controlnet = { "able_controlnet": true }
        let data = { able_controlnet, payload, control_pose, password: AUTH_PASSWORD }
        let fileUploadImage = document.querySelector(".file-upload-image");
        if (fileUploadImage.dataset.hasImage === "true") { // if user have upload face that will add reactor_img options to API
            let reactor_img = { "reactor_img": uploadFile() }
            data = { able_controlnet, payload, control_pose, reactor_img, password: AUTH_PASSWORD };
        }

        beforGenShowItwm();
        //this is check user is it select template image for image to image
        let istemplateValue = document.getElementById("aiImage").dataset["istemplate"];
        if (istemplateValue === "true") {
            img2img();
        } else {
            txt2img(data);

        }
    })

});

// send text to image to server.js and server.js will send to API 
function txt2img(data) {

    fetch('/api/generate-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            promptOutput = ""; // Set prompt to empty
            nprompt = ""; // Set prompt to empty
            removePreviewImage(); // this is remove preview image function
            document.getElementById("downloadLink").href = "data:image/png;base64," + data["images"][0]; // set download  is generate image
            document.getElementById("aiImage").src = "data:image/png;base64," + data["images"][0]; // set the src is generate image
            afterGenShowItem();
            afterGenHiddneItem();
            createPreviewImage(data); // this is create previrw image function
            document.getElementById("copySeed").value = data['seed']['seed'];
            console.log("the seed ", data['seed']['seed']);
        })
        .catch(error => {
            afterGenHiddneItem();
            if (error.name === 'AbortError') {
                console.error('Request timed out');
                // handle time out
                alert("time out。");
            } else {
                console.error('Error:', error);
                alert(error.message);
            }
        });
}

// create preview image div and install the image  when  more then 2 image , and remove last image because it is skeleton image
function createPreviewImage(data) {
    const preview = document.getElementById("preview");
    data.images.forEach((imageData, index) => {
        if (index < data.images.length - 1 && data.images.length > 2) {
            const img = document.createElement("img");
            img.id = `aiImg${index + 1}`;
            img.src = `data:image/png;base64,${imageData}`;
            img.classList.add("aiImage-option");
            img.name = "aiImages";
            img.onclick = function () {
                document.getElementById("aiImage").src = img.src;
                document.getElementById("downloadLink").href = img.src;
            };
            preview.appendChild(img);
        }
    });
}


function removePreviewImage() {
    const preview = document.getElementById("preview");
    preview.innerHTML = ''; // This removes all children
}

// set the black background and waiting image display
function beforGenShowItwm(){
    const waitOverlay = document.getElementById('wait-overlay');
        waitOverlay.classList.add('show');
}

function afterGenShowItem(){
    document.getElementById("aiImage").style.display = "block"; // show generate image
    document.querySelector(".seed-container").classList.remove("visually-hidden") // show the generate image seed 
    const options = document.querySelectorAll('.image-option'); // show the download button and preview image
    options.forEach(function (element) {
        element.classList.remove("visually-hidden")
    });
}

function afterGenHiddneItem(){
    const waitOverlay = document.getElementById('wait-overlay');
    waitOverlay.classList.remove('show');
}