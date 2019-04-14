export const signIn = (credentials) => {
    //getFirebase is used as a parameter to communicate with the Firebase project and sign the user in based on the stored data on that user in the Firebase
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        //preset function to sign in
        firebase.auth().signInWithEmailAndPassword(
            // email and password are stored in the credentials
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        //function communicates with Firebase, takes new User's email and password and uses them to create a new account in the Firebase database
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            //initially the users collection does not exist, but Firebase will create automatically when we want to store some information in that specific collection
            //.add() method is not used because by default it creates a random id; with sign up we want to use an id that Firebase has created above through the createUserWithEmailAndPassword function
            //.doc() is used to refer to a specific doc id
            //.set() method sets some properties inside the new User object
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                //takes first letter of first and last name and concatenates them
                initials: newUser.firstName[0] + newUser.lastName[0]
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}