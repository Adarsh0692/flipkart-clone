import React, { useEffect, useRef, useState } from "react";
import style from "./Account.module.css";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  updateCurrentUser,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase.config";
import { selectUserID, setUser, setUserphone, userPhone } from "../../redux/authSlice";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function ProfileInfo() {
  const currentUser = useSelector((state) => state.auth);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const toastId = useRef(null);
  const dispatch = useDispatch();

  const [isPersonalInfoEdit, setIsPersonalInfoEdit] = useState(true);
  const [isAddressEdit, setIsAddressEdit] = useState(true);
  const [isMobileEdit, setIsMobileEdit] = useState(true);

  const [userData, setUserData] = useState({});
  const [userUid, setUserUid] = useState(null);
  // console.log(userData.gender);

  function handleMobileOnChange(e) {
    let value = e.target.value;

    value = value.replace(/\D/g, "");
    // limit to 0-10 digits
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    setPhone(value);
  }

  function handleGender(e){
    // setGender(e.target.value)
  }

 async function handleNameUpdate() {
    updateProfile(auth.currentUser, {
      displayName: `${firstName} ${lastName}`,
    })
      .then(() => {
        dispatch(
          setUser({
            userName: `${firstName} ${lastName}`,
            userEmail: currentUser.userEmail,
          })
        );

        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.success("Success! Your name is updated.");
        }
        setIsPersonalInfoEdit(true);
      })
      .catch((error) => {
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.success("Opps! Somthing went wrong.");
        }
      });
      if(gender){
          try {
            const genRef = doc(db, "users", userUid);
            await updateDoc(genRef, {
              gender: gender
            })

          } catch (error) {
            console.log(error);
          }
      }
  }

  function handleEmailUpdate() {
    updateEmail(auth.currentUser, email)
      .then(() => {
        dispatch(
          setUser({
            userName: currentUser.userName,
            userEmail: email,
          })
        );

        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.success("Success! Your email is updated.");
        }
        setIsAddressEdit(true);
      })
      .catch((error) => {
        console.log(error.message);
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.success(error.message);
        }
      });
  }

  async function handleMobileUpdate() {
    if (phone.length === 10) {
      try {
        const mobileRef = doc(db, "users", userUid);
        await updateDoc(mobileRef, {
          phone: phone,
        });
        setPhone(phone)
        
        setIsMobileEdit(true);
      } catch (error) {
        console.log(error);
        setIsMobileEdit(true);
      }
      //  console.log(phone);
    } else {
      alert("invalid mobile");
    }
  }

  function handleDeactive() {
    deleteUser(auth.currentUser)
      .then(() => {
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.success(
            "Success! Your account is deactivated."
          );
        }
      })
      .catch((error) => {
        console.log(error.message);
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.success(error.message);
        }
      });
  }

  useEffect(() => {
    // Firebase provides an onAuthStateChanged observer that you can use to get the user's UID
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        const uid = user.uid;
        setUserUid(uid);
      
        // Fetch user data from Firestore
        const userDocRef = doc(db, "users", uid);

        const getUserData = async () => {
          try {
            const docSnapshot = await getDoc(userDocRef);
            if (docSnapshot.exists()) {
              setUserData(docSnapshot.data());
             
            } else {
              console.log("User document does not exist.");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };

        getUserData();
      } else {
        // User is signed out.
        setUserUid(null);
        setUserData({});
      }
    });

    // Don't forget to unsubscribe from the observer when the component unmounts
    return () => unsubscribe();
    
  }, []);

  useEffect(() => {
    if (currentUser.userName) {
      setFirstName(currentUser.userName.split(" ")[0]);
      setLastName(currentUser.userName.split(" ")[1]);
      setEmail(currentUser.userEmail);
      setPhone(userData.phone);
      setGender(userData.gender)
    }
  }, [currentUser, dispatch, userData]);

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
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            value={lastName}
            disabled={isPersonalInfoEdit}
            onChange={(e) => setLastName(e.target.value)}
          />
          {!isPersonalInfoEdit && (
            <button onClick={handleNameUpdate}>SAVE</button>
          )}
        </div>
        <div>Your Gender</div>
        <div>
          <input
            type="radio"
            id="male"
            name="gender"
            value="Male"
            checked={userData.gender === "Male"}
            disabled={isPersonalInfoEdit}
            onChange={handleGender}
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="Female"
            checked={userData?.gender === "Female"}
            disabled={isPersonalInfoEdit}
            onChange={handleGender}
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
            onChange={(e) => setEmail(e.target.value)}
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
            value={phone}
            disabled={isMobileEdit}
            onChange={handleMobileOnChange}
          />
          {!isMobileEdit && <button onClick={handleMobileUpdate}>SAVE</button>}
        </div>
        <div className={style.delAcc}>
          <button onClick={handleDeactive}>Deactivate Account</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
