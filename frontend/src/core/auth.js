import {App} from './app.js'

const Request = App.Request;


/**
* @desc will attempt a login and fetchs the user object
* @param {email, password} string - the message to be displayed
* @return promist - success or failure
*/
export const login = async (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response = await Request.post(`${App.API_URL}/auth/login`, {
                body: {
                    email, 
                    password
                }
            })

            let tokenData = await response.json()
            if(tokenData.error) reject(tokenData)
            storeToken(tokenData.data.token)
            resolve(await fetchUser(tokenData.data.token));

        } catch (error) {
            reject(error);
        }
    })
    
}

export const register = async (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response = await Request.post(`${App.API_URL}/auth/register`, {
                body: {
                    email,
                    password
                }
            })

            let tokenData = await response.json()
            storeToken(tokenData.data.token)
            resolve(await fetchUser(tokenData.data.token));

        } catch (error) {
            reject(error);
        }
    })
}

export const recoverAccount = async (email) => {

}

export const logout = async () => {
    this.storeToken(null);
}

const fetchUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {

            let response = await Request.get(`${App.API_URL}/user`, {})
            let user = await response.json()
            resolve(user);

        } catch (error) {
            reject(error);
        }
    })
}


const authChanged = (auth) => {
    const token = auth && auth.data.token || null;
    storeToken(token)
}

const storeToken = (token) => {
    localStorage.setItem('auth', token);
    document.dispatchEvent(new CustomEvent('auth-changed', {detail: token}));
}


