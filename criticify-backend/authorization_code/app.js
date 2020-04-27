require("dotenv").config();
var express = require("express"); // Express web server framework
var cors = require("cors");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");

var bodyParser = require("body-parser");
const loginRoutes = require("./routes/login.ts");
const callbackRoutes = require("./routes/callback.ts");
const refreshRoute = require("./routes/refresh.ts");
const apiRoutes = require("./routes/api.ts");

var MONGO_URL = process.env.MONGODB_CONNECTION_STRING;
console.log(MONGO_URL);

var app = express();

mongoose.connect(
  "mongodb+srv://testAdmin:tempTestPassword@criticify-vfqzl.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
var db = mongoose.connection;
db.once("open", () => console.log("connected to mongoDB"));

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json());

app.use("/login", loginRoutes);

app.use("/callback", callbackRoutes);

app.use("/refresh_token", refreshRoute);

app.use("/api", apiRoutes);

console.log("Listening on 8888");
app.listen(8888);
