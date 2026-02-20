import userModel from "../models/userModal.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(401).json({ success: false, message: "All fields required" })
        }

        // if user is alreday registger for website then this will run
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(401).json({ success: false, message: "User alreday exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // now password is bcrypt and now we are saving in DB
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        await newUser.save()

        // now we use token for the user 

        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie(token, {
            httpOnly: false,
            secure: false,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        const userResponse = {
            id: newUser._id,
            username: newUser.name,
            email: newUser.email
        }

        res.status(200).json({ success: true, message: "User Registered", user: userResponse, token: token })



    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error." })

    }
}

const login = async (req, res) => {
    try {

        const { email, password } = req.body

        // if no email or no password just how status(401)
        if (!email || !password) {
            return res.status(401).json({ success: false, message: "All fields required" })
        }

        // check whether user present or not
        const user = await userModel.findOne({ email })

        // check if email is not found or wrong to login the website
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" })
        }

        // if user enterd the correct passwoerd and email so this will print
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid Credintials" });
        }

        // creating the token if all are correct
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.cookie(token, {
            httpOnly: false,
            secure: false,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        const userResponse = {
            id: user._id,
            username: user.name,
            email: user.email
        }

        res.status(200).json({ success: true, message: "Login Successful", user: userResponse, token: token })







    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error." })

    }
}

export { register, login }


