var express = require("express");
var { engine } = require("express-handlebars");
var app = express();


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rewaeritofficial:rewaeritofficial@cluster0.m2py8nc.mongodb.net/?retryWrites=true&w=majority";



let http = require('http').createServer(app);
let io = require('socket.io')(http);

var port = process.env.port || 3000;

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

app.get('/api/photo-wall', async (req, res) => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const collection = client.db('rewearit').collection('photo_wall');
        const photos = await collection.find({}).toArray();
        res.json(photos.map(item => item.image));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        client.close();
    }
});

app.get("/clothes", (req, res) => {
    const {
        category,
        subCategory,
        condition,
        minPrice,
        maxPrice,
        size,
        location,
    } = req.query;

    // TODO: Get items from DB dynamitaclly
    const items = [
        {
            imageUrl: "./images/dress1.png",
            name: "mini dress in monochrome print",
            price: 60,
        },
        {
            imageUrl: "./images/dress2.png",
            name: "Beautiful Zara Girl white dress size 9 / 10",
            price: 15,
        },
        {
            imageUrl: "./images/dress3.png",
            name: "Black mini dress with floral design",
            price: 30,
        },
        {
            imageUrl: "./images/shoe1.png",
            name: "Nearly New Wayne Cooper High Heels",
            price: 29,
        },
    ];
    res.render("clothes", { items });
});

http.listen(port, () => {
    console.log("App listening to: " + port);
});

console.log("Hello World");

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    // use setTimeOut to make the banner visible after 10 seconds waiting time
    setTimeout(() => {
        socket.emit('showBanner', true);
    }, 10000);

});
