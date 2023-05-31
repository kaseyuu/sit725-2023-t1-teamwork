let client = require("../dbConnection");
let collection = client.db("test").collection("items");
let searchPromptsCollection = client.db("test").collection("searchPrompts");

const getAllClothes = async () => {
    const items = await collection.find().toArray();
    return items;
};

const searchClothes = async (searchQuery) => {
    const items = await collection.find(searchQuery).toArray();
    return items;
};

const addSearchPrompts = async (searchPrompts) => {
    try {
        const bulkOps = searchPrompts.map((searchPrompt) => ({
            updateOne: {
                filter: { value: searchPrompt },
                update: { $setOnInsert: { value: searchPrompt } },
                upsert: true,
            },
        }));

        const result = await searchPromptsCollection.bulkWrite(bulkOps);
        console.log(`${result.upsertedCount} strings inserted.`);
        return result.upsertedCount;
    } catch (error) {
        console.log("Error inserting strings:", error);
    }
};

const deleteSearchPrompts = async (searchPrompts) => {
    console.log(
        "🚀 ~ file: model.js:33 ~ deleteSearchPrompts ~ searchPrompts:",
        searchPrompts
    );
    try {
        const result = await searchPromptsCollection.deleteMany({
            value: { $in: searchPrompts },
        });
        console.log(`${result.deletedCount} strings deleted.`);
        return result.deletedCount;
    } catch (error) {
        console.log("Error deleting strings:", error);
    }
};

const searchSearchPrompts = async (searchString) => {
    try {
        const regex = new RegExp(searchString, "i");
        const query = { value: regex };
        const result = await searchPromptsCollection.find(query).toArray();
        return result;
    } catch (error) {
        console.log("Error searching strings:", error);
    }
};

module.exports = {
    getAllClothes,
    searchClothes,
    addSearchPrompts,
    deleteSearchPrompts,
    searchSearchPrompts,
};