import React from 'react'
import "./UserForm.css"
import { AiOutlineMail, AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { BiLockAlt } from "react-icons/bi"
import { NavLink } from 'react-router-dom'
import { BsPerson } from 'react-icons/bs'
import { useState, useEffect } from 'react'
import userService from "../../services/users"
import axios from 'axios'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { setLoginStatusTrue } from '../../slices/loginStatus/loginStatusSlice'
import { useNavigate } from 'react-router-dom'
import { setCurrentUser } from '../../slices/userInfo/userInfoSlice'
import { setLoginStatusFalse } from '../../slices/loginStatus/loginStatusSlice'
import { setNumberOfPokemon } from '../../slices/numInCart/numInCartSlice'
import { removeAllPokemon } from '../../slices/storedCartPokemon/storedCartPokemon'
interface PropType {
    formType: string
}
export const UserForm = (props: PropType) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const toggleHiddenEye = () => {

        const allEyes = Array.from(document.querySelectorAll('.login__eye'))
        allEyes.forEach(eye => eye.classList.toggle("inactive__eye"))
        const inputPassword = document.querySelector(".input__field__password") as HTMLInputElement
        inputPassword.type = inputPassword.type === "text" ? "password" : "text"
    }

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {

        const user = window.localStorage.getItem("USER_INFO")

        setPassword("")
        if (user) {

            if (props.formType === "Login") {
                const parsedUser = JSON.parse(user)
                setEmail(parsedUser.email);
            }
        }

    }, [])
    const submitHandler = async (e: React.SyntheticEvent) => {

        e.preventDefault()

        setLoading(true)


        if (props.formType === "Login") {
            const responseData = await userService.loginUser(email, password);
            if (responseData.message) {
                setError(responseData.message)
            } else {
                setError("")
                dispatch(setLoginStatusTrue())
                window.localStorage.setItem("STORED_CART_POKEMON", JSON.stringify([]))
                window.localStorage.setItem("NUMBER_POKEMON_IN_CART", JSON.stringify(0))
                dispatch(setNumberOfPokemon(0))
                dispatch(removeAllPokemon())
                dispatch(setCurrentUser({
                    name: responseData.name,
                    email: responseData.email,
                    pic: responseData.pic,
                    favorites: responseData.favorites,
                    id: responseData._id,
                    token: responseData.token
                }))
                navigate("/profile")
            }
            setLoading(false)
        } else {
            const responseData = await userService.signupUser(name, email, password);
            if (responseData.message) {
                setError(responseData.message)
            } else {
                setError("")
                dispatch(setLoginStatusTrue())
                window.localStorage.setItem("STORED_CART_POKEMON", JSON.stringify([]))
                window.localStorage.setItem("NUMBER_POKEMON_IN_CART", JSON.stringify(0))
                dispatch(setNumberOfPokemon(0))
                dispatch(removeAllPokemon())
                dispatch(setCurrentUser({
                    name: responseData.name,
                    email: responseData.email,
                    pic: responseData.pic,
                    favorites: responseData.favorites,
                    id: responseData._id,
                    token: responseData.token
                }))
                navigate("/profile")
            }
            setLoading(false)
        }
    }

    return (
        <div className="login__container">
            <div className="login__error__container">
                {error && <ErrorMessage message={error} />}
            </div>
            <div className="login__heading__container">
                <span className='login__heading'>{props.formType}</span>
            </div>
            {loading && <LoadingSpinner />}
            <form onSubmit={submitHandler} className="login__form">
                {props.formType === "Login" ?
                    <></> :
                    <div className="input__container">
                        <input className="input__field"
                            type="text"
                            placeholder='Enter your username'
                            value={name}
                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                setName(e.currentTarget.value)}
                            required
                        />
                        <BsPerson className="login__icon mail login__icon__left" />
                    </div>}
                <div className="input__container">
                    <input
                        className="input__field"
                        type="email"
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            setEmail(e.currentTarget.value)}
                        required
                    />
                    <AiOutlineMail className="login__icon mail login__icon__left" />
                </div>
                <div className="input__container">
                    <input
                        className="input__field input__field__password"
                        type="password"
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            setPassword(e.currentTarget.value)}
                        required
                    />
                    <BiLockAlt className="login__icon mail login__icon__left" />
                    <AiOutlineEyeInvisible onClick={toggleHiddenEye} className='login__eye login__icon' />
                    <AiOutlineEye onClick={toggleHiddenEye} className='login__icon login__eye inactive__eye' />
                </div>
                <div className="input__container">
                    <button type="submit" className='login__button'>{props.formType}</button>
                </div>
            </form>
            <div className="login__signup">
                <div className="login__signup__text">
                    {props.formType === "Login" ? "Don't have an account?" : "Already have an account?"}
                    {props.formType === "Login" ?
                        <NavLink to="/signup" className="login__signup__text login__signup__link">
                            Signup now
                        </NavLink> :
                        <NavLink to="/login" className="login__signup__text login__signup__link">
                            Login now
                        </NavLink>}
                </div>
            </div>
        </div>
    )
}
