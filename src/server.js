const express = require("express");
const cookieParser = require('cookie-parser');
const path = require("path");
const bodyParser = require("body-parser");
const cors = require('cors');
const userRoute = require("./route/userRoute");
const employeeRoute = require("./route/employeeRoute");
const errorHandler = require("./middleware/errorHandler");
const { logger } = require("./middleware/logEvents");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;
require("./db.js");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

// For Form
app.use(express.urlencoded({ extended: false }));

// Fre static file
app.use(express.static(path.join(__dirname, "/public")));

app.use(logger);

app.use("/", userRoute);
app.use('/employees', employeeRoute)

app.get("/*", (req, res) => {
  res.status(404).json({ message: "File not found. [404]" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listen at Port ${PORT}.`);
});

module.exports = app;
