import express from 'express'
const app = express() ; 
import cors from "cors"
import noteRouter from './routes/note.js'
import authRouter from './routes/auth.js'; // Correct way

import dbConnect from './db/db.js';
app.use(express.json()) 
app.use(cors({
    origin:"https://e-note-k.netlify.app",
    credentials:true
}))
app.use('/api/auth' ,authRouter)
app.use('/api/note' ,noteRouter)

app.listen(5000,()=>{
    dbConnect();
    console.log("server running  ");
})