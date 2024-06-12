import React, { Fragment ,useContext,useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext , AuthContext } from '../../Store/Contex';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


const Create = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setprice] = useState('')
  const [image, setImage] = useState(null)
  const [uploadError, setUploadError] = useState(null);
  const {firebase} = useContext(FirebaseContext) 
  const {user}= useContext(AuthContext)
  const navigate = useNavigate();

  const storage = getStorage(firebase);
  const date = new Date()
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!name || !category || !price || !image) {
      alert('Please fill in all required fields and select an image.');
      return;
    }

    try {
      const imageRef = ref(storage, `/images/${image.name}`);
      await uploadBytes(imageRef, image); 
      const downloadURL = await getDownloadURL(imageRef);
      console.log(downloadURL );
      const productData = {
        name,
        category,
        price,
        downloadURL,
        userId: user.uid, 
        createdAt: date.toDateString(),
      };
      const db = getFirestore(firebase);
      const docRef = await addDoc(collection(db, 'products'), productData);
      console.log('Product added successfully:', docRef.id);
      setUploadError(null);
      navigate('/') 

    } catch (error) {
      setUploadError('Error uploading image: ' + error.message);
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              id="fname"
              name="Name"
              defaultValue=""
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e)=>{setCategory(e.target.value)}}
              name="category"
              defaultValue=""
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price"   value={price}
              onChange={(e)=>{setprice(e.target.value)}}/>
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : null} />
            <br />
            <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" />
            <br />
            <button className="uploadBtn" onClick={handleFormSubmit}>upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
