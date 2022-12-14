import React from 'react'
import "./CartSection.css"

interface PropType {
    name: string
}
export const CartSection = (props: PropType) => {
    return (
        <div className="cart-section">{props.name}</div>
    )
}
