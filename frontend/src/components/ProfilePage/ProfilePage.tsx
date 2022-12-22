import React from 'react'
import { LogoutButton } from '../LogoutButton/LogoutButton'
import "./ProfilePage.css"
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setCurrentUser } from '../../slices/userInfo/userInfoSlice'
import userServices from "../../services/users"
type FavoriteType = {
    name: String,
    price: String,
    sprite: String
}

export const ProfilePage = () => {

    const dispatch = useAppDispatch()
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [profilePicture, setProfilePicture] = useState<string>("")
    const [favorites, setFavorites] = useState<FavoriteType[]>([])
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [token, setToken] = useState<string>("")
    const postDetails = (pics: any) => {

        const data = new FormData()
        data.append("file", pics)
        data.append("upload_preset", "pokemonStore")
        data.append("cloud_name", "ddafyi9lt")
        fetch("https://api.cloudinary.com/v1_1/ddafyi9lt/image/upload", {
            method: "post",
            body: data,
        }).then((res) => res.json()).then((data) => {
            setProfilePicture(data.url?.toString())
        }).catch((err) => {
            console.log(err)
        })
    }


    //add error message, success message, and loading animation
    const handleProfileSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        setLoading(true)
        const data = await userServices.updateUser(name, email, password, profilePicture, token)
        if (data.message) {
            setError(data.message)
        } else {
            setError("")
            //update stored user in reducer
            dispatch(setCurrentUser(data))
        }
        setLoading(false)
    }

    useEffect(() => {

        const userInfo = window.localStorage.getItem("USER_INFO")

        if (userInfo) {
            let storedUserInfo = JSON.parse(userInfo)
            setName(storedUserInfo.name)
            setEmail(storedUserInfo.email)
            setProfilePicture(storedUserInfo.pic)
            setFavorites(storedUserInfo.favorites)
            setToken(storedUserInfo.token)
        }
    }, [])

    return (
        <div className="profile__wrapper">
            <div className="profile__container">
                <div className="profile__top">
                    <div className="profile__picture__container">
                        <img className="profile__picture" src={profilePicture} />
                        <span className="profile__name">{name}</span>
                    </div>
                    <div className="update__information__container">
                        <div className="profile__information__container">
                            <form onSubmit={handleProfileSubmit} id="user__form" className="profile__form">
                                <div className="profile__form__changes">
                                    <div className="profile__information__header">Account Settings</div>
                                    <div className="profile__input__container">
                                        <label className='profile__label'>Name</label>
                                        <input
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setName(e.currentTarget.value)}
                                            value={name}
                                            className='profile__input'
                                            required
                                        >
                                        </input>
                                    </div>
                                    <div className="profile__input__container">
                                        <label className='profile__label'>Email</label>
                                        <input
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setEmail(e.currentTarget.value)}
                                            value={email}
                                            className='profile__input'
                                            type="email"
                                            required
                                        >
                                        </input>
                                    </div>
                                    <div className="profile__input__container">
                                        <label className='profile__label'>Password</label>
                                        <input
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setPassword(e.currentTarget.value)}
                                            className='profile__input'
                                            type="password"
                                            required
                                        >
                                        </input>
                                    </div>
                                    <div className="choose__picture">
                                        <input
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                if (e.target.files) {
                                                    postDetails(e.target.files[0])
                                                }
                                            }}
                                            id="file"
                                            type="file" className="profile__picture__input" accept=".png, .jpg, .jpeg">
                                        </input>
                                        <label htmlFor="file" className='profile__picture__label'>Choose Picture</label>
                                    </div>
                                </div>
                                <div className="profile__buttons">
                                    <button type="submit" className="update__button">
                                        Update profile
                                    </button>
                                    <LogoutButton />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
