import { configureStore } from '@reduxjs/toolkit'
import searchSliceReducer from '../slices/search/searchSlice'
import numInCartReducer from "../slices/numInCart/numInCartSlice"
import storedCartPokemonReducer from '../slices/storedCartPokemon/storedCartPokemon'
import allPokemonNamesReducer from "../slices/allPokemon/allPokemonNamesSlice"
import loginStatus from '../slices/loginStatus/loginStatusSlice'
import userInfo from '../slices/userInfo/userInfoSlice'

const store = configureStore({
    reducer: {
        search: searchSliceReducer,
        numInCart: numInCartReducer,
        storedCartPokemon: storedCartPokemonReducer,
        allPokemonNames: allPokemonNamesReducer,
        loginStatus: loginStatus,
        userInfo: userInfo,
    }
})

//add something for storing state
//of shopping cart in local storage
//to save on refresh


export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
