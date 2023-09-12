import React, { useState } from "react";
import style from "./Account.module.css";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddressForm from "./AddressForm";

const allAddresses = [
  {
    id: 1,
    name: "Adarsh kushwaha",
    typeOfAddress: "Home",
    address: "Vill- kanpatiyapur makrand nagar kannauj",
    city: "Kannauj",
    pinCode: 209726,
    state: "U.P",
    phone: 2837298987,
  },
  {
    id: 2,
    name: "adarsh kushwaha",
    typeOfAddress: "Home",
    address: "Golden PG, Vithlpur chowkdi",
    city: "Ahmedabad",
    pinCode: 111009,
    state: "Gujarat",
    phone: 2837298956,
  },
  {
    id: 3,
    name: "adarsh kushwaha",
    typeOfAddress: "Home",
    address: "Golden PG, Vithlpur chowkdi",
    city: "Ahmedabad",
    pinCode: 111009,
    state: "Gujarat",
    phone: 2837298956,
  },
  {
    id: 4,
    name: "adarsh kushwaha",
    typeOfAddress: "Home",
    address: "Golden PG, Vithlpur chowkdi",
    city: "Ahmedabad",
    pinCode: 111009,
    state: "Gujarat",
    phone: 2837298956,
  },
  {
    id: 5,
    name: "adarsh kushwaha",
    typeOfAddress: "Work",
    address: "Golden PG, Vithlpur chowkdi",
    city: "Ahmedabad",
    pinCode: 111009,
    state: "Gujarat",
    phone: 2837298956,
  },
  {
    id: 6,
    name: "adarsh kushwaha",
    typeOfAddress: "Work",
    address: "Golden PG, Vithlpur chowkdi",
    city: "Ahmedabad",
    pinCode: 111009,
    state: "Gujarat",
    phone: 2837298956,
  },
];

function ManageAddresses() {
  const [addresses, setAddAddress] = useState(allAddresses);
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);

  const initialAddress = {
    id: null,
    name: "",
    typeOfAddress: "",
    address: "",
    city: "",
    pinCode: "",
    state: "",
    phone: "",
  };

  const [currentaddress, setCurrentAddress] = useState(initialAddress);

  function handleHideForm() {
    setIsAddAddress(false);
  }

  function HandleOpenEditForm(address) {
    setCurrentAddress(address);
    setIsEditAddress(true);
  }
  function HandleCloseEditForm() {
    setIsEditAddress(false);
  }
  function HandleDeleteAddres(address){
   const newAddress = addresses.filter((addr) => addr.id !== address.id)
   setAddAddress(newAddress)
  }
  return (
    <div className={style.mainAddressDiv}>
      <div>Manage Addresses</div>
      {isAddAddress ? (
        <div>
          <AddressForm
            formType="ADD ANEW ADDRESS"
            handleHideForm={handleHideForm}
          />
        </div>
      ) : (
        <div
          onClick={() => setIsAddAddress(true)}
          className={style.assAddresDiv}
        >
          <AddIcon /> ADD A NEW ADDRESS
        </div>
      )}
      {isEditAddress && (
        <AddressForm
          formType="EDIT ADDRESS"
          handleHideForm={HandleCloseEditForm}
          currentaddress={currentaddress}
        />
      )}
      {addresses.map((addres) => (
        <div key={addres.id} className={style.mangAddress}>
          <div className={style.home_more}>
            <span>{addres.typeOfAddress}</span>
            <span>
              <EditIcon
                sx={{
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  ":hover": { color: "blue" },
                  mr: "1rem",
                }}
                onClick={() => HandleOpenEditForm(addres)}
              />

              <DeleteForeverIcon
                sx={{
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  ":hover": { color: "red" },
                }}
                onClick={() => HandleDeleteAddres(addres)}
              />
            </span>
          </div>
          <div className={style.name_num}>
            <span>{addres.name}</span>
            <span>{addres.phone}</span>
          </div>
          <div>
            <span>
              {addres.address}, {addres.city}, {addres.state} -{" "}
              <span>{addres.pinCode}</span>{" "}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ManageAddresses;
