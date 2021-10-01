import express from 'express'

const router = express.Router()

// @route GET api/profile
// @desc Test route
// @access public

router.get('/',(req,res)=> res.send("Profile page"))


export default router