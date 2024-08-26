const axios = require('axios');

// handle txt to iamge  
exports.generateImage = async (req, res) => {
    try {
        const data = req.body; // Get data from request 
        console.log("test",data)
        //send request to api server
        const response = await axios.post('http://34.90.139.98:8080/txt2img', JSON.stringify(data));
        console.log("Response from external API:", response.data);

        // Returns the generated image data
        res.json(response.data);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Image generation failed' });
    }

};