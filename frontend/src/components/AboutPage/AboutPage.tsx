import React from 'react'
import "./AboutPage.css"
import { NavLink } from 'react-router-dom'

export const AboutPage = () => {
    return (
        <div className="about__wrapper">
            <div className="about__image__container">
                <img className="about__image" src={require('../../images/pngwing.com.png')} />
            </div>
            <div className="about__bottom">
                <div className='about__title'>
                    About this site
                </div>
                <div className="about__line"></div>
                <div className="about__summary">
                    This site was built as a fun project to
                    get very familiar with the MERN stack, become better
                    at dealing with API's, use Typescript and
                    because I love Pokemon! Hopefully you enjoy
                    perusing through our collection of amazing
                    Pokemon and you may even find something you
                    like.
                </div>
                <NavLink to="/shop">
                    <button className="about__button">
                        Let's Shop!
                    </button>
                </NavLink>

            </div>
        </div>
    )
}
