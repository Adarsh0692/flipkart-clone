import React, { useEffect, useState } from "react";
import style from "./Account.module.css";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileInfo from "./ProfileInfo";
import ManageAddresses from "./ManageAddresses";
import MyReviews from "./MyReviews";
import MyWishlist from "./MyWishlist";
import { useNavigate, useParams } from 'react-router-dom';
import MyOrder from "./MyOrder";
import { useSelector } from "react-redux";
import {selectUserName} from '../../redux/authSlice'

const Account = () => {
    const [isOder, setIsOder] = useState(false)
    const [isProfile, setIsProfile] = useState(false)
    const [isAddress, setIsAddress] = useState(false)
    const [isReview, setIsReview] = useState(false)
    const [isWishlist, setIsWishlist] = useState(false)

    const currentUser = useSelector(selectUserName)

    const navigate = useNavigate()
    const param = useParams()

    function handleIsOrderState(){
      setIsOder(true)
      setIsProfile(false)
      setIsAddress(false)
      setIsReview(false)
      setIsWishlist(false)
      navigate(`/account/orders`)
  }

    function handleIsProfileState(){
      setIsOder(false)
        setIsProfile(true)
        setIsAddress(false)
        setIsReview(false)
        setIsWishlist(false)
        navigate(`/account/1`)
    }
    function handleIsAddressState(){
      setIsOder(false)
        setIsProfile(false)
        setIsAddress(true)
        setIsReview(false)
        setIsWishlist(false)
        navigate(`/account/address`)
    }
    function handleIsReviewState(){
      setIsOder(false)
        setIsProfile(false)
        setIsAddress(false)
        setIsReview(true)
        setIsWishlist(false)
        navigate(`/account/review`)
    }
    function handleIsWishlistState(){
      setIsOder(false)
        setIsProfile(false)
        setIsAddress(false)
        setIsReview(false)
        setIsWishlist(true)
        navigate(`/account/wishlist`)
    }

    useEffect(() => {
      
      if(!currentUser){
        navigate('/login')
        console.log('ff');
     }
    
    },[])

    useEffect(() => {


      if(param.id == '1'){
        handleIsProfileState()
      }
      if(param.id == 'address'){
        handleIsAddressState()
      }
      if(param.id == 'review'){
        handleIsReviewState()
      }
      if(param.id == 'wishlist'){
        handleIsWishlistState()
      }
      if(param.id == 'orders'){
        handleIsOrderState()
      }

    },[param.id])

  return (
    <div className={style.mainAccDiv}>
      <div className={style.mainAccLeft}>
        <div className={style.userProfile}>
          <div>
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
              alt=""
            />
          </div>
          <div className={style.userName}>
            <div>Hello,</div>
            <div>{currentUser}</div>
          </div>
        </div>
        <div className={style.leftBotmDiv}>
          <div  className={`${style.myorder} ${isOder? style.underAccActive : ''}`} onClick={handleIsOrderState}>
            <span>
              <DriveFileMoveIcon
                sx={{ fontSize: "30px", mr: "10px", color: "#1976D2" }}
              />
            </span>
            MY ORDERS
            <span>
              <NavigateNextIcon
                sx={{ fontSize: "30px", ml: "60px", color: "gray" }}
              />
            </span>
          </div>
          <div className={style.mainOrderDiv}>
            <div className={style.acc}>
              <span>
                <PersonRoundedIcon
                  sx={{ fontSize: "30px", mr: "10px", color: "#1976D2" }}
                />
              </span>
              <span>ACCOUNT SETTINGS</span>
            </div>
            <div className={`${style.underAcc} ${isProfile? style.underAccActive: ''}`} onClick={handleIsProfileState}>Profile Information</div>
            <div className={`${style.underAcc} ${isAddress? style.underAccActive : ''}`} onClick={handleIsAddressState}>Manage Addresses</div>
          </div>
          <div className={style.mainOrderDiv}>
            <div className={style.acc}>
              <span>
                <AccountBalanceWalletIcon
                  sx={{ fontSize: "30px", mr: "10px", color: "#1976D2" }}
                />
              </span>
              <span>PAYMENTS</span>
            </div>
            <div className={style.underAcc}>Saved UPI</div>
            <div className={style.underAcc}>Saved Cards</div>
          </div>
          <div className={style.mainOrderDiv}>
            <div className={style.acc}>
              <span>
                <FolderSharedIcon
                  sx={{ fontSize: "30px", mr: "10px", color: "#1976D2" }}
                />
              </span>
              <span>MY STUFF</span>
            </div>
            <div className={style.underAcc}>My Coupons</div>
            <div className={`${style.underAcc} ${isReview?  style.underAccActive : '' }`} onClick={handleIsReviewState}>My Reviews & Ratings</div>
            <div className={style.underAcc}>All Notifications</div>
            <div className={`${style.underAcc} ${isWishlist? style.underAccActive : '' }`} onClick={handleIsWishlistState}>All Wishlist</div>
          </div>
          <div className={style.myorder}>
          <span>
                <LogoutIcon
                  sx={{ fontSize: "25px", mr: "10px", color: "#1976D2" }}
                />
              </span>
              <span>Logout</span>
          </div>
        </div>
      </div>
      <div className={style.mainAccRight}>
        {isOder && <MyOrder/>}
        {isProfile && <ProfileInfo/>}
        {isAddress && <ManageAddresses/>}
        {isReview && <MyReviews/>}
        {isWishlist && <MyWishlist/>}
      </div>
    </div>
  );
};

export default Account;
