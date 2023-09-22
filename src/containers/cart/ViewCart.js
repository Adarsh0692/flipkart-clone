import React, { useEffect, useState } from "react";
import style from "./ViewCart.module.css";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useSelector } from "react-redux";
import { selectUserID } from "../../redux/authSlice";

const image = [
  {
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/snack-savourie/d/r/v/-original-imaghfn8j2vrwfcy.jpeg?q=70",
  },
  {
    image:
      "https://rukminim2.flixcart.com/image/832/832/l3hmwsw0/nut-dry-fruit/i/1/t/500-premium-cashews-kaju-100-natural-tasty-crunchy-immunity-original-imagehsmewfmmygr.jpeg?q=70",
  },
  {
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/edible-seed/6/h/9/-original-imaggrgrzcmv7pmc.jpeg?q=70",
  },
  {
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/nut-dry-fruit/j/k/t/-original-imagmkb9jskrcffe.jpeg?q=70",
  },
  {
    image:
      "https://rukminim2.flixcart.com/image/612/612/kzhbfrk0/nut-dry-fruit/z/b/7/-original-imagbh7hgctxc3zd.jpeg?q=70",
  },
  {
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/nut-dry-fruit/i/t/n/250-gold-makhana-1-pouch-farmley-original-imagqdth9nwgkhdu.jpeg?q=70",
  },
];



