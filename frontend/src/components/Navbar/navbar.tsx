import React from "react";
import "./navbar.css"
import { NavLink } from "react-router-dom"
import { useAppSelector } from "../../app/hooks";
import { Cart } from "../Cart/Cart";
{/*  <div className="navbar-left">
                <NavLink to="/" className="nav-home link">
                    PokeStore
                </NavLink>
            </div>
            <div className="navbar-right">
                <div className="navbar-right-top">
                    <div className="nav-section nav-section-1">
                        <NavLink to="/shop" className="nav-shop link">
                            Shop
                        </NavLink>
                    </div>
                    <div className="nav-section nav-section-2">
                        <NavLink to="/about" className="nav-fav link">
                            Favorites
                        </NavLink>
                    </div>
                    <div className="nav-section nav-section-3">
                        <NavLink to="/checkout" className="nav-cart link">
                            Cart {numInCart}
                        </NavLink>
                    </div>
                    <div className="nav-section nav-section-4">
                        <NavLink to="/login" className="nav-login link">
                            Log In
                        </NavLink>
                    </div>
                </div>
</div>*/}

export const Navbar = () => {
    const numInCart = useAppSelector(state => {
        return state.numInCart.numberInCart
    })

    return (
        <header className="navbar-wrapper">
            <nav>
                <ul className="nav__links">
                    <li>
                        <NavLink className="nav__link" to="/">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="nav__link" to="/about">
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="nav__link" to="/shop">
                            Shop
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="nav__logo">
                <NavLink className="logo" to="/">
                    PokeStore
                </NavLink>
            </div>
            <nav>
                <ul className="nav__links">
                    <li>
                        <NavLink className="nav__link" to="/checkout">
                            Cart
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="nav__link" to="/favorites">
                            Fav
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="nav__link" to="/login">
                            Login
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header >
    )
}

