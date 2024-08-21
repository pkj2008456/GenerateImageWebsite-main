// controllers/pageController.js
exports.renderMainPage = (req, res) => {
    res.render('MainPage');
};

exports.renderLibrary = (req, res) => {
    res.render('Library');
};

exports.renderImageGen = (req, res) => {
    res.render('ImageGen');
};

exports.renderProfile = (req, res) => {
    res.render('Profile');
};

exports.renderSetting = (req, res) => {
    res.render('Setting');
};

exports.renderUpgradePlan = (req, res) => {
    res.render('UpgradePlan');
};
