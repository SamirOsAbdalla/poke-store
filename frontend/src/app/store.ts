import { configureStore } from '@reduxjs/toolkit'
import searchSliceReducer from '../slices/search/searchSlice'

const store = configureStore({
    reducer: {
        search: searchSliceReducer
    }
})

//add something for storing state
//of shopping cart in local storage
//to save on refresh


export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
