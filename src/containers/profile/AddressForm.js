import React, { useEffect, useState } from "react";
import style from "./Account.module.css";
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { selectUserID } from "../../redux/authSlice";

function AddressForm({
  formType,
  handleHideForm,
  currentaddress,
  setCurrentAddress,
}) {
  const [isPhError, setIsPhError] = useState("");
  const [isPinError, setIsPinError] = useState("");
  const [disable, setDisable] = useState(false);

  const userID = useSelector(selectUserID)

  function handleOnChange(e) {
    let { name, value } = e.target;
    if (name === "phone") {
      setIsPhError("");
      // remove non-numeric characters
      value = value.replace(/\D/g, "");
      // limit to 0-10 digits
      if (value.length > 10) {
        value = value.slice(0, 10);
      }
    }
    if (name === "pinCode") {
      setIsPinError("");
      value = value.replace(/\D/g, "");
      if (value.length > 6) {
        value = value.slice(0, 6);
      }
    }
    setCurrentAddress({
      ...currentaddress,
      [name]: value,
    });
  }

  function handlePhOnblurr(e) {
    let value = e.target.value;
    if (value.length < 10) {
      setIsPhError("Not a valid phone number.");
    } else {
      setIsPhError("");
    }
  }
  function handlePinOnblurr(e) {
    let value = e.target.value;
    if (value.length < 6) {
      setIsPinError("Not a valid pincode.");
    } else {
      setIsPinError("");
    }
  }

  async function handleSubmitForm(e) {
    e.preventDefault();
    if (formType === "ADD A NEW ADDRESS") {
      if (isPhError || isPinError) {
        alert("fill correct data");
      } else {
        try {
          setDisable(true);
            const addressRef = collection(db, 'addresses' )
            await addDoc(addressRef, currentaddress)

          setDisable(false);
          handleHideForm();
          toast.success("Success! Your address has been added.");
        } catch (error) {
          console.log(error);
          setDisable(false);
        }
      }
    }
    if (formType === "EDIT ADDRESS") {
      if (isPhError || isPinError) {
        alert("fill correct data");
      } else {
        try {
          setDisable(true);
          await updateDoc(doc(db, "addresses", currentaddress.id), {
            ...currentaddress,
          });
          setDisable(false);
          toast.success("Success! Address has been updated.");

          handleHideForm();
        } catch (error) {
          toast.success(error.message);
          setDisable(false);
        }
      }
    }
  }



  return (
    <div className={style.addresFormWraperDiv}>
      <div>
        <span>{formType}</span>
      </div>
      <form action="" onSubmit={handleSubmitForm}>
        <div className={style.textFieldDiv}>
          <div>
            <input
              type="text"
              value={currentaddress?.name}
              name="name"
              onChange={handleOnChange}
              placeholder="Name"
              autoFocus
              required
            />
          </div>
          <div>
            <input
              type="text"
              value={currentaddress?.phone}
              name="phone"
              onChange={handleOnChange}
              onBlur={handlePhOnblurr}
              placeholder="10-digit mobile number"
              required
            />
            {isPhError && <p className={style.error}>{isPhError}</p>}
          </div>
        </div>
        <div className={style.textFieldDiv}>
          <div>
            <input
              type="text"
              value={currentaddress?.pinCode}
              name="pinCode"
              onChange={handleOnChange}
              onBlur={handlePinOnblurr}
              placeholder="pincode"
              required
            />
            {isPinError && <p className={style.error}>{isPinError}</p>}
          </div>
          <div>
            <input
              type="text"
              value={currentaddress?.city}
              name="city"
              onChange={handleOnChange}
              placeholder="city"
              required
            />
          </div>
        </div>
        <div className={style.AreatextFieldDiv}>
          <textarea
            value={currentaddress?.address}
            name="address"
            // cols="73"
            rows="4"
            placeholder="Address (Area and Street)"
            required
            onChange={handleOnChange}
          ></textarea>
        </div>
        <div className={style.textFieldDiv}>
          <div>
            <input
              type="text"
              value={currentaddress?.state}
              name="state"
              onChange={handleOnChange}
              placeholder="state"
              required
            />
          </div>
        </div>
        <div className={style.addresTypeDiv}>
          <span>Address Type</span>
          <div>
            <input
              type="radio"
              id="home"
              value="Home"
              checked={currentaddress?.typeOfAddress === "Home"}
              onChange={handleOnChange}
              name="typeOfAddress"
              required
            />
            <label htmlFor="home">Home</label>
            <input
              type="radio"
              id="work"
              value="Work"
              checked={currentaddress?.typeOfAddress === "Work"}
              onChange={handleOnChange}
              name="typeOfAddress"
              required
            />
            <label htmlFor="work">Work</label>
          </div>
        </div>

        <div className={style.save_can}>
          <button disabled={disable} type="submit">
            {disable ? (
              <CircularProgress color="inherit" thickness={5} size={30} />
            ) : (
              "SAVE"
            )}
          </button>
          <button onClick={handleHideForm}>CANCEL</button>
        </div>
      </form>
    </div>
  );
}

export default AddressForm;
