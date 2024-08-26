const sizeData = {
    "2:3": [
        { size: [736, 1120] },
        { size: [832, 1248] },
        { size: [896, 1344] }
    ],
    "1:1": [
        { size: [896, 896] },
        { size: [1024, 1024] },
        { size: [1120, 1120] },
    ],
    "16:9": [
        { size: [1184, 672] },
        { size: [1376, 768] },
        { size: [1472, 832] },
    ]
};

const resolutionInputs = document.querySelectorAll('[name="resolution"]');
document.querySelectorAll('[name="proportion"]').forEach((item) => {
    item.addEventListener('click', (e) => {

        switch (item.id) {
            case "proportion1":

                resolutionInputs.forEach((item, index) => {
                    const size = sizeData["2:3"][index].size; 
                    item.innerHTML = `${size[0]}x${size[1]}`; 
                    item.dataset.width = size[0];
                    item.dataset.height = size[1];
                });

                break;
            case "proportion2":
                resolutionInputs.forEach((item, index) => {
                    const size = sizeData["1:1"][index].size; 
                    item.innerHTML = `${size[0]}x${size[1]}`; 
                    item.dataset.width = size[0];
                    item.dataset.height = size[1];
                });

                break;

            case "proportion3":
                resolutionInputs.forEach((item, index) => {
                    const size = sizeData["16:9"][index].size; 
                    item.innerHTML = `${size[0]}x${size[1]}`; 
                    item.dataset.width = size[0];
                    item.dataset.height = size[1];
                });
                break;
            default:
                resolutionInputs.forEach((item, index) => {
                    const size = sizeData["2:3"][index].size; 
                    item.innerHTML = `${size[0]}x${size[1]}`; 
                    item.dataset.width = size[0];
                    item.dataset.height = size[1];
                });
        }

    })
})


