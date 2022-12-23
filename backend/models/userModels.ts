const mongoose = require("mongoose")
import { Schema, Model, model, Document } from "mongoose"
const bcrypt = require("bcryptjs")
import { NextFunction } from "express"
import { Mongoose } from "mongoose"
import { createHistogram } from "perf_hooks"

export interface User extends Document {
    name: string,
    email: string,
    password: string,
    pic: string,
    favorites: FavoriteType[]
}

interface UserDocument extends User, Document {
    matchPassword: (password: string) => Promise<boolean>;
}

type FavoriteType = {
    name: String,
    price: String,
    sprite: String
}

const userSchema: Schema<UserDocument> = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        pic: {
            type: String,
            required: true,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
        favorites: [
            new Schema(
                {
                    price: String,
                    name: String,
                    sprite: String
                },
                { _id: false })
        ]
    }
)

userSchema.pre<UserDocument>("save", async function (next: ((err?: Error) => void)) {

    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = model<UserDocument>("User", userSchema)
module.exports = User