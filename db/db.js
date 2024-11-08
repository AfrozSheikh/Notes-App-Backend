import mongoose  from "mongoose";
 const dbConnect = async ()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/Note") ; 
        console.log( "db Connected Successfully ");
        
    } catch (error) {
        console.log("error in connecting db ");
        
    }
 }
 export default dbConnect