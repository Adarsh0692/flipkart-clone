import React from 'react'
import style from "./Account.module.css";

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

function MyOrder() {
  return (
    <div>
      <div className={style.myReview}>
        My Orders <span>(5)</span>
      </div>
      {
        image.map((product) => (
            <div className={style.wishProductDiv}>
          <div className={style.orderProdImgDiv}>
            <div>
                <img src={product.image} alt="" />
            </div>
          </div>
          <div className={style.orderProdName}>
            <div> OnePlus Nord CE 2 lite 5G (blue Tide, 128 GB Fouye)</div>
           
            <div>Color: Blue Tide</div>
          </div>
          <div className={style.orderProdPrice}>₹17,449</div>
          <div className={style.orderProdStatus}>
            <div>
                <div className={style.delivered}></div>
                <span>Delivered on May 17</span>
            </div>
            <div>Your item has been delivered </div>
          </div>
      </div>
        ))
      }
      
    </div>
  )
}

export default MyOrder
