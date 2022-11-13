import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from "../../app/store";
import { pokemonInfo } from "../../interfaces/interface"

type InitialState = {
    storedCartPokemon: pokemonInfo[]
}

const initialState: InitialState = {
    storedCartPokemon: []
}

const storedCartPokemonSlice = createSlice({
    name: "storedCartPokemon",
    initialState,

    reducers: {
        storeNewPokemon: (state, action: PayloadAction<pokemonInfo>) => {
            if (action.payload.name != "") {
                state.storedCartPokemon.push(action.payload)
            }
        },

        removePokemonFromCart: (state, action: PayloadAction<string>) => {
            const storedPokemon = state.storedCartPokemon;
            const filteredPokemon = storedPokemon.filter(pokemon =>
                pokemon.name !== action.payload
            )

            state.storedCartPokemon = filteredPokemon
        }
    }
})

export default storedCartPokemonSlice.reducer
export const { storeNewPokemon, removePokemonFromCart } = storedCartPokemonSlice.actions