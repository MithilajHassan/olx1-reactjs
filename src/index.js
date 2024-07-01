import React from 'react';
import ReactDOM from 'react-dom/client'
import {firebaseContext} from './store/Context';
import App from './App';
import {auth,db, storage} from './firebase/config';
import AuthContext from './store/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <firebaseContext.Provider value={{auth,db,storage}}>
            <AuthContext>
                <App/>
            </AuthContext>
        </firebaseContext.Provider>
    </React.StrictMode>
)
