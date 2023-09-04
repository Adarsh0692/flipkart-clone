import React, { useState } from "react";
import style from "./SingleProduct.module.css";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RatingProgressBar from "./RatingProgressBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

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

const feedbakImages = [
  {
    image:
      "https://rukminim1.flixcart.com/blobio/1160/1160/imr-202007/blobio-imr-202007_0459019940744823b85e45691fa60b94.jpg?q=90",
  },
  {
    image:
      "https://rukminim1.flixcart.com/blobio/1160/1160/imr-202007/blobio-imr-202007_e5a44e1acc764529ab2df462f7d34419.jpg?q=90",
  },
  {
    image:
      "https://rukminim1.flixcart.com/blobio/1160/1160/201904/blobio-201904_fm1jn5f9.jpg?q=90",
  },
  {
    image:
      "https://rukminim1.flixcart.com/blobio/1160/1160/imr-202007/blobio-imr-202007_0459019940744823b85e45691fa60b94.jpg?q=90",
  },
  {
    image:
      "https://rukminim1.flixcart.com/blobio/1160/1160/imr-202007/blobio-imr-202007_0459019940744823b85e45691fa60b94.jpg?q=90",
  },
  {
    image:
      "https://rukminim1.flixcart.com/blobio/1160/1160/imr-202007/blobio-imr-202007_0459019940744823b85e45691fa60b94.jpg?q=90",
  },
  {
    image:
      "https://rukminim1.flixcart.com/blobio/1160/1160/imr-202007/blobio-imr-202007_0459019940744823b85e45691fa60b94.jpg?q=90",
  },
  {
    image:
      "https://rukminim1.flixcart.com/blobio/1160/1160/imr-202007/blobio-imr-202007_0459019940744823b85e45691fa60b94.jpg?q=90",
  },
  {
    image:
      "https://rukminim1.flixcart.com/blobio/1160/1160/imr-202007/blobio-imr-202007_0459019940744823b85e45691fa60b94.jpg?q=90",
  },
  {
    image:
      "https://rukminim1.flixcart.com/blobio/1160/1160/imr-202007/blobio-imr-202007_0459019940744823b85e45691fa60b94.jpg?q=90",
  },
];

const userImg = [
  {
    image: 'https://rukminim1.flixcart.com/blobio/1160/1160/imr-202007/blobio-imr-202007_0459019940744823b85e45691fa60b94.jpg?q=90'
  },
  {
    image:
      "https://rukminim1.flixcart.com/blobio/1160/1160/imr-202007/blobio-imr-202007_e5a44e1acc764529ab2df462f7d34419.jpg?q=90",
  },
  {
    image:
      "https://rukminim1.flixcart.com/blobio/1160/1160/201904/blobio-201904_fm1jn5f9.jpg?q=90",
  },
]

const ratings = {
  "5star": 32,
  "4star": 14,
  "3star": 5,
  "2star": 0,
  "1star": 5,
};

// Logic For get width of rating bar according to user rate..==>
let arr = Object.values(ratings)
let maxV = Math.max(...arr)

const widfor1 = ratings['1star'] / maxV * 100
const widfor2 = ratings['2star'] / maxV * 100
const widfor3 = ratings['3star'] / maxV * 100
const widfor4 = ratings['4star'] / maxV * 100
const widfor5 = ratings['5star'] / maxV * 100

