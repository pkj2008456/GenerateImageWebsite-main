const SkinTone = document.getElementById("SkinTongSelector");
const Ethnicity = document.getElementById("EthnicitySelector");
const Body = document.getElementById("BodyTypeSelector");
const Style = document.getElementById("ClothingStyleSelector")
const Color = document.getElementById("ClothingColorSelector")
const Top = document.getElementById("ClothingTopSelector")
const Bottom = document.getElementById("ClothingBottomSelector")
const Underwear = document.getElementById("ClothingUnderwearSelector")
const Outerwear = document.getElementById("ClothingOuterwearSelector")
const Footwear = document.getElementById("FootwearSelector")
const Accessory = document.getElementById("AccessorySelector")
const Hairstyle = document.getElementById("HairstyleSelector")
const HairColor = document.getElementById("HairstyleSelector");


const genderList = ["Male", "Female", "Others"]
const ageList = ["Infant", "Child", "Teenager", "Young Adult", "Adult", "middle-age", "Senior", "Elderly"]
const skinToneList = ["Not set", "Porcelain", "Rosie", "Peach", "White"];
const ethnicityList = ["Not set", "African", "Asian", "Caucasian", "Hispanic", "Middle Eastern", "Native American", "Pacific Islander", "South Asian"];
const bodyList = ["Not set", "Slim", "Athletic", "Average", "Curvy", "Plus Size", "Petite", "Tall", "Short", "Muscular", "Stocky", "Other"];
const styleList = ["Not set", "Casual", "Formal", "Bohemian", "Vintage", "Streetwear", "Hipster", "Athleisure", "Preppy", "Gothic", "Punk", "Minimalist", "Tomboy", "Retro", "Glamorous"]
const colorList = ["Not set", "Black", "White", "Gray", "Navy", "Blue", "Teal", "Green", "Olive", "Yellow", "Orange", "Red", "Pink", "Purple", "Brown",
    "Beige", "Cream", "Burgundy", "Mustard", "Lavender", "Mint", "Coral", "Champagne", "Taupe", "Gold"
    , "Rose Gold", "Neutral", "Pastel", "Earth Tone", "Cool Tones", "Warm Tones", "Muted", "Metallic"]
const topList = ["Not set", "Suit", "T-shirt", "Blouse", "Shirt", "Tank top", "Dress", "Mini dress", "Midi dress", "Maxi dress", "Shirt dress", "Hoodie", "Jumpsuit"]
const bottomList = ["Not set", "Suit trousers", "Jeans", "Pants", "Wide-Leg Pants", "Cargo Pants", "Flared Pants", "Skirt", "Mini Skirt", "Midi Skirt", "Maxi Skirt", "Pencil Skirt"
    , "Pleated Skirt", "High-Waisted Shorts", "Leggings", "Trousers"]
const underwearList = ["Not set", "Underwear", "Bikini", "Pajamas", "Thermal Underwear", "Swimsuit", "Camisole", "Negligee"]
const outerwearList = ["Not set", "Pea coat", "Trench coat", "Jacket", "Suit jacket", "Denim jacket", "Bomber jacket", "Leather jacket", "Parks", "Cardigan"]
const footwearList = ["Not set", "Sneakers", "Boots", "Sandals", "Heels", "Shoes", "Loafers", "Oxfords", "Ballet Flats", "Platform Shoes"]
const accessoryList = ["Not set", "Hat", "Belt", "Scarf", "Necklace", "Earrings", "Glasses", "Sunglasses", "Handbag", "Headband"]
const backgroundList = ["Not set", "White wall", "Studio backdrop", "Brick wall", "Concreate wall", "Floral wallpaper", "Forest", "Beach", "Cityscape", "Industrial area",
    "Rooftop", "Graffiti wall", "Vintage room", "Minimalist setting", "Bokeh lights", "Nature landscape", "Urban alley", "Botanical garden", "Old staircase", "Library", "Desert", "Countryside",
    "Waterfall", "Mountain range", "Park", "Abandoned building", "Shop", "Rustic barn", "Warehouse", "Sunset", "Sunrise", "Architecture"]
const hairStyleList = ["Not set", "Long", "Medium", "Short", "Curly", "Wavy", "Bald", "Bob haircut", "Shag haircut", "Bangs", "Ponytail", "Undercut", "Top knot", "French braid", "Messy bun", "Afro hair", "Dreadlocks", "Braids"]
const hairColoList = ["Not set", "Black", "Brown", "Dark-brown", "Gray", "Light-gray", "Blonde", "Light-blonde", "White"]
let insertList = (list, position) => {
    position.remove(0);
    list.forEach(tone => {
        const option = document.createElement("option");
        option.value = tone;
        option.textContent = tone;
        position.appendChild(option);
    });
}

