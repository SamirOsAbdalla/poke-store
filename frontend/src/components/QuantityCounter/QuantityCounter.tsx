import React, { useEffect } from 'react'
import "./QuantityCounter.css"

interface PropType {
    setQuantity: (quantity: number) => void,
    initialQuantity: string
}


export const QuantityCounter = (props: PropType) => {

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const quantityWrapper = document.querySelector(".quantity__wrapper") as HTMLElement
        props.setQuantity(parseInt(event.target.value))
    }

    useEffect(() => {
        if (props.initialQuantity === "1") {

        } else {
            const selectedOption = document.querySelector(`[data-value="${props.initialQuantity}"]`)
            selectedOption?.setAttribute("selected", "selected")
        }

    }, [])


    return (
        <div>
            <select className="quantity__wrapper" onChange={handleInputChange}>
                <option className="option" data-value="1" value="1" >1</option>
                <option className="option" data-value="2" value="2">2</option>
                <option className="option" data-value="3" value="3">3</option>
                <option className="option" data-value="4" value="4">4</option>
                <option className="option" data-value="5" value="5">5</option>
                <option className="option" data-value="6" value="6">6</option>
                <option className="option" data-value="7" value="7">7</option>
                <option className="option" data-value="8" value="8">8</option>
                <option className="option" data-value="9" value="9">9</option>
                <option className="option" data-value="10" value="10">10</option>
                <option className="option" data-value="11" value="11">11</option>
                <option className="option" data-value="12" value="12">12</option>
                <option className="option" data-value="13" value="13">13</option>
                <option className="option" data-value="14" value="14">14</option>
                <option className="option" data-value="15" value="15">15</option>
                <option className="option" data-value="16" value="16">16</option>
                <option className="option" data-value="17" value="17">17</option>
                <option className="option" data-value="18" value="18">18</option>
                <option className="option" data-value="19" value="19">19</option>
            </select></div>
    )
}
