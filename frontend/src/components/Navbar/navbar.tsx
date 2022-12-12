import React from "react";
import "./navbar.css"
import { NavLink } from "react-router-dom"
import { useAppSelector } from "../../app/hooks";
import { Cart } from "../Cart/Cart";
import { AiOutlineShopping, AiOutlineStar } from "react-icons/ai"

const handleHamburgerClick = () => {
    const hamburger = document.querySelector(".hamburger")
    const navLinksLeft = document.querySelector(".nav__links__left")
    const activeHamburger = document.querySelectorAll(".active__hamburger")
    hamburger?.classList.toggle("active")
    navLinksLeft?.classList.toggle("active")
    activeHamburger?.forEach(node => node.classList.toggle("active"))
}
const closeHamburger = () => {
    const hamburger = document.querySelector(".hamburger")
    const navLinksLeft = document.querySelector(".nav__links__left")
    const activeHamburger = document.querySelectorAll(".active__hamburger")
    hamburger?.classList.remove("active")
    navLinksLeft?.classList.remove("active")
    activeHamburger?.forEach(node => node.classList.remove("active"))
}

export const Navbar = () => {
    const numInCart = useAppSelector(state => {
        return state.numInCart.numberInCart
    })


    return (
        <header className="navbar-wrapper">
            <nav className="nav__left">
                <ul className="nav__links nav__links__left">
                    <li className="hamburger__item">
                        <NavLink onClick={() => closeHamburger()} className="nav__link" to="/">
                            Home
                        </NavLink>
                    </li>
                    <li className="hamburger__item">
                        <NavLink onClick={() => closeHamburger()} className="nav__link" to="/about">
                            About
                        </NavLink>
                    </li>
                    <li className="hamburger__item">
                        <NavLink onClick={() => closeHamburger()} className="nav__link" to="/shop">
                            Shop
                        </NavLink>
                    </li>
                    <li className="active__hamburger hamburger__item">
                        <NavLink onClick={() => closeHamburger()} className="nav__link__icon" to="/favorites">
                            <AiOutlineStar className="favorites" />
                        </NavLink>
                    </li>
                    <li className="active__hamburger hamburger__item">
                        <NavLink onClick={() => closeHamburger()} className="nav__link" to="/login">
                            Login
                        </NavLink>
                    </li>
                </ul>
                <div className="hamburger" onClick={() => handleHamburgerClick()}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
            <div className="nav__logo">
                <NavLink className="logo" to="/">
                    PokeStore
                </NavLink>
            </div>
            <nav className="nav__right">
                <ul className="nav__links">
                    <li>
                        <NavLink className="nav__link__icon shopping__bag__container" to="/checkout">
                            <AiOutlineShopping className="shopping__bag" />
                        </NavLink>
                    </li>
                    <li className="hidden__hamburger">
                        <NavLink className="nav__link__icon" to="/favorites">
                            <AiOutlineStar className="favorites" />
                        </NavLink>
                    </li>
                    <li className="hidden__hamburger">
                        <NavLink className="nav__link" to="/login">
                            Login
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header >
    )
}

