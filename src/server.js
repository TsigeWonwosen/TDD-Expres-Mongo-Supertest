const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const userRoute = require("./route/userRoute");
const app = express();

const PORT = process.env.PORT || 5000;
require("./db.js");

app.use(express.json());
app.use(bodyParser.json());

// For Form
app.use(express.urlencoded({ extended: false }));

// Fre static file
app.use(express.static(path.join(__dirname, "/public")));

app.use("/", userRoute);

app.get("/*", (req, res) => {
  res.status(404).json({ message: "File not found. [404]" });
});

app.listen(PORT, () => {
  console.log(`Server listen at Port ${PORT}.`);
});

module.exports = app;
