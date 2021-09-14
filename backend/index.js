const express = require("express");
const mongoose = require("mongoose");
const connectToMongo = require("./db");

// connect to mongo 
connectToMongo();
const app = express();

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(5000,(req,res)=>{
	console.log("listening on port 5000");
});
