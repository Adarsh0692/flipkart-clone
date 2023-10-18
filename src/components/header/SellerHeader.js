import React, { useEffect } from "react";
import style from "./../../containers/sellerPage/SellerPage.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { auth, db } from "../../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSeller } from "../../redux/authSlice";

function SellerHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userSeller = useSelector(state => state.auth.seller)

  const [selleruser, setSellerUser] = useState([]);
const seller = localStorage.getItem('seller')


  function handleLogoClick(){
    if(seller){
      navigate("/seller-dashBoard")
    }
   
    
  }

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSellerUser(docSnap.data());
          if(docSnap.data().seller){
            dispatch(setSeller(docSnap.data().seller));
            localStorage.setItem('seller', true)
          }else{
            localStorage.setItem('seller', false)
          }
        }
      } else {
        navigate("/");
      }
    });
    return () => unSub()
  }, [seller]);



  return (
    <>
      <ToastContainer
        position="bottom-center"
        hideProgressBar
        closeButton={false}
        pauseOnHover={false}
        role="alert"
        autoClose={2000}
        theme="dark"
        style={{ width: "auto", fontSize: "1rem" }}
      />
      <div className={style.nav}>
        <div className={style.right}>
          <span onClick={handleLogoClick}>
            <img
              src="https://static-assets-web.flixcart.com/fk-sp-static/images/flipkart_logo_color_revamp.svg"
              alt="image"
            />
          </span>

          <h1>{selleruser.seller ? selleruser.seller : "Seller"}</h1>
        </div>
      {seller && <div>
          <span onClick={() => navigate("/seller-orders")}>Orders</span>
          <button onClick={() => navigate("/seller-addProduct")}>
            Start Selling
          </button>
        </div>}
      </div>
    </>
  );
}

export default SellerHeader;
