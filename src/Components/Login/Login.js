import React from 'react';
import { useState  , useContext} from 'react';
import {  useNavigate } from 'react-router-dom';

import { FirebaseContext } from '../../Store/Contex';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const navigate = useNavigate()
  const [email ,setEmail] = useState('')
  const [password ,setpassword] = useState('')
  const {firebase} = useContext(FirebaseContext)
  const submitForm = (e)=>{
    e.preventDefault()
    const auth = getAuth(firebase);
    signInWithEmailAndPassword(auth, email, password).then(() => {
    navigate('/')
    }).catch((error)=>{
      alert(error.message)
    })
  }     
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form  onSubmit={submitForm} >
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            defaultValue=""
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            name="password"
            defaultValue=""
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
