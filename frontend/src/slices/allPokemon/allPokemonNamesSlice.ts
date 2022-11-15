import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { create } from "domain";

type InitialState = {
    allPokemonNames: string
}

const initialState: InitialState = {
    allPokemonNames: ""
}

const allPokemonSlice = createSlice({
    name: "allPokemonNames",
    initialState,
    reducers: {
        setAllPokemonNames: (state, action: PayloadAction<string>) => {
            state.allPokemonNames = action.payload
        }
    }
})

export default allPokemonSlice.reducer
export const { setAllPokemonNames } = allPokemonSlice.actions