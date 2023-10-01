import React, { useEffect, useRef, useState } from "react";
import style from "./SingleProduct.module.css";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CloseIcon from "@mui/icons-material/Close";
import { nanoid } from "nanoid";
import CircularProgress from "@mui/material/CircularProgress";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../firebase.config";
import { useParams } from "react-router-dom";
import CalculateTotalRatings from "../ProductPage/CalculateTotalRatings";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUserName } from "../../redux/authSlice";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import LinearProgress from '@mui/material/LinearProgress';
import { Box, Typography } from "@mui/material";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

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
  const [progress, setProgress] = useState(0);

  const picRef = useRef(null);
  const params = useParams()
  const currentUser = useSelector(selectUserName)

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
    setImage(file)
  }

  function handleRemovePic(img) {
    deleteObject(img.ref).then((res) => {
      setUploadedPic(uploadedPic.filter((pic) => pic.image !== img.image))
    })
    setImage('')
  }

  function formatCurrentMonthAndYear() {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('en-US', { month: 'short' });
    const year = currentDate.getFullYear();
  
    return `${month}, ${year}`;
  }

useEffect(() => {
  const uploadFile = () => {
    const name = nanoid(6) + image.name
    const storageRef = ref(storage, `review/${name}`)
    const uploadImg = uploadBytesResumable(storageRef, image)

    uploadImg.on('state_changed', 
    (snapshot) => {
      // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setDisable(true)
    }, 
    (error) => {
      setDisable(false)
      console.log(error);
    }, 
    () => {
      setDisable(false)
      getDownloadURL(uploadImg.snapshot.ref).then((downloadURL) => {
             setUploadedPic([{ id: nanoid(5), image: downloadURL, ref:uploadImg.snapshot.ref }, ...uploadedPic]);
      });
    }
  );

  }
 image && uploadFile()
},[image])


 async function hanldeSubmit() {
    if (!description) {
      setIsDesc(true);
    }
    if (!value) {
      toast.error("Please give rate this product! ");
      return;
    }
    if (value && description) {
      const formattedDate = formatCurrentMonthAndYear();
    
      const reviewData = {
        rate: value,
        description: description,
        images: uploadedPic,
        title: reviewTitle,
        buyerName: currentUser,
        time: formattedDate
      };
      console.log(reviewData);
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
            <div className={style.prDiv}>
              <div className={style.revProdTitle}>
                <div>{product.title}</div>
                <div className={style.revRateDiv}>
                {product.ratings>0 && <div style={{backgroundColor: product.ratings>=3 ? 'green' : product.ratings>=2 ? 'orange' : 'red'}}>
                  {product.ratings}{" "}
                  <StarIcon sx={{ fontSize: ".8rem" }} />
                </div>}
                {product.ratings>0 &&   <div>
                  (<CalculateTotalRatings ratings={product.stars} />)
                </div>}
                </div>
              </div>
              <div className={style.revImgDiv}>
                <img
                  src={product.images[0].image}
                  alt="image"
                />
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
                        }}
                      />
                    </span>
                  </div>
                  <span className={style.starLable}>{labels[value]}</span>
                  {value && (
                    <span className={style.rtSave}>
                      Your rating has been saved
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
                    <span>Title (optional)</span>
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
                  <button disabled={disable} onClick={hanldeSubmit}>{disable? <CircularProgress color="inherit" thickness={5} size={25} /> : "SUBMIT"}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WriteReview;
