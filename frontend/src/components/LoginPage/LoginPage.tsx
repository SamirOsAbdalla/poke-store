import React from 'react'
import "./LoginPage.css"
import { AiOutlineMail, AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { BiLockAlt } from "react-icons/bi"
import { NavLink } from 'react-router-dom'
import { UserForm } from '../UserForm/UserForm'
//navigate to different page after login successful

export const LoginPage = () => {

    return (
        <div className="login__wrapper">
            <UserForm formType='Login' />
        </div>
    )
}
