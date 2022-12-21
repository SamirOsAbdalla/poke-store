import React from 'react'
import "./ErrorMessage.css"
type PropType = {
    message: string
}
export const ErrorMessage = (props: PropType) => {
    return (
        <div className="error__container">
            {props.message + "!"}
        </div>
    )
}
