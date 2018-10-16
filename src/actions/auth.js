

import "firebase/auth"
import "firebase/firestore"

export const UPDATE_USER = 'UPDATE_USER'

/**
* @desc opens a modal window to display a message
* @param string msg - the message to be displayed
* @return bool - success or failure
*/
export const login = ({email, password}, listener = null) => (dispatch) => {

    firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
        if (listener) listener.loginCompletes(user)
    })
    .catch(function (error) {
        if(listener) listener.loginCompletes(null, error)
    })
}

/**
* @desc opens a modal window to display a message
* @param string msg - the message to be displayed
* @return bool - success or failure
*/
export const register = ({email, password, accountType}, listener = null) => (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
        if (listener) listener.registerCompletes(user)
    })
    .catch(function (error) {
        if (listener) listener.registerCompletes(null, user)
    })
   
}

export const listenAuthChange = () => (dispatch) => {
    firebase.auth().onAuthStateChanged(async (auth) => {
        if (auth) {
            let user = await fetchUser(auth);
            user = {
                id: auth.uid,
                ...user
            }
            updateUser(user, dispatch)
        } else {
            updateUser(null, dispatch)
        }
    });
}

const fetchUser = async (auth) => {
    let user = null;

    if(auth){
        let ref = firebase.firestore().doc(`user/${auth.uid}`)
        try {
            let doc = await ref.get()
            if (doc.exists) {
                user = doc.data()
            } else {
                user = await createUser(ref, auth)
            }
        } catch (error) {
            console.log("Error getting document:", error);
        }
        
        //try to get the user based on the auth
        //if no user then lets create it
    }

    return user;

}

const createUser = async (ref, auth) => {

    await ref.set({
        name: auth.displayName,
        email: auth.email,
        country: "MY",
        avatar: null
    });

    return ref.get();
}

const updateUser = (user, dispatch) => {

    window.localStorage.setItem('user', JSON.stringify(user))

    dispatch({
        type: UPDATE_USER,
        user
    })

}