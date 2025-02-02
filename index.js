const express = require("express");
const app=express()

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors=require("cors")
app.use(cors())

const db = require("./db_connection");

app.use(express.static(`${__dirname}/upload`))

const routes = require("./routes");
app.use("/", routes);

app.listen(3005,'0.0.0.0',() => {
  console.log("server is running successfull");
  console.log(`Server running at http://0.0.0.0:${3005}`);

});
