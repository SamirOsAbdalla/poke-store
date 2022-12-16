import React from 'react'
import "./CartSection.css"
import { useEffect, useState } from 'react'

interface PropType {
    name: string,
    sprite: string,
    quantity: number,
    price: string
}
export const CartSection = (props: PropType) => {

    const [updatedPrice, setUpdatedPrice] = useState<string>("")

    useEffect(() => {
        setUpdatedPrice("$" + (parseFloat(props.price.substring(1)) * props.quantity).toFixed(2))
    }, [])

    return (
        <div className="cart__section__wrapper">
            <div className='cart__section__top'>
                <div className='cart__section__image'>
                    <img src={props.sprite} />
                </div>
                <div className='cart__section__name'>
                    {props.name}
                </div>
                <div>
                    {updatedPrice}
                </div>
            </div>
            <div className='cart__section__quantity'>
                {props.quantity}
            </div>
        </div>
    )
}
