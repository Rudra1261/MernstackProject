import express from "express";
import { check, validationResult } from "express-validator";
const router = express.Router();
import User from "../../Models/User.js";
import gravatar from "gravatar";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
// @route GET api/users
// @desc Test route
// @access public

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Enter valid email").isEmail(),
    check("password", "Password should be of minimum length 6").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    let { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email }); //find if user already exists
      if (user){ //user exists == yes then send error
        return res
          .status(400)
          .json({ errors: [{ msg: "Email has already been taken" }] });}
      const avatar = gravatar.url(email, {
        s: "200",
        d: "mm",
        r: "pg",
      });
      //instantiates a new data field
      let salt = await bcrypt.genSalt(10)
      password = await bcrypt.hash(password,salt)
      const userRegister = new User({ 
          name,
          email,
          password,
          avatar
      })

      
      await userRegister.save()

     const payload = {
         userRegister : {
             id : userRegister.id
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
