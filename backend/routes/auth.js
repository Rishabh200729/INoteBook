const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

// create a user using POST "/api/auth/create-user". No Login required
router.post(
  "/create-user",
  [
    body("email","Enter a valid email").isEmail(),
    body("password","password should be at least 6 chars long ").isLength({ min: 6 }),
    body("name","name should be at least 3 chars long").isLength({ min: 4 }),
  ],
  async(req, res) => {
    // if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check whether the email exists al ready else create new user
    try{
      let user = await User.findOne( { email : req.body.email });
      if(user){
        return res.status(400).send("sorry user with this email all ready exists.")
      }
      const salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email:req.body.email
      });
      res.status(201).send("User created.")
    }catch(e){
      console.error(e.message);
      res.status(500).send("some error occurred.");
    }
  }
);
module.exports = router;
