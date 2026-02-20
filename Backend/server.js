import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoDB.js'
import userRouter from './routes/userRouter.js'


const app = express()

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

connectDB()

app.use('/api/user', userRouter)

// bas check karnay kay liye use kar rahe hai
// aur ye get request hai jo website may gaye tho aatha hai
// app.get('/', (req, res) => {
//     res.send("Hello from server");
// })

// Ye server connect karnay kay liye .env port may
app.listen(PORT, () => {
    console.log((`Server Connected to port: ${PORT}`));
})

app.get("/"), (req, res) => {
    res.send("Backend is running properlly")
}


// aws password
// DwE3OL2yQkxZNA2F

