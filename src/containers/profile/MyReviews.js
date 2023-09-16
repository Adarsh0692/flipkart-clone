import React from "react";
import style from "./Account.module.css";
import StarIcon from "@mui/icons-material/Star";

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

function MyReviews() {
  return (
    <div>
      <div className={style.myReview}>
        My Reviews <span>(3)</span>
      </div>
      {image.map((product) => (
        <div className={style.mainProductDiv}>
          <div className={style.reviewImgDiv}>
            <div>
              <img src={product.image} alt="" />
            </div>
          </div>
          <div className={style.reviewProDtlsDiv}>
            <div>HP x1000 Wired Optical Mouse</div>
            <div className={style.revRate}>
              <span>
                {" "}
                3 <StarIcon sx={{ fontSize: "1rem", mb: "-2px", ml: "-2px" }} />
              </span>

              <span>Decent product</span>
            </div>
            <div>Good but so small in size</div>
            <div>
              Adarsh kushwaha
              <span>08 jul, 2022</span>
            </div>
            <div>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyReviews;
