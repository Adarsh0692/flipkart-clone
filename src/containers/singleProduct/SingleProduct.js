import React, { useState } from "react";
import style from "./SingleProduct.module.css";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
function SingleProduct() {
  const [imgindex, setImgIndex] = useState(0);

  function handleimgIndex(i) {
    setImgIndex(i);
  }
  return (
    <>
      <div className={style.prodMainContainer}>
        <div className={style.imageContainer}>
          <div className={style.singleProLeftSide}>
            <div className={style.imgMap}>
              {image.map((img, i) => (
                <div key={i} className={`${style.imgDiv} `}>
                  <img
                    src={img.image}
                    alt="img"
                    onMouseEnter={() => handleimgIndex(i)}
                  />
                </div>
              ))}
            </div>

            <div className={style.showImg}>
              <img src={image[imgindex].image} alt="" />
              <div className={style.fav}>
                <span><FavoriteIcon sx={{fontSize:'1.2rem',color:'lightgray'}}/></span>
              </div>
            </div>
          </div>
          <div className={style.cartBtn}>
            <button>
              <ShoppingCartIcon />
              ADD TO CART
            </button>
            <button>
              <FlashOnIcon />
              BUY NOW
            </button>
          </div>
        </div>
        <div className={style.discription}></div>
      </div>
    </>
  );
}

export default SingleProduct;
