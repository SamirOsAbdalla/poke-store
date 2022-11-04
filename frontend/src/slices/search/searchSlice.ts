import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    pokemonName: string
}

const initialState: InitialState = {
    pokemonName: ""
}

const searchSlice = createSlice({
    name: "search",
    initialState,

    reducers: {
        //Change the pokemon that is being
        //individually searched
        updateName: (state, action: PayloadAction<string>) => {
            state.pokemonName = action.payload;
        }
    }
})

export default searchSlice.reducer