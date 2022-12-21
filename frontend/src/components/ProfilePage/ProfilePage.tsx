import React from 'react'
import { LogoutButton } from '../LogoutButton/LogoutButton'
import "./ProfilePage.css"

export const ProfilePage = () => {

    //get logged in status from state to display certain page
    return (
        <div className="profile__wrapper">
            <div className="profile__container">
                <LogoutButton />
            </div>
        </div>
    )
}
