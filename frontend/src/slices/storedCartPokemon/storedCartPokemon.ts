import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from "../../app/store";
import { pokemonInfo } from "../../interfaces/interface"

interface StoredPokemonType {
    name: string,
    sprite: string,
    quantity: number,
    price: string
}

interface AdjustedPokemonPayloadType {
    name: string,
    quantity: number
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
                window.localStorage.setItem("STORED_CART_POKEMON", JSON.stringify(state.storedCartPokemon))
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
            window.localStorage.setItem("STORED_CART_POKEMON", JSON.stringify(filteredPokemon))
        },

        adjustPokemonInCart: (state, action: PayloadAction<AdjustedPokemonPayloadType>) => {
            const payload = action.payload
            const storedPokemon = state.storedCartPokemon

            const index = storedPokemon.findIndex((pokemon) =>
                pokemon.name === payload.name
            )

            if (payload.quantity === 0) {
                const filteredPokemon = storedPokemon.filter(pokemon =>
                    pokemon.name !== payload.name
                )

                state.storedCartPokemon = filteredPokemon
            } else {
                state.storedCartPokemon[index].quantity = action.payload.quantity;
            }
            window.localStorage.setItem("STORED_CART_POKEMON", JSON.stringify(state.storedCartPokemon))
        }
    }
})

export default storedCartPokemonSlice.reducer
export const { storeNewPokemon, removePokemonFromCart, adjustPokemonInCart } = storedCartPokemonSlice.actions