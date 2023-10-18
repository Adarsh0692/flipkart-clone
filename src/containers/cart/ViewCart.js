import React, { useEffect, useState } from "react";
import style from "./ViewCart.module.css";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { useSelector } from "react-redux";
import { selectUserID } from "../../redux/authSlice";
import Empty from "../../components/empty/Empty";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { format, addDays } from "date-fns";

function ViewCart() {
  const userID = useSelector(selectUserID);
  const [cartProduct, setCartProducts] = useState([]);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setloading] = useState(false);

  const loginUseraddress = addresses.filter(
    (address) => address.loginUserID === userID
  );

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const priceArray = cartProduct?.map((product) =>
    Math.floor(
      product.actual_price * product.productQuantity -
        (product.discount_percentage / 100) *
          (product.actual_price * product.productQuantity)
    )
  );
  const actualPriceArray = cartProduct?.map(
    (product) => product.actual_price * product.productQuantity
  );
  const deliveryPriceArray = cartProduct?.map(
    (product) => product.deliveryCharge * product.productQuantity
  );

  const finalPrice = priceArray.reduce((price, total) => price + total, 0);
  const totalActualPrice = actualPriceArray?.reduce(
    (price, total) => price + total,
    0
  );
  const totalDeliveryCharge = deliveryPriceArray.reduce(
    (price, total) => price + total,
    0
  );
  const totalAmount =
    totalActualPrice - (totalActualPrice - finalPrice) + totalDeliveryCharge;

    const isSoldOut = cartProduct.find((product) => product.quantity==0)
    // if(isSoldOut){
    //   console.log(isSoldOut);
    // }else{
    //   console.log('isSoldOut');
    // }
    

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleAddressOnChange(address) {
    setSelectedAddress(address);
    setOpen(false);
  }

  async function handleRemove(product) {
    await updateDoc(doc(db, "users", userID), {
      cart: arrayRemove(product),
    });
    toast.success(`Succssesfully removed ${product.title} from your cart.`);
  }

  async function handleQuantity(product, btn) {
    const docRef = doc(db, "users", userID);

    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();
    const updatedCart = docData.cart.map((item) => {
      if (btn === "inc") {
        if (item.id === product.id && item.productQuantity < product.quantity) {
          return {
            ...item,
            productQuantity: item.productQuantity + 1,
          };
       
        }
      } else {
        if (item.id === product.id && item.productQuantity > 1) {
          return {
            ...item,
            productQuantity: item.productQuantity - 1,
          };
  
        }
      }

      return item;
    });

    const updatedData = {
      ...docData,
      cart: updatedCart,
    };

    try {
      await updateDoc(docRef, updatedData);
    
      toast.success(
        `You've chnaged '${product.title}' QUANTITY to '${
          btn === "inc" 
            ? product.productQuantity + 1
            : product.productQuantity - 1
        }' `
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchAddresses = onSnapshot(
      collection(db, "addresses"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.unshift({ id: doc.id, ...doc.data() });
        });

        setAddresses(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      fetchAddresses();
    };
  }, []);

  useEffect(() => {
    const getCartData = async () => {
      setloading(true);
      const cartDoc = onSnapshot(doc(db, "users", userID), (doc) => {
        setCartProducts(doc.data().cart);
        setloading(false);
      });
    };

    if (userID) {
      getCartData();
    }
  }, [userID]);

  if (loading) {
    return (
      <CircularProgress sx={{ ml: "50%", mt: "20%" }} thickness={4} size={40} />
    );
  }

  return (
    <div className={style.mainCartContainer}>
      {cartProduct.length !== 0 ? (
        <>
          <div className={style.mainLeft}>
            <div className={style.address}>
              {selectedAddress !== null ? (
                <>
                  <div>
                    <div className={style.addInfo}>
                      <span>
                        Deliver to: {selectedAddress?.name}{" "}
                        {selectedAddress?.phone}
                      </span>
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
                    <button onClick={handleClickOpen}>
                      Enter Deliver Pincode
                    </button>
                  </div>
                </>
              )}
            </div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>{"Select Delivery Address"}</DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ width: "30vw" }}>
                  <div className={style.addressContainer}>
                    {loginUseraddress.length === 0 ? (
                      <div className={style.noAdd}>
                        No any Address saved
                        <div>
                          <button onClick={() => navigate("/account/address")}>
                            Add Address
                          </button>
                        </div>
                      </div>
                    ) : (
                      <ul>
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
                                <span>
                                  {address.name} {address.phone}
                                </span>
                                <span> {address.typeOfAddress}</span>
                              </div>
                              <div className={style.mainAddsdiv}>
                                {address.address}, {address.city},{" "}
                                {address.state}({address.pinCode})
                              </div>
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
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
                    <div></div>
                    <div>
                      Seller: {product.seller}{" "}
                      {product.assured && (
                        <span>
                          <img
                            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                            alt=""
                          />
                        </span>
                      )}
                    </div>
                  {product.quantity==0 ? <div className={style.sold}>Sold Out</div> : <div className={style.cartPrice}>
                      <span>
                        ₹{product.actual_price * product.productQuantity}
                      </span>
                      <span>
                        ₹
                        {Math.floor(
                          product.actual_price * product.productQuantity -
                            (product.discount_percentage / 100) *
                              (product.actual_price * product.productQuantity)
                        )}{" "}
                      </span>
                      <span>{product.discount_percentage}% Off</span>
                    </div>}
                  </div>
                  <div className={style.cartDelivery}>
                    <div>Delivery by 11 PM, {format(addDays(Date.now(), 2), "eee do MMM")} |</div>
                    <div className={style.deliveryFee}>
                      {product.deliveryCharge == 0 ? (
                        <>
                          <span>Free</span>
                          <span>₹{40 * product.productQuantity}</span>
                        </>
                      ) : (
                        <>
                          <span>
                            ₹{product.deliveryCharge * product.productQuantity}
                          </span>
                          <span>Free</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className={style.cartItemQnty}>
                  <div className={style.qtybtn}>
                 {product.quantity>0 &&  <>
                    <button onClick={() => handleQuantity(product, "dec")}>
                      -
                    </button>
                    <div> {product.productQuantity} </div>
                    <button onClick={() => handleQuantity(product, "inc")}>
                      +
                    </button>
                    </>}
                  </div>
                  <div className={style.removeDiv}>
                    <button>SAVE FOR LETER</button>
                    <button onClick={() => handleRemove(product)}>
                      REMOVE
                    </button>
                  </div>
                </div>
                
              </div>
            ))}

            <div className={style.orderBtn}>
              <button disabled={isSoldOut? true: false} onClick={() => navigate("/checkout")}>PLACE ORDER</button>
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
                <span className={style.discPrice}>
                  -₹{totalActualPrice - finalPrice}
                </span>
              </div>
              <div>
                <span>Delivery Charges</span>
                <span className={style.finalDeliveryFee}>
                  {totalDeliveryCharge == 0 ? (
                    <>
                      <span>₹40</span>
                      <span>Free</span>
                    </>
                  ) : (
                    <>
                      <span></span>
                      <span>₹{totalDeliveryCharge}</span>
                    </>
                  )}
                </span>
              </div>
              <div className={style.border}></div>
              <div>
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
            <div className={style.save}>
              You will save ₹
              {totalActualPrice - finalPrice + +totalDeliveryCharge} on this
              order
            </div>
          </div>
        </>
      ) : (
        <div style={{width:'100vw'}}>
          <Empty name="Cart" />{" "}
        </div>
      )}
    </div>
  );
}

export default ViewCart;
