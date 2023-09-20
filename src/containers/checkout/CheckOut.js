import React, { useEffect, useRef, useState } from "react";
import style from "./checkout.module.css";
import DoneIcon from "@mui/icons-material/Done";
import { Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import AddressForm from "../profile/AddressForm";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { selectUserID, setLogoutUser, setUser } from "../../redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { collection, onSnapshot } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";

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

function CheckOut() {
  const currentUser = useSelector((state) => state.auth);
  const userID = useSelector(selectUserID);

  const [addresses, setAddAddress] = useState([]);

  const loginUseraddress = addresses.filter(
    (address) => address.loginUserID === userID
  );

  const [isStepOneDone, setIsStepOneDone] = useState(currentUser.userName);
  const [isStepTwoDone, setIsStepTwoDone] = useState(false);
  const [isStepThreeDone, setIsStepThreeDone] = useState(false);
  const [isStepFourDone, setIsStepFourDone] = useState(false);
  const [isSetp2Completed, setIsSetp2Completed] = useState(false);
  const [isSetp3Completed, setIsSetp3Completed] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isConfirmOrder, setIsConfirmOrder] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);

  const [showAllAddress, setShowAllAddress] = useState(false);
  const [showDeliverBtn, setShowDeliverBtn] = useState(true);
  const [isEditAddress, setIsEditAddress] = useState(false);
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Eerr, setEerr] = useState("");

  const toastId = useRef(null);
  const dispatch = useDispatch();

  // console.log(selectedDeliveryAddress);

  function handleEmailOnBlurr(e) {
    let value = e.target.value;

    if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value)) {
      setEerr("");
    } else {
      setEerr("Please enter valid Email ID");
    }
  }

  function handleLogin() {
    if (!Eerr) {
      setLoading(true)
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          setLoading(false)
          dispatch(
            setUser({
              userName: res.user.displayName,
              userEmail: res.user.email,
            })
          );
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.success("Success! You're logged in.");
          }
          setEmail("");
          setPassword("");
          handleContinueCheckout();
        })
        .catch((error) => {
          setLoading(false)
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.error("Invalid credentails!");
          }
        });
    }
  }

  function handleLogout() {
    signOut(auth)
      .then((res) => {
        dispatch(setLogoutUser());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleStep1st() {
    setIsStepOneDone(false);
    setIsStepTwoDone(true);
    setIsSetp2Completed(true);
    setIsStepThreeDone(false);
    setIsSetp3Completed(true);
    setIsStepFourDone(false);
  }

  function handleContinueCheckout() {
    setIsStepOneDone(true);
    setIsStepTwoDone(false);
    setIsConfirmOrder(false);
  }

  // for Delivery Address step

  const initialAddress = {
    name: "",
    typeOfAddress: "",
    address: "",
    city: "",
    pinCode: "",
    state: "",
    phone: "",
    loginUserID: userID,
  };

  const [currentaddress, setCurrentAddress] = useState(initialAddress);

  function handleHideForm() {
    setIsEditAddress(false);
    setShowDeliverBtn(true);
    setIsAddAddress(false);
    setCurrentAddress(initialAddress);
  }

  function handleOpenEditForm(address) {
    setCurrentAddress(address);
    setIsEditAddress(true);
    setShowDeliverBtn(false);
    setIsAddAddress(false);
  }

  function handleOpenAddForm() {
    setIsAddAddress(true);
    setCurrentAddress(initialAddress);
    setIsEditAddress(false);
  }

  function handleDeliverHere(address) {
    setSelectedDeliveryAddress(address);
    setIsStepTwoDone(true);
    setIsSetp2Completed(false);
    setIsStepThreeDone(true);
    setIsSetp3Completed(true);
  }
  function handleAddressChange() {
    setIsStepTwoDone(false);
    setIsStepThreeDone(false);
    setIsSetp3Completed(true);
    setIsStepFourDone(false);
    setIsConfirmOrder(false);
  }
  function handleOrderSummryContinue() {
    setIsSetp3Completed(false);
    setIsStepThreeDone(false);
    setIsStepFourDone(true);
  }
  function handleOrderSummaryChange() {
    setIsStepThreeDone(true);
    setIsStepFourDone(false);
    setIsConfirmOrder(false);
  }

  function handleOnChangePaymentOptions(e) {
    setSelectedPaymentMethod(e.target.value);
    setIsConfirmOrder(true);
  }

  function handleOrderConfirm() {
    console.log(`selected Option: ${selectedPaymentMethod}`);
    // console.log(`selected addres: ${selectedDeliveryAddress}`);
    console.log(selectedDeliveryAddress);
  }

  useEffect(() => {
    if (!currentUser.userName) {
      handleStep1st();
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchAddresses = onSnapshot(
      collection(db, "addresses"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.unshift({ id: doc.id, ...doc.data() });
        });
        setLoading(false);
        setAddAddress(list);
      },
      (error) => {
        setLoading(false);
        console.log(error);
      }
    );
    return () => {
      fetchAddresses();
    };
  }, []);

  return (
    <div className={style.mainCartContainer}>
      <div className={style.mainLeft}>
        {currentUser.userName ? (
          <div>
            {isStepOneDone ? (
              <>
                <div className={style.cartType}>
                  <div className={style.step1}>
                    <span>1</span>
                  </div>
                  <div className={style.logintick}>
                    <div>
                      LOGIN{" "}
                      <span>
                        <DoneIcon sx={{ color: "#2874f0" }} />
                      </span>
                    </div>
                    <div>
                      <span>{currentUser.userName} - </span>
                      <span> {currentUser.userEmail}</span>
                    </div>
                  </div>
                  <div>
                    <button onClick={handleStep1st}>CHANGE</button>
                  </div>{" "}
                </div>
              </>
            ) : (
              <div className={style.loginStep}>
                <div className={style.steps}>
                  <div className={style.step1}>
                    <span>1</span>
                  </div>
                  <span className={style.login1}>LOGIN</span>
                </div>
                <div className={style.loginDetails}>
                  <div>
                    <div className={style.loginName}>
                      <span>Name </span>
                      <span> {currentUser.userName}</span>
                    </div>
                    <div className={style.loginName}>
                      <span>Email </span>
                      <span> {currentUser.userEmail}</span>
                    </div>
                    <div className={style.loginLogout}>
                      <span onClick={handleLogout}>
                        Logout & Sign in to another account{" "}
                      </span>
                    </div>
                    <div className={style.loginConBtn}>
                      <button onClick={handleContinueCheckout}>
                        CONTINUE CHECKOUT
                      </button>
                    </div>
                  </div>
                  <div className={style.plsNote}>
                    Please note that upon clicking "Logout" you will lose all
                    items in cart and will be redirected to Flipkart home page.
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={style.loginStep}>
            <div className={style.steps}>
              <div className={style.step1}>
                <span>1</span>
              </div>
              <span className={style.login1}>LOGIN OR SIGNUP</span>
            </div>
            <div className={style.loginDetails}>
              <div className={style.loginForm}>
                <div className={style.loginName}>
                  <TextField
                    label="Enter Your Email Address"
                    variant="standard"
                    sx={{ width: "100%" }}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEerr("");
                    }}
                    onBlur={handleEmailOnBlurr}
                  />
                  {Eerr && <p className={style.error}> {Eerr}</p>}
                </div>
                <div className={style.loginName}>
                  <TextField
                    type="password"
                    label="Enter Your Password"
                    variant="standard"
                    sx={{ width: "100%" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className={style.terms}>
                  By continuing, you agree to Flipkart's{" "}
                  <span>Terms of Use</span> and <span>Privacy Policy.</span>
                </div>

                <div className={style.loginConBtn}>
                  <button disabled={loading} onClick={handleLogin}>{ loading? <CircularProgress color="inherit" thickness={5} size={30}/> : "CONTINUE"}</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isStepTwoDone ? (
          <div className={style.address}>
            <div className={style.stepNo}>
              <span>2</span>
              {isSetp2Completed ? (
                <div>DELIVERY ADDRESS </div>
              ) : (
                <div className={style.selectedAddrs}>
                  <div>
                    DELIVERY ADDRESS <DoneIcon sx={{ color: "#2874f0" }} />
                    <p>
                      {selectedAddress?.name} {selectedAddress?.address}{" "}
                      {selectedAddress?.city} {selectedAddress?.state}
                      {selectedAddress?.pinCode}
                    </p>
                  </div>
                  <div>
                    <button onClick={handleAddressChange}>CHANGE</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className={style.steps}>
              <div className={style.step1}>
                <span>2</span>
              </div>
              <span className={style.login1}>DELIVERY ADDRESS</span>
            </div>
            {isEditAddress && (
              <AddressForm
                formType="EDIT ADDRESS"
                handleHideForm={handleHideForm}
                currentaddress={currentaddress}
                setCurrentAddress={setCurrentAddress}
                setAddAddress={setAddAddress}
              />
            )}

            {loading ? (
              <div className={style.loaderDiv}>
                <div>
                  <CircularProgress size={20} /> Loading...
                </div>
              </div>
            ) : (
              <div className={style.addressContainer}>
                <ul>
                  {loginUseraddress
                    .slice(0, showAllAddress ? loginUseraddress.length : 3)
                    .map((address) => (
                      <li className={style.addrsContainer} key={address.id}>
                        <input
                          type="radio"
                          name="address"
                          value={address.id}
                          id={address.id}
                          checked={selectedAddress?.id === address.id}
                          onChange={() => setSelectedAddress(address)}
                        />

                        <label htmlFor={address.id}>
                          <div className={style.editBtnDiv}>
                            <div className={style.addInfo}>
                              <span>{address.name}</span>
                              <span> {address.typeOfAddress}</span>
                              <span> {address.phone}</span>
                            </div>
                            <div>
                              {selectedAddress?.id === address.id &&
                                showDeliverBtn && (
                                  <div className={style.addEditBtn}>
                                    <button
                                      onClick={() =>
                                        handleOpenEditForm(address)
                                      }
                                    >
                                      {" "}
                                      EDIT
                                    </button>
                                  </div>
                                )}
                            </div>
                          </div>
                          <div>
                            {address.address}, {address.city}, {address.state}(
                            {address.pinCode})
                          </div>

                          {selectedAddress?.id === address.id &&
                            showDeliverBtn && (
                              <div className={style.deliverHere}>
                                <button
                                  onClick={() => handleDeliverHere(address)}
                                >
                                  DELIVER HERE
                                </button>
                              </div>
                            )}
                        </label>
                      </li>
                    ))}
                </ul>
                {!showAllAddress && loginUseraddress.length > 3 && (
                  <div
                    className={style.showAddressDiv}
                    onClick={() => setShowAllAddress(true)}
                  >
                    <span>
                      <ExpandMoreIcon />
                    </span>
                    <span>View all {loginUseraddress.length} addresses</span>
                  </div>
                )}
              </div>
            )}
            {isAddAddress ? (
              <AddressForm
                formType="ADD A NEW ADDRESS"
                handleHideForm={handleHideForm}
                currentaddress={currentaddress}
                setCurrentAddress={setCurrentAddress}
                addresses={addresses}
                setAddAddress={setAddAddress}
              />
            ) : (
              <div className={style.showAddressDiv} onClick={handleOpenAddForm}>
                <span>
                  <AddIcon />
                </span>
                <span> Add a new address</span>
              </div>
            )}
          </div>
        )}

        {isStepThreeDone ? (
          <div className={style.orderSummery}>
            <div className={style.steps}>
              <div className={style.step1}>
                <span>3</span>
              </div>
              <span className={style.login1}>ORDER SUMMARY</span>
            </div>
            <div>
              {image.map((item) => (
                <div className={style.cartItems}>
                  <div>
                    <div className={style.cartImg}>
                      <img src={item.image} alt="" />
                    </div>
                    <div className={style.cartDetails}>
                      <div>Happilo Premium Natural Californian Almonds </div>
                      <div>200g</div>
                      <div>
                        Seller: SuperComNet{" "}
                        <span>
                          <img
                            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                            alt=""
                          />
                        </span>
                      </div>
                      <div className={style.cartPrice}>
                        <span>₹275</span>
                        <span>₹195</span>
                        <span>29% Off</span>
                      </div>
                    </div>
                    <div className={style.cartDelivery}>
                      <div>Delivery by 11 PM, Tomorrow |</div>
                      <div className={style.deliveryFee}>
                        <span>Free</span>
                        <span>₹70</span>
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
            </div>
            <div>
              <div className={style.orderBtn}>
                <button onClick={handleOrderSummryContinue}>CONTINUE</button>
              </div>
            </div>
          </div>
        ) : (
          <div className={style.address}>
            <div className={style.stepNo}>
              <span>3</span>
              {isSetp3Completed ? (
                <div>ORDER SUMMARY </div>
              ) : (
                <div className={style.selectedAddrs}>
                  <div>
                    ORDER SUMMARY <DoneIcon sx={{ color: "#2874f0" }} />
                    <p> {image.length} Item</p>
                  </div>
                  <div className={style.orderSummryChangeBtn}>
                    <button onClick={handleOrderSummaryChange}>CHANGE</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {isStepFourDone ? (
          <div>
            <div className={style.steps}>
              <div className={style.step1}>
                <span>4</span>
              </div>
              <span className={style.login1}>PAYMENT OPTIONS</span>
            </div>
            <div className={style.paymentsOptions}>
              <div>
                <input
                  type="radio"
                  name="payment"
                  id="UPI"
                  value="UPI"
                  checked={selectedPaymentMethod === "UPI"}
                  onChange={handleOnChangePaymentOptions}
                />
                <label htmlFor="UPI">UPI</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="payment"
                  id="wallets"
                  value="Wallets"
                  checked={selectedPaymentMethod === "Wallets"}
                  onChange={handleOnChangePaymentOptions}
                />
                <label htmlFor="wallets">Wallets</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="payment"
                  id="card"
                  value="Card"
                  checked={selectedPaymentMethod === "Card"}
                  onChange={handleOnChangePaymentOptions}
                />
                <label htmlFor="card">Credit/Debit/ATM Card</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="payment"
                  id="netBanking"
                  value="Net-Banking"
                  checked={selectedPaymentMethod === "Net-Banking"}
                  onChange={handleOnChangePaymentOptions}
                />
                <label htmlFor="netBanking">Net Banking</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="payment"
                  id="cash"
                  value="Cash on Delivery"
                  checked={selectedPaymentMethod === "Cash on Delivery"}
                  onChange={handleOnChangePaymentOptions}
                />
                <label htmlFor="cash">Cash on Delivery</label>
              </div>
            </div>
            {isConfirmOrder && (
              <div>
                <div className={style.orderBtn}>
                  <button onClick={handleOrderConfirm}>CONFIRM ORDER</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={style.address}>
            <div className={style.stepNo}>
              <span>4</span>
              <div>PAYMENT OPTIONS</div>
            </div>
          </div>
        )}
      </div>

      <div className={style.mainRight}>
        <div className={style.priceDetails}>PRICE DETAILS</div>
        <div className={style.itemsDetails}>
          <div>
            <span>Price (1 item)</span>
            <span>₹275</span>
          </div>
          <div>
            <span>Discount</span>
            <span className={style.discPrice}>-₹69</span>
          </div>
          <div>
            <span>Delivery Charges</span>
            <span>₹40</span>
          </div>
          <div className={style.border}></div>
          <div>
            <span>Total Amount</span>
            <span>₹246</span>
          </div>
        </div>
        <div className={style.save}>You will save ₹29 on this order</div>
      </div>
    </div>
  );
}

export default CheckOut;
