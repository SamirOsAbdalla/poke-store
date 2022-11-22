import React from 'react'
import "./CartSection.css"

interface ok {
    name: string
}
export const CartSection = (props: ok) => {
    return (
        <div className="cart-section">{props.name}</div>
    )
}
