import express from 'express'
import User from '../models/User.js';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import middleware from '../middleware/middle.js';

const router  = express.Router() ; 
router.post('/login', async(req,res)=>{
    try {
        const {email , password} = req.body ; 
        const user = await User.findOne({email}) ; 
        if(!user){
            return res.status(401).json({success : false , msg :"User not exist "})
        }
       const checkPassword = await bcrypt.compare(password , user.password)
       if(!checkPassword){
        return res.status(401).json({success:false , message:"Wrong password "})
       }
       const token = jwt.sign({id:user._id} , "secretkey123456" , {expiresIn :"5h"})
      
       
      
        return res.status(200).json({success:true ,token , user:{name : user.name}, msg: "user log in  succesfully "})
    } catch (error) {
        console.log(error);
        
        res.status(401).json({success :false , msg:"error in login  process-bd"})
    }
})
router.post('/signup', async(req,res)=>{
    try {
        const {name , email , password} = req.body ; 
        const user = await User.findOne({email}) ; 
        if(user){
            return res.status(401).json({success : false , msg :"User already exist "})
        }
        const HashedPassword = await bcrypt.hash(password,10)
        const NewUser = new User({
            name , email , password:HashedPassword
        })
       await NewUser.save() 
        return res.status(200).json({success:true , msg: "user Sign up succesfully "})
    } catch (error) {
        console.log(error);
        
        res.status(401).json({success :false , msg:"error in sign up process-bd"})
    }
})

router.get('/verify' , middleware, async(req,res)=>{
    return res.status(200).json({success:true , user:req.user})
})
export default router