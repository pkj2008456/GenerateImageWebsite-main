const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

// Ensure that the directory exists
const ensureDirectoryExists = async (filePath) => {
    const dir = path.dirname(filePath);
    try {
        await fs.mkdir(dir, { recursive: true });
    } catch (error) {
        console.error(`Failed to create directory at ${dir}: ${error.message}`);
    }
};


exports.generateImage = async (req, res) => {
    try {
        const data = req.body; 
        console.log("test", data);


        const response = await axios.post('http://34.90.139.98:8080/txt2img', JSON.stringify(data));
        console.log("Response from external API:", response.data);

        const images = response.data.images;
        const userID = req.session.userId || 'public';
        console.log("User ID:", userID);

        const imagePromises = images.map(async (base64Data, index) => {

            const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
            const fileName = `${timestamp}-${index}.png`;
            const filePath = path.join(__dirname, '../public/images/gen_img', userID, fileName);


            await ensureDirectoryExists(filePath);


            try {
                await fs.writeFile(filePath, base64Data, 'base64');
                console.log(`Image saved at ${filePath}`);
            } catch (error) {
                console.error(`Failed to save image at ${filePath}: ${error.message}`);
            }
        });
        await Promise.all(imagePromises);

        res.json(response.data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Image generation failed' });
    }
};