// this inserList function is for install selection box data
insertList(skinToneList, SkinTone);
insertList(ethnicityList, Ethnicity);
insertList(bodyList, Body);
insertList(styleList, Style);
insertList(colorList, Color);
insertList(topList, Top);
insertList(bottomList, Bottom);
insertList(underwearList, Underwear);
insertList(outerwearList, Outerwear);
insertList(footwearList, Footwear);
insertList(accessoryList, Accessory);
insertList(hairStyleList, Hairstyle);


//this for fill in the prompt where user no input some selection
class HumanStyleSelectCreator {
    constructor() {
        this.selectorOptions = {
            BodyTypeSelector: { list: bodyList },
            SkinTongSelector: { list: skinToneList },
            EthnicitySelector: { list: ethnicityList },
            ClothingStyleSelector: { list: styleList },
            ClothingColorSelector: { list: colorList },
            ClothingTopSelector: { list: topList },
            ClothingBottomSelector: { list: bottomList },
            ClothingUnderwearSelector: { list: underwearList },
            ClothingOuterwearSelector: { list: outerwearList },
            FootwearSelector: { list: footwearList },
            AccessorySelector: { list: accessoryList },
            HairstyleSelector: { list: hairStyleList },
        };
    }

    handleChipClick(chipDiv, chipDropList, value = null, index = null) {
        const selectorId = chipDiv.dataset.selectId;
        const options = this.selectorOptions[selectorId];

        if (options) {
            insertList(options.list, chipDropList);
            if (value !== null) {
                chipDropList.value = value;
            } else if (index !== null) {
                chipDropList.selectedIndex = index;
            }
        }
        return chipDiv;
    }
}

const HumanStyleCreator = new HumanStyleSelectCreator()



//Add a click event listener for each selected item to clear the selection
const selectionClear = document.querySelectorAll('[name="selectionClear"]');
selectionClear.forEach((selection) => {
    selection.addEventListener("click", (e) => {
        const prompt = document.getElementById("prompt-bubble-area");

        // Handle the different types of clear actions
        if (selection.id === "genderClear") {
            // Clear the gender selection
            clearGenderSelection(prompt);
        } else if (selection.id === "ageClear") {
            // Clear the age selection
            clearAgeSelection(prompt);
        } else if (selection.id === "hairClear") {
            // Clear the hair color selection
            clearHairColorSelection(prompt);
        } else {
            // Clear the role/style selection
            clearRoleStyleSelection(e.target, prompt);
        }
    });
});

function clearGenderSelection(prompt) {
    // Get all the gender radio buttons
    const radioButtons = document.querySelectorAll("[name='radioGender']");

    // Uncheck all the gender radio buttons
    radioButtons.forEach((radioButton) => {
        radioButton.checked = false;
    });

    // Remove the gender selection nodes from the prompt
    ['Female', 'Male', 'Others'].forEach((gender) => {
        const genderNode = prompt.querySelector(`[data-select-id="${gender}"]`);
        if (genderNode) {
            genderNode.remove();
        }
    });
}
// Clear the age range input
function clearAgeSelection(prompt) {
    const ageRangeInput = document.getElementById("ageRange");
    ageRangeInput.value = 0;
    document.getElementById("rangeValue").innerHTML = "";
    const ageRangeNode = prompt.querySelector('[data-select-id="ageRange"]');
    if (ageRangeNode) {
        ageRangeNode.remove();
    }
}

//Clear the hair iput
function clearHairColorSelection(prompt) {
    // Remove the "hair-item-clicked" class from all the hair color elements
    const hairColorDivs = document.querySelectorAll("[name='hair-color-div']");
    hairColorDivs.forEach((div) => {
        div.classList.remove("hair-item-clicked");
    });

    const hairColorNode = prompt.querySelector('[data-select-id="HairColor"]');
    if (hairColorNode) {
        hairColorNode.remove();
    }
}

function clearRoleStyleSelection(target, prompt) {
    // Get the role/style select element
    const selectElement = target.closest('.col-6').querySelector('[name="RoleStyleSelector"]');

    if (selectElement) {
        // reset the role/style select to "Not set"
        selectElement.value = "Not set";
    }

    // remove the role/style selection node from the prompt
    const childDivs = prompt.querySelectorAll("div");
    childDivs.forEach((childDiv) => {
        const selectId = childDiv.dataset.selectId;
        if (selectId === selectElement.id) {
            childDiv.remove();
        }
    });
}


// when the hair radio button clicked then add the hair border color
let hairColors = document.querySelectorAll('[class="hair-item"]');
hairColors.forEach((hairColor) => {
    hairColor.addEventListener("click", function (e) {
        hairColors.forEach(item => item.classList.remove("hair-item-clicked"));
        this.classList.add("hair-item-clicked");
    })
})


