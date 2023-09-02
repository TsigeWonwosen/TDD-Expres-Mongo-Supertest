const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./route/userRoute");
const PORT = 5000;
const app = express();
require("./db.js");

app.use(express.json());
app.use(bodyParser.json());
app.use("/", userRoute);

app.listen(PORT, () => {
  console.log(`Server listen at Port ${PORT}.`);
});

module.exports = app;