function SingleProduct() {
  const [imgindex, setImgIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const visibleImg = showAll ? feedbakImages : feedbakImages.slice(0, 8);
  const remaingImgCount = feedbakImages.length - visibleImg.length;
  // console.log(remaingImgCount);

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
                <span>
                  <FavoriteIcon
                    sx={{ fontSize: "1.2rem", color: "lightgray" }}
                  />
                </span>
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
        <div className={style.discription}>
          <div className={style.prodDetails}>
            <span>
              Saffola Rolled Oats,Creamy 100% Natural, High Protein & Fibre,
              Healthy Cereal, Pouch (1 kg)
            </span>
            <div className={style.rateDiv}>
              <div>
                4.4 <StarIcon sx={{ fontSize: "1rem" }} />
              </div>
              <span>1234 Rating </span> <span>&</span> <span>1223 Reviews</span>
              <img
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                alt=""
              />
            </div>
            <div className={style.priceDiv}>
              <div>₹211</div>
              <span>₹230</span>
              <div>5% Off</div>
            </div>
            <div className={style.offerDiv}>
              <span>Available offers</span>
              <div>
                <span>
                  <LocalOfferIcon
                    sx={{ color: "green", fontSize: "1.2rem", mr: "10px" }}
                  />{" "}
                  Eligible for Flipkart Pay Later <span> T&C</span>
                </span>
                <span>
                  <LocalOfferIcon
                    sx={{ color: "green", fontSize: "1.3rem", mr: "10px" }}
                  />{" "}
                  Buy for 100 get ₹100 off your Next Buy <span> T&C</span>
                </span>
                <span>
                  <LocalOfferIcon
                    sx={{ color: "green", fontSize: "1.3rem", mr: "10px" }}
                  />{" "}
                  Buy this product & get Rs.150 off on your next purchase of
                  Water Geysers <span> T&C</span>
                </span>
                <span>
                  <LocalOfferIcon
                    sx={{ color: "green", fontSize: "1.3rem", mr: "10px" }}
                  />{" "}
                  Bank Offer5% Cashback on Flipkart Axis Bank Card{" "}
                  <span> T&C</span>
                </span>
              </div>
            </div>
            <div className={style.deliver}>
              <span>Delivery</span>
              <div className={style.loc}>
                <span>
                  <LocationOnIcon
                    sx={{ fontSize: "1.2rem", color: "#2874f0" }}
                  />
                </span>
                <input type="text" placeholder="Enter Delivery Pincode" />
                <button>Check</button>
              </div>
            </div>
            <div className={style.deliver}>
              <span>Quantity</span>
              <div>
                <span>1 Kg</span>
              </div>
            </div>
            <div className={style.deliver}>
              <span>Services</span>
              <div className={style.service}>
                <span>₹</span>
                <span>Cash on Delivery available</span>
              </div>
            </div>
            <div className={style.impt}>
              <div>Important Note</div>

              <span>
                The colour and design of the delivered product may slightly vary
                from what is shown in the image.
              </span>
            </div>
            <div className={style.desc}>
              <div>Description</div>

              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                impedit aliquid blanditiis sint eveniet perferendis, omnis
                aperiam ducimus vel magnam distinctio voluptate corrupti fugit
                architecto ad sit aliquam. Ab maiores ipsa asperiores voluptatum
                velit quos perspiciatis similique adipisci doloribus deserunt.
              </div>
            </div>
            <div className={style.spTable}>
              <div>Specifications</div>
              <div className={style.gnTable}>
                In The Box
                <table>
                  <tbody>
                    <tr className={style.inBox}>
                      <td>Pack of</td>
                      <td>
                        <ul>
                          <li>1</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={style.gnTable}>
                General
                <table>
                  <tbody>
                    <tr className={style.tbody}>
                      <td>Brand</td>
                      <td>
                        <ul>
                          <li>Saffola</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className={style.tbody}>
                      <td>Brand</td>
                      <td>
                        <ul>
                          <li>
                            Rolled Oats,Creamy 100% Natural, High Protein &
                            Fibre, Healthy Cereal,
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr className={style.tbody}>
                      <td>Brand</td>
                      <td>
                        <ul>
                          <li>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Omnis eum dolores unde vel hic, officia neque
                            error id nisi placeat?
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                Legal Disclaimer
                <table>
                  <tbody>
                    <tr className={style.tbody}>
                      <td>Important Note</td>
                      <td>
                        <ul>
                          <li>
                            Flipkart endeavors to ensure the accuracy of the
                            information about the products. It is pertinent to
                            note that, actual product packaging and materials
                            may contain more and/or different information which
                            may include nutritional information/allergen
                            declaration/special instruction for intended
                            use/warning/directions etc. We recommend the
                            consumers to always read the label carefully before
                            using or consuming any products. Please do not
                            solely rely on the information provided on this
                            website. For additional information, please contact
                            the manufacturer.
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={style.reviewSection}>
              <div className={style.rateTopDiv}>
                <div>Rating & Reviews</div>
                <button>Rate Product</button>
              </div>
              <div className={style.rateBar}>
                <div>
                  <div className={style.totalRate}>
                    <div>
                      4.4{" "}
                      <p>
                        <StarIcon sx={{ fontSize: "2rem" }} />
                      </p>
                    </div>
                    <span>23132222 Ratings & </span>
                    <span>2132 Reviews</span>
                  </div>
                  <div className={style.Rtbar}>
                    <div className={style.star}>
                      <ul>
                        <li>
                          5{" "}
                          <span>
                            <StarIcon sx={{ fontSize: ".8rem" }} />
                          </span>
                        </li>
                        <li>
                          4{" "}
                          <span>
                            <StarIcon sx={{ fontSize: ".8rem" }} />
                          </span>
                        </li>
                        <li>
                          3{" "}
                          <span>
                            <StarIcon sx={{ fontSize: ".8rem" }} />
                          </span>
                        </li>
                        <li>
                          2{" "}
                          <span>
                            <StarIcon sx={{ fontSize: ".8rem" }} />
                          </span>
                        </li>
                        <li>
                          1{" "}
                          <span>
                            <StarIcon sx={{ fontSize: ".8rem" }} />
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
                          <RatingProgressBar color={"#388e3c"} width={widfor4}/>
                        </li>
                        <li>
                          <RatingProgressBar color={"#388e3c"} width={widfor3}/>
                        </li>
                        <li>
                          <RatingProgressBar color={"#ff9f00"} width={widfor2}/>
                        </li>
                        <li>
                          <RatingProgressBar color={"#ff6161"} width={widfor1}/>
                        </li>
                      </ul>
                    </div>
                    <div className={style.noOfReview}>
                      <ul>
                        <li>
                          <span>{ratings["5star"]}</span>
                        </li>
                        <li>
                          <span>{ratings["4star"]}</span>
                        </li>
                        <li>
                          <span>{ratings["3star"]}</span>
                        </li>
                        <li>
                          <span>{ratings["2star"]}</span>
                        </li>
                        <li>
                          <span>{ratings["1star"]}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.feedback}>
                <div className={style.feedbackImgs}>
                  {visibleImg.map((img, index) => (
                    <div className={style.uplaodedimg}>
                      <img src={img.image} alt="" />
                      {remaingImgCount > 0 &&
                        index === visibleImg.length - 1 && (
                          <div
                            className={style.remainingCount}
                            onClick={handleClickOpen}
                          >
                            + {remaingImgCount}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
                {/* user images dailog  */}
                <div>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{`User Images (${feedbakImages.length})`}</DialogTitle>
                    <DialogContent>
                      <DialogContentText className={style.feedbackAllImgs}>
                       {
                        feedbakImages.map((img) => (
                          <div className={style.uplaodedAllImg}>
                            <img src={img.image} alt="" />
                          </div>
                        ))
                       }
                      </DialogContentText>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className={style.userReview}>
                <div className={style.row}>
                  <div>4 <span><StarIcon sx={{fontSize:'1rem'}}/></span></div>
                  <span>Good Product</span>
                </div>
                <div>
                  <div>170 almonds are there</div>
                </div>
                <div className={style.userImgconter}>
                    {
                      userImg.map((img) => (
                        <div className={style.userImg}>
                          <img src={img.image} alt="" />
                        </div>
                      ))
                    }
                </div>
                <div className={style.userDetailsDiv}>
                  <div className={style.userName}>
                     <p>Shabbir Laskar</p>
                     <span><CheckCircleIcon/></span>
                     <p>Certified Buyer, Dankuni</p>
                     <p>Jul, 2020</p>
                  </div>
                  <div className={style.likeDiv}>
                     <span><ThumbUpIcon sx={{cursor:'pointer'}}/> 1</span> 
                     <span><ThumbDownIcon sx={{cursor:'pointer'}}/>2</span> 
                  </div>
                </div>
              </div>
              <div className={style.userReview}>
                <div className={style.row}>
                  <div>4 <span><StarIcon sx={{fontSize:'1rem'}}/></span></div>
                  <span>Good Product</span>
                </div>
                <div>
                  <div>170 almonds are there</div>
                </div>
                <div className={style.userImgconter}>
                    {
                      userImg.map((img) => (
                        <div className={style.userImg}>
                          <img src={img.image} alt="" />
                        </div>
                      ))
                    }
                </div>
                <div className={style.userDetailsDiv}>
                  <div className={style.userName}>
                     <p>Shabbir Laskar</p>
                     <span><CheckCircleIcon/></span>
                     <p>Certified Buyer, Dankuni</p>
                     <p>Jul, 2020</p>
                  </div>
                  <div className={style.likeDiv}>
                     <span><ThumbUpIcon/> 1</span> 
                     <span><ThumbDownIcon/>2</span> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
