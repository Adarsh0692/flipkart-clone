import React, { useState } from "react";
import style from "./checkout.module.css";
import DoneIcon from "@mui/icons-material/Done";
import { Button } from "@mui/material";

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
const addresses = [
  {
    id: 1,
    name: "Adarsh kushwaha",
    typeOfAddress: "Home",
    HouseName: "Vill- kanpatiyapur makrand nagar kannauj",
    city: "Kannauj",
    pinCode: 209726,
    state: "U.P",
    phone: 2837298987,
  },
  {
    id: 2,
    name: "adarsh kushwaha",
    typeOfAddress: "Home",
    HouseName: "Golden PG, Vithlpur chowkdi",
    city: "Ahmedabad",
    pinCode: 111009,
    state: "Gujarat",
    phone: 2837298956,
  },
];

function CheckOut() {
  const [isStepOneDone, setIsStepOneDone] = useState(true);
  const [isStepTwoDone, setIsStepTwoDone] = useState(false);
  const [isStepThreeDone, setIsStepThreeDone] = useState(false);
  const [isStepFourDone, setIsStepFourDone] = useState(false);
  const [isSetp2Completed, setIsSetp2Completed] = useState(false);
  const [isSetp3Completed, setIsSetp3Completed] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isConfirmOrder, setIsConfirmOrder] = useState(false)
  
  function handleStep1st() {
    setIsStepOneDone(false);
    setIsStepTwoDone(true);
    setIsSetp2Completed(true);
    setIsStepThreeDone(false);
    setIsSetp3Completed(true);
    setIsStepFourDone(false)
  }

  function handleContinueCheckout() {
    setIsStepOneDone(true);
    setIsStepTwoDone(false);
    setIsConfirmOrder(false)
  }
  function handleDeliverHere() {
    setIsStepTwoDone(true);
    setIsSetp2Completed(false);
    setIsStepThreeDone(true);
    setIsSetp3Completed(true);
  }
  function handleAddressChange() {
    setIsStepTwoDone(false);
    setIsStepThreeDone(false);
    setIsSetp3Completed(true);
    setIsStepFourDone(false)
    setIsConfirmOrder(false)
  }
  function handleOrderSummryContinue() {
    setIsSetp3Completed(false);
    setIsStepThreeDone(false);
    setIsStepFourDone(true)
  }
  function handleOrderSummaryChange() {
    setIsStepThreeDone(true);
    setIsStepFourDone(false)
    setIsConfirmOrder(false)
  }

  function handleSelectPaymentOption(){
     setIsConfirmOrder(true)
  }
  return (
    <div className={style.mainCartContainer}>
      <div className={style.mainLeft}>
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
                    <span>Adarsh kushwaha </span>
                    <span> +917275668234</span>
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
                    <span> Adarsh kushwaha</span>
                  </div>
                  <div className={style.loginName}>
                    <span>Phone </span>
                    <span> +917275668234</span>
                  </div>
                  <div className={style.loginLogout}>
                    <span>Logout & Sign in to another account </span>
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
                      {selectedAddress?.name} {selectedAddress?.HouseName},{" "}
                      {selectedAddress.city} {selectedAddress.state}(
                      {selectedAddress.pinCode})
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
            <div className={style.addressContainer}>
              <ul>
                {addresses.map((address) => (
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
                      <div className={style.addInfo}>
                        <span>{address.name}</span>
                        <span> {address.typeOfAddress}</span>
                        <span> {address.phone}</span>
                      </div>
                      <div>
                        {address.HouseName}, {address.city}, {address.state}(
                        {address.pinCode})
                      </div>
                      {selectedAddress?.id === address.id && (
                        <div className={style.deliverHere}>
                          <button onClick={() => handleDeliverHere(address.id)}>
                            DELIVER HERE
                          </button>
                        </div>
                      )}
                    </label>
                    {selectedAddress?.id === address.id && (
                      <div className={style.addEditBtn}>
                        <Button> EDIT</Button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
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
              <input type="radio" name="payment" id="UPI" onChange={handleSelectPaymentOption}/>
              <label htmlFor="UPI">UPI</label>
              </div>
              <div>
              <input type="radio" name="payment" id="wallets" onChange={handleSelectPaymentOption}/>
              <label htmlFor="wallets">Wallets</label>
              </div>
              <div>
              <input type="radio" name="payment" id="card" onChange={handleSelectPaymentOption}/>
              <label htmlFor="card">Credit/Debit/ATM Card</label>
              </div>
              <div>
              <input type="radio" name="payment" id="netBanking" onChange={handleSelectPaymentOption}/>
              <label htmlFor="netBanking">Net Banking</label>
              </div>
              <div>
              <input type="radio" name="payment" id="cash" onChange={handleSelectPaymentOption}/>
              <label htmlFor="cash">Cash on Delivery</label>
              </div>
              
            </div>
           {isConfirmOrder && <div>
              <div className={style.orderBtn}>
                <button onClick={handleOrderSummryContinue}>CONFIRM ORDER</button>
              </div>
            </div>}
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
