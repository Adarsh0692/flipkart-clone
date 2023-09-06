import React from "react";
import style from "./ViewCart.module.css";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()
  return (
    <div className={style.mainCartContainer}>
      <div className={style.mainLeft}>
        <div className={style.cartType}>
          <div className={style.active_cart}>Flipkart (3)</div>
          <div>Grocery</div>
        </div>
        <div className={style.address}>
          <div>From Saved Addresses</div>
          <div>
            <button>Enter Deliver Pincode</button>
          </div>
        </div>
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

        <div className={style.orderBtn}>
          <button onClick={() => navigate('/checkout')}>PLACE ORDER</button>
        </div>
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
        <div className={style.save}>
          You will save ₹29 on this order
        </div>
      </div>
    </div>
  );
}

export default ViewCart;
