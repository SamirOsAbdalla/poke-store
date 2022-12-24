
import asyncHandler from "express-async-handler"

import jwt, { JwtPayload } from "jsonwebtoken"
import User from "../models/userModels.js"
import { Request, Response, NextFunction } from "express"


const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1]

            const decoded: JwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload

            req.user = await User.findById(decoded.id).select("-password") as any

            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized, token failed")
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, token failed")
    }
})

export default protect