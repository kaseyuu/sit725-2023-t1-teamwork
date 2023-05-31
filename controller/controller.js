let model = require("../model/model");

const getAllClothes = async (req, res) => {
    const allClothes = await model.getAllClothes();
    return allClothes;
};

const searchClothes = async (searchQuery) => {
    const allClothes = await model.searchClothes(searchQuery);
    return allClothes;
};

const getAllPhotoWallImages = async (req, res) => {
    const allImages = await model.getAllPhotoWallImages();
    return allImages;
};

module.exports = { getAllClothes, searchClothes, getAllPhotoWallImages};