// Routes are the files that are responsible to serve the endpoints of our application to the user.
var express = require("express");
let router = express.Router();
let controller = require("../controller/controller");

// Enabling mangodb to do case-insensitive and wholeword search
const caseInsensitiveSearch = (str) => { return new RegExp((str && `^${str}$`), "i") }
// Enabling blur search
const blurSearch = (str) => { return new RegExp(str, "i") }

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

    const priceFilter = {
        $gte: minPrice ? parseInt(minPrice) : 0,
        $lte: maxPrice ? parseInt(maxPrice) : 100000000,
    };

    // Get items from DB dynamically and apply case insensitive search to replace undefined filters with empty strings
    const query = {
        // Exact Search with filters
        category: caseInsensitiveSearch(category),
        subcategory: caseInsensitiveSearch(subcategory),
        condition: caseInsensitiveSearch(condition),
        size: caseInsensitiveSearch(size),
        location: caseInsensitiveSearch(location),

        // TODO: Range search with price range
        price: priceFilter,

        // Blur Search with the top search box.
        name: blurSearch(searchText),
    }

    const allClothes = await controller.searchClothes(query);

    // Render to clothes.handlebar
    res.render("clothes", { items: allClothes });
});

// Define the endpoint search-prompts so it can query the database
router.get("/search-prompts", async (req, res) => {
    const { query } = req.query;

    //Get results from DB dynamically
    const searchPrompts = await controller.searchSearchPrompts(query);
    const normalisedPrompts = searchPrompts.map((s, i) => {
        return {
            title: s.value,
            id: i,
            data: s,
        };
    });
    res.send(normalisedPrompts);
});

router.post("/search-prompts/add", async (req, res) => {
    const { searchPrompts } = req.body;
    console.log(req.body)
    const count = await controller.addSearchPrompts(searchPrompts);
    res.send(count.toString());
});

router.post("/search-prompts/delete", async (req, res) => {
    const { searchPrompts } = req.body;
    const count = await controller.deleteSearchPrompts(searchPrompts);
    res.send(count.toString());
});

// End point to get photo wall pages
router.get("/api/photo-wall", async (req, res) => {
    const allPhotos = await controller.getAllPhotoWallImages();
    res.json(allPhotos.map((item) => item.image));
});

//create a new user to DB
router.post("/api/register", async (req, res) => {
    const response = await controller.createUser(req, res);
    if (response.error) {
        res.status(400).json(response); // Return a 400 status code with the error message
    }else {
        res.json(response)
    }
})

// Login endpoint
router.post("/api/login", async (req, res) => {
    const response = await controller.loginUser(req, res);
    if (response.error) {
        res.status(400).json(response); // Return a 400 status code with the error message
    }else {
        res.json(response)
    }
})

module.exports = router;
