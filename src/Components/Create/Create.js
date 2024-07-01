import React, { useContext, useState } from 'react';
import './Create.css';
import { authContext, firebaseContext } from '../../store/Context';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
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
  const date = new Date()
  const navigate = useNavigate()

  const handleSubmit =()=>{
    setLoading(true)
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

  return (
    <div>
    {loading ? <Loading/>: 
    <div className="centerDiv">
        <label htmlFor="name">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="name"
          name="name"
          onChange={(e)=>setName(e.target.value)}
        />
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <input
          className="input"
          type="text"
          id="category"
          name="category"
          onChange={(e)=>setCategory(e.target.value)}
        />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input 
          className="input" 
          type="number" 
          id="price" 
          name="price" 
          onChange={(e)=>setPrice(e.target.value)} 
        />
        <br /> 
      <br />
      <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):''}></img>
      
        <br />
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" />
        <br />
        <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>     
    </div>
    }
    </div>
  );
};

export default Create;
