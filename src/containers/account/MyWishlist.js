import React from "react";
import style from "./Account.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import Empty from "../../components/empty/Empty";

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

function MyWishlist() {
  function handleProductClick(i) {
    alert(i);
  }

  if (image.length === 0) {
    return <Empty name="Wishlist" />;
  }

  return (
    <div>
      <div className={style.myReview}>
        My Wishlist <span>(5)</span>
      </div>
      {image.map((product, i) => (
        <div
          key={i}
          className={style.wishProductDiv}
          onClick={() => handleProductClick(i)}
        >
          <div className={style.wishProdImg}>
            <div>
              <img src={product.image} alt="" />
            </div>
          </div>
          <div className={style.wishProdDtls}>
            <div>
              <span>OnePlus Nord CE 2 Lite 5G (Blue Tide, 128 GB)</span>
              <span>
                <DeleteIcon sx={{ color: "gray", fontSize: "1.2rem" }} />
              </span>
            </div>
            <div className={style.wishRate}>
              <span>
                4.4{" "}
                <StarIcon sx={{ fontSize: "1rem", mb: "-2px", ml: "-2px" }} />
              </span>
              <span> (12331) </span>
              <span>
                <img
                  src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                  alt=""
                />
              </span>
            </div>
            <div className={style.newpriceDiv}>
              <div>₹17,449</div>
              <div className={style.oldPrice}>₹1200</div>
              <span>12% off</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyWishlist;
