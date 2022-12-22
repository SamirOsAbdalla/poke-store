import axios from "axios";
import { setLoginStatusTrue } from "../slices/loginStatus/loginStatusSlice";
const baseUrl = 'http://localhost:3001'



const loginUser = async (email: string, password: string) => {
    try {


        const { data } = await axios.post(
            `${baseUrl}/api/users/login`,
            {
                email: email, password: password
            }
        )
        localStorage.setItem("USER_INFO", JSON.stringify(data))
        localStorage.setItem("LOGGED_IN", JSON.stringify(true))
        return data
    } catch (error: any) {

        return { error: true, message: error.response.data.message }
    }
}

const signupUser = async (name: string, email: string, password: string) => {
    try {
        const { data } = await axios.post(
            `${baseUrl}/api/users`,
            {
                email: email, password: password, name: name
            }
        )

        localStorage.setItem("USER_INFO", JSON.stringify(data))
        localStorage.setItem("LOGGED_IN", JSON.stringify(true))
        return data
    } catch (error: any) {
        return { error: true, message: error.response.data.message }
    }
}

const updateUser = async (name: string, email: string, password: string, picture: string, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        console.log("In users.tsx", name)
        const newUser = {
            email,
            name,
            password,
            pic: picture,
            token
        }
        const { data } = await axios.post(`${baseUrl}/api/users/profile`, newUser, config)
        localStorage.setItem("USER_INFO", JSON.stringify(data))
        return data;
    }
    catch (error: any) {
        return { error: true, message: error.response.data.message }
    }
}

export default {
    loginUser,
    signupUser,
    updateUser
}
