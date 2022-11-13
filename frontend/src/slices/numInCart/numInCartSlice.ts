import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type InitialState = {
    numberInCart: number
}

const initialState: InitialState = {
    numberInCart: 0
}

const numInCartSlice = createSlice({
    name: "numInCart",
    initialState,

    reducers: {

        increaseNumberInCart: (state, action: PayloadAction<number>) => {
            state.numberInCart += action.payload;

            window.localStorage.setItem("NUMBER_POKEMON_IN_CART", JSON.stringify(state.numberInCart))
        },
        decreaseNumberInCart: (state, action: PayloadAction<number>) => {
            if (state.numberInCart > 0) {
                state.numberInCart -= action.payload;
                window.localStorage.setItem("NUMBER_POKEMON_IN_CART", JSON.stringify(state.numberInCart))
            }
        }
    }
})

export default numInCartSlice.reducer
export const { increaseNumberInCart, decreaseNumberInCart } = numInCartSlice.actions