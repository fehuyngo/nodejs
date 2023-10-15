require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const connection = require("./config/database");
const app = express();
const port = process.env.PORT || 8888;

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

configViewEngine(app);

app.use("/", webRoutes);

// connection.query("SELECT * FROM Users u", function (err, results, fields) {
//   console.log(">>> results", results);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
