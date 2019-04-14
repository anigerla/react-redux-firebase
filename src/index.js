import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//REDUX imports
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
//binding function that links react and redux together:
import { Provider } from 'react-redux';
//importing redux middleware - thunk
import thunk from 'redux-thunk';
//Firestore package import
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
//importing Firebase config data from
import fbConfig from './config/fbConfig';

//applyMiddleware is function that can take in a list of different middlewares that enhance the store functionality
//withExtraArgument allows to pass firestore information to the createProject component
//compose allows to combine several store enhancers
const store = createStore(rootReducer, 
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        //fbConfig passes the information that allows to connect to specific Firebase/Firestore projects/data
        reduxFirestore(fbConfig),
        reactReduxFirebase(fbConfig, {useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true})
    )        
);

//makes the react render wait until authentication has occurred and the app has established that the user is either signed in or not
store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
    registerServiceWorker();
})


