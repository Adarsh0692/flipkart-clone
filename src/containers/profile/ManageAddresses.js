import React, { useEffect, useState } from "react";
import style from "./Account.module.css";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddressForm from "./AddressForm";
import { arrayRemove, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { selectUserID, setAddress } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { list } from "firebase/storage";



function ManageAddresses() {
  const userID = useSelector(selectUserID)
  const currentUser = useSelector(state => state.auth)

  // const addresses = currentUser.addresses
  const [addresses, setAddAddress] = useState([]);
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);

 const dispatch = useDispatch()

 const loginUseraddress = addresses.filter((address) => address.loginUserID === userID)
//  console.log(loginUseraddress);

  const initialAddress = {
    name: "",
    typeOfAddress: "",
    address: "",
    city: "",
    pinCode: "",
    state: "",
    phone: "",
    loginUserID: userID
  };

  const [currentaddress, setCurrentAddress] = useState(initialAddress);

  function handleHideForm() {
    setIsAddAddress(false);
    setCurrentAddress(initialAddress);
  }

  function HandleOpenEditForm(address) {
    setCurrentAddress(address);
    setIsEditAddress(true);
  }
  function HandleCloseEditForm() {
    setIsEditAddress(false);
    setCurrentAddress(initialAddress);
  }
 async function HandleDeleteAddres(address) {
    try {
      await deleteDoc(doc(db, 'addresses', address.id))
     
      toast.success('Success! Address has been deleted.')
    } catch (error) {
      console.log(error);
    }
   
  }

  function handleOpenAddForm() {
    setIsAddAddress(true);
    setCurrentAddress(initialAddress);
    setIsEditAddress(false);
  }

  useEffect(() => {
   
    const fetchAddresses = onSnapshot(collection(db, 'addresses'),
    (snapShot) => {
      let list = []
      snapShot.docs.forEach((doc) => {
        list.unshift({id: doc.id , ...doc.data()})
      })
   
          setAddAddress(list)
     
    }, (error) => {
      console.log(error);
    })
    return () => {
      fetchAddresses()
    }
  }, []);

  // useEffect(() => {
  //   dispatch(setAddress(loginUseraddress))
  // },[addresses])

  return (
    <div className={style.mainAddressDiv}>
      <div>Manage Addresses</div>
      {isAddAddress ? (
        <div>
          <AddressForm
            formType="ADD A NEW ADDRESS"
            handleHideForm={handleHideForm}
            currentaddress={currentaddress}
            setCurrentAddress={setCurrentAddress}
            // addresses={addresses}
            // setAddAddress={setAddAddress}
          />
        </div>
      ) : (
        <div onClick={handleOpenAddForm} className={style.assAddresDiv}>
          <AddIcon /> ADD A NEW ADDRESS
        </div>
      )}
      {isEditAddress && (
        <AddressForm
          formType="EDIT ADDRESS"
          handleHideForm={HandleCloseEditForm}
          currentaddress={currentaddress}
          setCurrentAddress={setCurrentAddress}
        />
      )}
      {loginUseraddress?.map((addres) => (
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
