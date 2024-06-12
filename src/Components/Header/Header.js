import React,{useContext} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { FirebaseContext ,AuthContext } from '../../Store/Contex';
function Header() {
  const {user} =useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  const navigate = useNavigate()
  const handleLogout =()=>{
    const auth = getAuth(firebase);

    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error logging out:', error.message);
      });
  }
  const handleSpanclick = ()=>{
    if(!user){
      navigate('/login')
    }}

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={handleSpanclick}>{ user ? `Welcome ${user.displayName}` : "Login"}</span>
          <hr />
        </div>
        <div className="loginPage">
          {user && <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
        </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent" >
            <SellButtonPlus></SellButtonPlus>
            <span onClick={() => navigate('/create')}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