//add the bubble when the human select option click 
document.addEventListener('DOMContentLoaded', function (e) {
    let dropList = document.querySelectorAll("[name ='RoleStyleSelector']");
    let prompt = document.getElementById("prompt-bubble-area");

    dropList.forEach(function (select) {
        select.addEventListener('change', function () {
            let selectedOptionValue = this.value;
            console.log("test selects", selectedOptionValue)

            let oldDiv = prompt.querySelector(`div[data-select-id="${select.id}"]`);
            if (oldDiv) {
                prompt.removeChild(oldDiv);
            }


            if (selectedOptionValue === "Not set") {
                return;
            }


            let chipDiv = document.createElement("div");
            chipDiv.className = "chip backgroudColor-item";
            chipDiv.dataset.selectId = select.id

            let chipDropList = document.createElement('select');
            chipDropList.setAttribute("aria-label", select.ariaLabel);
            chipDropList.name = "bubble-element";
            chipDropList.classList.add("bubble-element")

            let chipClose = document.createElement('span');
            chipClose.className = "closebtn";
            chipClose.innerHTML = "&times;";
            chipClose.onclick = function () {
                chipDiv.remove();
            };

            chipDiv = HumanStyleCreator.handleChipClick(chipDiv, chipDropList, selectedOptionValue)



            chipDiv.appendChild(chipDropList);
            chipDiv.appendChild(chipClose);
            prompt.appendChild(chipDiv);

        });
    });
});


// add gender bubble to promtp
var lastGenderValue = null;
function handleGenderInput() {

    const prompt = document.getElementById("prompt-bubble-area");
    if (lastGenderValue !== null) {
        console.log("a")
        let oldDiv = prompt.querySelector(`div[data-select-id="${lastGenderValue}"]`);
        if (oldDiv) {
            prompt.removeChild(oldDiv);
        }
    }

    let chipDropList = document.createElement('select');
    chipDropList.setAttribute("aria-label", "Gender");
    chipDropList.name = "bubble-element";
    chipDropList.classList.add("bubble-element")


    // chipDropList.className = "chipsDropList browser-default  ";
    let chipClose = document.createElement('span');
    chipClose.className = "closebtn";
    chipClose.innerHTML = "&times;";
    chipClose.onclick = function () {
        let oldDiv = prompt.querySelector(`div[data-select-id="${lastGenderValue}"]`);
        if (oldDiv) {
            prompt.removeChild(oldDiv);
        }
    };


    insertList(genderList, chipDropList)
    let checkedRadio = document.querySelector('input[name="radioGender"]:checked');
    if (checkedRadio) {
        chipDropList.value = checkedRadio.value;
        console.log(checkedRadio.value)
        lastGenderValue = checkedRadio.value;
    }

    let chipDiv = document.createElement("div");
    chipDiv.dataset.selectId = lastGenderValue;
    chipDiv.className = "chip backgroudColor-item";

    chipDiv.appendChild(chipDropList);
    chipDiv.appendChild(chipClose);
    prompt.appendChild(chipDiv);
}

window.onload = function () {
    var genderInputs = document.querySelectorAll('input[name="radioGender"]');
    genderInputs.forEach(input => {
        input.addEventListener('change', handleGenderInput);
    });
}


//Reset all select 
let ResetAllButton = document.getElementById("ResetAllButton");
ResetAllButton.addEventListener("click", function () {
    let promptBubbleArea = document.getElementById("prompt-bubble-area");
    while (promptBubbleArea.firstChild) {
        promptBubbleArea.removeChild(promptBubbleArea.firstChild);
    }
    let RoleStyleSelector = document.getElementsByName("RoleStyleSelector");
    RoleStyleSelector.forEach((select) => {
        select.selectedIndex = 0;
    })

    let radioButtons = document.querySelectorAll("[name='radioGender']");
    radioButtons.forEach(radioButton => {
        radioButton.checked = false;
    })

});

// add age to bubble
let AgeInput = document.getElementById("ageRange")
AgeInput.addEventListener("input", function () {
    const prompt = document.getElementById("prompt-bubble-area");
    var range = document.getElementById("ageRange");
    var rangeValue = document.getElementById("rangeValue");
    for (let i = 0; i < ageList.length; i++) {
        if (range.value == i * 10) {
            rangeValue.innerHTML = ageList[i];
        }
    };
    let a = prompt.querySelector('[data-select-id="ageRange"]')
    if (a) {
        prompt.removeChild(a);
    }


    let chipDropList = document.createElement('select');
    chipDropList.setAttribute("aria-label", "Age");
    chipDropList.name = "bubble-element";
    chipDropList.classList.add("bubble-element")

    let chipClose = document.createElement('span');
    chipClose.className = "closebtn";
    chipClose.innerHTML = "&times;";
    chipClose.onclick = function () {
        let oldDiv = prompt.querySelector('div[data-select-id="ageRange"]');
        if (oldDiv) {
            prompt.removeChild(oldDiv);
        }
    };


    insertList(ageList, chipDropList)
    chipDropList.value = rangeValue.innerHTML;
    let chipDiv = document.createElement("div");
    chipDiv.dataset.selectId = "ageRange";
    chipDiv.className = "chip backgroudColor-item";


    chipDiv.appendChild(chipDropList);
    chipDiv.appendChild(chipClose);
    prompt.appendChild(chipDiv);
    lastRangeValue = range.value;
});

