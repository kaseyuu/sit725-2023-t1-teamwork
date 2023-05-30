var express = require("express");
var { engine } = require("express-handlebars");

var app = express();
let router = require("./route/route");

let http = require('http').createServer(app);
let io = require('socket.io')(http);

var port = process.env.port || 3000;

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use("/", router);
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
