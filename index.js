var express = require("express");
var { engine } = require("express-handlebars");

var app = express();
let router = require("./route/route");

let http = require("http").createServer(app);
let io = require("socket.io")(http);

var port = process.env.port || 3000;

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json());

app.use("/", router);
http.listen(port, () => {
  console.log("App listening to: " + port);
});


io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // use setTimeOut to make the banner visible after 10 seconds waiting time
  setTimeout(() => {
    socket.emit("showBanner", true);
  }, 10000);
});


//
require("./dbConnection");
const path = require("path");
const Register = require("./model/register")
app.use(express.urlencoded({ extended: false }));

const static_path = path.join(__dirname +"/public")

app.get("/", (req, res) => {
  res.render("login")
});

app.get("/register", (req, res) => {
  res.render("register")
})

app.get("/login", (req, res) => {
  res.render("index");
})

//create a new user to DB
app.post("/register",async (req, res) => {
  try {
      const Password = req.body.Password;
      const confPassword = req.body.confPassword;

      if (Password === confPassword) {
          
          const newUser = new Register({
              email: req.body.email,
              fullName: req.body.fullName,
              Username: req.body.Username,
              Password: Password,
              confPassword: confPassword
          })

          const registered = await newUser.save();
          res.status(200).sendFile(__dirname + "/public/login.html");
      
      } else {
          res.send("Password are not matching")
      }

  } catch (error) {
      res.status(400).send(error);
  }
})

//login check
app.post("/login", async (req, res) => {
  try {

      const Username = req.body.Username;
      const Password = req.body.Password;

      const username = await Register.findOne({ Username: Username });
      
      if (username.Password === Password) {
          res.status(200).sendFile(__dirname + "/public/index.html");
      } else {
          res.send("Username or Password is incorrect");
      }
      
  } catch (error) {
      res.status(400).send(error);
  }
})
