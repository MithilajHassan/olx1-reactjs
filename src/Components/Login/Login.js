import React, { useContext, useState } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { Link,useNavigate } from 'react-router-dom';
import { firebaseContext } from '../../store/Context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Loading from '../Loading/Loading';

function Login() {
  const [loading,setLoading] = useState(false)
  const [errorMsg,setMsg] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const {auth} = useContext(firebaseContext)
  const navigate = useNavigate()
  const handleSubmit = (e)=>{
    e.preventDefault()
    setLoading(true)
    signInWithEmailAndPassword(auth,email,password).then((result)=>{
      navigate('/')
    }).catch((e)=>{
      setLoading(false)
      setMsg('Wrong email or password!')
    })
  }

  return (
    <div>
      {loading ? <Loading /> :
      <div>
        <p className='errorMsg'>{errorMsg}</p>
        <div className="loginParentDiv">
          <img width="200px" height="200px" src={Logo} alt=''/>
          <form onSubmit={handleSubmit}>
            <label htmlFor="userEmail">Email</label>
            <br />
            <input
              className="input"
              type="email"
              id="userEmail"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
            <br />
            <br />
            <button>Login</button>
          </form>
          <Link to={'/signup'}>Signup</Link>
        </div>
      </div>
    }
    </div>
  )
}

export default Login;
