var express = require("express")
var app = express()
var port = process.env.port || 3000;

app.use(express.static(__dirname + '/public'))

app.listen(port, () => {
    console.log("App listening to: " + port);
});

console.log("Hello World")