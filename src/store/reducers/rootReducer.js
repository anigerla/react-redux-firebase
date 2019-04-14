import authReducer from './authReducer';
import projectReducer from './projectReducer';
import { combineReducers } from 'redux';
//importing Firebase's own firestore information reducer function
import { firestoreReducer } from 'redux-firestore';
//importing Firebase's reducer for authentication
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers ({
    //which reducers we want to combine together and what do we want to call each indiv reducer
    auth: authReducer,
    project: projectReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;
