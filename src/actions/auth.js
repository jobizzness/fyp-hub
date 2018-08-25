
export const UPDATE_USER = 'UPDATE_USER'

// export const login = (email, password, listener = null) => async (dispatch) => {

//     try {
//         let auth = await Auth.login(email, password)
//         if (listener) listener.loginCompletes(auth)
//     } catch (error) {
//         if (listener) listener.loginCompletes(null, error)
//     }
// }

// export const register = (email, password, listener = null) => async (dispatch) => {
//     try {
//         let auth = await Auth.login(email, password)
//         if (listener) listener.registerCompletes(auth)
//     } catch (error) {
//         if (listener) listener.registerCompletes(null, error)
//     }
// }

export const fetchUser = () => async (dispatch) => {

    // let user = null
    // try {
    //     user = await Auth.fetchUser();

    // } catch (error) {
    //     console.log(error)
    // }

//     window.localStorage.setItem('user', JSON.stringify(user))

//     dispatch({
//         type: UPDATE_USER,
//         user
//     })
   
}