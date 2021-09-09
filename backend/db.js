const mongoose = require("mongoose");
const mongoUri = "mongodb://localhost:27017/iNotebook";

const connectToMongo = () =>{
	mongoose.connect(mongoUri,()=>{
		console.log("connected to db.")
	});
}
module.exports  = connectToMongo
// hindiaroraritu@gmail.com
