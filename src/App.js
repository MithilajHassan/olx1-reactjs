import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router,Route, Routes, Navigate } from 'react-router-dom';
import { authContext, firebaseContext } from './store/Context';
import { onAuthStateChanged } from 'firebase/auth';
import Post from './store/PostContext';
import './App.css';
/**
 * =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import NotFound from './Components/NotFound/NotFound';


function App() {
  const {user,setUser} = useContext(authContext)
  const {auth} = useContext(firebaseContext)
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
  },[])
  return (
    <div>
      <Post>
      <Router>
        <Routes>
        <Route exact path="/" element={<Home />}  /> 
        <Route path="/signup" element={user ? <Navigate to="/" replace={true} /> : <Signup />}/>
        <Route path="/login" element={user ? <Navigate to="/" replace={true} /> : <Login />}/>
        <Route path="/create" element={user ? <Create /> : <Navigate to="/login" replace={true} />}/> 
        <Route path="/viewpost" element={<ViewPost />}/> 
        
        <Route path='*' element={<NotFound/>} />
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
