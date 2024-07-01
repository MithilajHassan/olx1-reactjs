import React, { useContext, useEffect, useState } from 'react';
import {PostContext} from '../../store/PostContext'
import './View.css';
import { firebaseContext } from '../../store/Context';
import { collection, query, getDocs, where } from 'firebase/firestore';
function View() {
  const [userDetails,setUserDetails] = useState({})
  const {postDetails} = useContext(PostContext)
  const {db} = useContext(firebaseContext)
  const {userId,price,name,category,createdAt,url} = postDetails
  const {username,phone} = userDetails

  useEffect(()=>{
    console.log(userId)
    getDocs(query(collection(db, 'users'), where("id", "==", userId))).then((snapshot)=>{
      setUserDetails(snapshot.docs[0].data())
    }).catch((e)=>{
      console.log(e.message);
    }) 
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {price} </p>
          <span>{name}</span>
          <p>{category}</p>
          <span>{createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{username}</p>
          <p>{phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
