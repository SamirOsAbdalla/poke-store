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
            <div className="navbar-middle">
                <NavLink to="/shop" className="nav-shop link">
                    Shop
                </NavLink>
                <NavLink to="/about" className="nav-about link">
                    About
                </NavLink>
            </div>
            <div className="navbar-right">
                <div className="nav-log">
                    Log in
                </div>
                <div className="nav-heart">
                    Fav Icon
                </div>
                <div className="nav-cart">
                    Shop Icon
                    <div>
                        {numInCart}
                    </div>
                </div>
            </div>
        </div >
    )
}

