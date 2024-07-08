import React, { memo, useContext, useState } from 'react';
import './Create.css';
import { authContext, firebaseContext } from '../../store/Context';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

const Create = () => {
  const [loading,setLoading] = useState(false)
  const {db,storage} = useContext(firebaseContext)
  const {user} = useContext(authContext)
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState(null)
  const [errMsg,setErrMsg] = useState('')
  const date = new Date()
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    setLoading(true)
    const snapshot = await getDocs(query(collection(db, 'products'), where("name", "==", name)))
    if(!name.match(/^[a-z][a-z0-9 ]*$/i)){
      setLoading(false)
      setErrMsg('Enter a proper name !')
    }else if(!snapshot.empty){
      setLoading(false)
      setErrMsg('Name is already exist !')
    }else if(!category.match(/^[a-z][a-z ]{2,}$/i)){
      setLoading(false)
      setErrMsg('Enter proper category !')
    }else if(!price.match(/^[1-9][0-9]*$/)){
      setLoading(false)
      setErrMsg('Please enter the price !')
    }else if(image === null){
      setLoading(false)
      setErrMsg('Please select an image !')
    }else{
      const storageRef = ref(storage,`/image/${image.name}`)
      uploadBytes(storageRef,image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url)=>{
        addDoc(collection(db,"products"),{
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        }).then(()=>{
          navigate("/")
        }).catch((e)=>{
          console.log('based on FireStore '+e.message)
        })
      })
      .catch((error) => {
        console.error('Error getting download URL', error);
      })
    })
    .catch((error) => {
      console.error('Error uploading file', error);
    })
    }
  }

  return (
    <div>
    {loading ? <Loading/>: 
    <div className="centerDiv">
      <form onSubmit={handleSubmit} >
        <p className='errMsg'>{errMsg}</p>
        <label htmlFor="name">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <input
          className="input"
          type="text"
          id="category"
          name="category"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          required
        />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input 
          className="input" 
          type="number" 
          id="price" 
          name="price" 
          value={price}
          onChange={(e)=>setPrice(e.target.value)} 
          required
        />
        <br /> 
      <br />
      <img alt="Posts" width="100px" height="100px" src={image?URL.createObjectURL(image):''}></img>
      
        <br />
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" />
        <br />
        <button type='submit' className="uploadBtn">upload</button>
        </form>     
    </div>
    }
    </div>
  );
};

export default memo(Create);
