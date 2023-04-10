/** Make request to the api*/

import axios from "axios";

/** authenticate function*/

export const authenticate = async (username) => {
    try {
        return await axios.post('/api/authenticate', {
            username,
        })

    } catch (e) {
        return {error: "Username does not exist"}
    }
}
/** get user details */
export const getUser = async ({username}) => {
    try {
        const {data} = await axios.get(`/api/user/${username}`)
        return data;

    } catch (e) {
        return {error: "Invalid Password", e}
    }
}

/** register user */
export const registerUser = async (credentials) => {
    try {
        const {data: {msg}, status} = await axios.post(`/api/register`, credentials)

        let {username, email} = credentials;
        if (status === 201) {
            await axios.post(`api/registerMail`, {username, userEmail: email, text: msg})
        }
        return Promise.resolve(msg);
    } catch (e) {
        return Promise.reject({error})
    }
}

/** login function */
export const verifyPassword = async ({username, password}) => {
    try {
        if (username) {
            const {data} = await axios.post(`api/login`, {username, password})
            return Promise.resolve({data})
        }
        return Promise.reject({error: "No username was provided somehow invading all catches huh?"})

    } catch (e) {
        return Promise.reject({error: "password is invalid"})
    }
}

/** Update user profile function*/
export const updateUser = async (response) => {
    try {
        const token = localStorage.getItem("token");
        const data = await axios.put(`api/updateuser/${token}`, response, {headers: {"Authorization": `Bearer ${token}`}})
        return Promise.resolve({data});

    } catch (e) {
        return Promise.reject({error: 'Could not update profile'})
    }

}

/**Generate OTP*/
export const generateOTP = async(username)=>{

}