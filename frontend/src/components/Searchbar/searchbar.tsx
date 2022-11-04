import React from 'react'
import "./searchbar.css"



export const Searchbar = () => {
    return (
        <div className="searchbar-wrapper">
            <form>
                <label>Find a pokemon below or click shop!</label>
                <input
                    type="text"
                />
                <button>Search</button>
            </form>
        </div>
    )
}
