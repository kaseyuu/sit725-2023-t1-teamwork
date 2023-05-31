let client = require("../dbConnection");
let collection = client.db("test").collection("items");
let photoWallCollection = client.db("test").collection("photo_wall");
const getAllClothes = async () => {
    const items = await collection.find().toArray();
    return items;
};

const searchClothes = async (searchQuery) => {
    const items = await collection.find(searchQuery).toArray();
    return items;
};


const getAllPhotoWallImages = async () => {
    const items = await photoWallCollection.find().toArray();
    return items;
};


module.exports = { getAllClothes, searchClothes, getAllPhotoWallImages};