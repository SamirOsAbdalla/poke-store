import React from "react";
import "./navbar.css"
import { NavLink } from "react-router-dom"

export const Navbar = () => {
    return (
        <div className="navbar-wrapper">
            <div className="navbar-left">
                {/*add Link from 
                react router later */}
                <NavLink to="/" className="nav-home">
                    Home
                </NavLink>
                <NavLink to="/store" className="nav-store">
                    Shop
                </NavLink>
            </div>

            <div className="navbar-right">
                <div className="nav-heart">
                    Fav Icon
                </div>
                <div className="nav-cart">
                    Shop Icon
                </div>
            </div>
        </div >
    )
}

