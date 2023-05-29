var express = require("express");
var { engine } = require("express-handlebars");
var app = express();

let http = require('http').createServer(app);
let io = require('socket.io')(http);

var port = process.env.port || 3000;

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

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
