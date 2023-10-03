import React, { useState, useEffect } from 'react';
import style from "./SingleProduct.module.css";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReactTimeAgo from 'react-time-ago'

function UserReviewsData({usersReviews}) {


  return (
    <div>
      {usersReviews.reverse().map((user, i) => (
        <div className={style.userReview} key={i}>
          <div className={style.row}>
            <div
              style={{
                backgroundColor:
                  user.rate >= 3 ? "green" : user.rate >= 2 ? "orange" : "red",
              }}
            >
              {user.rate}
              <span>
                <StarIcon sx={{ fontSize: ".8rem" }} />
              </span>
            </div>
            <span>{user.title}</span>
          </div>
          <div className={style.userDes}>
            <div>{user.description}</div>
          </div>
          <div className={style.userImgconter}>
            {user.images.map((img) => (
              <div className={style.userImg}>
                <img src={img.image} alt="" />
              </div>
            ))}
          </div>

          <div className={style.userDetailsDiv}>
            <div className={style.userName}>
              <p>{user.buyerName}</p>
              <span>
                <CheckCircleIcon sx={{ fontSize: "1rem" }} />
              </span>
              <p>Certified Buyer</p>
              <p><ReactTimeAgo date={user.time} locale="en-US"/></p> {/* Use the dynamic time ago here */}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserReviewsData
