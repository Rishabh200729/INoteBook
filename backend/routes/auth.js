const express = require("express");
const router  = express.Router();
const User = require("../models/User");

// create a user using POST "/api/auth". Doesn't require auth.
router.post("/",(req,res)=>{
  const user = User(req.body);
  user.save(()=>{
    console.log("saved");
  });
  res.send("create a new user");
});

module.exports = router
