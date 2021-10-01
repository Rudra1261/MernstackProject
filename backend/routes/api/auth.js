import express from "express";
import auth from "../../middleware/auth.js";
import User from "../../Models/User.js";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = express.Router();
import config from 'config'

// @route GET api/auth
// @desc Test route
// @access public

router.get("/", auth, async (request, response) => {
    console.log(request);
  const user = await User.findById(request.user.id)
  .select("-password")
  .select("-_id");
  try {
    
    response.json(user);
  } catch (error) {
    console.error(error.message);
    response.status(401).json({ msg: "Error" });
  }
});

router.post(
    "/",
    [
      
      check("email", "Enter valid email").isEmail(),
      check("password", "Password shouldn't be empty").exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      let {  email, password } = req.body;
      try {
        let user = await User.findOne({ email }); 
        if (!user){ 
          return res
            .status(401)
            .json({ errors: [{ msg: "INVALID CREDENTIALS" }] });}
        
        const isPassword = await bcrypt.compare(password,user.password)
        if (!isPassword) {return res
            .status(401)
            .json({ errors: [{ msg: "INVALID CREDENTIALS" }] });}
  
        
  
       const payload = {
           userRegister : {
               id : user.id
           }
           
       }
       jwt.sign(payload, config.get("jsecretkey"), {expiresIn:360000},
       (err,token)=> {
           if (err) throw err
           res.json({token})
       })
      } catch (error) {
        console.error(error.message);
        return res.status(500).json("Server error");
      }
    }
  );

export default router;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NWY1ZGZjNjk4MzY0NTc0ODg0YjBmIn0sImlhdCI6MTYzMzA5MzQ4NCwiZXhwIjoxNjMzNDUzNDg0fQ.sgXv3zqVpHyxpKMR3mt4zTSrtU00MiCnTcU44RScJRQ
// UG1801@GMAIL.COM