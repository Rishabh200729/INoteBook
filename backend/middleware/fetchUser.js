const express = require("express");
const jwt = require("jsonwebtoken");

const fetchUser = (req,res, next)=>{
    // get the user from the token and add it the request object
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({error : "Please authenticate using a valid token"});
    }
    try {
        const data = jwt.verify(token, "this is my secret");
        req.user = data.user;
        next();
    }catch(e){
        res.status(401).send({error : "Please authenticate using a valid token"});
    }
}

module.exports = fetchUser;