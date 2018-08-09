
const UPDATE_USER = 'UPDATE_USER'

import Auth from '../core/auth'

export const login = (email, password) => async (dispatch) => {

    try {
        let user = await Auth.login(email,password)
        console.log(user)
    } catch (error) {
        
    }
}