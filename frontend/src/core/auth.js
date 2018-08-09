import {App} from './app.js'

const Request = App.Request;


/**
* @desc opens a modal window to display a message
* @param {email, password} string - the message to be displayed
* @return bool - success or failure
*/
export const login = async (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response = await Request.post(`${App.API_URL}/login`, {
                body: {
                    email, 
                    password
                }
            })

            let tokenData = await response.json()
            storeToken(tokenData.token)
            resolve(await fetchUser(tokenData.token));

        } catch (error) {
            reject(error);
        }
    })
    
}

export const register = async (email, password) => {

}

export const recoverAccount = async (email) => {

}

export const logout = async () => {
    this.storeToken(null);
}

const fetchUser = async () => {
    
}


const authChanged = (auth) => {
    const token = auth && auth.data.token || null;
    storeToken(token)
}

const storeToken = (token) => {
    localStorage.setItem('auth', token);
    document.dispatchEvent(new CustomEvent('auth-changed', {detail: token}));
}


