import React from 'react'
import { UserForm } from '../UserForm/UserForm'
import "./SignupPage.css"
export const SignupPage = () => {
    return (
        <div className="signup__wrapper">
            <UserForm formType='Signup' />
        </div>
    )
}
