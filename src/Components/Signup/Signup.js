import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Store/Contex';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export default function Signup() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const { firebase } = useContext(FirebaseContext)


  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth(firebase);
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      updateProfile(result.user, { displayName: username }).then(() => {
        const db = getFirestore(firebase);
        console.log(db);
        alert('entered')
        addDoc(collection(db, 'users'), {
          id: result.user.uid,
          username: username,
          phone: phone
        }).then(() => {
          console.log('enteredddddddddddddddddd');
          navigate('/login');
        });
      })
    });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img
          width="200px"
          height="200px"
          src={Logo}
          alt=""
        />

        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            defaultValue=""
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            defaultValue=""
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
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
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            defaultValue=""
          />
          <br />
          <br />
          <button >Signup</button>
        </form>
        <a onClick={()=>navigate('/login')}>Login</a>
      </div>
    </div>
  );
}
