import React from 'react'
import "./CartSummary.css"
import { BsArrowRight } from "react-icons/bs"

type PropType = {
    totalItems: number,
    totalPrice: number
}
export const CartSummary = (props: PropType) => {
    return (
        <div className='cart__summary__wrapper'>
            <div className='cart__summary__order__summary row__wrapper'>
                ORDER SUMMARY
            </div>
            <div className="cart__summary__bottom">
                <div className="cart__summary__total__items line__below row__wrapper">
                    {props.totalItems > 1 ? props.totalItems + " items" : props.totalItems + " item"}
                </div>
                <div className="cart__summary__order__total__wrapper  line__below row__wrapper">
                    <div className="cart__summary__order__total ">
                        Order Total:
                    </div>
                    <div className='cart__summary__order__total__price'>
                        {"$" + props.totalPrice.toFixed(2)}
                    </div>
                </div>
                <div className="cart__summary__delivery__wrapper  line__below row__wrapper">
                    <div className="cart__summary__delivery">
                        Delivery:
                    </div>
                    <div className="cart__summary__delivery__value">
                        Free!
                    </div>
                </div>
                <div className='cart__summary__total__wrapper  row__wrapper'>
                    <div className='cart__summary__total'>
                        Total:
                    </div>
                    <div className='cart__summary__total__price'>
                        {"$" + props.totalPrice.toFixed(2)}
                    </div>
                </div>
            </div>
            <div className='cart__summary__button__wrapper row__wrapper'>
                <button className='cart__summary__button'>
                    <div className='cart__summary__button__checkout'>Checkout</div>
                    <BsArrowRight className='cart__summary__button__arrow' />
                </button>
            </div>
        </div>
    )
}
