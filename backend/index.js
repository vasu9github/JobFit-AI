import express from "express"
import dotenv from "dotenv";
import connectDB from './config/db.js'

connectDB()
dotenv.config()
const app = express();
const PORT= process.env.PORT 
app.get('/' , (req , res) => {
    res.send(`Hello from server`)
})

app.listen(PORT, () => console.log(`Server is live at port: ${PORT}`))