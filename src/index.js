import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './Store/Contex';
import Context from './Store/Contex';
import firebase from './firebase/config'

ReactDOM.render(
    <FirebaseContext.Provider value={{firebase}}>
        <Context>
          <App />
        </Context>
    </FirebaseContext.Provider>
, document.getElementById('root'));