function ViewCart() {

  const userID = useSelector(selectUserID)
  const cartProduct = useSelector(state => state.auth.cart)
  // console.log(cartProduct);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const loginUseraddress = addresses.filter((address) => address.loginUserID === userID)
 
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const priceArray = cartProduct?.map((product) => Math.floor(
    (product.actual_price * product.productQuantity )-
      (product.discount_percentage / 100) * (product.actual_price * product.productQuantity )
  ) )
  const actualPriceArray = cartProduct?.map((product) => product.actual_price * product.productQuantity)
  const deliveryPriceArray = cartProduct?.map((product) => product.deliveryCharge * product.productQuantity)
 

const finalPrice = priceArray.reduce((price, total)=> price + total,0 )
const totalActualPrice = actualPriceArray.reduce((price, total)=> price + total,0 )
const totalDeliveryCharge = deliveryPriceArray.reduce((price, total)=> price + total,0 )
//  console.log(totalDeliveryCharge);
const totalAmount = totalActualPrice - (totalActualPrice - finalPrice) + totalDeliveryCharge

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleAddressOnChange(address){
    setSelectedAddress(address)
    setOpen(false);
  }


  useEffect(() => {
   
    const fetchAddresses = onSnapshot(collection(db, 'addresses'),
    (snapShot) => {
      let list = []
      snapShot.docs.forEach((doc) => {
        list.unshift({id: doc.id , ...doc.data()})
      })
   
      setAddresses(list)
     
    }, (error) => {
      console.log(error);
    })
    return () => {
      fetchAddresses()
    }
  }, []);

  return (
    <div className={style.mainCartContainer}>
      <div className={style.mainLeft}>
        {/* <div className={style.cartType}>
          <div className={style.active_cart}>Flipkart (3)</div>
          <div>Grocery</div>
        </div> */}
        <div className={style.address}>
          {selectedAddress !== null ? (
            <>
              <div>
                <div className={style.addInfo}>
                  
                  <span>Deliver to: {selectedAddress?.name} {selectedAddress?.phone}</span>
                  <span> {selectedAddress?.typeOfAddress}</span>
                </div>
                <div className={style.mainAddsdiv}>
                  {selectedAddress?.address}, {selectedAddress?.city},{" "}
                  {selectedAddress?.state}({selectedAddress?.pinCode})
                </div>
              </div>
              <div>
                <button onClick={handleClickOpen}>CHANGE</button>
              </div>
            </>
          ) : (
            <>
              <div>From Saved Addresses</div>
              <div>
                <button onClick={handleClickOpen}>Enter Deliver Pincode</button>
              </div>
            </>
          )}
        </div>
        <Dialog  open={open} onClose={handleClose}>
          <DialogTitle >
            {"Select Delivery Address"}
          </DialogTitle>
          <DialogContent >
            <DialogContentText sx={{width:'30vw',}}>
              <div className={style.addressContainer}>
             { loginUseraddress.length === 0 ? <div className={style.noAdd}>
              No any Address saved
              <div>
              <button onClick={() => navigate('/account/address')}>Add Address</button>
              </div>
             
             </div>   : <ul>
                  {loginUseraddress?.map((address) => (
                    <li className={style.addrsContainer} key={address.id}>
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        id={address.id}
                        checked={selectedAddress?.id === address.id}
                        onChange={() => handleAddressOnChange(address)}
                      />

                      <label htmlFor={address.id}>
                        <div className={style.addInfo}>
                          <span>{address.name} {address.phone}</span>
                          <span> {address.typeOfAddress}</span>
                        </div>
                        <div className={style.mainAddsdiv}>
                          {address.address}, {address.city}, {address.state}(
                          {address.pinCode})
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>}
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        {cartProduct?.map((product) => (
          <div className={style.cartItems} key={product.id}>
            <div>
              <div className={style.cartImg}>
                <img src={product.images[0].image} alt="" />
              </div>
              <div className={style.cartDetails}>
                <div>{product.title} </div>
                <div>{product.quantity}</div>
                <div>
                  Seller: SuperComNet{" "}
                {product.assured &&  <span>
                    <img
                      src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                      alt=""
                    />
                  </span>}
                </div>
                <div className={style.cartPrice}>
                  <span>₹{product.actual_price * product.productQuantity}</span>
                  <span>₹{Math.floor(
    (product.actual_price * product.productQuantity )-
      (product.discount_percentage / 100) * (product.actual_price * product.productQuantity )
  )} </span>
                  <span>{product.discount_percentage}% Off</span>
                </div>
              </div>
              <div className={style.cartDelivery}>
                <div>Delivery by 11 PM, Tomorrow |</div>
                <div className={style.deliveryFee}>
                {product.deliveryCharge == 0 ?  <>
                  <span>Free</span>
                  <span>₹{40 * product.productQuantity}</span>
                  </> : <>
                  <span>₹{product.deliveryCharge * product.productQuantity}</span>
                  <span>Free</span>
                  </>}
                
                </div>
              </div>
            </div>
            <div className={style.cartItemQnty}>
              <div className={style.qtybtn}>
                <button>-</button>
                <div> 1 </div>
                <button>+</button>
              </div>
              <div className={style.removeDiv}>
                <button>SAVE FOR LETER</button>
                <button>REMOVE</button>
              </div>
            </div>
          </div>
        ))}

        <div className={style.orderBtn}>
          <button onClick={() => navigate("/checkout")}>PLACE ORDER</button>
        </div>
      </div>

      <div className={style.mainRight}>
        <div className={style.priceDetails}>PRICE DETAILS</div>
        <div className={style.itemsDetails}>
          <div>
            <span>Price (1 item)</span>
            <span>₹{totalActualPrice}</span>
          </div>
          <div>
            <span>Discount</span>
            <span className={style.discPrice}>-₹{totalActualPrice - finalPrice}</span>
          </div>
          <div>
            <span>Delivery Charges</span>
            <span className={style.finalDeliveryFee}>
                {totalDeliveryCharge == 0 ?  <>
                  <span>₹{40 }</span>
                  <span>Free</span>
                  
                  </> : <>
                  <span></span>
                  <span>₹{totalDeliveryCharge}</span>
                 
                  </>}
                
                </span>
          </div>
          <div className={style.border}></div>
          <div>
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>
        <div className={style.save}>You will save ₹{totalActualPrice - finalPrice + totalDeliveryCharge} on this order</div>
      </div>
    </div>
  );
}

export default ViewCart;
