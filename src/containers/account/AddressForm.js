import React from "react";
import style from "./Account.module.css";
import { TextField } from "@mui/material";

function AddressForm({formType, handleHideForm, currentaddress}) {

  return (
    <div className={style.addresFormWraperDiv}>
      <div>
        <span>{formType}</span>
      </div>
      <div className={style.textFieldDiv}>
        <div>
          <input type="text" value={currentaddress?.name} placeholder="Name" autoFocus/>
        </div>
        <div>
          <input type="text" value={currentaddress?.phone} placeholder="10-digit mobile number" />
        </div>
      </div>
      <div className={style.textFieldDiv}>
        <div>
          <input type="text" value={currentaddress?.pinCode} placeholder="pincode" />
        </div>
        <div>
          <input type="text" value={currentaddress?.city} placeholder="city" />
        </div>
      </div>
      <div className={style.AreatextFieldDiv}>
        <textarea
        value={currentaddress?.address}
          cols="73"
          rows="4"
          placeholder="Address (Area and Street)"
        ></textarea>
      </div>
      <div className={style.textFieldDiv}>
        <div>
          <input type="text" value={currentaddress?.state} placeholder="state" />
        </div>
      </div>
      <div className={style.addresTypeDiv}>
        <span>Address Type</span>
        <div>
          <input type="radio" id="home" name="addressType" />
          <label htmlFor="home">Home</label>
          <input type="radio" id="work" name="addressType" />
          <label htmlFor="work">Work</label>
        </div>
      </div>

      <div className={style.save_can}>
        <button>SAVE</button>
        <button onClick={handleHideForm}>CANCEL</button>
      </div>
    </div>
  );
}

export default AddressForm;
