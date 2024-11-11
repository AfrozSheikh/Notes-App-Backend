import mongoose  from "mongoose";
 const dbConnect = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://sa8329925:peY8398o9TUqwOd7@note.9sv11.mongodb.net/?retryWrites=true&w=majority&appName=Note") ; 
        console.log( "db Connected Successfully ");
        
    } catch (error) {
        console.log("error in connecting db ");
        
    }
 }
 export default dbConnect