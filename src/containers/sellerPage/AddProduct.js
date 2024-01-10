import React, { useEffect, useState } from "react";
import style from "./SellerPage.module.css";
import { categories } from "./categoryData";
import CloseIcon from '@mui/icons-material/Close';
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useSelector } from "react-redux";
import { selectSellerName, selectUserID } from "../../redux/authSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

function AddProduct() {
  const [productCategory, setProductCategory] = useState("");
  const [typeOfOption, setTypeOfOption] = useState("");
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [actualPrice, setActualPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [deliveryCharge, setDeliveryCharge] = useState('');
  const [assured, setAssured] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false)

  const userID = useSelector(selectUserID)
  const sellerName = useSelector(selectSellerName) 

  const typeOfArray = categories.find(
    (categories) => categories.category === productCategory
  );

  function handleRemovePic(index){
    const updatedImg = images.filter((img,i) => i !== index)
    setImages(updatedImg)
  }

  function clearAllInput(){
    setProductCategory('')
    setTypeOfOption('')
    setTitle('')
    setBrand('')
    setQuantity('')
    setDescription('')
    setActualPrice('')
    setDiscountPercentage('')
    setDeliveryCharge('')
    setAssured('')
    setImages([])
  }

 async function handleSubmit(e){
    e.preventDefault()
    const finalPrice = Math.round(
      actualPrice -
        (discountPercentage / 100) *
        actualPrice
    )
    const product = {
        uploadedTime: Date.now(),
        sellerName: sellerName,
        title: title,
        brand: brand,
        description: description,
        actual_price: +actualPrice,
        discount_percentage: +discountPercentage,
        final_price : +finalPrice,
        category: productCategory,
        type: typeOfOption,
        quantity: +quantity,
        images: images,
        assured: assured,
        deliveryCharge: deliveryCharge,
        stars: {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0,
        },
        ratings:0,
        reviews: []
    }

    if(productCategory && typeOfOption && title && brand && description && actualPrice && discountPercentage && deliveryCharge && assured && images.length>=4){
        try {
          setLoading(true)
          await addDoc(collection(db, 'products'), {
            sellerID: userID, ...product
          })
          toast.success(`Successfully added ${product.title} to your seller account.`)
            setLoading(false)
            clearAllInput()
        } catch (error) {
          setLoading(false)
            console.log(error);
        }
    }else{
        alert("please fill all fields")
    }
    
  }

  useEffect(() => {
    const docRef = doc(db, 'products','9GEsdZVsWTfHtHGmXplJ') 
    const getData = async () => {
   
      try {
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
          //  setProduct(docSnap.data())
          //  console.log(docSnap.data());
        }else{
          console.log("No such Data");
        }
      } catch (error) {
        console.log(error);
      }
     
    }


    return ()=>  getData()
    
   
  },[])

  return (
    <div className={style.sellerWrapper}>
      <h2>Add Product</h2>
      <div className={style.addFormContainer}>
       
        <div className={style.formDiv}>
          <select
          className={style.inputGroup}
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option>Select category...</option>
            {categories.map((item, i) => (
              <option value={item.category}>{item.category}</option>
            ))}
          </select>

          <select
          className={style.inputGroup}
            value={typeOfOption}
            onChange={(e) => setTypeOfOption(e.target.value)}
          >
            <option value="">Select type...</option>
            {typeOfArray &&
              typeOfArray.typeOf.map((item) => (
                <option value={item}>{item}</option>
              ))}
          </select>
        </div>
        <div className={style.formDiv}>
          <input type="text" className={style.inputGroup} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product title" required />
          <input type="text" className={style.inputGroup} value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Product Brand" required />
        </div>
        <div className={style.textDiv}>
          <textarea
           value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Product Description..."
            required
          ></textarea>
        </div>
        <div className={style.formDiv}>
          <input type="text" className={style.inputGroup} value={imageURL} onChange={(e)=> setImageURL(e.target.value)} placeholder="Image URL (min 4 images)" />
          <button className={style.addImgBtn} onClick={()=> {setImages([...images, {image:imageURL}]); setImageURL('')}}>ADD</button>
          <input type="number" className={style.inputGroup} value={quantity} onChange={(e)=> setQuantity(e.target.value)} placeholder="Quantity" />
          {/* <div></div> */}
        </div>
      {images.length>0 &&  <div className={style.imgContainer}>
            {
                images.map((img,i) => (
                   <div key={i} className={style.imgDiv}>
                    <img src={img.image} alt="image" />
                    <div className={style.clearBtn} onClick={()=>handleRemovePic(i)}> <CloseIcon sx={{fontSize:'1rem'}}/></div> 
                   </div>
                ))
            }
          
        </div>}
        <div className={style.formDiv}>
          <input type="number" className={style.inputGroup}  value={actualPrice} onChange={(e) => setActualPrice(e.target.value)} placeholder="Actual Price" required/>
          <input type="number" className={style.inputGroup} value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} placeholder="Discount in percentage(%)" required/>
        </div>
        <div className={style.formDiv}>
          <select value={deliveryCharge} className={style.inputGroup} onChange={(e)=> setDeliveryCharge(e.target.value)}>
            <option value="">Select Delivery charge..</option>
            <option value="0"> Free</option>
            <option value="40"> ₹40</option>
            <option value="70"> ₹70</option>
          </select>
          <select  value={assured} className={style.inputGroup} onChange={(e) => setAssured(e.target.value)}>
            <option value="">Select Assured..</option>
            <option value="true"> True</option>
            <option value="false"> False</option>
          </select>
        </div>
        <div className={style.addPrBtn}>
          <button onClick={handleSubmit} disabled={loading}>{loading? <CircularProgress color="inherit" thickness={5} size={25} /> : "Add Product"}</button>
        </div>
       
      </div>
    </div>
  );
}

export default AddProduct;
