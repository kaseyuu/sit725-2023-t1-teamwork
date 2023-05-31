let model = require("../model/model");

const getAllClothes = async (req, res) => {
    const allClothes = await model.getAllClothes();
    return allClothes;
};

const searchClothes = async (searchQuery) => {
    const allClothes = await model.searchClothes(searchQuery);
    return allClothes;
};

const addSearchPrompts = async (searchPrompts) => {
    return await model.addSearchPrompts(searchPrompts);
};

const deleteSearchPrompts = async (searchPrompts) => {
    return await model.deleteSearchPrompts(searchPrompts);
};

const searchSearchPrompts = async (searchString) => {
    return await model.searchSearchPrompts(searchString);
};

const getAllPhotoWallImages = async (req, res) => {
    const allImages = await model.getAllPhotoWallImages();
    return allImages;
};

module.exports = {
    getAllClothes,
    searchClothes,
    addSearchPrompts,
    deleteSearchPrompts,
    searchSearchPrompts,
    getAllPhotoWallImages,
};

module.exports = { getAllClothes, searchClothes, getAllPhotoWallImages};
