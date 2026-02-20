

import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorzed " });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        if (!Types.ObjectId.isValid(decode.id)) {
            return res.status(401).json({ message: "Unauthoirized" })
        }

        req.user = { id: decode.id }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }

}

export default authMiddleware

