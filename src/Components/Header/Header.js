import React, { memo, useContext } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { authContext, firebaseContext } from '../../store/Context';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

function Header() {
  const {user} = useContext(authContext)
  const{ auth } = useContext(firebaseContext)
  const navigate = useNavigate()
  const handleLogout = ()=>{
    signOut(auth)
    navigate('/login')
  }
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
          <span>{user?<span><i className="fa-solid fa-circle-user"></i>{" "+user.displayName}</span>:<Link to='/login' >Login</Link>}</span>
          <hr />
        </div>
        {user && <span className='logout' onClick={handleLogout} >Logout</span>}
        <div className="sellMenu">
          <Link to={'/create'}><SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(Header);
