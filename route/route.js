// Routes are the files that are responsible to serve the endpoints of our application to the user. 
var express = require("express");
let router = express.Router();
let controller = require("../controller/controller");

// Enabling mangodb to do case-insensitive search
const caseInsensitiveSearch = (str) => { return new RegExp(str, "i") }

router.get("/clothes", async (req, res) => {
    // get query parameters from URL
    const category = req.query.category;
    const subcategory = req.query.subcategory;
    const condition = req.query.condition;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const size = req.query.size;
    const location = req.query.location;
    const searchText = req.query.searchText;

    const items = [
        {
            imageUrl: "./images/dress1.png",
            name: "mini dress in monochrome print",
            price: 1111111111110,
        },
        {
            imageUrl: "./images/dress2.png",
            name: "mini dress in monochrome print",
            price: 2222222220,
        },
        {
            imageUrl: "./images/dress1.png",
            name: "mini dress in monochrome print",
            price: 3333333330,
        },
        {
            imageUrl: "./images/dress1.png",
            name: "mini dress in monochrome print",
            price: 444444440,
        },
    ];
    // Get items from DB dynamically
    const query = {
        // Exact Search with filters
        category: caseInsensitiveSearch(category),
        subcategory: caseInsensitiveSearch(subcategory),
        condition: caseInsensitiveSearch(condition),
        size: caseInsensitiveSearch(size),
        location: caseInsensitiveSearch(location),
        // TODO: Range search with price range

        // Blur Search with the top search box.
        name: caseInsensitiveSearch(searchText)
    }

    //  Remove undefined filters from query.
    const filteredQuery = Object.fromEntries(
        Object.entries(query).filter(([_, value]) => value !== undefined)
    );

    const allClothes = await controller.searchClothes(query);
    res.render("clothes", { items: allClothes });
});

// Define the endpoint search-prompts so it can query the database
router.get("/search-prompts", async (req, res) => {
    const { query } = req.query;
    console.log("🚀 ~ file: route.js:54 ~ router.get ~ query:", query);
    // TODO: Get results from DB dynamically
    var src = [];
    for (let i = 0; i < 50; i++) {
        src.push({ title: "Option " + i, id: "opt" + i, data: { key: i } });
    }
    res.send(src);
});

module.exports = router;
