import axios from "axios";

const authenticate = async (mode, email, password) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=AIzaSyCN1tlvmHixOltgqbBGXKM16IXQSqONzIM`;
    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true
    });
    const token = response.data.idToken;
    return token;
}

export const createUser = async (email, password) => {
    const token = await authenticate('signup', email, password);
    return token;
}

export const login = async (email, password) => {
    const token = await authenticate('signInWithPassword', email, password);
    return token;
}