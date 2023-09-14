import React, { useState } from "react";
import style from "./SingleProduct.module.css";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";

function WriteReview() {
  const [value, setValue] = useState();

  const labels = {
    1: "Very Bad",
    2: "Bad",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };
  return (
    <div className={style.mainwapperReview}>
      <div className={style.reviwProd}>
        <div className={style.rateRev}>Rating & Reviews</div>
        <div className={style.prDiv}>
          <div className={style.revProdTitle}>
            <div>OnePlus Nord CE 2 Lite 5G sfserfse</div>
            <div className={style.revRateDiv}>
              <div>
                4.4 <StarIcon sx={{ fontSize: "1rem" }} />
              </div>
              <div>(1,22,343)</div>
            </div>
          </div>
          <div className={style.revImgDiv}>
            <img
              src="https://rukminim2.flixcart.com/image/612/612/xif0q/nut-dry-fruit/j/k/t/-original-imagmkb9jskrcffe.jpeg?q=70"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className={style.bottomSec}>
        <div className={style.whatRev}>
          <div>What makes a good review</div>
          <div className={style.quesDiv}>
            <span>Have you used this products?</span>
            <p>Your review should be about your expirence with the product.</p>
          </div>
          <div className={style.quesDiv}>
            <span>Why review a product?</span>
            <p>Your valuable feedback will help fellow shoppers decide!</p>
          </div>
          <div className={style.quesDiv}>
            <span>How to review a product?</span>
            <p>
              Your review should include facts. An honest opinion is always
              appreciated. If you have an issue with the product or service
              please contact us from the help centre.
            </p>
          </div>
        </div>
        <div className={style.revFormSec}>
          <div className={style.starDiv}>
            <div>Rate this product</div>
            <div className={style.selStar}>
              <div>
                <Rating
                  size="large"
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />

                <span>{labels[value]}</span>
              </div>
              <span>Your rating has been saved</span>
            </div>
          </div>
          <div className={style.desDiv}>
            <div>Review this product</div>
            <div className={style.revDesc}>
              <div className={style.desErr}>
                <span>Description</span>
                <span>Description cannot be empty</span>
              </div>

              <textarea name="" rows="6" placeholder="Description..."></textarea>
            </div>
            <div className={style.titleDiv}>
               <div>Title (optional)</div>
               <input type="text" />
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default WriteReview;
