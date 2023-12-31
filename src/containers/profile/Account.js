import React, { useEffect, useRef } from "react";
import style from "./Account.module.css";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserName, setLogoutUser } from "../../redux/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";


const Account = () => {

  const currentUser = localStorage.getItem('isActive')
  const userName = useSelector(selectUserName)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const toastId = useRef(null)
 
  function handleLogout() {
    signOut(auth)
      .then(() => {
        dispatch(setLogoutUser());

        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.success(
            "Logout complete. See you next time!",
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
        }
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    
  if(currentUser === 'false'){
     navigate('/login')
  }

  },[])

  useEffect(() => {
    window.scrollTo(0,0)
  },[navigate])

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
            <div>{userName}</div>
          </div>
        </div>
        <div className={style.leftBotmDiv}>
          <NavLink
            to="orders"
            activeClassName="active"
            className={style.navLink}
          >
            <div className={style.myorder}>
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
          </NavLink>

          <div className={style.mainOrderDiv}>
            <div className={style.acc}>
              <span>
                <PersonRoundedIcon
                  sx={{ fontSize: "30px", mr: "10px", color: "#1976D2" }}
                />
              </span>
              <span>ACCOUNT SETTINGS</span>
            </div>

            <NavLink to="./" activeClassName="active" className={style.navLink}>
              <div className={style.underAcc}>Profile Information</div>
            </NavLink>
            <NavLink
              to="address"
              activeClassName="active"
              className={style.navLink}
            >
              <div className={style.underAcc}>Manage Addresses</div>
            </NavLink>{" "}
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
            <NavLink
              to="reviews"
              activeClassName="active"
              className={style.navLink}
            >
              <div className={style.underAcc}>My Reviews & Ratings</div>
            </NavLink>

            <div className={style.underAcc}>All Notifications</div>
            <NavLink
              to="wishlist"
              activeClassName="active"
              className={style.navLink}
            >
              <div className={style.underAcc}>All Wishlist</div>
            </NavLink>
          </div>
          <div className={style.myorder}>
            <span>
              <LogoutIcon
                sx={{ fontSize: "25px", mr: "10px", color: "#1976D2" }}
              />
            </span>
            <span onClick={handleLogout}>Logout</span>
          </div>
        </div>
      </div>


      <div className={style.mainAccRight}>
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
