const express = require("express");
const app=express()

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors=require("cors")
app.use(cors())
<<<<<<< HEAD
=======

>>>>>>> 9bba033bbe5e0736e0d741994d5a8cd4f29a92d9
const db = require("./db_connection");

app.use(express.static(`${__dirname}/upload`))

const routes = require("./routes");
app.use("/", routes);

app.listen(3005, () => {
  console.log("server is running successfull");
});
