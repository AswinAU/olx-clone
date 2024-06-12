import React, {useContext, useEffect} from 'react';
import { FirebaseContext, AuthContext } from './Store/Contex';
import {BrowserRouter as Router  ,Routes ,Route} from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './App.css';

import Home from './Pages/Home';
import SignUp from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import Viewpost from './Pages/ViewPost'
import Post from './Store/PostContext';

function App() {
  const { setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  
  useEffect(() => {
    const auth = getAuth(firebase);
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [firebase, setUser]);

  return (
    <div>
      <Router>
      <Post>
        <Routes>
          <Route path='/' element={<Home />} />   
          <Route path='/signup' element={<SignUp />} />   
          <Route path='/login' element={<Login />} />   
          <Route path='/create' element={<Create />} />   
          <Route path='/viewpost' element={<Viewpost />} />   
        </Routes>
      </Post>
      </Router>
  </div>
  );
}

export default App;
