import React, { useState } from 'react'
import style from './Header.module.css'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from '@mui/icons-material/Notifications';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';

function LoginTippy({handleOpen}) {
    const [isLogin, setIsLogin] = useState(false);

  return (
    <div className={style.mainLoginTDiv}>
     {!isLogin && <div>
        <span>New customer?</span>
        <button onClick={handleOpen}>Sign Up</button>
      </div>}

      <div>
        <span><AccountCircleIcon
            sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }}
          /></span>
        <span>My Profile</span>
      </div>
      
      {isLogin && <div>
        <span><OfflineBoltIcon
            sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }}
          /></span>
        <span>SuperCoin Zone </span>
      </div>}

      <div>
        <span><img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png" alt="" width='20px' /></span>
        <span>Flipkart Plus Zone</span>
      </div>
      <div>
        <span><DriveFileMoveIcon
            sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }}
          /></span>
        <span>Orders</span>
      </div>
      <div>
        <span><FavoriteIcon
            sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }}
          /></span>
        <span>Wishlist</span>
       {isLogin && <span className={style.wishlistItems}>10</span>}
      </div>
      
      <div>
        <span><CardGiftcardIcon
            sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }}
          /></span>
        <span>Gift Cards</span>
      </div>

     {isLogin && <div>
        <span><NotificationsIcon
            sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }}
          /></span>
        <span>Notifications </span>
      </div>}
     {isLogin && <div>
        <span><LogoutIcon
            sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }}
          /></span>
        <span>Logout</span>
      </div>}
    </div>
  )
}

export default LoginTippy
