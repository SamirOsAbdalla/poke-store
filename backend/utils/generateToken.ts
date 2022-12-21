const jwt = require("jsonwebtoken")
import { ObjectId } from "mongoose"

const generateToken = (id: ObjectId) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

module.exports = generateToken