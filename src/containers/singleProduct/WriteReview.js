import React, { useRef, useState } from "react";
import style from "./SingleProduct.module.css";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CloseIcon from '@mui/icons-material/Close';
import { nanoid } from "nanoid";

const image = [];

function WriteReview() {
  const [value, setValue] = useState();
  const [description, setDescription] = useState('');
  const [reviewTitle, setReviewTitle] = useState('')
  const [uploadedPic, setUploadedPic] = useState([])
  const [isDesc, setIsDesc] = useState(false)

  const picRef = useRef(null)

  const labels = {
    1: "Very Bad",
    2: "Bad",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  function handleDescription(e){
    let desc = e.target.value

     setDescription(desc)
     setIsDesc(false)
  }
  function onBlurDes(e){
    let value = e.target.value
    if(value.length===0){
       setIsDesc(true)
    }
  }

  function handleUploadPic(e) {
    const file = e.target.files[0];
     // Check if a file was selected
  if (!file) {
    return;
  }
  // Check if the file type is an image
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file.');
    return;
  }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUploadedPic([{id: nanoid(5), image: reader.result}, ...uploadedPic]);
      
    };
  }
  

  function handleRemovePic(Id){
    const updatedPic = uploadedPic.filter((pic) => pic.id !== Id)
    setUploadedPic(updatedPic)
  }

  function hanldeSubmit(){
    if(!description){
      setIsDesc(true)
    }
    if(!value){
      alert('Please give rate this product! ')
      return;
    }
  if(value && description){
    const rateDate = {
      star: value,
      description: description,
      reviewTitle: reviewTitle,
      image: uploadedPic
    }
    console.log(rateDate);
   
  }
  }

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
              <div className={style.starSpan}>
                <span>
                  <Rating
                  sx={{color:'#FFE11B'}}
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </span>
              </div>
              <span className={style.starLable}>{labels[value]}</span>
            {value && <span className={style.rtSave}>Your rating has been saved</span>}
            </div>
          </div>
          <div className={style.desDiv}>
            <div>Review this product</div>
            <div className={style.revDesc}>
              <div className={style.desErr}>
                <span>Description</span>
              {isDesc && <span className={style.isDesc}>Description cannot be empty</span>}
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
              <input type="text" value={reviewTitle} onChange={(e)=>setReviewTitle(e.target.value)} placeholder="Review title..." />
            </div>

            <div className={style.addPic}>

            {
                uploadedPic.map((pic) => (
                  <div className={style.uploadImgDiv}>
                <img src={pic.image} alt="" />
                <div className={style.clearBtn} onClick={()=>handleRemovePic(pic.id)}> <CloseIcon sx={{fontSize:'1rem'}}/></div> 
              </div>
                ))
               }
              
              <span onClick={() => picRef.current.click()}>
                <AddAPhotoIcon sx={{ color: "gray" }} />
              </span>
              <input type="file" hidden ref={picRef} onChange={handleUploadPic} />
            </div>

            <div className={style.submitBtn}>
              <button onClick={hanldeSubmit}>SUBMIT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteReview;
