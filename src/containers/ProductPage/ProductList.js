import React, { useEffect, useState } from "react";
import style from "./ProductPage.module.css";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Pagination from "./Pagination";
import { useNavigate, useParams } from "react-router-dom";
import CalculateTotalRatings from "./CalculateTotalRatings";
import { collection, deleteDoc, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUserID } from "../../redux/authSlice";

function ProductList({ viewProdcts,handleDescendingOrder, handleAscendingOrder,handleNewestOrder,handlePopularity,page,setPage }) {
  const navigate = useNavigate();
  const params = useParams()
  const userID = useSelector(selectUserID)
  const [userWishlist, setUserWishlist] = useState([])

  async function handleWishlist(product) {
    const docRef = doc(db, "wishlist " + userID, product.id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data()
   if(docSnap.exists()){
       if(data.id === product.id){
        await deleteDoc(docRef)
        toast.success("Remove from your wishlist.")
       }else{
        await setDoc(docRef, product);
        toast.success("Added to your wishlist.")
       }
   }else{
    await setDoc(docRef, product);
    toast.success("Added to your wishlist.")
   }
    
  }

  useEffect(() => {
    window.scroll(0, 0);
    const isAuth = auth.onAuthStateChanged((user) => {
      if(user){
        const userId = user.uid
        const getWishlist = onSnapshot(collection(db, "wishlist " + userId), (querySnap) => {
          const list = []
          querySnap.forEach((doc) => {
            list.push(doc.data().id)
          })
          setUserWishlist(list)
          
        })
      }
    })
    return () => isAuth()
  }, []);

  useEffect(() => {
    if(params.name === 'sort=price_desc'){
      handleDescendingOrder()
    } else if(params.name === 'sort=price_asc'){
      handleAscendingOrder()
    }else if(params.name === 'sort=newest'){
      handleNewestOrder()
    }
  },[])

  return (
    <div className={style.mainList}>
      <div className={style.upperDiv}>
        <div className={style.productType}>
          <h1>{params.id}</h1>
          <span>{`(Showing ${page*16-16 +1} - ${viewProdcts.length>page*16? page*16 : viewProdcts.length} products of ${viewProdcts.length} products)`}</span>
        </div>
        <div className={style.sortBy}>
          <span>Sort By</span>
          <div className={params.name === 'sort=popular'? style.active : ''} onClick={handlePopularity}>Popularity</div>
          <div className={params.name === 'sort=price_asc'? style.active : ''} onClick={handleAscendingOrder}>Price -- Low to High</div>
          <div className={params.name === 'sort=price_desc'? style.active : ''} onClick={handleDescendingOrder}>Price -- High to Low</div>
          <div className={params.name === 'sort=newest'? style.active : ''} onClick={handleNewestOrder}>Newest First</div>
        </div>
      </div>

      <div className={style.proListDiv}>
        {viewProdcts &&
          viewProdcts.slice(page*16-16, page*16).map((product) => (
            <div key={product.id} className={style.cart}>
              <div
                className={style.heart}
                onClick={() => handleWishlist(product)}
              >
                <FavoriteIcon
                  sx={{
                    color: userWishlist.includes(product.id) ? "red" : "lightgray",
                    fontSize: ".9rem",
                  }}
                />
              </div>
              <div className={style.imgDiv}>
                <img
                  src={product.images[0].image}
                  alt="image"
                  onClick={() => navigate(`/productDetails/${product.id}`)}
                />
              </div>
              <div>
                <div className={style.gram}>Sponsored</div>
                <p className={style.discp}>{product.title}</p>
                <div className={style.rateDiv}>
                  {product.ratings > 0 && (
                    <div
                      style={{
                        backgroundColor:
                          product.ratings >= 3
                            ? "green"
                            : product.ratings >= 2
                            ? "orange"
                            : "red",
                      }}
                    >
                      {product.ratings} <StarIcon sx={{ fontSize: ".9rem" }} />
                    </div>
                  )}
                  {product.ratings > 0 && (
                    <span>
                      (<CalculateTotalRatings ratings={product.stars} />)
                    </span>
                  )}
                  {product.assured === "true" && (
                    <img
                      src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                      alt=""
                    />
                  )}
                </div>
                <div className={style.newpriceDiv}>
                  <div>
                    ₹
                    {Math.round(
                      product.actual_price -
                        (product.discount_percentage / 100) *
                          product.actual_price
                    )}
                  </div>
                  <div className={style.oldPrice}>₹{product.actual_price}</div>
                  <span>{product.discount_percentage}% off</span>
                </div>
              </div>
            </div>
          ))}
      </div>
     {viewProdcts.length>16 && <div >
        <Pagination products={viewProdcts} page={page} setPage={setPage} />
      </div>}
    </div>
  );
}

export default ProductList;
