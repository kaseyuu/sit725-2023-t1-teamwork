require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.hruudlw.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

//USER ACCOUNTS DATABASE

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:admin@userdb.a9xelkj.mongodb.net/?retryWrites=true&w=majority", {

}).then(() => {
    console.log("DB Connection Success");
}).catch((e) => {
    console.log("DB Connection Failed");
})
    
module.exports = client;

