import React, { useEffect, useRef, useState } from "react";
import style from "./Account.module.css";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateCurrentUser, updateEmail, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase.config";
import { setUser } from "../../redux/authSlice";

function ProfileInfo() {
  const currentUser = useSelector((state) => state.auth);

  const [firstName, setFirstName] = useState('' );
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState("");


  const toastId = useRef(null)
  const dispatch = useDispatch()

  const [isPersonalInfoEdit, setIsPersonalInfoEdit] = useState(true);
  const [isAddressEdit, setIsAddressEdit] = useState(true);
  const [isMobileEdit, setIsMobileEdit] = useState(true);

  function handleNameUpdate(){
    updateProfile(auth.currentUser, {
      displayName: `${firstName} ${lastName}`
    }).then(() => {
       dispatch(setUser({
        userName: `${firstName} ${lastName}`,
        userEmail: currentUser.userEmail
       }))
     
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Success! Your name is updated.");
      }
      setIsPersonalInfoEdit(true)
    }).catch((error) => {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Opps! Somthing went wrong.");
      }
    })
    
  }

  function handleEmailUpdate(){
    updateEmail(auth.currentUser, email).then(() => {
       dispatch(setUser({
        userName: currentUser.userName,
        userEmail: email
       }))
     
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Success! Your email is updated.");
      }
      setIsAddressEdit(true)
    }).catch((error) => {
      console.log(error.message);
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Opps! Somthing went wrong.");
      }
    })
    
  }

  function handleDeactive(){
    deleteUser(auth.currentUser).then(() => {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Success! Your account is deactivated.");
      }
    }).catch((error) => {
      console.log(error.message);
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Opps! Somthing went wrong.");
      }
    })
  }

  useEffect(() => {
    if(currentUser.userName){
      setFirstName(currentUser.userName.split(" ")[0])
      setLastName(currentUser.userName.split(" ")[1])
      setEmail(currentUser.userEmail)
    }
   
  },[currentUser, dispatch])

  return (
    <div className={style.mainInfoDiv}>
      <div className={style.infoContainer}>
        <div className={style.infoTitle}>
          <span>Personal Information</span>
          {isPersonalInfoEdit ? (
            <button onClick={() => setIsPersonalInfoEdit(false)}>Edit</button>
          ) : (
            <button onClick={() => setIsPersonalInfoEdit(true)}>Cancel</button>
          )}
        </div>
        <div className={style.inputDiv}>
          <TextField
            label="First Name"
            variant="outlined"
            value={firstName}
            disabled={isPersonalInfoEdit}
            onChange={(e)=> setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            value={lastName}
            disabled={isPersonalInfoEdit}
            onChange={(e)=> setLastName(e.target.value)}
          />
          {!isPersonalInfoEdit && <button onClick={handleNameUpdate}>SAVE</button>}
        </div>
        <div>Your Gender</div>
        <div>
          <input
            type="radio"
            id="male"
            name="gender"
            value="Male"
            disabled={isPersonalInfoEdit}
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="Female"
            disabled={isPersonalInfoEdit}
          />
          <label htmlFor="female">Female</label>
        </div>
      </div>
      <div className={style.infoContainer}>
        <div className={style.infoTitle}>
          <span>Email Address</span>
          {isAddressEdit ? (
            <button onClick={() => setIsAddressEdit(false)}>Edit</button>
          ) : (
            <button onClick={() => setIsAddressEdit(true)}>Cancel</button>
          )}
        </div>
        <div className={style.inputDiv}>
          <TextField
            label="Email Address"
            variant="outlined"
            value={email}
            disabled={isAddressEdit}
            onChange={(e)=> setEmail(e.target.value)}
          />
          {!isAddressEdit && <button onClick={handleEmailUpdate}>SAVE</button>}
        </div>
      </div>
      <div className={style.infoContainer}>
        <div className={style.infoTitle}>
          <span>Mobile Number</span>
          {isMobileEdit ? (
            <button onClick={() => setIsMobileEdit(false)}>Edit</button>
          ) : (
            <button onClick={() => setIsMobileEdit(true)}>Cancel</button>
          )}
        </div>
        <div className={style.inputDiv}>
          <TextField
            label="Mobile Number"
            variant="outlined"
            disabled={isMobileEdit}
          />
          {!isMobileEdit && <button>SAVE</button>}
        </div>
        <div className={style.delAcc}>
          <button onClick={handleDeactive}>Deactivate Account</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
