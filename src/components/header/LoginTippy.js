import React, { useState } from 'react'
import style from './Header.module.css'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from '@mui/icons-material/Notifications';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useDispatch } from 'react-redux';
import { setLogoutUser } from '../../redux/authSlice';

function LoginTippy({handleOpen, currentUser, toastId,toast}) {
    

    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleOrderPage(){
   
        navigate('/account/orders')
      
    }
    function handleMyAccountPage(){
   
        navigate('/account/')
    
    }
    function handleWishlistPage(){
    
        navigate('/account/wishlist')
     
    }

    function handleLogout(){
      signOut(auth).then(() => {

        dispatch(setLogoutUser())

        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.success("Logout complete. See you next time!",{
            position: toast.POSITION.TOP_RIGHT
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      
    }
  return (
    <div className={style.mainLoginTDiv}>
     {!currentUser && <div >
        <span>New customer?</span>
        <button onClick={()=>handleOpen('signup')}>Sign Up</button>
      </div>}

      <div onClick={handleMyAccountPage}>
        <span><AccountCircleIcon
            sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }}
          /></span>
        <span > My Profile</span>
      </div>
      
      {currentUser && <div>
        <span><OfflineBoltIcon
            sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }}
          /></span>
        <span>SuperCoin Zone </span>
      </div>}

      <div>
        <span><img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png" alt="" width='20px' /></span>
        <span>Flipkart Plus Zone</span>
      </div>
      <div onClick={handleOrderPage}>
        <span><DriveFileMoveIcon
            sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }}
          /></span>
        <span>Orders</span>
      </div>
      <div onClick={handleWishlistPage}>
        <span><FavoriteIcon
            sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }}
          /></span>
        <span >Wishlist</span>
       {currentUser && <span className={style.wishlistItems}>10</span>}
      </div>
      
      <div>
        <span><CardGiftcardIcon
            sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }}
          /></span>
        <span>Gift Cards</span>
      </div>

     {currentUser && <div>
        <span><NotificationsIcon
            sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }}
          /></span>
        <span>Notifications </span>
      </div>}
     {currentUser && <div onClick={handleLogout}>
        <span ><LogoutIcon
            sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }}
          /></span>
        <span>Logout</span>
      </div>}
    </div>
  )
}

export default LoginTippy
