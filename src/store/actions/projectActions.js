export const createProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //variable store FireStore data that will be used to connect to the Google database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        //adds new data held in the below object into the firestore colletion
        //this is async action therefore needs a promise and an async call
        firestore.collection('projects').add({ 
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_PROJECT', project });    
        }).catch((err) => {
            dispatch({ type: 'CREATE_PROJECT_ERROR', err });
        })

    }
};    