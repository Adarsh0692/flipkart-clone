import React, { useState } from "react";
import style from "./SingleProduct.module.css";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useParams } from "react-router-dom";
import CalculateTotalRatings from "../ProductPage/CalculateTotalRatings";
import RatingProgressBar from "./RatingProgressBar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import UserReviewsData from "./UserReviewsData";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUserID } from "../../redux/authSlice";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";


function RateReviewSection({ product }) {
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(false);
  const [openImg, setOpenImg] = useState(false);

  const navigate = useNavigate();
  const params = useParams()
  const userID = useSelector(selectUserID)

  let arr = Object.values(product?.stars);
  let maxV = Math.max(...arr);

  const widfor1 = (product.stars[1] / maxV) * 100;
  const widfor2 = (product.stars[2] / maxV) * 100;
  const widfor3 = (product.stars[3] / maxV) * 100;
  const widfor4 = (product.stars[4] / maxV) * 100;
  const widfor5 = (product.stars[5] / maxV) * 100;

  const reviewImg = product?.reviews?.map((prod) => prod.images);
  const allFeedbackImgs = reviewImg?.reduce((acc, currentArray) => {
    return [...acc, ...currentArray];
  }, []);

  const visibleImg = showAll ? allFeedbackImgs : allFeedbackImgs.slice(0, 8);
  const remaingImgCount = allFeedbackImgs.length - visibleImg.length;

  const usersReviews = product?.reviews?.map((rev) => rev);

  const handleOpenImg = () => {
    setOpenImg(true);
  };

  // const handleCloseImg = () => {
  //   setOpenImg(false);
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
     
      <div className={style.rateBar}>
        <div>
          <div className={style.totalRate}>
            <div>
              {product.ratings}
              <p>
                <StarIcon sx={{ fontSize: "1.5rem" }} />
              </p>
            </div>
            {product.ratings > 0 && (
              <span>
                <CalculateTotalRatings ratings={product.stars} /> Ratings &{" "}
              </span>
            )}
            <span>{product.reviews.length} Reviews</span>
          </div>
          <div className={style.Rtbar}>
            <div className={style.star}>
              <ul>
                <li>
                  5{" "}
                  <span>
                    <StarIcon sx={{ fontSize: ".7rem" }} />
                  </span>
                </li>
                <li>
                  4{" "}
                  <span>
                    <StarIcon sx={{ fontSize: ".7rem" }} />
                  </span>
                </li>
                <li>
                  3{" "}
                  <span>
                    <StarIcon sx={{ fontSize: ".7rem" }} />
                  </span>
                </li>
                <li>
                  2{" "}
                  <span>
                    <StarIcon sx={{ fontSize: ".7rem" }} />
                  </span>
                </li>
                <li>
                  1{" "}
                  <span>
                    <StarIcon sx={{ fontSize: ".7rem" }} />
                  </span>
                </li>
              </ul>
            </div>
            <div className={style.bars}>
              <ul>
                <li>
                  <RatingProgressBar color={"#388e3c"} width={widfor5} />
                </li>
                <li>
                  <RatingProgressBar color={"#388e3c"} width={widfor4} />
                </li>
                <li>
                  <RatingProgressBar color={"#388e3c"} width={widfor3} />
                </li>
                <li>
                  <RatingProgressBar color={"#ff9f00"} width={widfor2} />
                </li>
                <li>
                  <RatingProgressBar color={"#ff6161"} width={widfor1} />
                </li>
              </ul>
            </div>
            <div className={style.noOfReview}>
              <ul>
                <li>
                  <span>{product.stars[5]}</span>
                </li>
                <li>
                  <span>{product.stars[4]}</span>
                </li>
                <li>
                  <span>{product.stars[3]}</span>
                </li>
                <li>
                  <span>{product.stars[2]}</span>
                </li>
                <li>
                  <span>{product.stars[1]}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={style.feedback}>
        <div className={style.feedbackImgs}>
          {visibleImg.map((img, index) => (
            <div key={index}>
              <div className={style.uplaodedimg} onClick={handleOpenImg}>
                <img src={img.image} alt="" />
                {remaingImgCount > 0 && index === visibleImg.length - 1 && (
                  <div
                    className={style.remainingCount}
                    onClick={handleClickOpen}
                  >
                    + {remaingImgCount}
                  </div>
                )}
              </div>
              {/* <Dialog
                        open={openImg}
                        onClose={handleCloseImg}
                        aria-labelledby="responsive-dialog-title"
                      >
                        <DialogTitle id="responsive-dialog-title">
                          {"Use Google's location service?"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            
                          </DialogContentText>
                        </DialogContent>
                      </Dialog> */}
            </div>
          ))}
        </div>

        <div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{`User Images (${allFeedbackImgs.length})`}</DialogTitle>
            <DialogContent>
              <DialogContentText className={style.feedbackAllImgs}>
                {allFeedbackImgs.map((img) => (
                  <div className={style.uplaodedAllImg}>
                    <img src={img.image} alt="" />
                  </div>
                ))}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <UserReviewsData usersReviews={usersReviews}/>
    </div>
  );
}

export default RateReviewSection;
