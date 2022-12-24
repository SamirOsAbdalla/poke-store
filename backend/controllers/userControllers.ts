import { Request, Response } from "express"
import User from "../models/userModels.js"
import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"


export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email })

    if (userExists) {

        res.status(400)
        throw new Error("User already exists")
    } else {
        const user = await User.create({
            name,
            email,
            password
        })

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                favorites: user.favorites,
                pic: user.pic,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(400)
            throw new Error("Error Occurred")
        }
    }

})

export const authUser = asyncHandler(async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const user = await User.findOne({
        email
    })

    if (user && (await user.matchPassword(password))) {

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            favorites: user.favorites,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Invalid email or password")
    }
})

export const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {

    const user = await User.findById(req.user?._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.pic = req.body.pic || user.pic

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            email: updatedUser.email,
            name: updatedUser.name,
            pic: updatedUser.pic,
            favorites: updatedUser.favorites,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

export const updateUserFavorites = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.user?._id);

    if (user) {

        if (req.body) {
            user.favorites.push(req.body)
            const updatedUser = await user.save()

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                pic: updatedUser.pic,
                favorites: updatedUser.favorites,
                token: generateToken(updatedUser._id)
            })
        }
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

export const removeUserFavorites = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.user?._id);

    if (user) {

        if (req.body) {

            user.favorites = user.favorites.filter((favorite: any) => {
                return favorite.name.toLowerCase() !== req.body.name.toLowerCase()
            })
            const updatedUser = await user.save()

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                pic: updatedUser.pic,
                favorites: updatedUser.favorites,
                token: generateToken(updatedUser._id)
            })
        }
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})
