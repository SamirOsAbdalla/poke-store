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
                {/*add Link from 
                react router later */}
                <NavLink to="/" className="nav-home">
                    Home
                </NavLink>
                <NavLink to="/shop" className="nav-shop">
                    Shop
                </NavLink>
            </div>

            <div className="navbar-right">
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

