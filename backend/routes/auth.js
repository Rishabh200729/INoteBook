const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "this is my secret";

// ROUTE 1 : create a user using POST "/api/auth/create-user". No Login required
router.post(
  "/create-user",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password should be at least 6 chars long ").isLength({
      min: 6,
    }),
    body("name", "name should be at least 3 chars long").isLength({ min: 4 }),
  ],
  async (req, res) => {
    // if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check whether the email exists al ready else create new user
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .send("sorry user with this email all ready exists.");
      }
      const salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SECRET);
      console.log(token);
      res.status(201).send("User created.");
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Internal server error.");
    }
  }
);

//ROUTE 2 : login a user using POST "/api/auth/login-user". No Login required
router.post(
  "/login-user",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SECRET);
      res.json({ token });
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Internal server error.");
    }
  }
);

//ROUTE 2 : get the logged in user details using POST "/api/auth/login-user". Login required
router.post("/get-user", fetchUser ,async (req, res) => {
    try {
      const userID = req.user.id;
      const user = await User.findById(userID).select("-password");
      res.send(user)
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Internal server error.");
    }
  }
);
module.exports = router;
