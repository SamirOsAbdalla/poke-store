import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserType = {
    name: string,
    email: string,
    pic: string,
    favorites: [{ name: string, price: string, sprite: string }]
}
type InitialState = {
    userInfo: UserType
}

const initialState: InitialState = {
    userInfo: {
        name: "",
        email: "",
        pic: "",
        favorites: [{ name: "", price: "", sprite: "" }]
    }
}

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,

    reducers: {
        setCurrentUser: (state, action: PayloadAction<UserType>) => {
            state.userInfo = action.payload
        },

    }
})

export default userInfoSlice.reducer
export const { setCurrentUser } = userInfoSlice.actions