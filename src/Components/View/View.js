import React,{useEffect , useState ,useContext} from 'react';
import { FirebaseContext } from '../../Store/Contex';
import { PostContext } from '../../Store/PostContext';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

import './View.css';
function View() {

  const [userDeatails , setUserDetails] = useState(null)
  const {postDetails} = useContext(PostContext)
  const {firebase} = useContext(FirebaseContext)
  console.log(postDetails,"postdetails indo")

  useEffect(() => {
    if (postDetails?.userId) {
      const { userId } = postDetails;
      const db = getFirestore(firebase);
      const userQuery = query(collection(db, 'users'), where('id', '==', userId));
  
      getDocs(userQuery).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      });
    }
  }, [postDetails, firebase]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.downloadURL}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>YAMAHA R15V3</span>
          <p>Two Wheeler</p>
          <span>Tue May 04 2021</span>
        </div>

        {userDeatails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDeatails.username}</p>
          <p>{userDeatails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
