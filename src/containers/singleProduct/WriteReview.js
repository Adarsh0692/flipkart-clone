import React, { useEffect, useRef, useState } from "react";
import style from "./SingleProduct.module.css";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CloseIcon from "@mui/icons-material/Close";
import { nanoid } from "nanoid";
import CircularProgress from "@mui/material/CircularProgress";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase.config";
import { useNavigate, useParams } from "react-router-dom";
import CalculateTotalRatings from "../ProductPage/CalculateTotalRatings";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUserID, selectUserName } from "../../redux/authSlice";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

function WriteReview() {
  const [product, setSProduct] = useState({});
  const [value, setValue] = useState();
  const [description, setDescription] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [uploadedPic, setUploadedPic] = useState([]);
  const [image, setImage] = useState("");
  const [isDesc, setIsDesc] = useState(false);
  const [loading, setLoading] = useState(true);
  const [disable, setDisable] = useState(false);
  const [isReviewAllowed, setIsReviewAllowed] = useState(false);

  const picRef = useRef(null);
  const params = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector(selectUserName);
  const userID = useSelector(selectUserID)

  const labels = {
    1: "Very Bad",
    2: "Bad",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  function handleDescription(e) {
    let desc = e.target.value;

    setDescription(desc);
    setIsDesc(false);
  }
  function onBlurDes(e) {
    let value = e.target.value;
    if (value.length === 0) {
      setIsDesc(true);
    }
  }

  function handleUploadPic(e) {
    const file = e.target.files[0];

    // Check if a file was selected
    if (!file) {
      return;
    }
    // Check if the file type is an image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    setImage(file);
  }

  function handleRemovePic(img) {
    const imgRef = ref(storage, `review/${img.id}`);
    deleteObject(imgRef).then((res) => {
      setUploadedPic(uploadedPic.filter((pic) => pic.image !== img.image));
    });
    setImage("");
  }

  // Function to update ratings in firestore
  function calculateAvgRate(ratings) {
    let sum = 0;
    let totalRate = 0;
    for (let i = 1; i <= 5; i++) {
      totalRate = totalRate + ratings[i];
      sum += i * ratings[i];
    }
    const avg = sum / totalRate;
    const newAvg = Math.round(avg * 10) / 10;
    return newAvg;
  }

  // Function to update the stars object in Firestore
  const productRef = doc(db, "products", params.id);
  const updateStarsInFirestore = async (updatedstars) => {
    const updatedRatings = calculateAvgRate(updatedstars);

    try {
      await updateDoc(productRef, {
        stars: updatedstars,
        ratings: updatedRatings,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle user rating and update stars object
  const handleRating = async (rating) => {
    const docSnap = await getDoc(productRef);
    if (docSnap.exists()) {
      const currentStars = docSnap.data().stars;
      const updatedStars = { ...currentStars };
      updatedStars[rating]++;
      await updateStarsInFirestore(updatedStars);
    }

  };

  useEffect(() => {
    const uploadFile = () => {
      const name = nanoid(6);
      const storageRef = ref(storage, `review/${name}`);
      const uploadImg = uploadBytesResumable(storageRef, image);

      uploadImg.on(
        "state_changed",
        (snapshot) => {
          // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setDisable(true);
        },
        (error) => {
          setDisable(false);
          console.log(error);
        },
        () => {
          setDisable(false);
          getDownloadURL(uploadImg.snapshot.ref).then((downloadURL) => {
            setUploadedPic([{ id: name, image: downloadURL }, ...uploadedPic]);
          });
        }
      );
    };
    image && uploadFile();
  }, [image]);

  async function hanldeSubmit() {
    if (!description) {
      setIsDesc(true);
    }
    if (!value) {
      toast.error("Please give rate this product! ");
      return;
    }
    if (value && description) {
      const formattedDate = Date.now();

      const reviewData = {
        rate: value,
        description: description,
        images: uploadedPic,
        title: reviewTitle,
        buyerName: currentUser,
        time: formattedDate,
      };
      const revRef = doc(db, "products", params.id);
      setDisable(true);
      await updateDoc(revRef, {
        reviews: arrayUnion(reviewData),
      });
      await setDoc(doc(db, "review " + userID, params.id), {rating: value, title: product.title, reviewTitle:reviewTitle, description:description,time:Date.now(), image: product.images[0].image, buyerName: currentUser})
      setDisable(false);
      toast.success("Thank you for your feedback.");
      navigate(`/productDetails/${params.id}`)
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
          const docSnap = await getDocs(query(collection(db, "orders"),where('buyerID', '==', userID)));
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
      }
    });

    return () => isAuth();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <CircularProgress
            sx={{ ml: "50%", mt: "20%" }}
            thickness={4}
            size={40}
          />
        </>
      ) : (
        <div className={style.mainwapperReview}>
          <div className={style.reviwProd}>
            <div className={style.rateRev}>Rating & Reviews</div>
            <div
              className={style.prDiv}
              onClick={() => navigate(`/productDetails/${params.id}`)}
            >
              <div className={style.revProdTitle}>
                <div>{product.title}</div>
                <div className={style.revRateDiv}>
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
                      {product.ratings} <StarIcon sx={{ fontSize: ".8rem" }} />
                    </div>
                  )}
                  {product.ratings > 0 && (
                    <div>
                      (<CalculateTotalRatings ratings={product.stars} />)
                    </div>
                  )}
                </div>
              </div>
              <div className={style.revImgDiv}>
                <img src={product?.images[0]?.image} alt="image" />
              </div>
            </div>
          </div>
          <div className={style.bottomSec}>
            <div className={style.whatRev}>
              <div>What makes a good review</div>
              <div className={style.quesDiv}>
                <span>Have you used this products?</span>
                <p>
                  Your review should be about your expirence with the product.
                </p>
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
            {isReviewAllowed ? (
              <div className={style.revFormSec}>
                <div className={style.starDiv}>
                  <div>Rate this product</div>
                  <div className={style.selStar}>
                    <div className={style.starSpan}>
                      <span>
                        <Rating
                          sx={{ color: "#FFE11B" }}
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                            handleRating(event.target.value);
                          }}
                        />
                      </span>
                    </div>
                    <span
                      className={style.starLable}
                      style={{
                        color:
                          value >= 3 ? "green" : value >= 2 ? "orange" : "red",
                      }}
                    >
                      {labels[value]}
                    </span>
                    {value && (
                      <span className={style.rtSave}>
                        Your rating has been saved.
                      </span>
                    )}
                  </div>
                </div>
                <div className={style.desDiv}>
                  <div>Review this product</div>
                  <div className={style.revDesc}>
                    <div className={style.desErr}>
                      <span>Description</span>
                      {isDesc && (
                        <span className={style.isDesc}>
                          Description cannot be empty
                        </span>
                      )}
                    </div>

                    <textarea
                      rows="6"
                      value={description}
                      onChange={handleDescription}
                      onBlur={onBlurDes}
                      placeholder="Description..."
                    ></textarea>
                  </div>
                  <div className={style.titleDiv}>
                    <div>
                      {" "}
                      <span>Title</span>
                    </div>
                    <input
                      type="text"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="Review title..."
                    />
                  </div>

                  <div className={style.addPic}>
                    {uploadedPic.map((pic) => (
                      <div className={style.uploadImgDiv}>
                        <img src={pic.image} alt="" />
                        <div
                          className={style.clearBtn}
                          onClick={() => handleRemovePic(pic)}
                        >
                          {" "}
                          <CloseIcon sx={{ fontSize: "1rem" }} />
                        </div>
                      </div>
                    ))}

                    <span onClick={() => picRef.current.click()}>
                      <AddAPhotoIcon sx={{ color: "gray" }} />
                    </span>
                    <input
                      type="file"
                      hidden
                      ref={picRef}
                      onChange={handleUploadPic}
                    />
                  </div>

                  <div className={style.submitBtn}>
                    <button disabled={disable} onClick={hanldeSubmit}>
                      {disable ? (
                        <CircularProgress
                          color="inherit"
                          thickness={5}
                          size={25}
                        />
                      ) : (
                        "SUBMIT"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={style.revFormSec}>
                <div className={style.reviewError}>
                  <img
                    src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-404_d700a7.png"
                    alt=""
                  />
                  <h2>Haven't purchased this product?</h2>
                  <span>
                    Sorry! You are not allowed to review this product since you
                    haven't bought it on Flipkart.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default WriteReview;
