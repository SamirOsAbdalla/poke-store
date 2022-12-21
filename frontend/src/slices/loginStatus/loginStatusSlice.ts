import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type InitialState = {
    status: boolean;
}

const initialState: InitialState = {
    status: false
}

const loginStatusSlice = createSlice({
    name: "loginStatus",
    initialState,

    reducers: {
        setLoginStatusFalse: (state) => {
            state.status = false;
        },
        setLoginStatusTrue: (state) => {
            state.status = true;
        },
    }
})

export default loginStatusSlice.reducer
export const { setLoginStatusFalse, setLoginStatusTrue } = loginStatusSlice.actions