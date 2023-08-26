import React from "react";
import style from "./ProductPage.module.css";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from '@mui/icons-material/Favorite';

const images = [
    {
       image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/snack-savourie/d/r/v/-original-imaghfn8j2vrwfcy.jpeg?q=70'
    },
    {
       image: 'https://rukminim2.flixcart.com/image/832/832/l3hmwsw0/nut-dry-fruit/i/1/t/500-premium-cashews-kaju-100-natural-tasty-crunchy-immunity-original-imagehsmewfmmygr.jpeg?q=70'
    },
    {
       image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/edible-seed/6/h/9/-original-imaggrgrzcmv7pmc.jpeg?q=70'
    },
    {
       image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/nut-dry-fruit/j/k/t/-original-imagmkb9jskrcffe.jpeg?q=70'
    },
    {
       image: 'https://rukminim2.flixcart.com/image/612/612/kzhbfrk0/nut-dry-fruit/z/b/7/-original-imagbh7hgctxc3zd.jpeg?q=70'
    },
    {
       image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/nut-dry-fruit/i/t/n/250-gold-makhana-1-pouch-farmley-original-imagqdth9nwgkhdu.jpeg?q=70'
    },
    {
       image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-nut-dry-fruit/q/n/y/500-popular-w400-raw-kaju-1-pouch-farmley-original-imagh8y5sm8yjgpw.jpeg?q=70'
    },
    {
       image: 'https://rukminim2.flixcart.com/image/612/612/l3ahpjk0/nut-dry-fruit/q/i/o/450-dry-fruits-combo-pack-of-walnuts-almonds-cashews-kaju-badam-original-imageg3brrz9jzsy.jpeg?q=70'
    },
    {
       image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/nut-dry-fruit/i/y/p/1-fresh-blueberry-plum-dried-sweet-and-delicious-blueberries-original-imagqdt5zg8pgmzc.jpeg?q=70'
    },
]

function ProductList() {
  return (
    <div className={style.mainList}>
      <div className={style.upperDiv}>
        <div className={style.productType}>
          <h1>Dry Fruit, Nut & seed</h1>
          <span>{`(Showing 1 - 20 products of 1000 products)`}</span>
        </div>
        <div className={style.sortBy}>
          <span>Sort By</span>
          <div className={style.active}>Popularity</div>
          <div>Price -- Low to High</div>
          <div>Price -- High to Low</div>
          <div>Newest First</div>
        </div>
      </div>

       <div className={style.proListDiv}>
       {
            images.map((product,i) => (
                <div className={style.cart}>
        <div key={i} className={style.imgDiv}>
          <img
            src={product.image}
            alt=""
          />
          <span className={style.heart}>
          <FavoriteIcon sx={{color:'lightgray'}}/>
          </span>
         
        </div>
        <div>
          <div className={style.gram}>Sponsored</div>
          <p className={style.discp}>Lorem ipsum dolor sit amet Quod, laudantium! sit amet Quod, laudantium!</p>
          <div className={style.gram}>500 g</div>
          <div className={style.rateDiv}>
            <div>
              4.4 <StarIcon sx={{ fontSize: "1rem" }} />
            </div>
            <span>(1500)</span>
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
              alt=""
            />
          </div>
          <div className={style.newpriceDiv}>
            <div>₹400</div>
            <div className={style.oldPrice}>₹400</div>
            <span>35% off</span>
          </div>
        </div>
      </div>
            ))
        }
       </div>
       
      
    </div>
  );
}

export default ProductList;
