import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from "../../app/store";
import { pokemonInfo } from "../../interfaces/interface"

interface StoredPokemonType {
    name: string,
    sprite: string,
    quantity: number,
    price: string
}

type InitialState = {
    storedCartPokemon: StoredPokemonType[]
}

const initialState: InitialState = {
    storedCartPokemon: []
}

const storedCartPokemonSlice = createSlice({
    name: "storedCartPokemon",
    initialState,

    reducers: {
        storeNewPokemon: (state, action: PayloadAction<StoredPokemonType>) => {
            if (action.payload.name != "") {

                //check if pokemon exists already
                //if it does increase pokemon's quantity
                const payload = action.payload
                const storedPokemon = state.storedCartPokemon

                const index = storedPokemon.findIndex((pokemon) =>
                    pokemon.name === payload.name
                )

                if (index === -1) {
                    state.storedCartPokemon.push(action.payload)
                } else {
                    state.storedCartPokemon[index].quantity += action.payload.quantity;
                }
            }
        },

        removePokemonFromCart: (state, action: PayloadAction<string>) => {

            //need to check quantity to see if >1 in order to decrease quantity
            //instead of removing pokemon entirely
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