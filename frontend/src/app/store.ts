import { configureStore } from '@reduxjs/toolkit'
import searchSliceReducer from '../slices/search/searchSlice'

const store = configureStore({
    reducer: {
        search: searchSliceReducer
    }
})

export default store