import React from "react";
import "./navbar.css"
import { NavLink } from "react-router-dom"
import { useAppSelector } from "../../app/hooks";


export const Navbar = () => {
    const numInCart = useAppSelector(state => {
        return state.numInCart.numberInCart
    })
    return (
        <div className="navbar-wrapper">
            <div className="navbar-left">
                <NavLink to="/" className="nav-home link">
                    PokeStore
                </NavLink>
            </div>
            <div className="navbar-right">
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
                    <NavLink to="/cart" className="nav-cart link">
                        Cart
                    </NavLink>
                </div>
                <div className="nav-section nav-section-4">
                    <NavLink to="/login" className="nav-login link">
                        Log In
                    </NavLink>
                </div>
            </div>
        </div >
    )
}

