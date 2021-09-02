const express = require("express");
const mongoose = require("mongoose");
const connectToMongo = require("./db");
// connnect to mongo 
connectToMongo();
const app = express();

app.get("/",(req,res)=>{
	res.send("This is a get request!! made by Rishabh")
});

app.listen(5000,(req,res)=>{
	console.log("listening on port 5000");
})
