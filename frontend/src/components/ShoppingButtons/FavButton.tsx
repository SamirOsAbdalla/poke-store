import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import userServices from "../../services/users"
import { useNavigate } from 'react-router-dom'
import "./FavButton.css"
import { userInfo } from 'os'
import { setCurrentUser } from '../../slices/userInfo/userInfoSlice'


interface PropType {
    name: string,
    sprite: string,
    price: string
}

export const FavButton = (props: PropType) => {
    const [selected, setSelected] = useState<boolean>(false)
    const [currentColor, setCurrentColor] = useState<string>("#c40404")

    const loginStatus = useAppSelector(state => state.loginStatus.status)

    const currentUser = useAppSelector(state => state.userInfo.userInfo)
    const allPokemonNames = useAppSelector(state => state.allPokemonNames.allPokemonNames)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {

        const loginStatus = window.localStorage.getItem("LOGGED_IN")
        let parsedLoginStatus;
        if (loginStatus) {
            parsedLoginStatus = JSON.parse(loginStatus)
        }

        if (parsedLoginStatus) {
            if (!selected) {
                const userInfo = window.localStorage.getItem("USER_INFO")

                if (userInfo) {
                    const parsedUserInfo = JSON.parse(userInfo)

                    if (parsedUserInfo.favorites?.find((pokemon: any) => pokemon.name.toLowerCase() === props.name.toLowerCase())) {
                        setSelected(true)
                        setCurrentColor("#f98d00")
                    }
                }
            }
        }
    }, [props.name])

    const addOrRemoveToFavorites = async () => {


        //if user is not logged in then route to login page
        if (loginStatus === true) {

            if (selected === false) {
                //update information in storage
                const response = await userServices.addUserFavorites(currentUser.id, currentUser.token, {
                    name: props.name,
                    sprite: props.sprite,
                    price: props.price
                })


                setSelected(true)
                dispatch(setCurrentUser(response))

                setCurrentColor("#f98d00")
            } else {
                const response = await userServices.removeUserFavorites(currentUser.id, currentUser.token, {
                    name: props.name,
                    sprite: props.sprite,
                    price: props.price
                })


                setSelected(false)
                dispatch(setCurrentUser(response))

                setCurrentColor("#c40404")
            }
        } else {

            navigate("/login")
        }
    }


    return (
        <div>
            <button style={{ backgroundColor: `${currentColor}` }} onClick={addOrRemoveToFavorites} className='pokemon__favorite__button'>
                <AiOutlineStar className="favorite__button__icon" />
            </button>
        </div>
    )
}
