exports.generateImage = async (req, res) => {
    try {
        const data = req.body; // 从请求中获取数据

        // 使用 Axios 发送 POST 请求到你的图像生成 API
        const response = "data";

        // 返回生成的图像数据
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '图像生成失败' });
    }
};