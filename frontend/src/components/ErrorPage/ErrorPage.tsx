import React from 'react'
import "./ErrorPage.css"
import { SearchButton } from '../SearchButton/SearchButton'
import { useState, useEffect } from 'react'
export const ErrorPage = () => {

    return (
        <div className='error__wrapper'>
            <div className="error__404">
                404
            </div>
            <div className="error__message">
                Sorry, that pokemon could not be found. Don't fret though! Try searching
                again or click shop to browse our collection.
            </div>
            <div className="error__search__container">
                <SearchButton />
            </div>
        </div>
    )
}
