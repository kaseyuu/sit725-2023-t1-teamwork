let client = require("../dbConnection");
let collection = client.db("test").collection("items");

const getAllClothes = async () => {
    const items = await collection.find().toArray();
    return items;
};

const searchClothes = async (searchQuery) => {
    const items = await collection.find(searchQuery).toArray();
    return items;
};

module.exports = { getAllClothes, searchClothes };