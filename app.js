const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const errorMiddleware = require("./middleware/error");


app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const user = require("./routes/userRoute")

app.use("/api/v1/",user)


app.use(errorMiddleware);

module.exports = app