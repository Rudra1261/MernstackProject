import jwt from 'jsonwebtoken'
import config from 'config'


const authorize = async (req,res,next) => {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).json({msg:"Token doesn't exist"})

    try {
        const decoded = jwt.verify(token,config.get('jsecretkey'))
        req.user = decoded.userRegister

        next();
    } catch (error) {
        return res.status(401).json({msg:"Token is invalid"})
    }
}

export default authorize


//token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyUmVnaXN0ZXIiOnsiaWQiOiI2MTU2ZjZmMGNmMDE4NTNiYWQ5MTE1MmQifSwiaWF0IjoxNjMzMDg5MjY0LCJleHAiOjE2MzM0NDkyNjR9.p_hUxqhrA6VcY1-fmD0NaDTOaorlVfNzuE--Ukd_jA4"