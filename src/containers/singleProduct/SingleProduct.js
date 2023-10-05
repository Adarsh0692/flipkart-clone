import React, { useEffect, useState } from "react";
import style from "./SingleProduct.module.css";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// import RatingProgressBar from "./RatingProgressBar";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useNavigate, useParams } from "react-router-dom";
// import { products } from "../../productData";
import CalculateAvgRate from "../ProductPage/CalculateAvgRate";
import CalculateTotalRatings from "../ProductPage/CalculateTotalRatings";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/productSlice";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { selectUserID } from "../../redux/authSlice";
import CircularProgress from "@mui/material/CircularProgress";
import RateReviewSection from "./RateReviewSection";
import { toast } from "react-toastify";

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
];

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 44,
  p: 4,
};

function SingleProduct() {
  const params = useParams();
  const userID = useSelector(selectUserID);

  const [product, setSProduct] = useState({});
  const [isWishList, setIsWishList] = useState(false);
  const [imgindex, setImgIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [isReviewAllowed, setIsReviewAllowed] = useState(false);
  const [userWishlist, setUserWishlist] = useState([])

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle change product image onMousehover
  function handleimgIndex(i) {
    setImgIndex(i);
  }

  // Function to add product to wishList
  function handleWishList(product) {}

  // Function to add to cart product
  async function handleAddToCart() {
    if (userID) {
      setBtnLoading(true);
      await updateDoc(doc(db, "users", userID), {
        cart: arrayUnion({ productQuantity: 1, id: params.id, ...product }),
      });
      setBtnLoading(false);
      navigate("/viewCart");
    } else {
      setBtnLoading(false);
      navigate("/login");
    }
  }

  // Function to buy product
  async function handleBuyProduct() {
    if (userID) {
      setBuyLoading(true);
      await updateDoc(doc(db, "users", userID), {
        cart: arrayUnion({ productQuantity: 1, id: params.id, ...product }),
      });
      setBuyLoading(false);
      navigate("/checkout");
    } else {
      setBuyLoading(false);
      navigate("/login");
    }
  }

  // Function for wishlist items handle
  async function handleWishlist() {
    const docRef = doc(db, "wishlist " + userID, params.id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data()
   if(docSnap.exists()){
       if(data.id === params.id){
        await deleteDoc(docRef)
        toast.success("Remove from your wishlist.")
       }else{
        await setDoc(docRef, {id: params.id , ...product});
        toast.success("Added to your wishlist.")
       }
   }else{
    await setDoc(docRef, {id: params.id , ...product});
    toast.success("Added to your wishlist.")
   }
    
  }

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const productDoc = await getDoc(doc(db, "products", params.id));
      if (productDoc.exists()) {
        setLoading(false);
        setSProduct(productDoc.data());
      }
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    const isAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const userID = user.uid;
        const getDetails = async () => {
          const list = [];
          const docSnap = await getDocs(collection(db, "orders " + userID));
          docSnap.forEach((doc) => {
            list.push(doc.data());
          });
          const isorder = list.filter((pd) => pd.id === params.id);
          const isAllow = isorder.find((pr) => pr.status === "Delivered");

          if (isAllow) {
            setIsReviewAllowed(true);
          } else {
            setIsReviewAllowed(false);
          }
        };
        getDetails();

        const getWishlist = onSnapshot(collection(db, "wishlist " + userID), (querySnap) => {
          const wishlist = []
          querySnap.forEach((doc) => {
            wishlist.push(doc.data().id)
          })
          setUserWishlist(wishlist)
          
        })
      }
    });

    return () => isAuth();
  }, []);


  return (
    <>
      {loading ? (
        <CircularProgress
          sx={{ ml: "50%", mt: "20%" }}
          thickness={4}
          size={40}
        />
      ) : (
        <div className={style.prodMainContainer}>
          <div className={style.imageContainer}>
            <div className={style.singleProLeftSide}>
              <div className={style.imgMap}>
                {product?.images?.map((img, i) => (
                  <div
                    key={i}
                    className={`${style.imgDiv} ${
                      i == imgindex ? style.activeShowImg : ""
                    }`}
                  >
                    <img
                      src={img.image}
                      alt="img"
                      onMouseEnter={() => handleimgIndex(i)}
                    />
                  </div>
                ))}
              </div>

              <div className={style.showImg}>
                <img src={product?.images[imgindex]?.image} alt="" />
                <div className={style.fav}>
                  <span onClick={handleWishlist}>
                    <FavoriteIcon
                      sx={{
                        fontSize: "1rem",
                        color: userWishlist.includes(params.id) ? "red" : "lightgray",
                      }}
                      onClick={() => handleWishList(product)}
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className={style.cartBtn}>
              <button onClick={handleAddToCart} disabled={btnLoading}>
                {btnLoading ? (
                  <>
                    <CircularProgress color="inherit" thickness={5} size={25} />{" "}
                    GOING TO CART
                  </>
                ) : (
                  <>
                    {" "}
                    <ShoppingCartIcon />
                    ADD TO CART
                  </>
                )}
              </button>
              <button onClick={handleBuyProduct} disabled={buyLoading}>
                {buyLoading ? (
                  <CircularProgress color="inherit" thickness={5} size={25} />
                ) : (
                  <>
                    <FlashOnIcon />
                    BUY NOW
                  </>
                )}
              </button>
            </div>
          </div>
          <div className={style.discription}>
            <div className={style.prodDetails}>
              <span>{product.title}</span>
              <div className={style.rateDiv}>
                {product.ratings > 0 && (
                  <div
                    style={{
                      backgroundColor:
                        product.ratings >= 3
                          ? "green"
                          : product.ratings >= 2
                          ? "orange"
                          : "red",
                    }}
                  >
                    {product.ratings} <StarIcon sx={{ fontSize: "1rem" }} />
                  </div>
                )}
                {product.ratings > 0 && (
                  <span>
                    (<CalculateTotalRatings ratings={product.stars} />)
                  </span>
                )}
                {product.reviews.length > 0 && (
                  <>
                    {" "}
                    <span>&</span>
                    <span> {product.reviews.length} Reviews</span>{" "}
                  </>
                )}
                {product.assured && (
                  <img
                    src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                    alt=""
                  />
                )}
              </div>
              <div className={style.priceDiv}>
                <div>
                  ₹
                  {Math.round(
                    product.actual_price -
                      (product.discount_percentage / 100) * product.actual_price
                  )}
                </div>
                <span>₹{product.actual_price}</span>
                <div>{product.discount_percentage}% Off</div>
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
                  <span>{product.quantity}</span>
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
                  The colour and design of the delivered product may slightly
                  vary from what is shown in the image.
                </span>
              </div>
              <div className={style.desc}>
                <div>Description</div>

                <div>{product.description}</div>
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
                              elit. Omnis eum dolores unde vel hic, officia
                              neque error id nisi placeat?
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={style.legalDis}>
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
                              may contain more and/or different information
                              which may include nutritional information/allergen
                              declaration/special instruction for intended
                              use/warning/directions etc. We recommend the
                              consumers to always read the label carefully
                              before using or consuming any products. Please do
                              not solely rely on the information provided on
                              this website. For additional information, please
                              contact the manufacturer.
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {isReviewAllowed || product.ratings > 0 ? 
                  <>
                   
                    
                    <div className={style.rateTopDiv}>
                      <div>Rating & Reviews</div>
                      <button
                        onClick={() => navigate(`/write-review/${params.id}`)}
                      >
                        Rate Product
                      </button>
                    </div>
                  {product.ratings == 0 && <div className={style.firstRev}>
                      Have you used this product? Be the first to rate & review!
                    </div>}
                    
                  </> :
                  null
                }

              {product.ratings > 0 && (
                <div className={style.reviewSection}>
                  <RateReviewSection product={product} />
                </div>
              )  }
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleProduct;