//random options function
let randomButton = document.getElementById("randomButton");
randomButton.addEventListener("click", function () {


    // random gender 
    let gender = document.querySelectorAll("[name='radioGender']");
    let randomIndex = Math.floor(Math.random() * gender.length);
    gender.forEach((radio, index) => {
        if (index === randomIndex) {
            radio.checked = true;
            radio.dispatchEvent(new Event('change'));
        } else {
            radio.checked = false;
        }
    });

    // random humam style e.g skin tone , ethnicity etc..
    let humanStyleArray = document.querySelectorAll("[name ='RoleStyleSelector']")
    humanStyleArray.forEach((select) => {
        const prompt = document.getElementById("prompt-bubble-area");
        let randomIndex = Math.floor(Math.random() * select.options.length);
        select.selectedIndex = randomIndex;
        if (randomIndex === 0) {
            return;
        }
        let selectedOptionValue = this.value;
        console.log("test random", randomIndex)

        let oldDiv = prompt.querySelector(`div[data-select-id="${select.id}"]`);
        if (oldDiv) {
            prompt.removeChild(oldDiv);
        } 

        let chipDiv = document.createElement("div");
        chipDiv.className = "chip backgroudColor-item";
        chipDiv.dataset.selectId = select.id;

        let chipDropList = document.createElement('select');
        chipDropList.setAttribute("aria-label", select.ariaLabel);
        chipDropList.name = "bubble-element";
        chipDropList.classList.add("bubble-element")
        let chipClose = document.createElement('span');
        chipClose.className = "closebtn";
        chipClose.innerHTML = "&times;";
        chipClose.onclick = function () {
            chipDiv.remove();
        };

        chipDiv = HumanStyleCreator.handleChipClick(chipDiv, chipDropList, null, randomIndex)
        chipDiv.appendChild(chipDropList);
        chipDiv.appendChild(chipClose);
        prompt.appendChild(chipDiv);

    })


})


// 獲取所有 hair radio 按鈕
const hairColorRadios = document.querySelectorAll('input[name="hair-color"]');

hairColorRadios.forEach(radio => {
    radio.addEventListener('click', () => {
        const prompt = document.getElementById("prompt-bubble-area");


        const selectedColor = radio.value;
        console.log('Selected hair color:', selectedColor);

        let a = prompt.querySelector('[data-select-id="HairColor"]')
        if (a) {
            prompt.removeChild(a);
        }


        let chipDropList = document.createElement('select');
        chipDropList.setAttribute("aria-label", "HairColors");

        let chipClose = document.createElement('span');
        chipClose.className = "closebtn";
        chipClose.innerHTML = "&times;";
        chipClose.onclick = function () {
            chipDiv.remove();
        };


        insertList(hairColoList, chipDropList)
        chipDropList.value = selectedColor;
        let chipDiv = document.createElement("div");
        chipDiv.dataset.selectId = "HairColor";
        chipDiv.className = "chip backgroudColor-item";




        chipDiv.appendChild(chipDropList);
        chipDiv.appendChild(chipClose);
        prompt.appendChild(chipDiv);

    });
});


// hidden all harir radio button ,which just show the lable
hairColorRadios.forEach(radio => {
    radio.style.display = 'none';
});




document.querySelectorAll('.insideNavbarItem').forEach(item => {
    item.addEventListener('click', (e) => {
        document.querySelectorAll('[name = "selectContext"]').forEach(i => {
            i.style.display = 'none';
        });

        if (e.target.id === 'generatorPageButton') {
            document.querySelector('.sidebar-context').style.display = 'block';
            document.querySelector('.sidebar-context').classList.add("clicked")
        } else if (e.target.id === 'faceUploadPageButton') {
            document.querySelector('.sidebar-face-upload').style.display = 'block';
        } else if (e.target.id === 'posePageButton') {
            document.querySelector('.sidebar-pose').style.display = 'block';
        }
    });
});


// download the image 
document.getElementById("imageDoawnload").addEventListener("click", () => {
    document.getElementById("downloadLink").click();
})

// set the seed 
function copySeed() {
    // Get the text field
    var copyText = document.getElementById("copySeed");
    // Select the text field
    copyText.select();
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

}