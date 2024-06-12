import React from 'react';
import { useState , useEffect , useContext } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../Store/Contex';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { PostContext } from '../../Store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const [products , setproducts] = useState([])
  const{setPostDetails} = useContext(PostContext)
  const {firebase}= useContext(FirebaseContext)
  const navigate = useNavigate()

useEffect(()=>{
   const fetchProduct = async ()=>{
    try {
      const db = getFirestore(firebase);
      const productsCollection = collection(db, 'products');
        const querySnapshot = await getDocs(productsCollection);
        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        setproducts(productsData);
    } catch (error) {
      console.log(error.message);
    }
   }
   fetchProduct();
},[firebase])



  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
          <div
          key={product.id}
          onClick={()=>{
            setPostDetails(product)
            navigate('/viewpost')
          }} 
          className="card"
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.downloadURL} alt={product.name} />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.name}</span>
              <p className="name">{product.category}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        {products.map((product) => (
          <div className="card"
          onClick={()=>{
            setPostDetails(product)
            navigate('/viewpost')
          }} >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
            <img src={product.downloadURL} alt={product.name} />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.name}</span>
              <p className="name"> { product.category}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
